import { SafeAreaView, ScrollView } from "react-native";
import NavigationRoute from "./config/navigation";
import { ThemeProvider } from "./context/themeContext";

export default function App() {
  return (
    <ThemeProvider>
      <NavigationRoute />
    </ThemeProvider>
  );
}
