import { StyleSheet, View, ViewProps } from "react-native";
import { useThemeMode } from "../context/themeContext";
import color from "../constants/color";

const CustomView = ({ style, ...props }: ViewProps) => {
  const { themeStyle } = useThemeMode();

  const backgroundStyle = themeStyle(color.black, color.white);
  const borderColor = themeStyle(color.white, color.lightGray);

  return (
    <View
      {...props}
      style={[
        styles.view,
        style,
        { backgroundColor: backgroundStyle, borderColor: borderColor },
      ]}
   />
  );
};
const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
export default CustomView;
