import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from "react-native";
import color from "../constants/color";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "../hook/customText";
import { useThemeMode } from "../context/themeContext";

const WelcomeScreen = () => {
  const { themeStyle } = useThemeMode();

  // Dynamic theme-based colors
  const backgroundScene = themeStyle(color.lightGray, color.semiSky);
  const textTheme = themeStyle(color.white, color.black); // Dynamic text color
  const backgroundBlock = themeStyle(color.semiBlack, color.nebiBlue);
  const backgroundBlock3 = themeStyle(color.semiBlack, color.nebiBlue);
  const borderColorBlock = themeStyle(color.white, color.nebiBlue);

  return (
    <ScrollView style={{ backgroundColor: backgroundScene }}>
      <View style={welcomScreens.container}>
        <StatusBar barStyle="light-content" backgroundColor={color.tomato} />
        {/* Main container with backgroundColor and text color applied dynamically */}
        <View style={welcomScreens.block}>
          <TouchableOpacity
            style={[
              welcomScreens.block1,
              {
                backgroundColor: backgroundBlock,
                borderColor: borderColorBlock,
              },
            ]}
          >
            <Image
              style={welcomScreens.gharbeti}
              resizeMode="contain"
              source={require("../../assets/images/gharbeti2.png")}
            />
            <Text style={[welcomScreens.text, { color: textTheme }]}>
              Welcome to Pawan Home. You will get notified when your rent
              payment time comes. Also, a reminder notification will be
              provided.
            </Text>
          </TouchableOpacity>

          {/* Repeat for other blocks with dynamic theme-based colors */}
          <TouchableOpacity
            style={[
              welcomScreens.block2,
              {
                backgroundColor: backgroundBlock,
                borderColor: borderColorBlock,
              },
            ]}
          >
            <Text style={[welcomScreens.text, { color: textTheme }]}>
              Second block 2
            </Text>
          </TouchableOpacity>

          <View style={welcomScreens.sectionBlock}>
            <View
              style={[
                welcomScreens.block3,
                {
                  backgroundColor: backgroundBlock,
                  borderColor: borderColorBlock,
                },
              ]}
            >
              <CustomText style={[welcomScreens.text, { color: textTheme }]}>
                Total Rooms: 12
              </CustomText>
            </View>
            <View
              style={[
                welcomScreens.block3,
                {
                  backgroundColor: backgroundBlock3,
                  borderColor: borderColorBlock,
                },
              ]}
            >
              <CustomText style={[welcomScreens.text, { color: textTheme }]}>
                Waste Concern: Rs 80 (Per Room){" "}
              </CustomText>
            </View>
          </View>

          <View
            style={[
              welcomScreens.block4,
              {
                backgroundColor: backgroundBlock3,
                borderColor: borderColorBlock,
              },
            ]}
          >
            <CustomText style={[welcomScreens.text, { color: textTheme }]}>
              Electricity Per Unit (EPC): Rs.14.00
            </CustomText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const welcomScreens = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    padding: 10,
    textAlign: "center",
    fontSize: 20,
  },
  block: {
    gap: 20,
  },
  block1: {
    height: 200,
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.headerColor,
  },
  block2: {
    height: 200,
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.headerColor,
  },
  block3: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 180,
    borderWidth: 1,
  },
  block4: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
  },
  sectionBlock: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  gharbeti: {
    width: 200,
    alignSelf: "center",
  },
});

export default WelcomeScreen;
