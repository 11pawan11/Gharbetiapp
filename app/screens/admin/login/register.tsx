import color from "@/app/constants/color";
import CustomText from "@/app/hook/customText";
import CustomView from "@/app/hook/customView";
import { Snackbar } from "react-native-paper";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  StyleSheet,
  View,
} from "react-native";
import {
  BorderlessButton,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "@/app/firebase/configuration";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Register: undefined;
  SelectRole: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, "SelectRole">;
const Register = () => {
  const [secureTextEntry, setSecureTextEntry] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: true,
    confirmPassword: true,
  });
  const [showError, setShowError] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const navigation = useNavigation<NavigationProps>();
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const labelRegister: {
    label: string;
    placeholder: string;
    value: string;
    secureTextEntry: boolean;
    keyboardType: KeyboardTypeOptions;
    minLength: number;
  }[] = [
    {
      label: "Full Name",
      placeholder: "Enter your fullname",
      value: fullname,
      secureTextEntry: false,
      keyboardType: "default",
      minLength: 6,
    },
    {
      label: "Email",
      placeholder: "Enter your email",
      value: email,
      secureTextEntry: false,
      keyboardType: "email-address",
      minLength: 6,
    },
    {
      label: "Phone Number",
      placeholder: "Enter your phone number",
      value: phone,
      secureTextEntry: false,
      keyboardType: "numeric",
      minLength: 6,
    },
    {
      label: "Password",
      placeholder: "Enter your password",
      value: password,
      secureTextEntry: secureTextEntry.password,
      keyboardType: "default",
      minLength: 6,
    },
    {
      label: "Confirm Password",
      placeholder: "Confirm your password",
      value: confirmPassword,
      secureTextEntry: secureTextEntry.confirmPassword,
      keyboardType: "default",
      minLength: 6,
    },
  ];

  const toggleSecureTextEntry = (field: "password" | "confirmPassword") => {
    setSecureTextEntry((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleCreateUser = async () => {
    if (!fullname || !password || !confirmPassword || !email || !phone) {
      setShowError(true);
      setSnackbarMessage("Please fill all fields correctly!");
      setSnackbarVisible(true);
      return;
    }

    if (password !== confirmPassword) {
      setShowError(true);
      setSnackbarMessage("Passwords do not match!");
      setSnackbarVisible(true);
      return;
    }

    try {
      const createUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = createUser.user;
      await sendEmailVerification(user);
      if (email === user.email) {
        setShowError(true);
        setSnackbarMessage("Already exist ");
        setSnackbarVisible(true);
      }
      // Set user data in Firestore
      await setDoc(doc(db, "adminUser", user.uid), {
        fullname,
        email,
        phone,
        role: "admin",
        isVerified: false,
      });

      setSnackbarMessage("Registration successful! Redirecting...");
      setSnackbarVisible(true);

      // Show success snackbar, reset form fields and navigate after a delay
      setTimeout(() => {
        setSnackbarVisible(false); // Dismiss Snackbar after 3 seconds
        navigation.navigate("SelectRole"); // Navigate to the next screen after snackbar closes
      }, 3000);

      // Reset form fields after success
      setFullname("");
      setEmail("");
      setPhone("");
      setPassword("");
      setconfirmPassword("");
    } catch (error: any) {
      setSnackbarMessage(
        `"Something went wrong. Please try again.,  ${error.message}"`
      );
      setSnackbarVisible(true);
      console.error(error.message);
    }
  };

  return (
    <CustomView>
      <View style={styles.container}>
        <Image
          source={require("../../../../assets/images/gharbeti2.png")}
          style={styles.imageStyle}
        />
        <CustomText style={styles.text}>Register Account</CustomText>

        {labelRegister.map((item) => (
          <KeyboardAvoidingView>
            <View key={item.label} style={styles.inputContainer}>
              <CustomText style={styles.labelText}>{item.label}</CustomText>
              <View
                style={[
                  styles.passwordContainer,
                  showError && !item.value ? styles.errorColor : null,
                ]}
              >
                <TextInput
                  style={[styles.input]}
                  placeholder={item.placeholder}
                  secureTextEntry={item.secureTextEntry}
                  keyboardType={item.keyboardType}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => {
                    if (item.label === "Full Name") {
                      setFullname(text);
                    } else if (item.label === "Email") {
                      setEmail(text);
                    } else if (item.label === "Phone Number") {
                      setPhone(text);
                    } else if (item.label === "Password") {
                      setPassword(text);
                    } else if (item.label === "Confirm Password") {
                      setconfirmPassword(text);
                    }
                  }}
                />

                {item.label.toLowerCase().includes("password") && (
                  <TouchableOpacity
                    onPress={() =>
                      toggleSecureTextEntry(
                        item.label === "Password"
                          ? "password"
                          : "confirmPassword"
                      )
                    }
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={
                        secureTextEntry[
                          item.label === "Password"
                            ? "password"
                            : "confirmPassword"
                        ]
                          ? "eye-off"
                          : "eye"
                      }
                      size={24}
                      color={color.black}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        ))}
        <BorderlessButton
          style={styles.button}
          onPress={() => handleCreateUser()}
        >
          <CustomText style={styles.buttonText}>Submit</CustomText>
        </BorderlessButton>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </CustomView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    padding: 10,
  },
  eyeIcon: {
    paddingHorizontal: 8,
  },
  labelText: {
    fontSize: 20,
  },
  button: {
    padding: 10,
    backgroundColor: color.headerColor,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: color.white,
  },
  imageStyle: {
    width: 300,
    height: 37,
    padding: 5,
    alignSelf: "center",
    marginBottom: 20,
  },
  errorColor: {
    borderColor: color.red,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Register;
