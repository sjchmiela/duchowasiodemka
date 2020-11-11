import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Platform,
  Linking,
} from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import SafeAreaView from "react-native-safe-area-view";

import DownloadButtons from "../components/DownloadButtons";
import CardHeader from "../components/CardHeader";
import FELogo from "../components/FELogo";
import UELogo from "../components/UELogo";
import {
  BodyText,
  BigFatTitle,
  StrongText,
  SmallFatItalicText,
  SmallFatText,
} from "../components/Text";
import {
  lightSpBlue,
  touchableBackgroundColor,
  touchableContentColor,
  spBlue,
  graySpBlue,
} from "../constants/Colors";
import DirectionIcon from "../components/DirectionIcon";
import { PrimaryButton } from "../components/Button";
import useLandscapeScreen from "../hooks/useLandscapeScreen";
import Svg from "react-native-svg";

export default function PromptScreen(props: NavigationStackScreenProps) {
  const isLandscape = useLandscapeScreen();
  return (
    <View style={{ flex: 1 }}>
      {!isLandscape && <CardHeader bordered={!isLandscape} />}
      <View
        style={{
          paddingHorizontal: 10,
          paddingTop: isLandscape ? 10 : 0,
          paddingBottom: 10,
        }}
      >
        <BigFatTitle>Duchowa Siódemka</BigFatTitle>
        <DownloadButtons />
      </View>
      <ScrollView
        style={{
          flex: 1,
          borderTopColor: "#a0a0a0",
          borderTopWidth: StyleSheet.hairlineWidth,
        }}
        // contentContainerStyle={{
        //   alignItems: "stretch",
        // }}
      >
        <SafeAreaView>
          <BodyText style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
            Tradycja odwiedzania Siedmiu Kościołów znana była już
            w średniowieczu w Rzymie. W XVI w. forma takiego pielgrzymowania
            odrodziła się w Wiecznym Mieście za sprawą św. Filipa Nereusza.
            Praktykowali ją kolejni święci, jak choćby założyciel pijarów,
            św. Józef Kalasancjusz. Pragniemy ją zaproponować mieszkańcom,
            pielgrzymom i turystom Krakowa. Idea nawiedzania siedmiu kościołów
            w obrębie Starego Miasta, wokół krakowskich Plant, zawiera elementy
            turystycznego wędrowania, estetycznego zwiedzania i duchowego
            pielgrzymowania. Łączy więc w sobie wymiar fizyczny, kulturalny
            i religijny. Motywem przewodnim jest odwołanie do tradycji duchowej
            danego kościoła, zawartej nie tylko w architekturze, ale również
            w historii i charyzmatach poszczególnych zakonów. W symbolice
            biblijnej liczba 7 opisuje pełnię i doskonałość, więc wędrujący
            szlakiem Duchowej Siódemki zdobędzie wiedzę o bogactwie kulturalnym
            i duchowym tych miejsc oraz będzie mógł zaczerpnąć coś dla własnej
            pobożności.
          </BodyText>
          <View
            style={{
              paddingVertical: 8,
              paddingRight: 10,
              height: 77 + 16,
              flexDirection: "row",
              // alignContent: "space-between",
              // alignSelf: "stretch",
              // alignItems: "center",
              // width: 300,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1 }}>
              <FELogo style={{ flex: 1 }} />
            </View>
            <View style={{ flex: 1 }}>
              <UELogo style={{ flex: 1 }} />
            </View>
          </View>
          <SmallFatText
            style={{
              paddingHorizontal: 10,
              paddingVertical: 8,
              color: graySpBlue,
            }}
          >
            Aplikacja zrealizowana w ramach projektu{" "}
            <SmallFatItalicText>
              „Perła polskiego baroku – rewaloryzacja nowoodkrytych, zabytkowych
              polichromii w krypcie kościoła Pijarów w Krakowie oraz odtworzenie
              historycznych galerii w Kolegium Pijarskim w celu udostępnienia
              zabytkowych wnętrz i poszerzenia działalności kulturalnej”
            </SmallFatItalicText>{" "}
            zrealizowanego przy udziale środków Europejskiego Funduszu Rozwoju
            Regionalnego w ramach Programu Operacyjnego Infrastruktura
            i Środowisko 2014–2020.
          </SmallFatText>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
