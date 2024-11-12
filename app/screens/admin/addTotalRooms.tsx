import CustomText from "@/app/hook/customText";
import CustomView from "@/app/hook/customView";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { View } from "react-native-reanimated/lib/typescript/Animated";

const AddTotalRooms = () => {
  const [totalRooms, setTotalRooms] = useState("");

  return (
    <CustomView style={[styles.container]}>
      <ScrollView>
        <CustomText style={styles.text}>Add Total Rooms</CustomText>
        <TextInput style={[styles.input]} />
      </ScrollView>
    </CustomView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius:5
  },
});
export default AddTotalRooms;
