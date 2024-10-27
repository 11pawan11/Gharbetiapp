import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import color from "../constants/color";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "../hook/customText";
import Login from "../login/loginPage";

const WelcomeScreen = () => {
  return (
    <ScrollView style={welcomScreen.container}>
      <StatusBar barStyle="light-content" backgroundColor={color.tomato} />
      <View style={welcomScreen.block}>
        <TouchableOpacity style={welcomScreen.block1}>
          <Image
            style={welcomScreen.gharbeti}
            resizeMode="contain"
            source={require("../../assets/images/gharbeti2.png")}
          />

          <CustomText style={welcomScreen.text}>
            Welcome to gharbeti app. You will have to notify the when time comes
            the rent notification will be available{" "}
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={welcomScreen.block2}>
          <CustomText style={welcomScreen.text}>
            This dichhyant daka is on 
          </CustomText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const welcomScreen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.semiSky,
    alignContent: "center",
    padding: 20,
  },
  text: {
    color: "black",
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20,
  },
  block: {
    gap: 20,
  },
  block1: {
    backgroundColor: color.nebiBlue,
    height: 200,
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.headerColor,
  },
  block2: {
    backgroundColor: color.nebiBlue,
    height: 200,
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.headerColor,
  },
  gharbeti: {
    width: 200,
    alignSelf: "center",
  },
});
export default WelcomeScreen;
