import React from "react";
import { View, Linking, StyleSheet } from "react-native";

import { StrongText } from "./Text";
import IosDownload from "../components/IosDownload";
import AndroidDownload from "../components/AndroidDownload";

export default function DownloadButtons() {
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 10
      }}
    >
      <IosDownload
        onPress={() =>
          Linking.openURL(
            "https://apps.apple.com/pl/app/duchowa-si%C3%B3demka/id1491682026?mt=8"
          )
        }
        style={{ marginRight: 5 }}
      />
      <AndroidDownload
        style={{ marginLeft: 5 }}
        onPress={() =>
          Linking.openURL(
            "https://play.google.com/store/apps/details?id=pl.pijarzy.duchowasiodemka"
          )
        }
      />
    </View>
  );
}
