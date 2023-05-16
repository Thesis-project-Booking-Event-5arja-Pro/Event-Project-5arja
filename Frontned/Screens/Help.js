import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import ImagePickerExample from "../components/ImagePicker";
import tailwind from "twrnc";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const Help = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
    console.log("handleBack pressed!");
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

          <View style={{ width: 250, height: 500 }}>
            
            <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
               kharjarjni
              </Text>
            <View style={{ alignItems: "center" }}>
              <View style={{ marginTop: -100, padding: 10 }}></View>
             
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Help;
