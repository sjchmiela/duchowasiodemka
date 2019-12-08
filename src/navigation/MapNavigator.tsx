import React from "react";
import {
  NavigationStackScreenProps,
  createStackNavigator
} from "react-navigation-stack";

import PromptScreen from "../screens/PromptScreen";
import PlaceNavigator from "./PlaceNavigator";

import MapScreen from "../screens/MapScreen";
import { Platform } from "@unimodules/core";

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
    headerMode: "none",
    defaultNavigationOptions: {
      gesturesEnabled: false
    },
    cardOverlayEnabled: true,
    transitionConfig: Platform.OS === "web" && (() => ({
      transitionSpec: {
        duration: 0,
      },
    })),
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
