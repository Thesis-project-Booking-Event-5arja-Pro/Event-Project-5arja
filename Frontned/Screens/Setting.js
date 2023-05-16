import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import ImagePickerExample from "../components/ImagePicker";
import tailwind from "twrnc";
import {
  Avatar,
  Box,
  FormControl,
  Stack,
  Input,
  Text,
  Heading,
  Center,
  VStack,
  IconButton,
} from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const Setting = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack()
    console.log("handleBack pressed!");
  };
  const handleSave = () => {
    navigation.navigate("Profile");
  };
  return (
    <SafeAreaView style={tailwind`flex-1 bg-black`}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tailwind`flex-1 items-center justify-center gap-8`}>
          <Pressable
            style={{ position: "absolute", top: 10, left: 10 }}
            onPress={handleBack}
          >
            <MaterialIcons name="arrow-back" size={28} color="white" />
          </Pressable>
          <Pressable
            style={{ position: "absolute", top: 10, right: 10 }}
            onPress={handleSave}
          >
            <MaterialIcons name="done" size={28} color="white" />
          </Pressable>
          <View style={{ width: 250, height: 500 }}>
            <View></View>

            <View style={{ alignItems: "center" }}>
              <View style={{ marginTop: -100, padding: 10 }}>
                <ImagePickerExample />
              </View>
              <Heading>
                {/* imagee */}
                <View></View>
                <Text style={{ color: "white", alignItems: "center" }}>
                  Edit profile
                </Text>
                <View justifyContent="center"></View>
              </Heading>

              <Box style={{ width: "100%", paddingHorizontal: 20 }}>
                <VStack space={4} alignItems="center">
                  <View style={{ width: 380 }}>
                    <FormControl.Label>Name</FormControl.Label>
                    <Input variant="underlined" />
                  </View>

                  <View style={{ width: 380 }}>
                    <FormControl.Label>Username</FormControl.Label>
                    <Input variant="underlined" />
                  </View>

                  <View style={{ width: 380 }}>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input variant="underlined" />
                  </View>
                  <View style={{ width: 380 }}>
                    <FormControl.Label>New Password</FormControl.Label>
                    <Input variant="underlined" />
                  </View>
                </VStack>
              </Box>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Setting;
