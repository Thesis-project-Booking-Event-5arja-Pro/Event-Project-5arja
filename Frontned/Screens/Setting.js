import React, { useContext, useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  Box,
  VStack,
  FormControl,
  Input,
  Button,
  Modal,
  NativeBaseProvider,
} from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import URL from "../api/client";
import { AuthContext } from "./AuthContext";

const Setting = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [passwordValid, setPasswordValid] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { user, updateUser, token, profileIMG } = useContext(AuthContext);

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

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: "black", flex: 1 }}>
              <Box flex={1} paddingHorizontal={20} justifyContent="center">
                <VStack space={4} alignItems="center">
                  <FormControl.Label>Username</FormControl.Label>
                  <Input
                    variant="underlined"
                    color={"white"}
                    onChangeText={(text) => setUsername(text)}
                  />

                  <FormControl.Label>Phone Number</FormControl.Label>
                  <Input
                    variant="underlined"
                    color={"white"}
                    fontSize={"md"}
                    onChangeText={(text) => setNewPhone(text)}
                  />
                </VStack>
              </Box>
            </View>

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
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>

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