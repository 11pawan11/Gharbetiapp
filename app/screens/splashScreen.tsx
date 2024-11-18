import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Image, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const fadeAnim = new Animated.Value(0); // Initial opacity is 0
  const [firstTime, setFirstTime] = useState<boolean | null>(null);
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const animatedText = "Welcome to Gharbeti app";
  const [text, setText] = useState("");

  useEffect(() => {
    // This effect will only run once when the component mounts
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("adminToken");
        setIsLogin(!!token);
      } catch (error: any) {
        console.error("Token not found", error.message);
      }
    };

    //check the user firsttime or not
    const checkFirstTime = async () => {
      try {
        const isFirstTime = await AsyncStorage.getItem("isFirstTime");
        if (isFirstTime === null) {
          await AsyncStorage.setItem("isFirstTime", "false");
          setFirstTime(true);
        } else {
          setFirstTime(false);
        }
      } catch (error: any) {
        console.error("Something went wrong", error.message);
      }
    };

    checkFirstTime();
    checkLoginStatus();

    //type writer effect
    let index = 0;
    let interval: any;

    // Check if there's already an interval to clear it
    if (interval) clearInterval(interval);

    interval = setInterval(() => {
      setText((prev) => prev + animatedText[index]); // Append one character at a time
      index++;
      if (index === animatedText.length) {
        clearInterval(interval); // Stop the interval when all characters are typed
      }
    }, 150); // Adjust the speed of typing effect

    // Fade-in animation for splash screen
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, // 2 seconds fade-in
      useNativeDriver: true,
    }).start();

    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      if (firstTime === null || isLogin === null) return; // Wait for state to be set

      const nextScreen = firstTime
        ? "Welcome"
        : isLogin
        ? "NavigationRoute"
        : "SelectRole";
      navigation.replace(nextScreen);
    }, 3000); // 3 seconds before transitioning

    // Cleanup timeout on unmount
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [firstTime, isLogin]); // Run when firstTime or isLogin changes

  if (firstTime === null || isLogin === null) {
    // Ensure you only render once the state has been set
    return null; // or a loading indicator
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/gharbeti.png")} // Your logo
      />
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF", // Customize splash background
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
});

export default SplashScreen;
