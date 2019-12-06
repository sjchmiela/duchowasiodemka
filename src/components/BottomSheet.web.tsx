import React from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";

// Copied and modified based on
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/2ceda6e7ea15eeaa8239832ecdbbb42ff87fbcf8/types/react-navigation/index.d.ts#L1296
// Allows us to use unexported props type of a component using `infer` keyword
type InferProps<T extends React.Component<any>> = T extends React.Component<
  infer P
>
  ? P
  : never;

export default class BottomSheetWeb extends React.Component<
  InferProps<BottomSheet>
> {
  state = {
    heightIndex: 0
  };

  snapTo = heightIndex => this.setState({ heightIndex });
  render() {
    return (
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, this.props.style, { zIndex: 999 }]}
      >
        <View
          pointerEvents={this.state.heightIndex === 1 ? "box-only" : "none"}
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "#000",
              opacity: this.state.heightIndex === 0 ? 0 : 0.3
            }
          ]}
        />
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: this.props.snapPoints[this.state.heightIndex]
          }}
        >
          {this.props.renderHeader()}
          {this.props.renderContent()}
        </View>
      </View>
    );
  }
}
