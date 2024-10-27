import { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import CustomText from "../hook/customText";
import color from "../constants/color";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={login.container}>
      <CustomText style={login.text}>Email</CustomText>
      <TextInput
        style={login.input}
        placeholder="Enter your email"
        inputMode="email"
      />
      <CustomText style={login.text}>Password</CustomText>
      <View style={login.icon}>
        <TextInput
          style={login.input}
          secureTextEntry={true}
          placeholder="Enter your Password"
        />

        <Entypo onPress={()=>Alert.alert("Dikchhhyant daka")}
          style={login.iconText}
          name="eye"
          size={25}
          color={color.gray}
        />
      </View>
      <TouchableOpacity onPress={() => Alert.alert("Login Button Presssed")}>
        <CustomText style={login.buttonText}>Login</CustomText>
      </TouchableOpacity>
    </View>
  );
};
const login = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 20,
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

export default Login;
