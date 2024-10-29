// CustomText.tsx
import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";

// Custom Text component
const CustomText = ({ style, ...props }: TextProps) => {
  return <Text {...props} style={[styles.text, style]} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-Regular", 
  },
});

export default CustomText;
