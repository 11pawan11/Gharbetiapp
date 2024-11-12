import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/configuration";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../veryFistScreen";

interface UserRoleProps {
  user: User | null;
  logout: () => void;
}
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

//create context
const CheckUserRoleContext = createContext<UserRoleProps | undefined>(
  undefined
);

//use this to call whereever wanted
export const useUserRoleChecker = () => {
  const context = useContext(CheckUserRoleContext);
  if (!context) {
    throw new Error("Check User Context Provider must be within the context");
  }
  return context;
};

//usethis for  provider
export const UserRoleCheckProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem("adminToken", JSON.stringify(user));
        setUser(user);
      } else {
        await AsyncStorage.removeItem("adminToken");
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    AsyncStorage.removeItem("adminToken");
    AsyncStorage.removeItem("userToken");
    navigation.navigate("Welcome");
  };

  return (
    <CheckUserRoleContext.Provider value={{ user, logout }}>
      {children}
    </CheckUserRoleContext.Provider>
  );
};
