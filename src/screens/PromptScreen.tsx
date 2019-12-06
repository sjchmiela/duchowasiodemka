import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import CardHeader from "../components/CardHeader";
import { BodyText, BigFatTitle, StrongText } from "../components/Text";
import {
  lightSpBlue,
  touchableBackgroundColor,
  touchableContentColor,
  spBlue
} from "../constants/Colors";
import DirectionIcon from "../components/DirectionIcon";

export default function PromptScreen(props: NavigationStackScreenProps) {
  return (
    <View style={{ flex: 1 }}>
      <CardHeader bordered={false} />
      <View style={{ paddingHorizontal: 10 }}>
        <BigFatTitle style={{}}>Duchowa Siódemka</BigFatTitle>
        <TouchableHighlight
          style={{
            backgroundColor: touchableBackgroundColor,
            borderRadius: 6,
            marginTop: 10,
            paddingHorizontal: 12,
            paddingVertical: 12,
            marginBottom: 10
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <DirectionIcon
              color={touchableContentColor}
              style={{ marginRight: 10 }}
            />
            <StrongText style={{ color: touchableContentColor }}>
              Prowadź do pierwszego punktu
            </StrongText>
          </View>
        </TouchableHighlight>
      </View>
      <ScrollView
        style={{
          flex: 1,
          borderTopColor: "#a0a0a0",
          borderTopWidth: StyleSheet.hairlineWidth
        }}
      >
        <BodyText style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
          Tradycja odwiedzania Siedmiu Kościołów znana była już w średniowieczu
          w Rzymie. W XVI w. forma takiego pielgrzymowania odrodziła się w
          Wiecznym Mieście za sprawą św. Filipa Nereusza. Praktykowali ją
          kolejni święci, jak choćby założyciel pijarów, św. Józef Kalasancjusz.
          Pragniemy ją zaproponować mieszkańcom, pielgrzymom i turystom Krakowa.
          Idea nawiedzanie Siedmiu Kościołów w obrębie Starego Miasta, wokół
          krakowskich Plan zawiera elementy turystycznego wędrowania,
          estetycznego zwiedzania i duchowego pielgrzymowania. Łączy więc w
          sobie wymiar fizyczny, kulturalny i religijny. Motywem przewodnim jest
          odwołanie do tradycji duchowej danego kościoła zawartej nie tylko w
          architekturze, ale również w historii i charyzmatach poszczególnych
          zakonów. A że w symbolice biblijnej liczba 7 opisuje pełnię i
          doskonałość wędrujący szlakiem Duchowej Siódemki zdobędzie wiedzę o
          bogactwie kulturalnym i duchowym tych miejsc, z którego będzie mógł
          zaczerpnąć coś dla osobistej pobożności.
        </BodyText>
      </ScrollView>
    </View>
  );
}
