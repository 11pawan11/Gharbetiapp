import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";

import { Button, TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useThemeMode } from "@/app/context/themeContext";
import color from "@/app/constants/color";
import CustomText from "@/app/hook/customText";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/configuration";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { useToast } from "@/app/hook/customToast";
import Loader from "@/app/util/loader";
import { Checkbox } from "react-native-paper";

const AdminLoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisble] = useState(false);
  const [showError, setshowError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // Manage the "Remember Me" state
  const { themeStyle } = useThemeMode();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  // Load "Remember Me" state from AsyncStorage when the component mounts
  useEffect(() => {
    // Load saved credentials if remember me was checked
    const loadCredentials = async () => {
      const savedEmail = await AsyncStorage.getItem("rememberedEmail");
      const savedPassword = await AsyncStorage.getItem("rememberedPassword");
      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRememberMe(true);
      }
    };
    loadCredentials();
  }, []);

  const signInWithEmailPasswords = async () => {
    if (!email || !password) {
      setshowError(true);
      showToast("Please fill in both email and password", "error");
      return;
    }
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex pattern
    if (!emailValidate.test(email)) {
      setshowError(true);
      showToast("Enter a valid email", "error");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      await AsyncStorage.setItem("adminToken", token);

      // Store "Remember Me" preference in AsyncStorage
      if (rememberMe) {
        await AsyncStorage.setItem("rememberedEmail", email);
        await AsyncStorage.setItem("rememberedPassword", password);
      } else {
        await AsyncStorage.removeItem("rememberedEmail");
        await AsyncStorage.removeItem("rememberedPassword");
      }
      showToast("Login Successfully", "success");
      navigation.dispatch(
        CommonActions.navigate({
          name: "NavigationRoute",
          params: { screen: "Gharbeti Home" },
        })
      );
    } catch (error: any) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        showToast("Invalid credentials", "error");
      } else {
        showToast(`Something went wrong: ${error}`, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const backgroundTheme = themeStyle(color.black, color.white);
  const buttonColor = themeStyle(color.headerColor, color.headerColor);
  const buttonTextColor = themeStyle(color.black, color.white);
  const iconColor = themeStyle(color.white, color.black);
  const textColor = themeStyle(color.white, color.gray);
  const imageBg = themeStyle(color.white, color.headerColor);

  return (
    <View style={[login.container, { backgroundColor: backgroundTheme }]}>
      <View
        style={{
          backgroundColor: imageBg,
          // justifyContent: "center",
          alignItems: "center",
          borderRadius: 50,
          marginBottom: 5,
        }}
      >
        <Image
          style={[login.imageStyle]}
          source={require("../../../../assets/images/gharbeti2.png")}
          resizeMode="contain"
        />
      </View>
      <CustomText style={[login.headerText, { color: textColor }]}>
        Welcome Gharbeti Login
      </CustomText>
      {/* <CustomText style={[login.text, { color: textColor }]}>Email</CustomText> */}
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
        mode="outlined"
        label={"Email"}
        activeOutlineColor="white"
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
      <View style={login.checkboxContainer}>
        <Checkbox
          status={rememberMe ? "checked" : "unchecked"}
          onPress={() => setRememberMe(!rememberMe)}
          color={color.headerColor} // Customize the checkbox color
        />
        <CustomText style={{ color: textColor }}>Remember Me</CustomText>
      </View>
      <View style={login.registerForm}>
        <CustomText style={[login.registerFormText, { color: color.red }]}>
          Forgot Password ?
        </CustomText>
        <CustomText
          style={[login.registerFormText, { color: textColor }]}
          onPress={() => navigation.navigate("registerForm")}
        >
          Don’t have an account? Click here
        </CustomText>
      </View>
      {/* Remember Me Checkbox */}
      <Button
        mode="outlined"
        buttonColor={buttonColor}
        onPress={() => signInWithEmailPasswords()}
        style={{ padding: 3, borderRadius: 5 }}
      >
        <CustomText style={[login.buttonText, { color: buttonTextColor }]}>
          Login
        </CustomText>
      </Button>

      {/* //login with google  */}
      <Button
        mode="outlined"
        buttonColor={buttonColor}
        style={[login.buttons]}
        onPress={() => Alert.alert("Not implemented yet")}
      >
        <AntDesign
          name="google"
          size={20}
          color={buttonTextColor}
          style={{ marginRight: 5 }}
        />
        <CustomText style={[login.buttonsGoogle, { color: buttonTextColor }]}>
          Login with Google
        </CustomText>
      </Button>
      {loading && <Loader />}
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
  },
  buttonsGoogle: {
    fontSize: 20,
    fontWeight: "800",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginLeft: 5,
    padding: 5,
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
    gap: 5,
  },
  imageStyle: {
    width: 200,
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  registerForm: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  registerFormText: {
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default AdminLoginScreen;
