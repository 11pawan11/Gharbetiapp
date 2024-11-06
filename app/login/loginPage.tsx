import { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import CustomText from "../hook/customText";
import color from "../constants/color";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { useThemeMode } from "../context/themeContext";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisble] = useState(false);
  const { themeStyle } = useThemeMode();

  const backgroundTheme = themeStyle(color.black, color.white);
  const buttonColor = themeStyle(color.lightGray, color.headerColor);
  const buttonTextColor = themeStyle(color.black, color.white);
  const iconColor = themeStyle(color.white, color.black);
  const textColor = themeStyle(color.white, color.gray);

  return (
    <View style={[login.container, { backgroundColor: backgroundTheme }]}>
      <CustomText style={[login.headerText, { color: textColor }]}>
        Welcome Back
      </CustomText>

      <CustomText style={[login.text, { color: textColor }]}>Email</CustomText>
      <TextInput
        style={[login.input, { color: textColor }]}
        placeholder="Enter your email"
        inputMode="email"
      />
      <CustomText style={[login.text, { color: textColor }]}>
        Password
      </CustomText>
      <View style={login.icon}>
        <TextInput
          style={[login.input, { color: textColor }]}
          secureTextEntry={!isPasswordVisible}
          placeholder="Enter your Password"
        />

        <Entypo
          onPress={() => setPasswordVisble(!isPasswordVisible)}
          style={[login.iconText]}
          name={isPasswordVisible ? "eye-with-line" : "eye"}
          size={25}
          color={iconColor}
        />
      </View>
      <TouchableOpacity
        style={[{ backgroundColor: backgroundTheme }]}
        onPress={() => Alert.alert("Login Button Presssed")}
      >
        <CustomText
          style={[
            login.buttonText,
            { backgroundColor: buttonColor, color: buttonTextColor },
          ]}
        >
          Login
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};
const login = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
    flex: 1,
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
  },
  text: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "800",
    backgroundColor: color.headerColor,
    color: color.white,
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
});

export default LoginScreen;
