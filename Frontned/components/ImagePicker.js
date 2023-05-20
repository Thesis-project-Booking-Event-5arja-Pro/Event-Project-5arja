import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Pressable, View, Image, Text } from "react-native";
import * as ImagePicker from "expo-image-picker/src/ImagePicker";
import { Avatar } from "native-base";
import { Center, Actionsheet, useDisclose } from "native-base";
import axios from "axios";
import URL from "../api/client";
import { AuthContext } from "../Screens/AuthContext";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclose();
  const { setProfileIMG } = useContext(AuthContext);
  const { profileIMG } = useContext(AuthContext);
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
  console.log();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImage(uri);
      setProfileIMG(uri);
    }
  };
  console.log(profileIMG);
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      setImage(uri);
      handleSave(uri);
      setProfileIMG(uri);
    } else {
      console.log("Image selection canceled.");
    }
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append("profile-image", {
      uri: image,
      type: "image/jpeg",
      name: "profile-image.jpg",
    });
    try {
      const response = await axios.post(
        `${URL}/api/image-upload/uploadFile`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleSave(uri);
      setProfileIMG(uri);
      setImage(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  console.log(image);
  const selectImage = () => {
    onOpen();
  };

  return (
    <Center>
      <View style={{ width: 50, marginLeft: -75, borderRadius: 25 }}>
        <Pressable onPress={onOpen}>
          <Avatar
            bg="white"
            size="2xl"
            source={{
              uri: profileIMG,
            }}
          >
            <Text style={{fontSize:15,fontWeight:"bold"}}>upload profil picture</Text>
          </Avatar>
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