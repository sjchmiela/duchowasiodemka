import React from "react";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { TabBarIndicator } from "react-native-tab-view";

import PlaceScreen from "../screens/PlaceScreen";
import createPartScreen from "../screens/createPartScreen";
import { Platform } from "react-native";

const DetailsNavigator = createMaterialTopTabNavigator(
  {
    history: createPartScreen("history", "Historia"),
    relics: createPartScreen("relics", "Zabytki"),
    facts: createPartScreen("facts", "Ciekawostki"),
    order: createPartScreen("order", "Zakon"),
    founder: createPartScreen("founder", "Założyciel"),
    prayer: createPartScreen("prayer", "Modlitwa"),
    spirituality: createPartScreen("spirituality", "Duchowość")
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
  console.warn('PlaceNavigator', props.navigation.getParam('placeKey'))
  return (
    <PlaceScreen {...props}>
      <DetailsNavigator navigation={props.navigation} />
    </PlaceScreen>
  );
}

PlaceNavigator.router = DetailsNavigator.router;
