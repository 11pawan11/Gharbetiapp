import { Image, StyleSheet, View } from "react-native";

const Loader = () => {
  return (
    <View style={loaderLoading.container}>
      <Image
        style={loaderLoading.imageLoader}
        source={require("../../assets/images/gharbeti.gif")}
      />
    </View>
  );
};
const loaderLoading = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageLoader: {
    width: 50,
    height: 50,
  },
});
export default Loader;
