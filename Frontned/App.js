import "react-native-gesture-handler";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import StackNavigator from "./SrackNavigator";
import { NativeBaseProvider } from "native-base";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./Screens/AuthContext";
import { AuthProvider } from "./Screens/AuthContext";

const Stack = createStackNavigator();

export default function App() {
  const [userData, setUserData] = useState(null);
 
  return (
    <>
      <NativeBaseProvider>
        <AuthProvider >
          <TouchableWithoutFeedback>
            <StackNavigator />
          </TouchableWithoutFeedback>
        </AuthProvider>
      </NativeBaseProvider>

      {/* <Drawers /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
