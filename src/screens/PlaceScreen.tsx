import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableHighlight,
  Platform
} from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Octicons, MaterialIcons } from "@expo/vector-icons";

import details from "../details";
import CardHeader from "../components/CardHeader";
import CloseButton from "../components/CloseButton";
import LocationButton from "../components/LocationButton";
import MapFocusContext from "../components/MapFocusContext";
import DirectionIcon from "../components/DirectionIcon";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import {
  BigFatTitle,
  BodyText,
  SmallFatText,
  StrongText
} from "../components/Text";
import {
  touchableContentColor,
  touchableBackgroundColor,
  spBlue
} from "../constants/Colors";
import useLandscapeScreen from "../hooks/useLandscapeScreen";

export default function PlaceScreen(props: NavigationStackScreenProps) {
  const placeKey = props.navigation.getParam("placeKey", "sp");
  const placeDetails = details[placeKey];
  const { placeName, orderName, abbreviation } = placeDetails;
  const isLandscape = useLandscapeScreen();
  return (
    <View style={styles.fullHeight}>
      <CardHeader
        bordered={!isLandscape} /* tintColor={placeDetails.pin.pinColor} */
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.fullHeight}>
            <BigFatTitle style={styles.title}>{placeName}</BigFatTitle>
            <BodyText>{orderName} ({abbreviation})</BodyText>
          </View>
          <MapFocusContext.Consumer>
            {({ blur }) => <CloseButton onPress={() => blur(placeKey)} />}
          </MapFocusContext.Consumer>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            onPress={() => {
              Linking.openURL(
                `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  placeName
                )}&travelmode=walking&destination_place_id=${
                  placeDetails.googlePlaceId
                }&dir_action=navigate`
              );
            }}
            renderIcon={props => (
              <MaterialIcons {...props} name="directions" size={26} />
            )}
            title="Prowadź"
            style={styles.button}
          />
          <SecondaryButton
            title="Witryna"
            style={[styles.button, { marginLeft: 10 }]}
            onPress={() => Linking.openURL(placeDetails.url)}
            renderIcon={props => <Octicons {...props} name="globe" size={24} />}
          />
        </View>
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
  title: {
    marginBottom: 4
  },
  container: {
    // flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  buttonContainer: {
    flexDirection: "row",
    flex: 1
  },
  button: {
    flex: 1
  }
});
