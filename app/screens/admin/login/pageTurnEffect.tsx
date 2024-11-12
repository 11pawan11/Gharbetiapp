import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  Easing,
  interpolate,
  Extrapolate,
  withSpring,
  useSharedValue,
  withTiming,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  GestureHandlerRootView,
  GestureHandlerGestureEvent,
  GestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";

// Get screen width and height
const { width, height } = Dimensions.get("window");

const PageTurnEffect = () => {
  const translateX = useSharedValue(0); // Shared value for translation on X axis
  const rotate = useSharedValue(0); // Shared value for rotation effect
  const scale = useSharedValue(1); // Shared value for scaling
  const opacity = useSharedValue(1); // Shared value for opacity

  // Gesture handler to detect swipe
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event: any, context: { startX: number; }) => {
      context.startX = translateX.value; // Save the initial position
    },
    onActive: (event: { translationX: any; }, context: { startX: any; }) => {
      translateX.value = context.startX + event.translationX; // Update translation on active gesture
      rotate.value = interpolate(
        translateX.value,
        [-width, 0, width],
        [-10, 0, 10],
        Extrapolate.CLAMP
      ); // Apply rotation effect
      scale.value = interpolate(
        translateX.value,
        [-width, 0, width],
        [1, 1, 0.8],
        Extrapolate.CLAMP
      ); // Apply scaling effect
      opacity.value = interpolate(
        translateX.value,
        [-width / 2, 0, width / 2],
        [0.5, 1, 0.5],
        Extrapolate.CLAMP
      ); // Apply opacity effect
    },
    onEnd: (event: { translationX: number; }) => {
      if (event.translationX > width / 2) {
        // Swiped right: Navigate to next page
        translateX.value = withSpring(width, { damping: 2 });
      } else if (event.translationX < -width / 2) {
        // Swiped left: Go back
        translateX.value = withSpring(-width, { damping: 2 });
      } else {
        // If swipe is not enough, return to the original position
        translateX.value = withSpring(0, { damping: 2 });
      }
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            styles.page,
            {
              transform: [
                { translateX: translateX.value },
                { rotate: `${rotate.value}deg` },
                { scale: scale.value },
              ],
              opacity: opacity.value,
            },
          ]}
        >
          <Text style={styles.text}>Swipe to turn page</Text>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  page: {
    width,
    height,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default PageTurnEffect;
