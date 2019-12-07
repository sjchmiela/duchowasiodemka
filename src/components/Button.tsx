import React from "react";
import {
  Linking,
  TouchableHighlight,
  View,
  TouchableHighlightProps,
  StyleSheet
} from "react-native";

import { spOrange, white, spBlue } from "../constants/Colors";
import { StrongText } from "../components/Text";

export interface ButtonProps extends TouchableHighlightProps {
  renderIcon?: () => React.ReactNode;
  backgroundColor: string;
  contentColor: string;
  title?: string;
}

export interface ManagedButtonProps extends ButtonProps {
  renderIcon?: () => React.ReactNode;
  backgroundColor?: string;
  contentColor?: string;
  title?: string;
}

export function PrimaryButton(props: ManagedButtonProps) {
  return (
    <Button
      backgroundColor={spOrange}
      contentColor={white}
      underlayColor={spBlue}
      {...props}
    />
  );
}

export function SecondaryButton(props: ManagedButtonProps) {
  return <Button backgroundColor={spBlue} contentColor={white} {...props} />;
}

export function Button(props: ButtonProps) {
  const { contentColor, backgroundColor, title, renderIcon, ...rest } = props;
  return (
    <TouchableHighlight
      {...rest}
      style={[styles.button, { backgroundColor }, rest.style]}
    >
      <View style={styles.content}>
        {renderIcon && renderIcon({ color: contentColor })}
        <StrongText style={{ marginLeft: renderIcon && 8, color: contentColor }}>{title}</StrongText>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
