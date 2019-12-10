import React from "react";
import { NavigationTabScreenProps } from "react-navigation-tabs";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform
} from "react-native";
import Animated from "react-native-reanimated";
import details from "../details";
import { BodyText, SmallFatText } from "../components/Text";
import { lightSpBlue, graySpBlue } from "../constants/Colors";

export default function createPartScreen(key: string, label: string) {
  function PartScreen(props: NavigationTabScreenProps) {
    const placeKey = props.navigation
      .dangerouslyGetParent()
      .getParam("placeKey", "sp");
    const placeDetails = details[placeKey];
    let partsToRender = placeDetails[key];
    if (!partsToRender) {
      const ComponentToRender =
        placeDetails[`${key[0].toLocaleUpperCase()}${key.slice(1)}`];
      partsToRender = [<View style={styles.textPart}><ComponentToRender /></View>];
    }
    return (
      <ScrollView style={styles.fullHeight}>
        <>
          {partsToRender.map((el, index) =>
            typeof el === "string" ? (
              <BodyText key={index} style={styles.textPart}>
                {el}
              </BodyText>
            ) : (
              React.cloneElement(el, { key: index, style: styles.textPart })
            )
          )}
        </>
        <SmallFatText style={[styles.textPart, styles.note]}>Wykorzystano materiały ze strony internetowej Zakonu.</SmallFatText>
      </ScrollView>
    );
  }

  PartScreen.navigationOptions = {
    tabBarLabel: props => (
      <>
        <Animated.Text
          style={[
            styles.labelFromReactNativeTabView,
            { color: props.tintColor },
            styles.labelFromPlaceNavigator
          ]}
          allowFontScaling={true} // todo
        >
          {label}
        </Animated.Text>
        <View
          style={[
            styles.webIndicator,
            {
              height: props.focused && Platform.OS === "web" ? 3 : 0,
              backgroundColor: props.tintColor
            }
          ]}
        />
      </>
    )
  };
  return PartScreen;
}

const styles = StyleSheet.create({
  fullHeight: {
    flex: 1
  },
  textPart: {
    marginTop: 8,
    marginBottom: 14,
    marginHorizontal: 14,
  },
  note: {
    color: graySpBlue
  },
  labelFromReactNativeTabView: {
    textAlign: "center",
    fontSize: 13,
    margin: 4,
    backgroundColor: "transparent"
  },
  labelFromPlaceNavigator: {
    fontFamily: "Inter-Bold",
    // fontWeight: '700',
    fontSize: 15
  },
  webIndicator: {
    position: "absolute",
    bottom: -10,
    left: -4,
    right: -4
  }
});
