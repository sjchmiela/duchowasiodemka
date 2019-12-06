import React from "react";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { TabBarIndicator } from "react-native-tab-view";

import PlaceScreen from "../screens/PlaceScreen";
import createPartScreen from "../screens/createPartScreen";
import { Platform } from "react-native";

const DetailsNavigator = createMaterialTopTabNavigator(
  {
    Historia: {
      screen: createPartScreen("history", "Historia")
    },
    Zabytki: createPartScreen("relics", "Zabytki"),
    Ciekawostki: createPartScreen("facts", "Ciekawostki"),
    Zakon: createPartScreen("order", "Zakon"),
    Założyciel: createPartScreen("founder", "Założyciel"),
    Modlitwa: createPartScreen("prayer", "Modlitwa"),
    Duchowość: createPartScreen("spirituality", "Duchowość")
  },
  {
    tabBarOptions: {
      scrollEnabled: true,
      upperCaseLabel: false,
      activeTintColor: "#283957",
      inactiveTintColor: "#a0a0a0",
      style: {
        backgroundColor: "#ffffff",
        marginHorizontal: 8
      },
      labelStyle: {
        fontFamily: "Inter-Bold",
        // fontWeight: '700',
        fontSize: 15
      },
      tabStyle: {
        width: "auto"
      },
      indicatorStyle: {
        backgroundColor: "#283957",
        ...(Platform.OS === "web" ? { display: "none" } : {})
      },
    }
  }
);

export default function PlaceNavigator(props: NavigationStackScreenProps) {
  return (
    <PlaceScreen {...props}>
      <DetailsNavigator navigation={props.navigation} />
    </PlaceScreen>
  );
}

PlaceNavigator.router = DetailsNavigator.router;
