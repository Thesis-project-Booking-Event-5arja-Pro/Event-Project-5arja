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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Video, ResizeMode } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext, AuthProvider } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URL from "../api/client";
import axios from "axios";
import ImagePickerExample from "../components/ImagePicker";

const RegisterScreen = () => {
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const { updateUser } = useContext(AuthContext);
  const { profileIMG } = useContext(AuthContext);
  const register = () => {
    const info = {
      firstName: userName,
      email: email,
      password: password,
      phoneNumber: phone,
      img: profileIMG,
    };
    axios
      .post(`http://${URL}:5000/api/client/addclient`, info)
      .then((res) => {
        console.log("hi im clinet posed" + res);
        AsyncStorage.setItem("token", res.data);
        updateUser(info, res.data, profileIMG);
        navigation.replace("main");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(`${err}`);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        padding: 10,
      }}
    >
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View>
              <View style={{}}>
                <Video
                  source={require("../unit/txt.mp4")}
                  style={{ height: 300, width: 300 }}
                  resizeMode="cover"
                  shouldPlay
                />
              </View>
              <View style={{top: -120, right: 10 }}>
                <ImagePickerExample style={{ width: 30, height: 30 }} />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    marginTop: -10,
                    fontWeight: "600",
                    color: "white",
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
                    style={{ marginLeft: -15 }}
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
                      marginRight: 10,
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
                  <Pressable
                    style={{
                      width: 150,
                      backgroundColor: "white",
                      padding: 15,
                      borderRadius: 7,
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 10,
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../assets/7123025_logo_google_g_icon.png")}
                      style={{ width: 24, height: 24, marginRight: 10 }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "black",
                      }}
                    >
                      Sign in with Google
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
