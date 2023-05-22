import React, { useContext, useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import {
  Input,
  Button,
  Modal,
  NativeBaseProvider,
  Center,
  Actionsheet,
  useDisclose,
} from "native-base";
import * as ImagePicker from "expo-image-picker/src/ImagePicker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import URL from "../api/client";
import { AuthContext } from "./AuthContext";
import { Avatar } from "native-base";

const Setting = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [passwordValid, setPasswordValid] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { user, updateUser, token, profileIMG } = useContext(AuthContext);
  const { setProfileIMG } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclose();

  const handleUpdate = () => {
    const info = {
      firstName: username,
      phoneNumber: newPhone,
      email: user.email,
      password: passwordValid,
    };
    axios
      .put(`http://${URL}:5000/api/client/updateclient`, info)
      .then((res) => {
        console.log(res.data);
        updateUser(info, token, profileIMG);
      })
      .catch((err) => console.log(err));
  };

  const handleBack = () => {
    navigation.goBack();
    console.log("handleBack pressed!");
  };

  const handleSave = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    handleUpdate();
    setShowModal(false);

    navigation.navigate("profile");
  };
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

  const handleSaveit = async () => {
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
      handleSaveit(uri);
      setProfileIMG(uri);
      setImage(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const selectImage = () => {
    onOpen();
  };
  return (
    <NativeBaseProvider>
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
      <View
        style={{
          position: "absolute",
          top: 50,
          right: 10,
          zIndex: 1,
        }}
      >
        <MaterialIcons
          name="done"
          size={28}
          color="white"
          onPress={handleSave}
        />
      </View>
      <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ width:10,borderRadius:10}}>
            <Pressable onPress={onOpen}>
              <Avatar
                bg="white"
                size="2xl"
                source={{
                uri: profileIMG,
               
                }}
              ></Avatar>
            </Pressable>
            <View style={{ backgroundColor: "black", flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "white",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                Edit Profile
              </Text>
              <View
                style={{ padding: 15, alignItems: "center", marginTop: 50 }}
              ></View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
      </View>
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

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        _backdrop={{
          _dark: {
            bg: "coolGray.800",
          },
          bg: "warmGray.50",
        }}
      >
        <Modal.Content maxWidth="350" maxH="212" backgroundColor={"gray.100"}>
          <Modal.CloseButton />
          <Modal.Header color={"black"}>Password</Modal.Header>
          <Modal.Body color={"gray.100"}>
            <Input
              placeholder="password"
              color={"white"}
              onChangeText={(text) => setPasswordValid(text)}
            ></Input>
          </Modal.Body>

          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="orange"
              onPress={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              color={"orange"}
              style={{ size: 12 }}
              onPress={handleCloseModal}
            >
              Save
            </Button>
          </Button.Group>
        </Modal.Content>
      </Modal>
    </NativeBaseProvider>
  );
};

export default Setting;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "white",
    textAlign: "center",
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  userBtn: {
    borderColor: "orange",
    borderWidth: 2,
    borderRadius: 3,
    width: 300,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    textAlign: "center",
    color: "orange",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
    padding: 15,
  },
});
