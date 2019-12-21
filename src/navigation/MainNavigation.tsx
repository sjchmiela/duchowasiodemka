import { createAppContainer } from "react-navigation";
import { createBrowserApp } from "@react-navigation/web";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import MapNavigator from "./MapNavigator";
import PrivacyScreen from "../screens/PrivacyScreen";

const MainStackNavigator = createStackNavigator({
  Map: {
    screen: MapNavigator,
    path: ""
  },
  Privacy: {
    screen: PrivacyScreen,
    path: "polityka-prywatnosci"
  }
}, {
  mode: "modal"
});

const App = createAppContainer(MainStackNavigator);

export default Platform.OS === "web" ? createBrowserApp(App, { history: "browser"}) : App;
