import { StyleSheet, Text, TextStyle } from 'react-native';
import React from 'react';

type CustomTextProps = {
  caption: string;
  style?: TextStyle;
  props: React.ComponentProps<typeof Text>;
};

const BoldText = ({ caption, style, ...props }: CustomTextProps) => (
  <Text style={[styles.boldText, style]} {...props}>
    {caption}
  </Text>
);

const NormalText = ({ caption, style, ...props }: CustomTextProps) => (
  <Text style={[styles.normalText, style]} {...props}>
    {caption}
  </Text>
);

const SmallText = ({ caption, style, ...props }: CustomTextProps) => (
  <Text style={[styles.smallText, style]} {...props}>
    {caption}
  </Text>
);

export { BoldText, NormalText, SmallText };

const styles = StyleSheet.create({
  boldText: {
    fontSize: 24,
    // fontFamily: FONT_BOLD,
    color: '#000',
  },
  normalText: {
    fontSize: 16,
    // fontFamily: FONT_REGULAR,
    color: '#000',
  },
  smallText: {
    fontSize: 12,
    // fontFamily: FONT_REGULAR,
    color: '#000',
  },
});
