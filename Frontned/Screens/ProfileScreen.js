import React, { useContext } from "react";
import { ScrollView, SafeAreaView, View, Pressable, Image, Text, Dimensions } from "react-native";
import tailwind from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePickerExample from "../components/ImagePicker";
import { Center, VStack } from "native-base";


export default function ProfileScreen() {
  const navigation = useNavigation();
  const { updateUser, user } = useContext(AuthContext);

  const windowWidth = Dimensions.get("window").width;

  const handleBack = () => {
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

  const handlnavTOsetting=()=>{
    navigation.navigate('setting')
  }

  return (
    <SafeAreaView style={tailwind`flex-1 bg-black`}>
      <ScrollView >
      <View contentContainerStyle={tailwind`flex-grow items-center justify-center`}>
        <Pressable style={{ position: "absolute", top: 65, left: 10 }} onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </Pressable>
        <VStack space={8} alignItems="center">
          <View style={{marginTop:45}}>
            <ImagePickerExample style={{  marginTop: windowWidth * 0.15 }} />
          </View>
          <VStack alignItems="center">
            <Text style={tailwind`text-white text-3xl font-bold p-5 mt-45`}>{user.firstName}</Text>
            <Text style={tailwind`text-white text-lg`}>Email: {user.email}</Text>
            <Text style={tailwind`text-white text-lg p-2 m-7`}>Phone: {user.phoneNumber}</Text>
          </VStack>
        </VStack>
    
      <View style={tailwind`flex-1 justify-center gap-8`}>
        <Pressable style={tailwind`flex-row items-center gap-2 px-8`} onPress={handlnavTOsetting}>
          <Ionicons name="settings-outline" size={24} color="#fff" />
          {/* nav to setting */}
          <Text style={tailwind`text-white text-lg`}>Settings</Text>
        </Pressable>
        {/* nav to help */}
        <Pressable style={tailwind`flex-row items-center gap-2 px-8`}>
          <Ionicons name="help-buoy-outline" size={24} color="#fff" />
          <Text style={tailwind`text-white text-lg`}>Help</Text>
        </Pressable>
        {/* nav to logout login or singup */}
        <Pressable style={tailwind`flex-row items-center gap-2 px-8`}>
          <MaterialIcons name="logout" size={24} color="#fff" />
          <Text style={tailwind`text-white text-lg`} onPress={handleLogout}>
            Logout
          </Text>
          </Pressable>
          </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}