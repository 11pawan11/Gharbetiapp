import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import color from "../constants/color";
import { View, Image, StatusBar, StyleSheet, Alert } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import coreRoutes from "./route";
import { Suspense, useState } from "react";
import Loader from "../util/loader";
import { useThemeMode } from "../context/themeContext";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => (
  <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
    {/* Drawer header with image */}
    <View style={indexStyles.drawerHeader}>
      <Image
        style={indexStyles.bar}
        source={require("../../assets/images/gharbeti3.png")}
        resizeMode="cover"
      />
    </View>
    {/* Drawer items */}
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

const NavigationRoute = () => {
  const { isDarkMode, toggleTheme, themeStyle } = useThemeMode();

  const backgroundColorOfTheme = themeStyle(color.headerGray, color.headerColor);
  const backgroundColorofDrawer = themeStyle(color.headerGray, color.white);
  const iconColor = themeStyle(color.white, color.headerColor);
  const drawerTextColor = themeStyle(color.white, color.headerColor);
  const drawerActiveTintColor = themeStyle(color.black, color.skyblue);


  return (
    <NavigationContainer independent={true}>
      <StatusBar barStyle="light-content" backgroundColor={color.tomato} />
      <Suspense fallback={<Loader />}>
        <Drawer.Navigator
          initialRouteName="Gharbeti Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: backgroundColorOfTheme,
            },
            drawerIcon: () => (
              <Entypo name="home" size={24} color={color.darkGray} />
            ),
            //this is responsible for the decresing the status or navigation bar height
            headerStatusBarHeight: 0,
            headerTintColor: color.white,
            headerTitleStyle: {
              fontWeight: "bold",
              alignItems: "center",
            },
            headerTitle: () => (
              <Image
                style={{ width: 100, height: 24 }}
                source={Image.resolveAssetSource(
                  require("../../assets/images/gharbeti2.png")
                )}
                resizeMode="contain"
              />
            ),
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <MaterialCommunityIcons
                  name={isDarkMode ? "lightbulb" : "lightbulb-outline"}
                  size={24}
                  color={"white"}
                  onPress={toggleTheme}
                />
              </View>
            ),
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          {/* Import from the core route */}
          {coreRoutes.map((router, index) => (
            <Drawer.Screen
              key={index}
              name={router.name}
              component={router.component}
              options={{
                drawerActiveTintColor: drawerTextColor,
                drawerActiveBackgroundColor: drawerActiveTintColor,
                drawerType: "slide",
                drawerStyle: {
                  backgroundColor: backgroundColorofDrawer,
                },
                drawerLabelStyle: {
                  color:drawerTextColor,
                  fontSize: 16,
                  fontWeight: "bold",
                },
                drawerIcon: () => {
                  // List of valid Entypo icons
                  const validEntypoIcons = [
                    "home",
                    "folder",
                    "info",
                    "cog",
                    "user",
                    "login",
                    "log-out",
                    "trash",
                    "users",
                  ];

                  // Check if router.icon exists in the Entypo icon list
                  const isEntypoIcon = validEntypoIcons.includes(router.icon);

                  return isEntypoIcon ? (
                    <Entypo
                      name={router.icon as any}
                      size={24}
                      color={iconColor}
                    />
                  ) : (
                    <AntDesign
                      name={router.icon as any}
                      size={24}
                      color={iconColor}
                    />
                  );
                },

                drawerLabel: router.name,
              }}
            />
          ))}
        </Drawer.Navigator>
      </Suspense>
    </NavigationContainer>
  );
};

const indexStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textTransform: "capitalize",
    backgroundColor: "black",
    color: "white",
  },
  texts: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  bar: {
    height: 150,
    width: 300,
  },
  drawerHeader: {
    paddingVertical: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  dark: {
    backgroundColor: color.darkGray,
    color: color.white,
  },
  light: {
    backgroundColor: color.headerColor,
    color: color.white,
  },
});

export default NavigationRoute;
