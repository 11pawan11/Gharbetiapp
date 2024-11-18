import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";

const Loader = () => {
  const scaleValue = useRef(new Animated.Value(1)).current; // Initialize scale animation

  useEffect(() => {
    const pulseEffect = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.2, // Scale up to 120%
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1, // Scale back to 100%
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    pulseEffect();
  }, [scaleValue]);

  return (
    <View style={loaderLoading.overlay}>
      <View style={loaderLoading.container}>
        <Animated.Image
          style={[
            loaderLoading.imageLoader,
            { transform: [{ scale: scaleValue }] },
          ]} // Apply scale effect
          source={require("../../assets/images/gharbeti.png")}
        />
      </View>
    </View>
  );
};

const loaderLoading = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageLoader: {
    width: 100, // Adjust size as needed
    height: 100,
  },
});

export default Loader;
