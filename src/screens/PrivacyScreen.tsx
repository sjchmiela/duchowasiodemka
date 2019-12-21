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
  Linking
} from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";

import DownloadButtons from "../components/DownloadButtons";
import CardHeader from "../components/CardHeader";
import {
  BodyText,
  BigFatTitle,
  StrongText,
  SmallFatText
} from "../components/Text";
import {
  lightSpBlue,
  touchableBackgroundColor,
  touchableContentColor,
  spBlue
} from "../constants/Colors";
import DirectionIcon from "../components/DirectionIcon";
import { PrimaryButton } from "../components/Button";
import useLandscapeScreen from "../hooks/useLandscapeScreen";
import CloseButton from "../components/CloseButton";
import { withNavigation } from "react-navigation";

export default function PrivacyScreen(props: NavigationStackScreenProps) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          flex: 1,
          borderTopColor: "#a0a0a0",
          borderTopWidth: StyleSheet.hairlineWidth
        }}
      >
        <View style={{ maxWidth: 640, alignSelf: "center" }}>
          <BigFatTitle style={{ marginVertical: 10 }}>
            Polityka prywatności aplikacji „Duchowa Siódemka”
          </BigFatTitle>
          <BodyText style={{ marginVertical: 10 }}>
            Polska Prowincja Zakonu Pijarów, wydawca aplikacji mobilnej Duchowa
            Siódemka, darzy swoich użytkowników szacunkiem i przykłada wielką
            wagę do respektowania praw im przysługujących, ze szczególnym
            uwzględnieniem prawa do ochrony prywatności.
          </BodyText>
          <BodyText style={{ marginVertical: 10 }}>
            Korzystając w jakikolwiek sposób z aplikacji mobilnej Użytkownik
            akceptuje zasady zawarte w niniejszej Polityce Prywatności.
          </BodyText>
          <StrongText style={{ marginVertical: 10 }}>
            Dane zbierane automatycznie
          </StrongText>
          <BodyText style={{ marginVertical: 10 }}>
            Podczas korzystania z aplikacji mobilnej automatycznie zbierane są
            dane na temat błędów w działaniu aplikacji. Dane te nie są danymi
            osobowymi i nie pozwalają na jednoznaczne zidentyfikowanie osoby
            Użytkownika. Wszelkie dane, które mogłyby w jakikolwiek sposób
            pozwolić na identyfikacje (ustalenie tożsamości) Użytkownika, nie są
            gromadzone przez aplikację ani udostępniane jakimkolwiek osobom
            trzecim.
          </BodyText>
          <StrongText style={{ marginVertical: 10 }}>
            Wykorzystanie danych
          </StrongText>
          <BodyText style={{ marginVertical: 10 }}>
            Dane zbierane automatycznie mogą być użyte do analizy ewentualnych
            błędów Aplikacji celem naprawienia ich w kolejnej aktualizacji.
          </BodyText>
          <StrongText style={{ marginVertical: 10 }}>
            Sposoby zbierania danych
          </StrongText>
          <BodyText style={{ marginVertical: 10 }}>
            Polska Prowincja Zakonu Pijarów zbiera automatycznie dane przy
            użyciu sklepów aplikacji mobilnych: Play Store i Apple App Store.
          </BodyText>
          <StrongText style={{ marginVertical: 10 }}>
            Udostępnianie danych osobowych
          </StrongText>
          <BodyText style={{ marginVertical: 10 }}>
            Dane, jakie Administrator może ujawnić współpracującym z nim
            podmiotom, mają charakter zanonimizowanych informacji o błędach
            niepozwalających na identyfikację indywidualnych Użytkowników.
          </BodyText>
          <StrongText style={{ marginVertical: 10 }}>
            Dodatkowe informacje
          </StrongText>
          <BodyText style={{ marginVertical: 10 }}>
            Adres kontaktowy poczty elektronicznej: kontakt@duchowasiodemka.pl
          </BodyText>
          <BodyText style={{ marginVertical: 10 }}>
            W aplikacji podkłady mapowe korzystają z zewnętrznych usług: Apple
            Maps (iOS), Google Maps (Android), Mapbox (web).
          </BodyText>
          <BodyText style={{ marginVertical: 10 }}>
            Niniejsza Polityka Prywatności ma jedynie charakter uzupełniający w
            stosunku do polityki prywatności Apple Store i Google Play. Polska
            Prowincja Zakonu Pijarów nie ponosi jakiejkolwiek odpowiedzialności
            za politykę prywatności Apple Store i Google Play oraz
            przestrzeganie przepisów Ustawy o ochronie danych osobowych oraz
            Ustawy o świadczeniu usług drogą elektroniczną w ramach Apple Store
            i Google Play.
          </BodyText>
        </View>
      </ScrollView>
    </View>
  );
}
PrivacyScreen.navigationOptions = {
  title: "Polityka prywatności",
  headerLeft: withNavigation(props => {
    console.log(props);
    return (
      <CloseButton
        style={{ marginHorizontal: 10 }}
        onPress={() => props.navigation.navigate("Map")}
      />
    );
  })
};
