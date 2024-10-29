import { createContext, useContext, useEffect, useState } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";
import { Appearance } from "react-native";

type ThemeContextProps = {
  isDarkMode: boolean; // true for dark mode, false for light mode
  toggleTheme: () => void;
  themeStyle: (lightColor: string, darkColor: string) => string;
};

// create context
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// export the theme
export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("ThemeContextProvider must be used with ThemeContext");
  }
  return context;
};

//themeProvider
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // set the  theme
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    Appearance.getColorScheme() === "dark"
  );

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeStyle = (darkColor: string, lightColor: string) =>
    isDarkMode ? darkColor : lightColor;

  // Detect system theme changes
  useEffect(() => {
    const listener = (preferences: { colorScheme: ColorSchemeName }) => {
      setIsDarkMode(preferences.colorScheme === "dark");
    };

    const subscription = Appearance.addChangeListener(listener);

    return () => subscription.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, themeStyle, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
