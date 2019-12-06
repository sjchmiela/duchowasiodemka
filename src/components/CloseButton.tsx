import React from "react";
import { Svg, Path, Rect } from "react-native-svg";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { spBlue, white } from "../constants/Colors";

export default function CloseButton(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...props}>
      <Svg width="24" height="24">
        <Rect width="24" height="24" fill="none" rx="0" ry="0" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 22C17.5228 22 22 17.5228 22 12C22 9.20009 20.8493 6.66895 18.995 4.85368C17.1917 3.08831 14.7229 2 12 2C9.61646 2 7.42769 2.83391 5.70953 4.2259C3.44658 6.05925 2 8.86069 2 12C2 17.5228 6.47715 22 12 22Z"
          fill={spBlue}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.5962 8.81802L15.182 7.40381L12 10.5858L8.81802 7.40381L7.40381 8.81802L10.5858 12L7.40381 15.182L8.81802 16.5962L12 13.4142L15.182 16.5962L16.5962 15.182L13.4142 12L16.5962 8.81802Z"
          fill={white}
        />
      </Svg>
    </TouchableOpacity>
  );
}
