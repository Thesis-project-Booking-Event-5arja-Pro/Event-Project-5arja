import React, { useContext, useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Pressable,
} from "react-native";
import {
  Box,
  VStack,
  FormControl,
  Input,
  NativeBaseProvider,
  Button,
  Avatar,
  Center,
  Actionsheet,
  useDisclose,
} from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import URL from "../api/client";
import { AuthContext } from "./AuthContext";
import * as ImagePicker from "expo-image-picker/src/ImagePicker";

const Setting = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [passwordValid, setPasswordValid] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { user, token } = useContext(AuthContext);
  const { setProfileIMG } = useContext(AuthContext);
  const { profileIMG } = useContext(AuthContext);
  const { updateUser } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [image, setImage] = useState(null);
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

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      const imgprf = user.img;
      setImage(uri);
      handleSave(uri);
      setProfileIMG(uri);
      imgprf = profileIMG;
    } else {
      console.log("Image selection canceled.");
    }
  };

  const handleSaved = async () => {
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

  const selectImage = () => {
    onOpen();
  };
  console.log(user.img);
  const handleUpdate = () => {
    const info = {
      username: username,
      phone_number: newPhone,
      password: passwordValid,
      newpassword: newPassword,
      email: user.email,
      img: profileIMG,
    };
    axios
      .put(`http://${URL}:5001/api/user/updateuser`, info)
      .then((res) => {
        console.log(res.data);
        handleSaved();
        updateUser(info, token, profileIMG);
      })
      .catch((err) => console.log(err));
  };

  const handleBack = () => {
    navigation.goBack();
    console.log("handleBack pressed!");
  };

  const handleSave = () => {
    handleUpdate();
    navigation.navigate("profile");
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, backgroundColor: "black" }}>
            <Center style={{ marginTop: 65, padding: 45, marginleft: 65 }}>
              <View style={{ width: 50, marginLeft: -75, borderRadius: 25 }}>
                <Pressable onPress={onOpen} style={{ postion: "absoult" }}>
                  <Avatar
                    size="2xl"
                    source={
                      user.img
                        ? { uri: user.img }
                        : require("../assets/l60Hf.png")
                    }
                  />
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
            <View style={{ backgroundColor: "black", flex: 1 }}>
              <Box flex={1} paddingHorizontal={20} justifyContent="center">
                <VStack space={1} alignItems="center">
                  <FormControl.Label
                    style={{ fontWeight: "bold", color: "white", fontSize: 26 }}
                  >
                    Username
                  </FormControl.Label>
                  <Input
                    defaultValue={user.username}
                    variant="rounded"
                    color="white"
                    fontSize="md"
                    onChangeText={(text) => setUsername(text)}
                    _focus={{ borderColor: "orange" }}
                  />

                  <FormControl.Label
                    style={{ fontWeight: "bold", color: "white", fontSize: 26 }}
                  >
                    Phone Number
                  </FormControl.Label>
                  <Input
                    variant="rounded"
                    defaultValue={user.phone_number}
                    color="white"
                    fontSize="md"
                    onChangeText={(text) => setNewPhone(text)}
                    _focus={{ borderColor: "orange" }}
                  />

                  <FormControl.Label
                    style={{ fontWeight: "bold", color: "white", fontSize: 26 }}
                  >
                    Password
                  </FormControl.Label>
                  <Input
                    type="password"
                    placeholder="Password"
                    variant="rounded"
                    color="white"
                    fontSize="md"
                    secureTextEntry={true}
                    onChangeText={(text) => setPasswordValid(text)}
                    _focus={{ borderColor: "orange" }}
                  />

                  <FormControl.Label
                    style={{ fontWeight: "bold", color: "white", fontSize: 26 }}
                  >
                    New Password
                  </FormControl.Label>
                  <Input
                    type="password"
                    placeholder="New Password"
                    variant="rounded"
                    color="white"
                    fontSize="md"
                    secureTextEntry={true}
                    onChangeText={(text) => setNewPassword(text)}
                    _focus={{ borderColor: "orange" }}
                  />
                </VStack>
              </Box>
            </View>

            <Button
              colorScheme="light"
              _text={{
                color: "white",
              }}
              background="black"
              fontSize="md"
              size="md"
              variant="outline"
              onPress={handleSave}
            >
              Save
            </Button>
            <View
              style={{
                position: "absolute",
                top: 50,
                left: 10,
                zIndex: 1,
              }}
            >
              <MaterialIcons
                name="arrow-back"
                size={28}
                color="white"
                onPress={handleBack}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default Setting;
