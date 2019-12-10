import React from "react";
import { View, Image, ImageProps, StyleSheet, Dimensions } from "react-native";

export interface ImageBackgroundProps extends ImageProps {
  width: number;
  height: number;
}

export default function ImageBackground(props: ImageProps) {
  const {
    children,
    style,
    imageStyle,
    imageRef,
    width,
    height,
    ...rest
  } = props;

  return (
    <View
      accessibilityIgnoresInvertColors={true}
      style={[
        style,
        {
          backgroundImage: `url(${rest.source})`,
          backgroundSize: "cover",
          overflow: "hidden"
        }
      ]}
    >
      {children}
    </View>
  );
}
