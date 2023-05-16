import React, { useState, useEffect } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Avatar } from "native-base";
import { Center, Actionsheet, useDisclose } from "native-base";
import axios from "axios";
import URL from "../api/client";
export default function ImagePickerExample() {
  const [image, setImage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclose();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const handleUploadImage = (uri) => {
    const formData = new FormData();
    formData.append("profileImage", {
      uri: uri,
      type: "image/jpeg",
      name: "profile.jpg",
    });
  
    // Make a POST request to your backend API endpoint for image upload
    axios
      .post(`http://${URL}:5000/api/client/profile-image`, formData)
      .then((response) => {
        console.log("Image uploaded successfully:", response.data);
      })
      .catch((error) => {
        console.log("Error uploading image:", error);
      });
  };
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      const uri = result.uri;
      setImage(uri);
      handleUploadImage(uri); // Pass the URI to handleUploadImage
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.cancelled) {
      const uri = result.uri;
      setImage(uri);
      handleUploadImage(uri); // Pass the URI to handleUploadImage
    } else {
      console.log("Image selection canceled.");
    }
  };

  const selectImage = () => {
    onOpen();
  };

  return (
    <Center>
      <View style={{ width: 50, height: 50, borderRadius: 25 }}>
        <Pressable onPress={onOpen}>
          <Avatar source={{ uri: image }}></Avatar>
        </Pressable>
        <Center>
          <View onPress={selectImage}>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
              <Actionsheet.Content>
                <Actionsheet.Item onPress={takePhoto}>
                  Take Photo
                </Actionsheet.Item>
                <Actionsheet.Item onPress={pickImage}>
                  Choose from Gallery
                </Actionsheet.Item>
              </Actionsheet.Content>
            </Actionsheet>
          </View>
        </Center>
      </View>
    </Center>
  );
}
