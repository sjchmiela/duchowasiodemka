import React from "react";
import RABottomSheet from "reanimated-bottom-sheet";
import { Dimensions, StyleSheet, View, SafeAreaView } from "react-native";
import { NavigationInjectedProps } from "react-navigation";

import { shadowColor, spBlue, white } from "../constants/Colors";
import {
  LandscapeScreenQuery,
  PortraitScreenQuery
} from "../hooks/useLandscapeScreen";

export interface BottomSheetProps
  extends NavigationInjectedProps<{ expanded: number }> {}

let collapsedHeight = 160;
let expandedHeight = Dimensions.get("window").height - 64;
if (Dimensions.get('window').height > 600) {
  collapsedHeight = 250;
  expandedHeight = Dimensions.get("window").height - 64;
}

export default class BottomSheet extends React.Component<BottomSheetProps> {
  public static renderHeader = () => <View style={styles.header} />;
  sheetRef: React.RefObject<RABottomSheet> = React.createRef();

  expand = () => this.sheetRef.current && this.sheetRef.current.snapTo(1);
  collapse = () => this.sheetRef.current && this.sheetRef.current.snapTo(0);

  renderContent = () => <View style={styles.panel}>{this.props.children}</View>;

  render() {
    const { children, navigation, ...rest } = this.props;
    return (
      <>
        <LandscapeScreenQuery>
          <View style={styles.landscapeContainer}>
            <SafeAreaView style={{ flex: 1 }}>{this.props.children}</SafeAreaView>
          </View>
        </LandscapeScreenQuery>
        <PortraitScreenQuery>
          <RABottomSheet
            {...rest}
            ref={this.sheetRef}
            renderContent={this.renderContent}
            renderHeader={BottomSheet.renderHeader}
            initialSnap={navigation.getParam("expanded", 0)}
            snapPoints={[collapsedHeight, expandedHeight]}
          />
        </PortraitScreenQuery>
      </>
    );
  }
}

const styles = StyleSheet.create({
  landscapeContainer: {
    width: 400,
    backgroundColor: white,
    shadowColor: spBlue,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderLeftColor: spBlue,
    borderLeftWidth: 10
    // position: "absolute",
    // left: 0,
    // top: 0,
    // bottom: 0
  },
  header: {
    shadowColor: shadowColor,
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: -3 },
    backgroundColor: spBlue,
    borderTopColor: spBlue,
    height: StyleSheet.hairlineWidth
  },
  panel: {
    height: expandedHeight
  }
});
