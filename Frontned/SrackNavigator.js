import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Screens/HomeScreen";
import TicketScreen from "./Screens/TicketScreen";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Seeallticket from "./Screens/Seeallticket";
import LoginScreen from "./Screens/LoginScreen";
import WelcomeH from "./Screens/WelcomeH";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import Setting from "./Screens/Setting";
import Help from "./Screens/Help";
<<<<<<< HEAD
import Screenpayment from "./Screens/Scrennpayment.js"
import { AuthContext } from "./Screens/AuthContext";
import ForgetPassword from "./Screens/ForgetPassword";
import Qrpurche from "./Screens/Qrpurche.js"
=======

import { AuthContext } from "./Screens/AuthContext";
import ForgetPassword from "./Screens/ForgetPassword";

>>>>>>> 249cb47a6129ebad3809846147c9b06e27568c3c
const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const authContext = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  console.log("token user :" + token);
  function BotttomTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.bottomTabBar,
        }}
      >
        <Tab.Screen
    name="Home"
    component={HomeScreen}
    options={{
      tabBarLabel: "Home",
      headerShown: false,
     
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo
                  name="home"
                  size={34}
                  color="#FFB703"
                  style={{ margin: 0 }}
                />
              ) : (
                <AntDesign
                  name="home"
                  size={28}
                  color="white"
                  style={{ margin: 0 }}
                />
              ),
            tabBarLabelStyle: {
              fontSize: 13,
              fontWeight: "600",
              color: "#FFB703",
            },
          }}
        />
        <Tab.Screen
          name="account"
          component={RegisterScreen}
          options={{
            tabBarButton: () => null, // Hide the tab button
            tabBarLabelStyle: { display: "none" }, // Hide the tab label
          }}
        />
    
           <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarButton: () => null, // Hide the tab button
            tabBarLabelStyle: { display: "none" }, // Hide the tab label
          }}
        />
         <Tab.Screen
          name="forget"
          component={ForgetPassword}
          options={{
            tabBarButton: () => null, // Hide the tab button
            tabBarLabelStyle: { display: "none" }, // Hide the tab label
          }}
        />
        <Tab.Screen
          name="ticket"
          component={token ? TicketScreen : LoginScreen}
          options={{
            tabBarLabel: "ticket",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="ticket" size={34} color="#FFB703" />
              ) : (
                <Entypo
                  name="ticket"
                  size={28}
                  color="white"
                  style={{ margin: 0 }}
                />
              ),
            tabBarLabelStyle: {
              fontSize: 13,
              fontWeight: "600",
              color: "#FFB703",
            },
          }}
        />

        <Tab.Screen
          name="Profile"
          component={token ? ProfileScreen : LoginScreen }
          options={{
            tabBarLabel: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={30} color="#FFB703" />
              ) : (
                <Ionicons name="person-outline" size={28} color="white"/>
              ),
            tabBarLabelStyle: {
              fontSize: 13,
              fontWeight: "600",
              color: "#FFB703",
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeH"
          component={WelcomeH}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="main"
          component={BotttomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="see all"
          component={Seeallticket}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="payment"
          component={Screenpayment}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="tikcet"
          component={TicketScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Reg"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="qr"
          component={Qrpurche}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profile"
          component={token ? ProfileScreen : LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="setting"
          component={Setting}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="help"
          component={Help}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
const styles = StyleSheet.create({
  bottomTabBar: {
    backgroundColor: "black",
    borderTopWidth: 0,
    position: "absolute",
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",

    shadowRadius: 10,
    elevation: 10,
  },
});