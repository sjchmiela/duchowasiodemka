import React from "react";
import { Marker } from "react-native-maps";
import { Dimensions, View, StyleSheet, Platform } from "react-native";
import {
  NavigationStackScreenProps,
  createStackNavigator
} from "react-navigation-stack";

import details from "../details";
import usePrevious from "../hooks/usePrevious";
import MapView from "../components/MapView";
import BottomSheet from "../components/BottomSheet";
import MapFocusContext from "../components/MapFocusContext";
import PlacePin from "../components/PlacePin";
import PlaceMarker from "../components/PlaceMarker";

const initialRegion = {
  latitude: 50.06136,
  longitude: 19.936,
  latitudeDelta: 0.019,
  longitudeDelta: 0.019
};

export default function MapScreen(props: NavigationStackScreenProps) {
  const renderHeader = React.useCallback(
    () => <View style={styles.header} />,
    []
  );
  const sheetRef = React.createRef<BottomSheet>();
  const refs = React.useRef<{ [key: string]: React.RefObject<Marker> }>({});
  const blur = React.useCallback(
    (key: string | undefined) => {
      if (key && refs.current[key] && refs.current[key].current) {
        refs.current[key].current.hideCallout();
      }
      props.navigation.navigate("Prompt");
      if (sheetRef.current) {
        sheetRef.current.snapTo(0);
      }
    },
    [props.navigation, sheetRef, refs]
  );
  const focus = React.useCallback(
    (placeKey: string) => {
      props.navigation.push("Place", { placeKey });
      if (sheetRef.current && Platform.OS === "web") {
        sheetRef.current.snapTo(1);
      }
    },
    [props.navigation]
  );
  const onMarkerPress = React.useCallback(
    ({ nativeEvent: { id } }) => focus(id),
    [focus]
  );
  return (
    <View style={styles.fullHeight}>
      <MapView
        showsUserLocation
        style={styles.fullHeight}
        initialRegion={initialRegion}
        onPress={blur}
        onMarkerPress={onMarkerPress}
      >
        {Object.keys(details).map(key => (
          <PlaceMarker
            key={key}
            identifier={key}
            ref={refs.current[key] || (refs.current[key] = React.createRef())}
          />
        ))}
      </MapView>
      <MapFocusContext.Provider value={{ blur }}>
        <BottomSheet
          ref={
            Platform.OS === "web"
              ? ref => {
                if (!ref) {
                  return;
                }
                console.log('setting sheetRef.current to ', ref);
                  sheetRef.current = ref;
                  console.log(sheetRef.current);
                }
              : sheetRef
          }
          style={styles.fullHeight}
          renderHeader={renderHeader}
          renderContent={() => (
            <View style={styles.panel}>{props.children}</View>
          )}
          snapPoints={["25%", Dimensions.get("window").height - 100]}
        />
      </MapFocusContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  fullHeight: {
    flex: 1
  },
  header: {
    shadowColor: "#283957",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: -3 },
    backgroundColor: "#283957",
    borderTopColor: "#283957",
    height: StyleSheet.hairlineWidth,
    ...(Platform.OS === "web"
      ? {
          position: "relative",
          top: 3
        }
      : {})
  },
  panel: {
    height: Dimensions.get("window").height - 100
  }
});
