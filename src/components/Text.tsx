import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const BodyText = props => (
  <Text {...props} style={[props.style, styles.body]} />
);

export const BigFatTitle = props => (
  <Text {...props} style={[props.style, styles.bigFatTitle]} />
);

export const SmallFatText = props => (
  <Text {...props} style={[props.style, styles.smallFatText]} />
);
export const StrongText = props => (
  <Text {...props} style={[props.style, styles.body, styles.strongText]} />
);

const styles = StyleSheet.create({
  body: {
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 16 * 1.4,
  },
  smallFatText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    // fontWeight: '700',
  },
  strongText: {
    fontFamily: 'Inter-Bold',
  },
  bigFatTitle: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 24,
    // fontWeight: '700',
  },
})
