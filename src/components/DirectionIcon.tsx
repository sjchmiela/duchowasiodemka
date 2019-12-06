import React from "react";
import Svg, { Path } from "react-native-svg";

export default function DirectionIcon(props) {
  return (
    <Svg width={24} height={24} {...props}>
      <Path fill={props.color} d="M4 15.189V0h4v9.629a19.213 19.213 0 00-4 5.56zM12.709 5.5l1.041 2.625C7.875 10.688 4 17.125 4 24h4c0-5.219 3.438-10.75 7.333-12l1.084 2.625L20 7.844 12.709 5.5z" />
    </Svg>
  );
}
