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
    width: imageWidth,
    height: imageHeight,
    containerHeight,
    ...rest
  } = props;

  const containerWidth = Dimensions.get("window").width;
  // const containerHeight = 210;

  const imageHeightFromWidth = imageHeight * containerWidth / imageWidth;
  const imageWidthFromWidth = imageHeightFromWidth * imageWidth / imageHeight;

  let width = imageWidthFromWidth;
  let height = imageHeightFromWidth;
  if (width < containerWidth || height < containerHeight) {
    const imageWidthFromHeight = imageWidth * containerHeight / imageHeight;
    const imageHeightFromHeight = imageWidthFromHeight * imageHeight / imageWidth;
    width = imageWidthFromHeight;
    height = imageHeightFromHeight;
  }

  return (
    <View
      accessibilityIgnoresInvertColors={true}
      style={[style, { overflow: "hidden"}]}
    >
      <Image
        {...rest}
        style={[
          {
            position: "absolute",
            left: 0,
            top: 0,
            width,
            height,
          },
          imageStyle
        ]}
      />
      {children}
    </View>
  );
}
