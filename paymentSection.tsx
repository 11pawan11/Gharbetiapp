import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";

const PaymentSection = () => {
  return (
    <View style={styles.gradient}>
 
        <Text style={styles.title}>Secure Payment</Text>
        <Image
          style={styles.paymentIcon}
          source={require("./assets/images/paymentQr.jpg")}
          resizeMode="contain"
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Center items
    marginVertical: 10, // Add vertical margin for spacing
  },
  gradient: {
    borderRadius: 15, // Rounded corners for the gradient background
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
    marginBottom: 10, // Space below the title
    color: "#333", // Dark color for the title
  },
});

export default PaymentSection;
