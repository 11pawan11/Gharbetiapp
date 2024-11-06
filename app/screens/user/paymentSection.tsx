import React from "react";
import { Image, StyleSheet, View, Text, StatusBar } from "react-native";
import color from "../../constants/color";
import { useThemeMode } from "../../context/themeContext";

const PaymentSection = () => {
  const { themeStyle } = useThemeMode();
  const backgroundTheme = themeStyle(color.black, color.white);
  const textColor = themeStyle(color.white, color.gray);
  return (
    <View style={[styles.gradient, { backgroundColor: backgroundTheme }]}>
      <StatusBar barStyle={"light-content"} backgroundColor={color.green} />
      <Text style={[styles.title, { color: textColor }]}>Secure Payment</Text>
      <Image
        style={styles.paymentIcon}
        source={require("../../../assets/images/paymentQr.jpg")}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Center items
    marginVertical: 10,
    marginHorizontal: 10,
  },
  gradient: {
    flex: 1,
    padding: 20, // Padding inside the gradient
    alignItems: "center", // Center the content
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  paymentIcon: {
    width: 400, // Set a specific width for the icon
    height: 500, // Set a specific height for the icon
    marginTop: 10, // Space above the icon
  },
  title: {
    fontSize: 24, // Increase font size
    fontWeight: "bold", // Bold text
    color: "#333", // Dark color for the title
  },
});

export default PaymentSection;
