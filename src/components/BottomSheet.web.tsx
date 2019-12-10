import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  Dimensions
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationInjectedProps } from "react-navigation";

import {
  LandscapeScreenQuery,
  PortraitScreenQuery
} from "../hooks/useLandscapeScreen";
import MapFocusContext from "./MapFocusContext";
import { StrongText } from "./Text";
import { BottomSheetProps } from "./BottomSheet";

import { shadowColor, white, spBlue } from "../constants/Colors";

interface State {
  state: "expanded" | "collapsed";
}

function isExpandedBasedOnNavigation(
  navigation: NavigationInjectedProps<{ expanded: number }>["navigation"]
) {
  return Boolean(navigation.getParam("expanded", 0));
}

let collapsedHeight = 200;
if (Dimensions.get('window').height > 600) {
  collapsedHeight = 300;
}

export default class BottomSheetWeb extends React.Component<
  BottomSheetProps,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
      state: isExpandedBasedOnNavigation(props.navigation)
        ? "expanded"
        : "collapsed"
    };
  }

  componentDidUpdate() {
    const isExpandedBasedOnState = this.state.state === "expanded";
    if (
      isExpandedBasedOnNavigation(this.props.navigation) !=
      isExpandedBasedOnState
    ) {
      this.props.navigation.setParams({
        expanded: isExpandedBasedOnState ? 1 : undefined
      });
    }
  }

  expand = (evt) => {
    evt && evt.preventDefault();
    this.setState({ state: "expanded" });
  }
  collapse = evt => {
    evt && evt.preventDefault();
    this.setState({ state: "collapsed" });
  };

  renderExpandButton = () => (
    <LinearGradient
      start={[0, 0]}
      locations={[0, 0.75]}
      end={[0, 1]}
      colors={["#ffffff00", "#ffffffff"]}
      style={styles.gradient}
      pointerEvents="box-none"
    >
      <TouchableOpacity onPress={this.expand} style={styles.button}>
        <StrongText style={styles.buttonText}>⇡ Rozwiń</StrongText>
      </TouchableOpacity>
    </LinearGradient>
  );

  renderCollapseButton = () => (
    <TouchableOpacity onPress={this.collapse} style={styles.button}>
      <StrongText style={[styles.buttonText, styles.collapseButtonText]}>
        ⇣ Zwiń
      </StrongText>
    </TouchableOpacity>
  );

  render() {
    return (
      <>
        <LandscapeScreenQuery>
          <View style={styles.landscapeContainer}>{this.props.children}</View>
        </LandscapeScreenQuery>
        <PortraitScreenQuery>
          <View
            style={
              this.state.state === "expanded"
                ? [StyleSheet.absoluteFill, styles.backdrop]
                : [
                  { height: collapsedHeight }
                ]
            }
            pointerEvents="box-none"
          >
            <View
              style={[
                this.props.style,
                styles.container,
                this.state.state === "collapsed" && styles.containerCollapsed,
                this.state.state === "expanded" && styles.containerExpanded
              ]}
            >
              {this.state.state === "expanded" && this.renderCollapseButton()}
              {this.props.children}
              {this.state.state === "collapsed" && this.renderExpandButton()}
            </View>
          </View>
          <View style={[this.state.state === "expanded" && { height: collapsedHeight }]} />
        </PortraitScreenQuery>
      </>
    );
  }
}

const styles = StyleSheet.create({
  backdrop: {
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  landscapeContainer: {
    width: 400,
    backgroundColor: white,
    shadowColor: spBlue,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderLeftColor: spBlue,
    borderLeftWidth: 10
  },
  container: {
    shadowColor: shadowColor,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: -3 }
  },
  containerCollapsed: {
    flex: 1,
    height: collapsedHeight
  },
  containerExpanded: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  gradient: {
    zIndex: 1000,
    paddingTop: 60,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  button: {
    alignItems: "stretch"
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: Dimensions.get("window").height > 600 ? 16 : 10,
    textAlign: "center"
  },
  collapseButtonText: {
    color: white,
    textShadowRadius: 8,
    textShadowColor: "#000"
  }
});
