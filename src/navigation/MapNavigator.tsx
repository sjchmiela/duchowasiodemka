import React from "react";
import {
  NavigationStackScreenProps,
  createStackNavigator
} from "react-navigation-stack";

import PromptScreen from "../screens/PromptScreen";
import PlaceNavigator from "./PlaceNavigator";

import MapScreen from "../screens/MapScreen";

const BottomSheetNavigator = createStackNavigator(
  {
    Prompt: {
      screen: PromptScreen,
      path: ""
    },
    Place: {
      screen: PlaceNavigator,
      path: "place/:placeKey"
    }
  },
  {
    // initialRouteName: "Place",
    mode: "modal",
    headerMode: "null",
    defaultNavigationOptions: {
      gesturesEnabled: false
    },
    cardOverlayEnabled: true
  }
);

export default function MapNavigator(props: NavigationStackScreenProps) {
  return (
    <MapScreen {...props}>
      <BottomSheetNavigator navigation={props.navigation} />
    </MapScreen>
  );
}

MapNavigator.router = BottomSheetNavigator.router;
MapNavigator.navigationOptions = {
  header: null
};
