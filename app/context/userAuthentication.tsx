import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/configuration";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../veryFistScreen";
import { useToast } from "../hook/customToast";
import Loader from "../util/loader";
import { doc, DocumentData, getDoc } from "firebase/firestore";

interface UserRoleProps {
  user: User | null;
  logout: () => void;
  adminDetails: DocumentData | null;
}
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

//create context
const CheckUserRoleContext = createContext<UserRoleProps | undefined>(
  undefined
);

// Hook to use the context
export const useUserRoleChecker = () => {
  const context = useContext(CheckUserRoleContext);
  if (!context) {
    throw new Error("Check User Context Provider must be within the context");
  }
  return context;
};

// Context provider
export const UserRoleCheckProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const navigation = useNavigation<NavigationProp>();
  const { showToast } = useToast();
  const [adminDetails, setAdminDetails] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user role
  const fetchUserRole = async () => {
    try {
      console.log("Fetching admin details for userId:");
      const adminUserRef = doc(db, "adminUsers", "userId");
      const adminDetailsDoc = await getDoc(adminUserRef);

      if (adminDetailsDoc.exists()) {
        const data = adminDetailsDoc.data();
        console.log("Admin data found:", data);
        setAdminDetails(data);
      } else {
        console.log("No admin data found for userId:", );
        showToast("User not found", "error");
        setAdminDetails(null); // Ensure it is null if not found
      }
    } catch (error: any) {
      console.error("Error fetching admin details:", error);
      showToast("Error occurred during fetching", "error");
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        console.log("User logged in:", user.uid);
        setUser(user);
        fetchUserRole().finally(() => setLoading(false));
      } else {
        console.log("No user logged in");
        setUser(null);
        setAdminDetails(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Logout function
  const logout = async () => {
    setUser(null);
    setAdminDetails(null);
    await AsyncStorage.removeItem("adminToken");
    await AsyncStorage.removeItem("userToken");
    showToast("Logout successfully.", "success");
    navigation.navigate("SelectRole");
  };

  return (
    <CheckUserRoleContext.Provider value={{ user, logout, adminDetails }}>
      {loading ? <Loader /> : children}
    </CheckUserRoleContext.Provider>
  );
};
