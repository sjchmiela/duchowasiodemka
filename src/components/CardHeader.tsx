import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { spBlue, white } from "../constants/Colors";

export interface CardHeaderProps {
  bordered?: boolean;
  tintColor?: string;
}

export default function CardHeader(props: CardHeaderProps) {
  const { tintColor, bordered } = props;
  return (
    <View
      {...props}
      pointerEvents="none"
      style={[
        styles.container,
        bordered && styles.bordered,
        tintColor && { shadowColor: tintColor, borderTopColor: tintColor },
        props.style
      ]}
    >
      {Platform.OS === "ios" && <View
        style={[styles.puller, tintColor && { backgroundColor: tintColor }]}
      />}
    </View>
  );
}

CardHeader.defaultProps = {
  bordered: true
};

const styles = StyleSheet.create({
  container: {
    shadowColor: spBlue,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -8 },
    backgroundColor: white,
    alignItems: "center",
    paddingTop: 8,
  },
  bordered: {
    borderTopColor: spBlue,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  puller: {
    height: 4,
    marginBottom: 8,
    width: 32,
    backgroundColor: spBlue,
    borderRadius: 4
  }
});
