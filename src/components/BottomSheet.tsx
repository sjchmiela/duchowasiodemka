import React from "react";
import RABottomSheet from "reanimated-bottom-sheet";
import { Dimensions, StyleSheet, View } from "react-native";
import { NavigationInjectedProps } from "react-navigation";

import { shadowColor, spBlue } from "../constants/Colors";

export interface BottomSheetProps
  extends NavigationInjectedProps<{ expanded: number }> {}

export default class BottomSheet extends React.Component<BottomSheetProps> {
  public static renderHeader = () => <View style={styles.header} />;
  sheetRef: React.RefObject<RABottomSheet> = React.createRef();

  expand = () => this.sheetRef.current.snapTo(1);
  collapse = () => this.sheetRef.current.snapTo(0);

  renderContent = () => <View style={styles.panel}>{this.props.children}</View>;

  render() {
    const { children, navigation, ...rest } = this.props;
    return (
      <RABottomSheet
        {...rest}
        ref={this.sheetRef}
        renderContent={this.renderContent}
        renderHeader={BottomSheet.renderHeader}
        initialSnap={navigation.getParam("expanded", 0)}
        snapPoints={["30%", Dimensions.get("window").height - 100]}
      />
    );
  }
}

const styles = StyleSheet.create({
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
    height: Dimensions.get("window").height - 100
  }
});
