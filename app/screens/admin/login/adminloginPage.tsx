import React, { useState } from "react";
import { Alert, Image, StyleSheet, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useThemeMode } from "@/app/context/themeContext";
import color from "@/app/constants/color";
import CustomText from "@/app/hook/customText";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/configuration";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const AdminLoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisble] = useState(false);
  const [showError, setshowError] = useState(false);
  const { themeStyle } = useThemeMode();

  const signInWithEmailPasswords = async () => {
    if (!email || !password) {
      setshowError(true);
    }
    try {
      const userCrefdential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCrefdential.user;
      const token = await user.getIdToken();

      Alert.alert("Login Sucessfully", `${user.email}`);
      await AsyncStorage.setItem("adminToken", token);
      navigation.dispatch(
        CommonActions.navigate({
          name: "NavigationRoute",
          params: { screen: "Gharbeti Home" },
        })
      );
    } catch (error: any) {
      Alert.alert("Something went wrong. Login Failed.", error.message);
    }
  };
  console.log("test", navigation.getState().routeNames);

  const backgroundTheme = themeStyle(color.black, color.white);
  const buttonColor = themeStyle(color.headerColor, color.headerColor);
  const buttonTextColor = themeStyle(color.black, color.white);
  const iconColor = themeStyle(color.white, color.black);
  const textColor = themeStyle(color.white, color.gray);

  return (
    <View style={[login.container, { backgroundColor: backgroundTheme }]}>
      <Image
        style={login.imageStyle}
        source={require("../../../../assets/images/gharbeti2.png")}
        resizeMode="contain"
      />
      <CustomText style={[login.headerText, { color: textColor }]}>
        Welcome Gharbeti Login
      </CustomText>

      <CustomText style={[login.text, { color: textColor }]}>Email</CustomText>
      <TextInput
        style={[
          login.input,
          { color: textColor },
          showError && !email ? login.errorBorder : null,
        ]}
        placeholder="Enter your email"
        inputMode="email"
        value={email.toLowerCase()}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <CustomText style={[login.text, { color: textColor }]}>
        Password
      </CustomText>
      <View style={login.icon}>
        <TextInput
          style={[
            login.input,
            { color: textColor },
            showError && !password ? login.errorBorder : null,
          ]}
          secureTextEntry={!isPasswordVisible}
          placeholder="Enter your Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Entypo
          onPress={() => setPasswordVisble(!isPasswordVisible)}
          style={[login.iconText]}
          name={isPasswordVisible ? "eye-with-line" : "eye"}
          size={25}
          color={iconColor}
        />
      </View>
      <View style={login.registerForm}>
        <CustomText style={[login.registerFormText, { color: color.red }]}>
          Forgot Password ?
        </CustomText>
        <CustomText
          style={[login.registerFormText]}
          onPress={() => navigation.navigate("registerForm")}
        >
          Donot have account click here?
        </CustomText>
      </View>

      <TouchableOpacity onPress={() => signInWithEmailPasswords()}>
        <CustomText
          style={[
            login.buttonText,
            { backgroundColor: buttonColor, color: buttonTextColor },
          ]}
        >
          Login
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[{ backgroundColor: buttonColor }]}
        onPress={() => Alert.alert("Not implemented yer")}
      >
        <View style={[login.buttons]}>
          <AntDesign name="google" size={20} color={buttonTextColor} />

          <CustomText style={[login.buttonsGoogle, { color: buttonTextColor }]}>
            Login with Google
          </CustomText>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const login = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  headerText: {
    fontSize: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "lightgray",
    fontSize: 18,
  },
  text: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "800",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 5,
    borderWidth: 0.5,
  },
  buttonsGoogle: {
    fontSize: 20,
    fontWeight: "800",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 5,
  },
  icon: {
    padding: 0,
  },
  iconText: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  errorBorder: {
    borderColor: color.red,
    borderWidth: 1,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 0.5,
  },
  imageStyle: {
    width: 200,
    height: 80,
    alignSelf: "center",
    justifyContent: "center",
    padding: 20,
  },
  registerForm: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  registerFormText: {
    fontSize: 18,
  },
});

export default AdminLoginScreen;
