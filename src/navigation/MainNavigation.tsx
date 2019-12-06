import { createAppContainer } from "react-navigation";
import { createBrowserApp } from "@react-navigation/web";
import { createStackNavigator } from "react-navigation-stack";
import MapNavigator from "./MapNavigator";
import { Platform } from "react-native";

const MainStackNavigator = createStackNavigator({
  Map: {
    screen: MapNavigator,
    path: ""
  }
});

const App = createAppContainer(MainStackNavigator);

export default Platform.OS === "web" ? createBrowserApp(App, { history: "browser"}) : App;
