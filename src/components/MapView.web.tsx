import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { withMap } from "react-mapbox-gl/lib-esm/context";
import { MapViewProps } from "react-native-maps";
import { View } from "react-native";
import mapboxgl from "mapbox-gl";
import { withNavigation } from "react-navigation";

const accessToken =
  "pk.eyJ1Ijoic2pjaG1pZWxhIiwiYSI6ImNqMnJhYWppMzAwM3Yyd3FwMHZlYXZzYmsifQ.aKPYfTV3FLMD_Je7XgXv4w";
const Map = ReactMapboxGl({
  accessToken,
  logoPosition: "top-right",
  locale: "pl"
});

export const MapMarkerPressContext = React.createContext({
  onPress: () => null
});

function GeolocateControl({ map, onError }) {
  const controlRef = React.useRef();
  React.useEffect(() => {
    // if (!map) {
    //   return;
    // }
    const geolocateControl = new mapboxgl.GeolocateControl({
      accessToken,
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });

    map.addControl(geolocateControl);
    controlRef.current = geolocateControl;
  }, [map]);
  React.useEffect(() => {
    if (!onError || !controlRef.current) {
      return;
    }
    controlRef.current.on("error", onError);
    return () => {
      controlRef.current.off("error", onError);
    };
  }, [onError, controlRef.current]);
  return null;
}

const GeolocateControlWired = withMap(GeolocateControl);

export default withNavigation(function MapView(props: MapViewProps) {
  const [zoom, setZoom] = React.useState(14);
  const onZoom = React.useCallback(
    map => {
      setZoom(map.getZoom());
    },
    [setZoom]
  );
  const { latitude: lat, longitude: lng } = props.initialRegion;
  const [center, setCenter] = React.useState([lng, lat]);
  const onMove = React.useCallback(
    map => {
      setCenter(map.getCenter().toArray());
    },
    [setCenter]
  );
  const [selectedMarkerId, setSelectedMarkerId] = React.useState();

  const selectedMarkerIdRef = React.useRef(props.navigation.getParam('placeKey'));

  const onPress = React.useCallback(
    id => {
      props.onPress(selectedMarkerIdRef.current);
      props.onMarkerPress({ nativeEvent: { id } });
      selectedMarkerIdRef.current = id;
    },
    [props.onMarkerPress, selectedMarkerIdRef]
  );

  return (
    <Map
      style="mapbox://styles/sjchmiela/ck3twecz80s1j1co7rz9j634b"
      center={center}
      zoom={[zoom]}
      containerStyle={{ flex: "1" }}
      onClick={() => {
        props.onPress(selectedMarkerIdRef.current);
      }}
      onZoomEnd={onZoom}
      onMoveEnd={onMove}
    >
      <GeolocateControlWired
        onError={() => alert("Nie udało się pobrać pozycji.")}
      />
      <MapMarkerPressContext.Provider value={{ onPress }}>
        {props.children}
      </MapMarkerPressContext.Provider>
    </Map>
  );
});
