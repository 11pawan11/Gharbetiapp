import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomText from "../hook/customText";

const AvailableRooms: React.FC = () => (
//   <LinearGradient
//     colors={["#4c669f", "#3b5998", "#192f6a"]}
//     style={styles.gradient}
//   >
//     <Text style={styles.text}>Hello, Expo Linear Gradient!</Text>
//   </LinearGradient>
<View style={styles.gradient}><CustomText>hello</CustomText></View>
);

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
});

export default AvailableRooms;
