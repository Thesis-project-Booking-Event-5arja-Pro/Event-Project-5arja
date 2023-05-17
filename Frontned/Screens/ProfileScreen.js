import { SafeAreaView, View, Pressable, Image, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import tailwind from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePickerExample from "../components/ImagePicker";
import { Center } from "native-base";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { updateUser, user } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const { profileIMG } = useContext(AuthContext);
  const handlSetting = () => {
    navigation.navigate("setting");
  };

  const handHelp = () => {
    navigation.navigate("help");
  };
  const handleBack = () => {
    console.log("trying to go to the main ");
    navigation.navigate("Home");
  };
  const handleLogout = async () => {
    try {
      await auth.signOut();
      AsyncStorage.removeItem("token");
      updateUser("", "", "");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <SafeAreaView style={tailwind`flex-1 bg-black`}>
      <View style={tailwind`flex-1 items-center justify-center gap-8`}>
        <Pressable
          style={{ position: "absolute", top: 10, left: 10 }}
          onPress={handleBack}
        >
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </Pressable>
        <View >
        <ImagePickerExample
       
       style={{marginetop:50}}
        />
        </View>
     <Center>
        <View style={{marginetop:150}} >
          <View style={{marginTop:50,alignItems:"center"}}>
            <Text style={tailwind`text-white text-3xl font-bold p-5`}>
              {user.firstName}
            </Text>
            <Text style={tailwind`text-white text-lg`}>Email:{user.email}</Text>
            <Text style={tailwind`text-white text-lg p-9 m-7`}>
              Phone:{user.phoneNumber}
            </Text>
          </View>
        </View>
        </Center>
      </View>
      <View style={tailwind`flex-1 justify-center gap-8`}>
        <Pressable style={tailwind`flex-row items-center gap-2 px-8`}>
          <Ionicons name="settings-outline" size={24} color="#fff" />
          {/* nav to setting */}
          <Text style={tailwind`text-white text-lg`} onPress={handlSetting}>
            Settings
          </Text>
        </Pressable>
        {/* nav to help */}
        <Pressable style={tailwind`flex-row items-center gap-2 px-8`}>
          <Ionicons name="help-buoy-outline" size={24} color="#fff" />
          <Text style={tailwind`text-white text-lg`} onPress={handHelp}>
            Help
          </Text>
        </Pressable>
        {/* nav to logout login or singup */}
        <Pressable style={tailwind`flex-row items-center gap-2 px-8`}>
          <MaterialIcons name="logout" size={24} color="#fff" />
          <Text style={tailwind`text-white text-lg`} onPress={handleLogout}>
            Logout
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
  // } else {
  //   navigation.dispatch(
  //     CommonActions.reset({
  //       index: 0,
  //       routes: [{ name: "Login" }],
  //     })
  //   );
  //   return navigation.navigate("Home");
  // }
}
