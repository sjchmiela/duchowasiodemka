import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MapNavigator from "./MapNavigator";

const MainStackNavigator = createStackNavigator({
  Map: MapNavigator
});

export default createAppContainer(MainStackNavigator);
