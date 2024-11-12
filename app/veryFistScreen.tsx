import { useNavigation } from "expo-router";
import CustomView from "./hook/customView";
import CustomText from "./hook/customText";
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import AdminLoginScreen from "./screens/admin/login/adminloginPage";
import NavigationRoute from "./config/navigation";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import color from "./constants/color";
import { useThemeMode } from "./context/themeContext";
import Register from "./screens/admin/login/register";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import UserLogin from "./login/userLogin";

export type RootStackParamList = {
  Welcome: undefined;
  SelectRole: undefined;
  AdminLogin: undefined;
  UserLogin: undefined;
  NavigationRoute: undefined;
};

const FirstWelcomeScreen = () => {
  const { themeStyle } = useThemeMode();
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Welcome">>();
  const textColor = themeStyle(color.white, color.black);

  const handleGestureEventRight = (event: any) => {
    if (event.nativeEvent.translationX > 100) {
      navigation.navigate("SelectRole");
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor={color.headerColor} barStyle="light-content" />

      <PanGestureHandler onGestureEvent={handleGestureEventRight}>
        <View style={styles.wrapper}>
          <ImageBackground
            style={styles.imageStyle}
            source={require("../assets/images/gharbeti.png")}
            resizeMode="contain"
          >
            <View style={styles.overlay} />
            <View style={styles.container}>
              <Image
                style={styles.imageStyleWelcome}
                source={require("../assets/images/gharbeti2.png")}
                resizeMode="contain"
              />
              <CustomText style={[styles.heading, { color: textColor }]}>
                Welcome to Our App!
              </CustomText>
              <CustomText style={[styles.subheading, { color: textColor }]}>
                Swipe right to continue
                <MaterialCommunityIcons
                  name="gesture-swipe-right"
                  size={30}
                  color={textColor}
                />
              </CustomText>

              <TouchableOpacity
                style={styles.buttonNext}
                onPress={() => navigation.navigate("SelectRole")}
              >
                <CustomText style={styles.buttonText}>Get Started</CustomText>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const LoginRole = ({ navigation }: { navigation: any }) => {
  const { themeStyle } = useThemeMode();
  const textColor = themeStyle(color.white, color.black);
  const textLoginColor = themeStyle(color.white, color.white);
  const backgroundTheme = themeStyle(color.black, color.headerColor);

  return (
    <CustomView style={{ flex: 1, backgroundColor: backgroundTheme }}>
      <StatusBar
        backgroundColor={color.headerColor}
        barStyle="light-content"
        animated
      />
      <Ionicons
        name="arrow-back"
        size={24}
        color={"white"}
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          zIndex: 20,
          top: 40,
          padding: 5,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      />

      {/* Header with Gradient */}
      <View style={styles.header}>
        <Image
          style={styles.imageStyleRole}
          source={require("../assets/images/gharbeti2.png")}
          resizeMode="contain"
        />
      </View>

      <View style={styles.centered}>
        <CustomText style={[styles.title, { color: textColor }]}>
          Select Your Role
        </CustomText>

        {/* Admin Login Button */}
        <TouchableOpacity
          style={[styles.button, styles.adminButton]}
          onPress={() => navigation.navigate("AdminLogin")}
        >
          <MaterialCommunityIcons
            name="account-cog"
            size={24}
            color={textLoginColor}
          />
          <CustomText style={[styles.buttonText, { color: textLoginColor }]}>
            Gharbeti Login
          </CustomText>
        </TouchableOpacity>

        {/* User Login Button */}
        <TouchableOpacity
          style={[styles.button, styles.userButton]}
          onPress={() => navigation.navigate("UserLogin")}
        >
          <MaterialCommunityIcons
            name="account"
            size={24}
            color={textLoginColor}
          />
          <CustomText style={[styles.buttonText, { color: textLoginColor }]}>
            User Login
          </CustomText>
        </TouchableOpacity>
      </View>
    </CustomView>
  );
};
//define teh stack navigator
const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [firstTime, setFirstTime] = useState<boolean | null>(null);

  //is login or not
  useEffect(() => {
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
  }, []);

  // Define the initial route based on firstTime and isLogin
  if (firstTime === null || isLogin === null) {
    // Optionally, return a loading screen while async tasks complete
    return null;
  }

  const initaialRoute = firstTime
    ? "Welcome"
    : isLogin
    ? "NavigationRoute"
    : "SelectRole";

  return (
    <Stack.Navigator
      initialRouteName={initaialRoute}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={FirstWelcomeScreen}
        options={{
          gestureDirection: "horizontal",
          transitionSpec: {
            open: {
              animation: "spring",
              config: { stiffness: 100, damping: 20, mass: 0.5 },
            },
            close: { animation: "timing", config: { duration: 300 } },
          },
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          }),
        }}
      />

      {/* //drawer navigation */}
      <Stack.Screen name="NavigationRoute" component={NavigationRoute} />

      <Stack.Screen
        name="SelectRole"
        component={LoginRole}
        options={{
          gestureDirection: "horizontal",
          transitionSpec: {
            open: {
              animation: "spring",
              config: { stiffness: 100, damping: 20, mass: 0.5 },
            },
            close: { animation: "timing", config: { duration: 300 } },
          },
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          }),
        }}
      />
      <Stack.Screen
        name="AdminLogin"
        component={AdminLoginScreen}
        options={{
          gestureDirection: "vertical",
          transitionSpec: {
            open: {
              animation: "spring",
              config: { stiffness: 80, damping: 10 },
            },
            close: { animation: "timing", config: { duration: 300 } },
          },
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.height, 0],
                  }),
                },
              ],
            },
          }),
        }}
      />
      <Stack.Screen
        options={{
          gestureDirection: "vertical",
          transitionSpec: {
            open: {
              animation: "spring",
              config: { stiffness: 80, damping: 10 },
            },
            close: { animation: "timing", config: { duration: 300 } },
          },
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.height, 0],
                  }),
                },
              ],
            },
          }),
        }}
        name="UserLogin"
        component={UserLogin}
      />
      <Stack.Screen name="registerForm" component={Register} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  //this all fo the first screen
  centered: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },

  wrapper: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for contrast
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    lineHeight: 26,
    flexDirection: "row",
    alignItems: "center",
    fontStyle: "italic",
    gap: 10,
  },
  //for select role
  imageStyleRole: {
    width: 200,
    height: 200,
    borderRadius: 50,
    alignSelf: "center",
  },

  //for select role
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  //this is for the select role button
  button: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    justifyContent: "center",
    alignContent: "center",
    gap: 8,
  },

  //for next click of button
  buttonNext: {
    marginTop: 40,
    backgroundColor: color.headerColor,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  //form main page
  imageStyle: {
    flex: 1,
    justifyContent: "center",
  },
  imageStyleWelcome: {
    width: 300,
    height: 80,
    alignSelf: "center",
  },

  //this is for the select role screen
  adminButton: {
    backgroundColor: color.headerColor,
  },
  userButton: {
    backgroundColor: color.headerColor,
  },
  //the button inside text
  buttonText: {
    color: color.white,
    fontSize: 20,
    fontWeight: "600",
  },
  header: {
    backgroundColor: color.headerColor,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderBottomEndRadius: 40,
    borderBottomLeftRadius: 40,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
});
