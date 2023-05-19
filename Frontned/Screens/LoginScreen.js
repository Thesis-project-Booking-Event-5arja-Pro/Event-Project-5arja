import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  VStack,
  FormControl,
  Input,
  Button,
  Modal,
  NativeBaseProvider,
} from "native-base";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Video, ResizeMode } from "expo-av";
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AuthContext } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URL from "../api/client";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthContext);
  const { updateUser, user } = useContext(AuthContext);
  const { setEmailAuth } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const handleBack = () => {
    navigation.navigate("main");
  };

  const Login = () => {
    axios
      .post(`http://${URL}:5000/api/client/singin`, {
        email: email.trim(),
        password: password,
      })
      .then((res) => {
        const token = res.data;
        const infoDisplay = res.data.user;
        const ImgUser = infoDisplay.img;
        AsyncStorage.setItem("token", token.token);
        updateUser(infoDisplay, token.token, ImgUser);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error", "check your email or password");
      });
  };
const handleForgetPassword=()=>{
  navigation.navigate('forget')
}
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        padding: 10,
        marginTop: -13,
        marginLeft: -4,
      }}
    >
      <ScrollView>
        <Pressable
          style={{ position: "absolute", top: 10, left: 10 }}
          onPress={handleBack}
        >
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </Pressable>

        <View style={{}}>
          <Video
            source={require("../unit/txt.mp4")}
            style={{ height: 300, width: 300 }}
            resizeMode="cover"
            shouldPlay
          />
        </View>
        {loading ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              flex: 1,
            }}
          >
            <Text style={{ marginRight: 10 }}>Loading</Text>
            <ActivityIndicator size="large" color={"red"} />
          </View>
        ) : (
          <KeyboardAvoidingView>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 8,
                  fontWeight: "600",
                  color: "white",
                }}
              >
                Sign In to your account
              </Text>
            </View>

            <View style={{ marginTop: 40 }}>
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
                {/* ______________________passwordd_____________________________*/}
                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={!showPassword}
                  placeholder="Password"
                  color="white"
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
                  style={{ marginLeft: -30 }}
                >
                  <Feather
                    name={!showPassword ? "eye-off" : "eye"}
                    size={23}
                    color="white"
                  />
                </Pressable>
              </View>
              <View>
                <Pressable onPress={() => handleForgetPassword()}>
                  <Text style={{ color: "red", marginLeft: 235, fontSize: 9 }}>
                    Forget Password?
                  </Text>
                </Pressable>
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
                  onPress={Login}
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
                    }}
                  >
                    Login
                  </Text>
                </Pressable>
              </View>
              <Pressable
                onPress={() => navigation.navigate("Reg")}
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
                  Don't have a account? Sign Up
                </Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
// useEffect(() => {
//   setLoading(false);
//   const unsubscribe = auth.onAuthStateChanged((authUser) => {
//     console.log(authUser);
//     if (!authUser) {
//       setLoading(false);
//     }
//     if (authUser) {
//       updateUser(userData, myUserUid)
//       navigation.navigate("Home");
//     }
//   });

//   return unsubscribe;
// }, []);

// const login = () => {
//   signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
//     const user = userCredential.user;
//     console.log("user details", user);
//   });
// };
