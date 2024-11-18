import color from "@/app/constants/color";
import CustomText from "@/app/hook/customText";
import CustomView from "@/app/hook/customView";
import {
  Image,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  View,
  KeyboardTypeOptions,
} from "react-native";
import {
  BorderlessButton,
  TouchableOpacity,
} from "react-native-gesture-handler";
import React, { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "@/app/firebase/configuration";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import { useToast } from "@/app/hook/customToast";

type RootStackParamList = {
  Register: undefined;
  SelectRole: undefined;
};

interface Errors {
  fullname?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}
type NavigationProps = StackNavigationProp<RootStackParamList, "SelectRole">;

const Register = () => {
  const [secureTextEntry, setSecureTextEntry] = useState({
    password: true,
    confirmPassword: true,
  });
  const [showError, setShowError] = useState<Errors>({});
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { showToast } = useToast();
  const navigation = useNavigation<NavigationProps>();

  // Input references
  const fullnameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const toggleSecureTextEntry = (field: "password" | "confirmPassword") => {
    setSecureTextEntry((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const validateInputs = () => {
    const error: Errors = {};

    if (fullname.length < 6) {
      showToast("Full Name must be at least 6 characters.", "error");
      fullnameRef.current?.focus();
      setShowError((prev) => ({ ...prev, fullname: "error" }));
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      showToast("Please enter a valid email address.", "error");
      emailRef.current?.focus();
      setShowError((prev) => ({ ...prev, email: "error" }));
      return false;
    }
    if (phone.length !== 10) {
      showToast("Phone number must be exactly 10 digits.", "error");
      phoneRef.current?.focus();
      setShowError((prev) => ({ ...prev, phone: "error" }));
      return false;
    }
    if (password.length < 6) {
      showToast("Password must be at least 6 characters.", "error");
      passwordRef.current?.focus();
      setShowError((prev) => ({ ...prev, password: "error" }));
      return false;
    }
    if (password !== confirmPassword) {
      showToast("Passwords do not match.", "error");
      confirmPasswordRef.current?.focus();
      setShowError((prev) => ({ ...prev, confirmPassword: "error" }));
      return false;
    }

    setShowError({});
    return true;
  };

  const handleCreateUser = async () => {
    if (!validateInputs()) return;

    try {
      const createUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = createUser.user;
      await sendEmailVerification(user);

      await setDoc(doc(db, "adminUser", "userList"), {
        fullname,
        email,
        phone,
        role: "admin",
        isVerified: false,
      });
      showToast("Registered Successfully! Verification email sent.", "success");
      navigation.goBack();

      setFullname("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        showToast("Email already in use", "error");
        emailRef.current?.focus();
      } else {
        showToast(`Something went wrong: ${error.message}`, "error");
      }
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

        {[
          {
            label: "Full Name",
            value: fullname,
            placeholder: "Enter your fullname",
            onChangeText: setFullname,
            ref: fullnameRef,
            error: showError.fullname,
          },
          {
            label: "Email",
            value: email,
            placeholder: "Enter your email",
            onChangeText: setEmail,
            ref: emailRef,
            error: showError.email,
          },
          {
            label: "Phone Number",
            value: phone,
            placeholder: "Enter your phone number",
            onChangeText: setPhone,
            ref: phoneRef,
            error: showError.phone,
            keyboardType: "numeric",
          },
          {
            label: "Password",
            value: password,
            placeholder: "Enter your password",
            onChangeText: setPassword,
            ref: passwordRef,
            error: showError.password,
            secureTextEntry: secureTextEntry.password,
          },
          {
            label: "Confirm Password",
            value: confirmPassword,
            placeholder: "Confirm your password",
            onChangeText: setConfirmPassword,
            ref: confirmPasswordRef,
            error: showError.confirmPassword,
            secureTextEntry: secureTextEntry.confirmPassword,
          },
        ].map((item, index) => (
          <KeyboardAvoidingView key={index}>
            <View style={styles.inputContainer}>
              <CustomText style={styles.labelText}>{item.label}</CustomText>
              <View
                style={[
                  styles.passwordContainer,
                  item.error ? styles.errorColor : styles.focusColor,
                ]}
              >
                <TextInput
                  ref={item.ref}
                  style={styles.input}
                  placeholder={item.placeholder}
                  secureTextEntry={item.secureTextEntry}
                  onChangeText={(text) => {
                    item.onChangeText(text);
                    setShowError((prev) => ({
                      ...prev,
                      [item.label.toLowerCase()]: undefined,
                    }));
                  }}
                  value={item.value}
                  keyboardType={
                    (item.keyboardType as KeyboardTypeOptions) || "default"
                  }
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

        <BorderlessButton style={styles.button} onPress={handleCreateUser}>
          <CustomText style={styles.buttonText}>Submit</CustomText>
        </BorderlessButton>
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
    borderColor: "red",
  },
  focusColor: {
    borderColor: "gray",
  },
});

export default Register;
