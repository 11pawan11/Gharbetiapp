import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./context/themeContext";
import { UserRoleCheckProvider } from "./context/userAuthentication";
import AppNavigator from "./veryFistScreen";

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <UserRoleCheckProvider>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </UserRoleCheckProvider>
    </NavigationContainer>
  );
}
