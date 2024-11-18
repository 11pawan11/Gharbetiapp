import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Animated, TouchableOpacity, StyleSheet, View } from "react-native";
import { useThemeMode } from "../context/themeContext";
import color from "../constants/color";
import { Entypo } from "@expo/vector-icons";
import CustomText from "./customText";

type ToastType = "success" | "error";

interface ToastContextProps {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<
    {
      id: number;
      message: string;
      type: ToastType;
      slideAnim: Animated.Value;
    }[]
  >([]);
  const { themeStyle } = useThemeMode();

  const showToast = useCallback((message: string, type: ToastType) => {
    const newToast = {
      id: Date.now(), // Unique ID for each toast
      message,
      type,
      slideAnim: new Animated.Value(-100), // Slide-offscreen initially
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Slide-in animation for the toast
    Animated.spring(newToast.slideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    // Hide toast after 3 seconds
    setTimeout(() => {
      hideToast(newToast.id);
    }, 3000);
  }, []);

  const hideToast = useCallback((id: number) => {
    setToasts((prevToasts) => {
      const updatedToasts = prevToasts.map((toast) => {
        if (toast.id === id) {
          // Slide offscreen animation
          Animated.spring(toast.slideAnim, {
            toValue: -100,
            useNativeDriver: true,
          }).start();
        }
        return toast;
      });

      // Remove the toast after animation is complete
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 300); // Delay hiding toast after animation
      return updatedToasts;
    });
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast component to display messages */}
      <View style={styles.toastWrapper}>
        {toasts.map((toast) => (
          <Animated.View
            key={toast.id}
            style={[
              styles.toastContainer,
              {
                borderColor: toast.type === "success" ? "green" : "red",
                transform: [{ translateY: toast.slideAnim }],
                backgroundColor: themeStyle(color.white, color.offWhite),
              },
            ]}
          >
            <CustomText style={styles.toastText}>{toast.message}</CustomText>
            <TouchableOpacity
              onPress={() => hideToast(toast.id)}
              style={{
                backgroundColor: themeStyle(color.lightBlue, color.black),
                borderRadius: 100,
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <CustomText
                style={[
                  styles.toastClose,
                  {
                    color: themeStyle(color.white, color.white),
                  },
                ]}
              >
                <Entypo
                  name="cross"
                  size={24}
                  color={themeStyle(color.red, color.red)}
                />
              </CustomText>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Styles defined using StyleSheet.create to ensure correct typing
const styles = StyleSheet.create({
  toastWrapper: {
    position: "absolute",
    top: 30,
    right: 5,
    zIndex: 999,
  },
  toastContainer: {
    marginBottom: 10, // Space between multiple toasts
    padding: 5,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: 270,
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    // backgroundColor: "white",
  },
  toastText: {
    fontSize: 16,
    flex: 1,
    fontWeight: "800",
  },
  toastClose: {
    fontSize: 18,
  },
});
