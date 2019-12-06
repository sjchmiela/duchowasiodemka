import React from "react";
import { View, StyleSheet, Platform } from "react-native";

export interface CardHeaderProps {
  bordered?: boolean;
  tintColor?: string;
}

export default function CardHeader(props: CardHeaderProps) {
  const { tintColor, bordered } = props;
  return (
    <View
      style={[
        styles.container,
        bordered && styles.bordered,
        tintColor && { shadowColor: tintColor, borderTopColor: tintColor }
      ]}
    >
      {Platform.OS !== "web" && <View
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
    shadowColor: "#283957",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -8 },
    backgroundColor: "#ffffff",
    paddingVertical: 8,
    alignItems: "center"
  },
  bordered: {
    borderTopColor: "#283957",
    borderTopWidth: StyleSheet.hairlineWidth
  },
  puller: {
    height: 4,
    width: 32,
    backgroundColor: "#283957",
    borderRadius: 4
  }
});
