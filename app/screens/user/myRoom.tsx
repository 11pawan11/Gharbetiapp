import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../../hook/customText";
import color from "../../constants/color";
import { ScrollView } from "react-native-gesture-handler";
import { useThemeMode } from "../../context/themeContext";
import React from "react";

const MyRoom = ({ navigation }: { navigation: any }) => {
  const date = new Date();

  // Mock data for the previous and current month
  const previousMonthData = {
    month: "Chaitra",
    totalRoom: 1,
    roomRent: 5000,
    electricity: 10,
    waste: 70,
    totalAmount: 5900,
  };

  const currentMonthData = {
    month: "Baishak",
    totalRoom: 1,
    roomRent: 5000,
    electricity: 15,
    waste: 80,
    totalAmount: 6000,
  };

  const { themeStyle } = useThemeMode();
  const backgroundTheme = themeStyle(color.semiBlack, color.offWhite);
  const colorText = themeStyle(color.white, color.semiBlack);
  const buttonColor = themeStyle(color.lightGray, color.headerColor);
  const buttonTextColor = themeStyle(color.black, color.white);
  const cardBackground = themeStyle(color.cardBlack, color.white);
  const previousCardBackground = themeStyle(color.previousBlack, color.semiSky);
  const cardText = themeStyle(color.white, color.semiBlack);

  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: backgroundTheme }]}>
        <CustomText style={[styles.headerText, { color: colorText }]}>
          This Month's Room Rent
        </CustomText>
        <CustomText style={[styles.dateText, { color: colorText }]}>
          {date.toDateString()}
        </CustomText>

        {/* Current Month Card */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: cardBackground }]}
        >
          <CustomText style={[styles.sectionTitle]}>Current Month</CustomText>
          <CustomText style={[styles.labelText, { color: colorText }]}>
            Month:{" "}
            <CustomText style={styles.valueText}>
              {currentMonthData.month}
            </CustomText>
          </CustomText>
          <CustomText style={[styles.labelText, { color: colorText }]}>
            Total Room:{" "}
            <CustomText style={styles.valueText}>
              {currentMonthData.totalRoom}
            </CustomText>
          </CustomText>
          <CustomText style={[styles.labelText, { color: colorText }]}>
            Room Rent:{" "}
            <CustomText style={styles.valueText}>
              Rs. {currentMonthData.roomRent}
            </CustomText>
          </CustomText>
          <CustomText style={[styles.labelText, { color: colorText }]}>
            Electricity:{" "}
            <CustomText
              style={[
                styles.valueText,
                currentMonthData.electricity >
                  previousMonthData.electricity && {
                  color: "red",
                },
              ]}
            >
              {currentMonthData.electricity} units
            </CustomText>
          </CustomText>
          <CustomText style={[styles.labelText, { color: colorText }]}>
            Waste:{" "}
            <CustomText style={styles.valueText}>
              Rs. {currentMonthData.waste}
            </CustomText>
          </CustomText>
          <CustomText style={[styles.totalAmountText, { color: cardText }]}>
            Total Amount: Rs. {currentMonthData.totalAmount}
          </CustomText>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: buttonColor }]}
            onPress={() => navigation.navigate("Payment QR")}
          >
            <CustomText style={[styles.buttonText, { color: buttonTextColor }]}>
              {"Click here to pay"}
            </CustomText>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Comparison with Previous Month */}
        <View
          style={[
            styles.card,
            styles.previousCard,
            { backgroundColor: previousCardBackground },
          ]}
        >
          <CustomText style={styles.sectionTitle}>Previous Month</CustomText>
          <CustomText style={[styles.labelText, { color: colorText }]}>
            Month:{" "}
            <CustomText style={styles.valueText}>
              {previousMonthData.month}
            </CustomText>
          </CustomText>
          <CustomText style={[styles.labelText, { color: colorText }]}>
            Total Room:{" "}
            <CustomText style={styles.valueText}>
              {previousMonthData.totalRoom}
            </CustomText>
          </CustomText>
          <CustomText style={[styles.labelText, { color: colorText }]}>
            Room Rent:{" "}
            <CustomText style={styles.valueText}>
              Rs. {previousMonthData.roomRent}
            </CustomText>
          </CustomText>
          <CustomText style={[styles.labelText, { color: colorText }]}>
            Electricity:{" "}
            <CustomText style={styles.valueText}>
              {previousMonthData.electricity} units
            </CustomText>
          </CustomText>
          <CustomText style={[styles.labelText, { color: colorText }]}>
            Waste:{" "}
            <CustomText style={styles.valueText}>
              Rs. {previousMonthData.waste}
            </CustomText>
          </CustomText>
          <CustomText style={[styles.totalAmountText, { color: cardText }]}>
            Total Amount: Rs. {previousMonthData.totalAmount}
          </CustomText>
          <CustomText style={styles.lastmonth}>
            ALready Paid Last Month
          </CustomText>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: color.nebiBlue,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: "grey",
    marginBottom: 20,
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  previousCard: {
    backgroundColor: color.lightGray,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: color.nebiBlue,
    marginBottom: 15,
  },
  labelText: {
    fontSize: 18,
    color: color.nebiBlue,
    marginBottom: 8,
    fontWeight: "500",
  },
  valueText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalAmountText: {
    fontSize: 20,
    fontWeight: "bold",
    color: color.tomato,
    marginTop: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: color.headerColor,
    padding: 5,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: color.white,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "800",
  },
  lastmonth: {
    color: color.green,
    textAlign: "right",
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default MyRoom;
