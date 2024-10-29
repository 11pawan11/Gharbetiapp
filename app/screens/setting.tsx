import { SafeAreaView, StatusBar, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import color from "../constants/color";
import CustomText from "../hook/customText";

const Setting = () => {
  return (
    <SafeAreaView style={setting.mainContainer}>
      <TouchableOpacity>
        <CustomText style={setting.text}>This is for teh setting</CustomText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

//styling
const setting = StyleSheet.create({
  mainContainer: {
    backgroundColor: color.lightBlue,
    flex: 1,
  },
  text: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
export default Setting;
