import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={indexStyles.container}>
      <Text>test</Text>
    </View>
  );
}

const indexStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
    alignContent:"center",
    textTransform:"capitalize"
  },
});
