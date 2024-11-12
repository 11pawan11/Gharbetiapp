import color from "@/app/constants/color";
import { useThemeMode } from "@/app/context/themeContext";
import CustomText from "@/app/hook/customText";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
const Home = () => {
  const { themeStyle } = useThemeMode();
  const [greetings, setGreeting] = useState("");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const nepaliMonths = [
    "बैशाख",
    "जेष्ठ",
    "आषाढ",
    "श्रावण",
    "भाद्र",
    "आश्विन",
    "कार्तिक",
    "मंसिर",
    "पौष",
    "माघ",
    "फाल्गुण",
    "चैत्र",
  ];

  const monthIndex = new Date().getMonth();
  const currentMonth = nepaliMonths[monthIndex - 4];

  const determineGreetings = () => {
    const date = new Date().getHours();
    if (date < 12) {
      return "Good morning";
    } else if (date < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }; // Determine the greeting based on the current time

  useEffect(() => {
    setGreeting(determineGreetings());

    const interval = setInterval(() => {
      setGreeting(determineGreetings());
    }, 3600000); //checks in 1 hour

    return () => clearInterval(interval); //clear on unmount
  }, []);

  //for the dark theme
  const backgroundHome = themeStyle(color.black, color.white);
  const textColor = themeStyle(color.white, color.black);
  const borderColors = themeStyle(color.white, color.lightGray);
  const backgroundContainer = themeStyle(color.lightGray, color.nebiBlue);

  return (
    <View style={[styles.container, { backgroundColor: backgroundHome }]}>
      <View
        style={[
          styles.secondContainer,
          { backgroundColor: backgroundContainer, borderColor: borderColors },
        ]}
      >
        <CustomText style={[styles.textBold, { color: textColor }]}>
          {greetings} !! Pawan
        </CustomText>
        <CustomText style={[styles.text, { color: textColor }]}>
          Welcome to Admin page.
        </CustomText>
      </View>
      <View
        style={[
          styles.thirdContainer,
          { backgroundColor: backgroundContainer, borderColor: borderColors },
        ]}
      >
        <CustomText style={[styles.text, { color: textColor }]}>
          Total this Month ({currentMonth}) : Rs. 180000.00
        </CustomText>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    gap: 20,
  },
  secondContainer: {
    borderWidth: 1,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 4,
  },
  thirdContainer: {
    borderWidth: 1,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 4,
  },
  text: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "700",
  },
  textBold: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default Home;
