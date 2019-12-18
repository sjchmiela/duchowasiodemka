import React from "react";
import { View, Linking, StyleSheet } from "react-native";

import { StrongText } from "./Text";
import IosDownload from "../components/IosDownload";
import AndroidDownload from "../components/AndroidDownload";

export default function DownloadButtons() {
  const [isAndroidAvailable, setIsAndroidAvailable] = React.useState(false);

  React.useEffect(() => {
    fetch(
      "https://play.google.com/store/apps/details?id=pl.pijarzy.duchowasiodemka",
      { mode: "no-cors" }
    ).then(({ status }) => {
      setIsAndroidAvailable(status === 200);
    });
  }, []);

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
        disabled={!isAndroidAvailable}
        style={{ marginLeft: 5 }}
        iconProps={{ style: { opacity: isAndroidAvailable ? 1 : 0.2 } }}
      >
        {!isAndroidAvailable && (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                alignItems: "center",
                justifyContent: "center"
              }
            ]}
          >
            <StrongText>Wkrótce</StrongText>
          </View>
        )}
      </AndroidDownload>
    </View>
  );
}
