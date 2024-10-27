// NavigationRoute.tsx
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import color from "../constants/color";
import { View, Image, StatusBar, StyleSheet } from "react-native";
import WelcomeScreen from "../screens/welcomeScreen";
import Setting from "../screens/setting";
import { Entypo } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import coreRoutes from "./route";

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
  return (
    <NavigationContainer independent={true}>
      <StatusBar barStyle="light-content" backgroundColor={color.tomato} />
      <Drawer.Navigator
        initialRouteName="Gharbeti Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: color.headerColor,
          },
          drawerContentContainerStyle: {
            padding: 0,
          },
          headerTintColor: color.white,
          headerTitleStyle: {
            fontWeight: "bold",
            alignItems: "center",
          },
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
              drawerActiveTintColor: color.headerColor,
              drawerActiveBackgroundColor: color.skyblue,
              drawerType: "slide",
              drawerLabelStyle: {
                fontSize: 16,
                fontWeight: "bold",
              },
              drawerIcon: () => (
                <Entypo
                  name={router.icon}
                  size={24}
                  color={color.headerColor}
                />
              ),
              drawerLabel: router.name,
            }}
          />
        ))}
      </Drawer.Navigator>
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
});

export default NavigationRoute;
