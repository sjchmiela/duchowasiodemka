import React from "react";
import { Svg, Path, Rect } from "react-native-svg";
import {
  TouchableOpacityProps,
  TouchableOpacity,
  Text,
  StyleSheet,
  View
} from "react-native";
import { SmallFatText } from "./Text";
import { spBlue, white } from "../constants/Colors";

export default function LocationButton(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...props}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 12
        }}
      >
        <View
          style={[
            {
              width: 36,
              height: 36,
              position: "absolute",
              borderRadius: 8,
              backgroundColor: spBlue,
              transform: [{ rotateZ: "45deg" }]
            }
          ]}
        />
        <Svg
          width="24"
          height="24"
          style={{ transform: [{ translateX: -1 }, { translateY: 1 }] }}
        >
          <Rect width="24" height="24" fill="none" rx="0" ry="0" />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.5792 2.09869C21.4184 1.72093 22.2792 2.58154 21.9017 3.42081L13.8186 21.3893C13.4353 22.2413 12.1969 22.1492 11.9439 21.2498L10.0837 14.6358C9.98953 14.301 9.7282 14.0392 9.39359 13.9444L2.74755 12.0618C1.84971 11.8074 1.7587 10.5708 2.60962 10.1878L20.5792 2.09869Z"
            fill={white}
          />
        </Svg>
      </View>
      <SmallFatText
        style={[
          { marginTop: 12, color: spBlue }
        ]}
      >
        Prowadź
      </SmallFatText>
    </TouchableOpacity>
  );
}
