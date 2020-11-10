import "@expo/match-media";
import React from "react";
import { AppLoading } from "expo";
import { useScreens } from "react-native-screens";
import * as Font from "expo-font";
import MainNavigation from "./src/navigation/MainNavigation";
import { Platform, StatusBar } from "react-native";
import { Octicons, MaterialIcons } from "@expo/vector-icons";

if (Platform.OS !== "web") {
  useScreens(true);
}

export default function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const startAsync = React.useCallback(() =>
    Promise.all([
      Font.loadAsync("Inter", require("./assets/Inter-Regular.otf")),
      Font.loadAsync("Inter-Bold", require("./assets/Inter-Bold.otf")),
      Font.loadAsync("Inter-Italic", require("./assets/Inter-Italic.otf")),
      Font.loadAsync(
        "Inter-ExtraBold",
        require("./assets/Inter-ExtraBold.otf")
      ),
      Font.loadAsync(
        "Inter-BoldItalic",
        require("./assets/Inter-BoldItalic.otf")
      ),
      Octicons.loadFont(),
      MaterialIcons.loadFont(),
      StatusBar.setTranslucent(true),
      StatusBar.setBarStyle("dark-content"),
    ])
  );

  if (!isLoaded) {
    return (
      <AppLoading startAsync={startAsync} onFinish={() => setIsLoaded(true)} />
    );
  }

  return <MainNavigation />;
}
