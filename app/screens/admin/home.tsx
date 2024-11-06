import color from "@/app/constants/color";
import { useThemeMode } from "@/app/context/themeContext";
import CustomText from "@/app/hook/customText";
import { StyleSheet, View } from "react-native";
const Home = () => {
  const { themeStyle } = useThemeMode();

  const backgroundHome = themeStyle(color.black, color.white);
  const textColor = themeStyle(color.white, color.semiBlack);

  return (
    <View style={[styles.container, { backgroundColor: backgroundHome }]}>
      <CustomText style={[styles.text, { color: textColor }]}>
        Welcome to Admin page
      </CustomText>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
});
export default Home;
