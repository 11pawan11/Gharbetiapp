import React, { useState } from "react";
import {
  View,
  Image,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import color from "../../constants/color";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import CustomText from "../../hook/customText";
import { useThemeMode } from "../../context/themeContext";
import { ScrollView } from "react-native-gesture-handler";
import ImageViewer from "react-native-image-zoom-viewer";

const Setting = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [previewCitizen, setPreviewCitizen] = useState<boolean>(false);
  const { themeStyle } = useThemeMode();
  //for the dark theme
  const backgroundStyle = themeStyle(color.black, color.white);
  const inputStyle = themeStyle(color.headerGray, color.white);
  const textColor = themeStyle(color.white, color.previousBlack);
  const borderColor = themeStyle(color.white, color.lightGray);
  const buttonColor = themeStyle(color.lightGray, color.offWhite);

  const labels = ["Full Name", "Phone Number", "Email"];

  // Function to handle image selection
  const pickImage = async (fromCamera = false) => {
    const permissionRequest = await (fromCamera
      ? ImagePicker.requestCameraPermissionsAsync()
      : ImagePicker.requestMediaLibraryPermissionsAsync());
    if ((permissionRequest.granted = false)) {
      Alert.alert("Permission Denied", "You need to allow access to continue.");
      return;
    }
    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        })
      : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: backgroundStyle }]}
    >
      <CustomText style={[styles.headerText, { color: textColor }]}>
        User Information
      </CustomText>
      {/* //show the selected image */}
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} alt="Index" />
      ) : (
        <Image
          source={require("../../../assets/images/gharbeti3.png")}
          style={styles.image}
          alt="Index"
          resizeMode="cover"
        />
      )}
      {/* //buttons that accepts the photo from camera nad the gallery */}
      <View style={[styles.button]}>
        <TouchableOpacity
          style={[styles.camera, { backgroundColor: buttonColor }]}
          onPress={() => pickImage(false)}
        >
          <MaterialIcons name="photo-library" size={24} color={textColor} />
          <CustomText
            style={[{ color: textColor, fontSize: 16, fontWeight: "700" }]}
          >
            Select from Gallery
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.camera, { backgroundColor: buttonColor }]}
          onPress={() => pickImage(true)}
        >
          <Entypo name="camera" size={24} color={textColor} />

          <CustomText
            style={[{ color: textColor, fontSize: 16, fontWeight: "700" }]}
          >
            Open Camera{" "}
          </CustomText>
        </TouchableOpacity>
      </View>

      {/* //mapping the all the items og the user */}
      <View>
        {labels.map((label, index) => (
          <View key={index}>
            <CustomText style={[styles.text, { color: textColor }]}>
              {label}
            </CustomText>
            <TextInput
              value="test"
              readOnly
              style={[
                styles.input,
                {
                  backgroundColor: inputStyle,
                  borderColor: borderColor,
                  color: textColor,
                },
              ]}
            />
          </View>
        ))}
      </View>

      <View>
        <CustomText style={[styles.text, { marginVertical: 5 }]}>
          Citizenship Information
        </CustomText>
        <TouchableOpacity onPress={() => setPreviewCitizen(true)}>
          <Image
            source={require("../../../assets/images/citizen.jpg")}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Modal
          visible={previewCitizen}
          transparent={true}
          onRequestClose={() => setPreviewCitizen(false)}
        >
          <View style={styles.modalContainer}>
            <ImageViewer
              imageUrls={[
                { url: imageUri || "../../../assets/images/citizen.jpg" },
              ]}
              enableSwipeDown={true}
              onSwipeDown={() => setPreviewCitizen(false)}
              enableImageZoom={true}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setPreviewCitizen(false)}
            >
              <Entypo
                style={styles.closeButton}
                name="cross"
                size={24}
                color={textColor}
              />
            </TouchableOpacity>
            <ScrollView
              contentContainerStyle={styles.zoomContainer}
              maximumZoomScale={3}
              minimumZoomScale={1}
            >
              <Image
                source={require("../../../assets/images/citizen.jpg")}
                resizeMode="contain"
                style={styles.zoomImage}
              />
            </ScrollView>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginVertical: 10,
    backgroundColor: color.gray,
    alignSelf: "center",
  },
  camera: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 18,
  },
  text: {
    fontSize: 18,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    gap: 20,
    marginVertical: 20,
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  zoomContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  zoomImage: {
    width: 300,
    height: 400,
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default Setting;
