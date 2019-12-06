import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableHighlight
} from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";

import details from "../details";
import CardHeader from "../components/CardHeader";
import CloseButton from "../components/CloseButton";
import LocationButton from "../components/LocationButton";
import MapFocusContext from "../components/MapFocusContext";
import DirectionIcon from "../components/DirectionIcon";
import { BigFatTitle, BodyText, SmallFatText, StrongText } from "../components/Text";
import { touchableContentColor, touchableBackgroundColor, spBlue } from "../constants/Colors";

export default function PlaceScreen(props: NavigationStackScreenProps) {
  const placeKey = props.navigation.getParam("placeKey", "sp");
  const placeDetails = details[placeKey];
  const { placeName, orderName } = placeDetails;
  return (
    <View style={styles.fullHeight}>
      <CardHeader /* tintColor={placeDetails.pin.pinColor} */ />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.fullHeight}>
            <BigFatTitle style={{ marginBottom: 4 }}>{placeName}</BigFatTitle>
            <BodyText>{orderName}</BodyText>
          </View>
          <MapFocusContext.Consumer>
            {({ blur }) => <CloseButton onPress={() => blur(placeKey)} />}
          </MapFocusContext.Consumer>
        </View>
        <TouchableHighlight
          style={{
            backgroundColor: touchableBackgroundColor,
            borderRadius: 6,
            marginTop: 10,
            paddingHorizontal: 12,
            paddingVertical: 12,
          }}
          underlayColor={spBlue}
          onPress={async () => {
            if (await Linking.canOpenURL("comgooglemaps://")) {
              Linking.openURL(
                `comgooglemaps://?daddr=${encodeURIComponent(
                  placeName
                )}&directionsmode=walking`
              );
            } else {
              Linking.openURL(
                `http://maps.apple.com/?daddr=${encodeURIComponent(
                  placeName
                )}&dirflg=w`
              );
            }
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <DirectionIcon color={touchableContentColor} style={{ marginRight: 10 }} />
            <StrongText style={{ color: touchableContentColor }}>Prowadź</StrongText>
          </View>
        </TouchableHighlight>
      </View>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  fullHeight: {
    flex: 1
  },
  header: {
    flexDirection: "row"
  },
  container: {
    // flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 14
  }
});
