import React, { useState, useContext, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Video, ResizeMode } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext, AuthProvider } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URL from "../api/client";
import axios from "axios";
import { Avatar, Center, Actionsheet, useDisclose } from "native-base";
import * as ImagePicker from "expo-image-picker/src/ImagePicker";

const RegisterScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const { setProfileIMG } = useContext(AuthContext);
  const { profileIMG } = useContext(AuthContext);
  const { updateUser } = useContext(AuthContext);
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

  const selectImage = () => {
    onOpen();
  };

  const register = () => {
    const info = {
      username: userName,
      email: email.trim(),
      password: password,
      name: userName,
      phone_number: phone,
      img: profileIMG,
    };
    axios
      .post(`http://${URL}:5001/api/user/addUser`, info).then((res) => {
        const token = res.data?.customToken;
        const userId = res.data?.user_id;

        if (token && userId) {
          AsyncStorage.setItem("token", token);
          updateUser({ ...info, user_id: userId }, token, profileIMG);
          navigation.replace("main");
        } else {
          console.error("Invalid response from server:", res.data);
          Alert.alert("Registration Failed", "Invalid response from server.");
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Registration Failed", err.message);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        padding: 10,
        marginLeft: -15,
      }}
    >
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View>
              <Center style={{ marginTop: 65, padding: 45, marginLeft: 25 }}>
                <View style={{ width: 50, marginLeft: -75, borderRadius: 25 }}>
                  <Pressable onPress={onOpen}>
                    <Avatar
                      bg="white"
                      size="2xl"
                      source={{
                        uri: profileIMG,
                      }}
                    ></Avatar>
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
              {/* <View style={{}}>
                <Video
                  source={require("../unit/txt.mp4")}
                  style={{ height: 300, width: 300,marginLeft:33 }}
                  resizeMode="cover"
                  shouldPlay
                />
              </View> */}

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <View style={{top: -120, right: 10 }}>
                <ImagePickerExample style={{ width: 30, height: 30 }} />
              </View> */}
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: -10,
                    fontWeight: "600",
                    color: "white",
                    marginLeft: 25,
                  }}
                >
                  Create a new Account
                </Text>
              </View>

              <View style={{ marginTop: 50 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign name="user" size={24} color="white" />
                  <TextInput
                    value={userName}
                    onChangeText={(text) => setuserName(text)}
                    color="white"
                    placeholder="username"
                    placeholderTextColor="white"
                    style={{
                      fontSize: password ? 18 : 18,
                      borderBottomWidth: 1,
                      borderBottomColor: "gray",
                      marginLeft: 13,
                      width: 300,
                      marginVertical: 10,
                    }}
                  />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={24}
                    color="white"
                  />
                  <TextInput
                    placeholder="Email"
                    value={email}
                    color="white"
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="white"
                    style={{
                      fontSize: email ? 18 : 18,
                      borderBottomWidth: 1,
                      borderBottomColor: "gray",
                      marginLeft: 13,
                      width: 300,
                      marginVertical: 10,
                    }}
                  />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="key-outline" size={24} color="white" />
                  <TextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    color="white"
                    secureTextEntry={!showPassword}
                    placeholder="Password"
                    placeholderTextColor="white"
                    style={{
                      fontSize: password ? 18 : 18,
                      borderBottomWidth: 1,
                      borderBottomColor: "gray",
                      marginLeft: 13,
                      width: 300,
                      marginVertical: 20,
                    }}
                  />
                  <Pressable
                    onPress={() => setShowPassword((prevState) => !prevState)}
                    style={{ marginLeft: -20 }}
                  >
                    <Feather
                      name={showPassword ? "eye-off" : "eye"}
                      size={24}
                      color="white"
                    />
                  </Pressable>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Feather name="phone" size={24} color="white" />
                  <TextInput
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    color="white"
                    placeholder="Phone Number"
                    placeholderTextColor="white"
                    style={{
                      fontSize: password ? 18 : 18,
                      borderBottomWidth: 1,
                      borderBottomColor: "gray",
                      marginLeft: 13,
                      width: 300,
                      marginVertical: 10,
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 50,
                    width: 320,
                    height: 60,
                    padding: 5,
                  }}
                >
                  <Pressable
                    onPress={register}
                    style={{
                      width: 150,
                      backgroundColor: "orange",
                      padding: 15,
                      borderRadius: 7,
                      marginRight: -50,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: "center",
                        color: "white",
                        flexDirection: "row",
                        flexDirection: "row",
                        marginRight: 3,
                        marginTop: -3,
                        justifyContent: "center",
                      }}
                    >
                      register
                    </Text>
                  </Pressable>
                </View>

                <Pressable
                  onPress={() => navigation.goBack()}
                  style={{ marginTop: 20 }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 17,
                      color: "gray",
                      fontWeight: "500",
                    }}
                  >
                    Already have a account? Sign in
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
// const register = () => {
//   if (email === "" || password === "" || phone === "") {
//     Alert.alert(
//       "Invalid Details",
//       "Please fill all the details",
//       [
//         {
//           text: "Cancel",
//           onPress: () => console.log("Cancel Pressed"),
//           style: "cancel",
//         },
//         { text: "OK", onPress: () => console.log("OK Pressed") },
//       ],
//       { cancelable: false }
//     );
//   }
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const userData = {
//         name: userName,
//         email: email,
//         password: password,
//         phone: phone,
//       };
//       const user = userCredential._tokenResponse.email;
//       const myUserUid = auth.currentUser.uid;

//       setDoc(doc(db, "users", `${myUserUid}`), userData);
//       tokenUser(myUserUid);
//       updateUser(userData, myUserUid);
//       console.log("user registre");
//     })
//     .catch((err) => {
//       Alert.alert("Error" + err);
//     });
// };
