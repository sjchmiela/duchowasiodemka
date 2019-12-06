import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { shadowColor, white } from "../constants/Colors";
import MapFocusContext from "./MapFocusContext";
import { StrongText } from "./Text";
import { withNavigation } from "react-navigation";

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
  constructor(props) {
    super(props);
    this.state = {
      heightIndex: props.navigation.getParam("expanded", 0)
    };
  }

  componentDidUpdate() {
    if (
      (this.props.navigation.getParam("expanded", 0) || 0) !== this.state.heightIndex
    ) {
      this.props.navigation.setParams({
        expanded:
          this.state.heightIndex > 0 ? this.state.heightIndex : undefined
      });
    }
  }

  snapTo = heightIndex => this.setState({ heightIndex });
  renderExpandButton = () =>
    this.state.heightIndex === 0 && (
      <LinearGradient
        start={[0, 0]}
        locations={[0, 0.75]}
        end={[0, 1]}
        colors={["#ffffff00", "#ffffffff"]}
        style={{
          justifyContent: "center",
          alignItems: "stretch",
          paddingTop: 50,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,

          zIndex: 99999
        }}
        pointerEvents="box-none"
      >
        <TouchableOpacity
          onPress={() => this.setState({ heightIndex: 1 })}
          style={{
            alignItems: "stretch",
            flex: 1
          }}
        >
          <View
            style={{
              flex: 1,
              // backgroundColor: "red",
              paddingHorizontal: 10,
              paddingVertical: 10,
              alignItems: "center"
            }}
          >
            <StrongText>⇡ Rozwiń</StrongText>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );

  renderCollapseButton = () =>
    this.state.heightIndex === 1 && (
      <TouchableOpacity
        onPress={() => this.setState({ heightIndex: 0 })}
        style={{
          position: "absolute",
          top: -42,
          left: 0,
          right: 0,
          alignItems: "stretch",
          flex: 1,
          zIndex: 9999
          // backgroundColor: "red"
        }}
      >
        <View
          style={{
            flex: 1,
            // backgroundColor: "red",
            paddingHorizontal: 10,
            paddingVertical: 10,
            alignItems: "center"
          }}
          pointerEvents="box-only"
        >
          <StrongText style={{ color: white }}>⇣ Zwiń</StrongText>
        </View>
      </TouchableOpacity>
    );
  render() {
    return (
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, this.props.style, { zIndex: 999 }]}
      >
        <View
          pointerEvents={this.state.heightIndex === 0 ? "none" : "box-only"}
          style={[
            StyleSheet.absoluteFill,
            {
              zIndex: 1000,
              backgroundColor: shadowColor,
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
            zIndex: 1001,
            height: this.props.snapPoints[this.state.heightIndex]
          }}
        >
          {this.renderCollapseButton()}
          {this.props.renderHeader()}
          {this.props.renderContent()}
          {this.renderExpandButton()}
        </View>
      </View>
    );
  }
}
