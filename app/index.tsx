import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./context/themeContext";
import { UserRoleCheckProvider } from "./context/userAuthentication";
import AppNavigator from "./veryFistScreen";
import { ToastProvider } from "./hook/customToast";

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <ThemeProvider>
        <ToastProvider>
          <UserRoleCheckProvider>
            <AppNavigator />
          </UserRoleCheckProvider>
        </ToastProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
