import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Svg,
  Circle,
  Path,
  SvgProps,
  RadialGradient,
  Stop,
  Defs,
  Ellipse
} from "react-native-svg";
import { shadowColor, veryDarkSpBlue, white, pinTintColor, pinBackgroundColor } from "../constants/Colors";

export interface PlacePinProps extends SvgProps {
  backgroundColor?: string;
  graphicColor?: string;
  pinColor?: string;
}

export default function PlacePin(props: PlacePinProps) {
  const { backgroundColor, graphicColor, pinColor, size } = props;
  const svgProps = { width: size, height: size };
  const shadowSize = (6 / 20) * size + 31;
  const skewX = size === 44 ? -30 : -60;
  return (
    <View>
      <Svg
        viewBox="0 0 24 24"
        style={[
          { position: "absolute", width: shadowSize, height: shadowSize, bottom: 0, left: size === 44 ? 0 : 8 },
          { transform: [{ skewX: `${skewX}deg` }] },
          { transform: [{ translateX: 4 }, { translateY: 9 }]},
          { zIndex: 0 }
        ]}
      >
        <Defs>
          <RadialGradient
            id="grad"
            cx="12"
            cy="10"
            rx="10"
            ry="10"
            fx="12"
            fy="10"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor={shadowColor} stopOpacity="1" />
            <Stop offset="1" stopColor={shadowColor} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Path
          d="M12 0C6.478 0 2 4.395 2 9.815 2 15.32 6.375 19.083 12 24c5.625-4.917 10-8.68 10-14.185C22 4.395 17.522 0 12 0z"
          fillRule="nonzero"
          fill="url(#grad)"
        />
      </Svg>
      <Svg
        viewBox="0 0 24 24"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit={2}
        {...svgProps}
        style={{ opacity: 1, zIndex: 1 }}
      >
        <Circle
          cx={12}
          cy={9.843}
          r={8.764}
          fill={pinBackgroundColor /* props.backgroundColor */}
        />
        <Path
          d="M12 0C6.478 0 2 4.395 2 9.815 2 15.32 6.375 19.083 12 24c5.625-4.917 10-8.68 10-14.185C22 4.395 17.522 0 12 0zm0 18a8 8 0 01-8-8 8 8 0 018-8 8 8 0 018 8 8 8 0 01-8 8z"
          fillRule="nonzero"
          fill={pinTintColor /* props.pinColor */}
        />
        <Path
          d="M16.13 14.821H7.87v-1.902l1.836-1.622v-1.79L12 7.479l2.294 2.028v1.792l1.836 1.622v1.9zm-3.212-.459v-1.377a.918.918 0 00-1.836 0v1.377h1.836zm1.835-4.519l2.753 2.457-.609.685-2.144-1.92V9.843zm-5.506 0L6.494 12.3l.609.685 2.144-1.92V9.843zm3.212.848v-.918a.46.46 0 00-.918 0v.918h.918zm-1.836-5.965h.918v-.918h.918v.918h.918v.918h-.918v.344l3.212 2.868-.61.685L12 6.799 8.939 9.541l-.61-.685 3.212-2.854v-.358h-.918v-.918z"
          fill={pinTintColor /* props.graphicColor */}
        />
      </Svg>
    </View>
  );
}

PlacePin.defaultProps = {
  backgroundColor: "#fff",
  pinColor: "#f00",
  graphicColor: "#000"
};
