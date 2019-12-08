import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Platform
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
import { PrimaryButton } from "../components/Button";
import useLandscapeScreen from "../hooks/useLandscapeScreen";

export default function PromptScreen(props: NavigationStackScreenProps) {
  const isLandscape = useLandscapeScreen();
  return (
    <View style={{ flex: 1 }}>
      <CardHeader bordered={!isLandscape && Platform.OS === "web"} />
      <View style={{ paddingHorizontal: 10 }}>
        <BigFatTitle style={{}}>Duchowa Siódemka</BigFatTitle>
        <PrimaryButton title="Pusty przycisk" style={{ marginBottom: 10 }} />
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
