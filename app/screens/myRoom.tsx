import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../hook/customText";
import color from "../constants/color";
import { ScrollView } from "react-native-gesture-handler";
import PaymentSection from "@/paymentSection";

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

  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomText style={styles.headerText}>
          This Month's Room Rent
        </CustomText>
        <CustomText style={styles.dateText}>{date.toDateString()}</CustomText>

        {/* Current Month Card */}
        <TouchableOpacity style={styles.card}>
          <CustomText style={styles.sectionTitle}>Current Month</CustomText>
          <CustomText style={styles.labelText}>
            Month:{" "}
            <CustomText style={styles.valueText}>
              {currentMonthData.month}
            </CustomText>
          </CustomText>
          <CustomText style={styles.labelText}>
            Total Room:{" "}
            <CustomText style={styles.valueText}>
              {currentMonthData.totalRoom}
            </CustomText>
          </CustomText>
          <CustomText style={styles.labelText}>
            Room Rent:{" "}
            <CustomText style={styles.valueText}>
              Rs. {currentMonthData.roomRent}
            </CustomText>
          </CustomText>
          <CustomText style={styles.labelText}>
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
          <CustomText style={styles.labelText}>
            Waste:{" "}
            <CustomText style={styles.valueText}>
              Rs. {currentMonthData.waste}
            </CustomText>
          </CustomText>
          <CustomText style={styles.totalAmountText}>
            Total Amount: Rs. {currentMonthData.totalAmount}
          </CustomText>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Payment QR")}
          >
            <CustomText style={styles.buttonText}>
              {"Click here to pay"}
            </CustomText>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Comparison with Previous Month */}
        <View style={[styles.card, styles.previousCard]}>
          <CustomText style={styles.sectionTitle}>Previous Month</CustomText>
          <CustomText style={styles.labelText}>
            Month:{" "}
            <CustomText style={styles.valueText}>
              {previousMonthData.month}
            </CustomText>
          </CustomText>
          <CustomText style={styles.labelText}>
            Total Room:{" "}
            <CustomText style={styles.valueText}>
              {previousMonthData.totalRoom}
            </CustomText>
          </CustomText>
          <CustomText style={styles.labelText}>
            Room Rent:{" "}
            <CustomText style={styles.valueText}>
              Rs. {previousMonthData.roomRent}
            </CustomText>
          </CustomText>
          <CustomText style={styles.labelText}>
            Electricity:{" "}
            <CustomText style={styles.valueText}>
              {previousMonthData.electricity} units
            </CustomText>
          </CustomText>
          <CustomText style={styles.labelText}>
            Waste:{" "}
            <CustomText style={styles.valueText}>
              Rs. {previousMonthData.waste}
            </CustomText>
          </CustomText>
          <CustomText style={styles.totalAmountText}>
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
    // backgroundColor: color.semiSky,
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
    fontSize: 16,
    textAlign: "center",
  },
  lastmonth: {
    color: color.green,
    textAlign: "right",
    marginVertical:10
  },
});

export default MyRoom;
