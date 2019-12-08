import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableHighlight,
  Platform,
  Image,
  ImageBackground
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
  spBlue,
  white
} from "../constants/Colors";
import useLandscapeScreen from "../hooks/useLandscapeScreen";
import { LinearGradient } from "expo-linear-gradient";

export default function PlaceScreen(props: NavigationStackScreenProps) {
  const placeKey = props.navigation.getParam("placeKey", "sp");
  const placeDetails = details[placeKey];
  const { placeName, orderName, abbreviation } = placeDetails;
  const isLandscape = useLandscapeScreen();
  return (
    <View style={styles.fullHeight}>
      {!isLandscape && (
        <CardHeader
          // tintColor={white}
          bordered={!isLandscape} /* tintColor={placeDetails.pin.pinColor} */
          style={{ position: "absolute", left: 0, top: 0, right: 0, height: 24, zIndex: 999, backgroundColor: "transparent" }}
        />
      )}
      <ImageBackground
        source={{
          uri:
            "https://dotravel.com/uploads/products/1230/1535382520/la-sagrada-familia-tickets-with-fast-track-access.jpg"
        }}
        style={styles.header}
      >
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={["#00000000", "#000000e0"]}
          locations={[0.2, 1]}
        />
        <View style={[styles.fullHeight]}>
          <BodyText style={styles.headerText}>
            {orderName} ({abbreviation})
          </BodyText>
          <BigFatTitle style={[styles.headerText, styles.title]}>{placeName}</BigFatTitle>
        </View>
        <MapFocusContext.Consumer>
          {({ blur }) => <CloseButton style={styles.closeButton} onPress={() => blur(placeKey)} />}
        </MapFocusContext.Consumer>
      </ImageBackground>
      <View style={styles.container}>
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
    flexDirection: "row",
    paddingHorizontal: 14,
    height: 210,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingVertical: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  title: {
    marginBottom: 4
  },
  headerText: {
    color: white
  },
  container: {
    // flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  buttonContainer: {
    flexDirection: "row",
    // flex: 1
  },
  button: {
    flex: 1
  }
});
