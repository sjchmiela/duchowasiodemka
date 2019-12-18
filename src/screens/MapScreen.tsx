import React from "react";
import { Marker } from "react-native-maps";
import { Dimensions, View, StyleSheet, Platform } from "react-native";
import {
  NavigationStackScreenProps,
  createStackNavigator
} from "react-navigation-stack";
import { NavigationActions } from "react-navigation";
// import Constants from "expo-constants";
// import * as Permissions from "expo-permissions";
// import * as Location from "expo-location";

import details from "../details";
import usePrevious from "../hooks/usePrevious";
import useLandscapeScreen from "../hooks/useLandscapeScreen";
import MapView from "../components/MapView";
import BottomSheet from "../components/BottomSheet";
import MapFocusContext from "../components/MapFocusContext";
import PlacePin from "../components/PlacePin";
import PlaceMarker from "../components/PlaceMarker";
import { shadowColor, spBlue } from "../constants/Colors";
// import LocationButton from "../components/LocationButton";

const initialRegion = {
  latitude: 50.0625 + (Platform.OS === "ios" ? -0.003 : 0),
  longitude: 19.936,
  latitudeDelta: 0.019,
  longitudeDelta: 0.019
};

let collapsedHeight = 160;
if (Dimensions.get("window").height > 600) {
  collapsedHeight = 250;
}

export default function MapScreen(props: NavigationStackScreenProps) {
  const sheetRef = React.createRef<BottomSheet>();
  const refs = React.useRef<{ [key: string]: React.RefObject<Marker> }>({});
  const blur = React.useCallback(
    (key: string | undefined) => {
      if (key && refs.current[key] && refs.current[key].current) {
        refs.current[key].current.hideCallout();
      }
      props.navigation.navigate("Prompt", { placeKey: undefined });
      if (sheetRef.current) {
        sheetRef.current.collapse();
      }
    },
    [props.navigation, sheetRef, refs]
  );
  const focus = React.useCallback(
    (placeKey: string) => {
      props.navigation.push(
        "Place",
        { placeKey },
        NavigationActions.setParams({})
      );
    },
    [props.navigation]
  );
  const onMarkerPress = React.useCallback(
    ({ nativeEvent: { id } }) => focus(id),
    [focus]
  );
  const initialPlaceKey = React.useMemo(() => {
    for (let route of props.navigation.state.routes) {
      const placeKey = props.navigation
        .getChildNavigation(route.key)
        .getParam("placeKey");
      if (placeKey) {
        return placeKey;
      }
    }
  }, []);
  const initialRegionOrPlace = {
    ...initialRegion,
    ...(initialPlaceKey ? details[initialPlaceKey].location : {})
  };
  const isLandscape = useLandscapeScreen();
  const [isMapReady, setIsMapReady] = React.useState(Platform.OS === "web");

  // const [showsUserLocation, setShowsUserLocation] = React.useState(false);
  // const [followsUserLocation, setFollowsUserLocation] = React.useState(false);
  // const [userLocation, setUserLocation] = React.useState(null);
  // const onUserLocationChange = React.useCallback((event) => {
  //   alert(event.nativeEvent.coordinate);
  //   setUserLocation(event.nativeEvent.coordinate);
  // }, [setUserLocation]);
  // const focusOnUser = React.useCallback(() => {
  //   alert(userLocation);
  //   // Location.getCurrentPositionAsync({ accuracy:Location.Accuracy.Balanced})
  //   setFollowsUserLocation(true);
  //   // console.log("yes");
  //   // setTimeout(() => {
  //   //   setFollowsUserLocation(false);
  //   //   console.log("no");
  //   // }, 2000);
  // }, [setFollowsUserLocation]);
  // React.useEffect(() => {
  //   Permissions.getAsync(Permissions.LOCATION).then(response => {
  //     if (response.status === "granted") {
  //       setShowsUserLocation(true);
  //     }
  //   });
  // }, []);
  // const onLocationButtonPressed = React.useCallback(() => {
  //   if (!showsUserLocation) {
  //     Permissions.askAsync(Permissions.LOCATION)
  //       .then(response => {
  //         if (response.status === "granted") {
  //           setShowsUserLocation(true);
  //           focusOnUser();
  //         } else {
  //           alert("Nie ma dostępu do lokalizacji");
  //         }
  //       })
  //       .catch(e => {
  //         alert("nie udało się pobrać lokalizacji");
  //       });
  //   } else {
  //     focusOnUser();
  //   }
  // }, [focusOnUser, setShowsUserLocation, showsUserLocation]);
  return (
    <View
      style={[
        styles.fullHeight,
        isLandscape && { flexDirection: "row-reverse" }
      ]}
    >
      <MapView
        initialSelectedIdentifier={initialPlaceKey}
        showsUserLocation /*={showsUserLocation}*/
        style={styles.fullHeight}
        initialRegion={initialRegionOrPlace}
        onPress={blur}
        onMarkerPress={onMarkerPress}
        showsMyLocationButton
        toolbarEnabled={false}
        compassOffset={{ x: -7, y: 0 }}
        legalLabelInsets={
          Platform.OS === "ios" && !isLandscape
            ? {
                bottom: collapsedHeight + 6
              }
            : undefined
        }
        onLayout={({ nativeEvent }) =>
          nativeEvent.layout.width > 0 &&
          nativeEvent.layout.height > 0 &&
          setIsMapReady(true)
        }
      >
        {isMapReady &&
          Object.keys(details).map(key => (
            <PlaceMarker
              key={key}
              identifier={key}
              initialSelected={key === initialPlaceKey}
              ref={refs.current[key] || (refs.current[key] = React.createRef())}
            />
          ))}
      </MapView>
      {/* {Platform.OS !== "web" && (
        <LocationButton
          style={{
            position: "absolute",
            top: 10 + Constants.statusBarHeight,
            right: 16
          }}
          onPress={onLocationButtonPressed}
        />
      )} */}
      <MapFocusContext.Provider value={{ blur }}>
        <BottomSheet
          ref={sheetRef}
          style={styles.fullHeight}
          navigation={props.navigation}
        >
          {props.children}
        </BottomSheet>
      </MapFocusContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  fullHeight: {
    flex: 1
  },
  header: {
    shadowColor: shadowColor,
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: -3 },
    backgroundColor: spBlue,
    borderTopColor: spBlue,
    height: StyleSheet.hairlineWidth,
    ...(Platform.OS === "web"
      ? {
          position: "relative",
          top: 3
        }
      : {})
  },
  panel: {}
});
