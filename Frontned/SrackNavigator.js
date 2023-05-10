// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from "@react-navigation/native";
// import HomeScreen from './Screens/HomeScreen';
// import ProfileScreen from './Screens/ProfileScreen';
// import TicketScreen from './Screens/TicketScreen';
// import { Ionicons } from '@expo/vector-icons';
// import { AntDesign } from "@expo/vector-icons";
// import tailwind from 'react-native-tailwindcss';
// import { Entypo } from "@expo/vector-icons";
// import { BlurView } from 'expo-blur';
// import Seeallticket from './Screens/Seeallticket';
// import LoginScreen from './Screens/LoginScreen'
// import WelcomeH from './Screens/WelcomeH'
// import { Hidden } from 'native-base';



// const SrackNavigator = () => {
//     const Tab = createBottomTabNavigator();
//     const Stack = createNativeStackNavigator();
//     function BotttomTabs() {
//         return (
//             <Tab.Navigator
//                 screenOptions={{
//                     tabBarStyle: styles.bottomTabBar,

//                 }}
//             >
//                 <Tab.Screen
//                     name="Home"
//                     component={HomeScreen}
//                     options={{
//                         tabBarLabel: "Home",
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) =>
//                             focused ? (
//                                 <Entypo name="home" size={34} color="#FFB703" style={{ margin: 0 }} />
//                             ) : (
//                                 <AntDesign name="home" size={28} color="white" style={{ margin: 0 }} />
//                             ),
//                         tabBarLabelStyle: {
//                             fontSize: 13,
//                             fontWeight: "600",

//                             color: '#FFB703',
//                         },
//                     }}
//                 />

//                 <Tab.Screen
//                     name="ticket"
//                     component={TicketScreen}
//                     options={{
//                         tabBarLabel: "ticket",
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) =>
//                             focused ? (
//                                 <Entypo name="ticket" size={34} color="#FFB703" />
//                             ) : (
//                                 <Entypo name="ticket" size={28} color="white" style={{ margin: 0 }} />
//                             ),
//                         tabBarLabelStyle: {
//                             fontSize: 13,
//                             fontWeight: "600",



//                             color: '#FFB703',
//                         },
//                     }}
//                 />
//                 <Tab.Screen
//                     name="Profile"
//                     component={LoginScreen}
//                     options={{
//                         tabBarLabel: "Profile",
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) =>
//                             focused ? (
//                                 <Ionicons name="person" size={30} color="#FFB703" />

//                             ) : (
//                                 <Ionicons name="person-outline" size={28} color="white" />
//                             ),
//                         tabBarLabelStyle: {
//                             fontSize: 13,
//                             fontWeight: "600",



//                             color: '#FFB703',

//                         },
//                     }}
//                 />

//             </Tab.Navigator>
//         )

//     }



//     return (
//         <NavigationContainer>
//             <Stack.Navigator>
//                 <Stack.Screen name="WelcomeH" component={WelcomeH} options={{ headerShown: false }} />

//                 <Stack.Screen name="main" component={BotttomTabs} options={{ headerShown: false }} />
//                 <Stack.Screen name="see all" component={Seeallticket} options={{ headerShown: false }} />
//                 <Stack.Screen name="tikcet" component={TicketScreen} options={{ headerShown: false }} />
//                 <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }

// export default SrackNavigator
// const styles = StyleSheet.create({
//     bottomTabBar: {
//         backgroundColor: 'transparent',
//         borderTopWidth: 0,
//         position: 'absolute',
//         height: 90,
//         justifyContent: 'center',
//         alignItems: 'center',
//         shadowColor: 'black',
//         shadowOpacity: 0.2,
//         shadowRadius: 10,
//         elevation: 10,
//     },
// });

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import TicketScreen from './Screens/TicketScreen';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Seeallticket from './Screens/Seeallticket';
import LoginScreen from './Screens/LoginScreen';
import WelcomeH from './Screens/WelcomeH';
import Singnup from './Screens/Singnup'



const StackNavigator = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();
  
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
                  <Entypo name="home" size={34} color="#FFB703" style={{ margin: 0 }} />
                ) : (
                  <AntDesign name="home" size={28} color="white" style={{ margin: 0 }} />
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
            component={Singnup}
            options={{
              tabBarButton: () => null, // Hide the tab button
              tabBarLabelStyle: { display: "none" }, // Hide the tab label
            }}
          />
          <Tab.Screen
            name="ticket"
            component={TicketScreen}
            options={{
              tabBarLabel: "ticket",
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Entypo name="ticket" size={34} color="#FFB703" />
                ) : (
                  <Entypo name="ticket" size={28} color="white" style={{ margin: 0 }} />
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
            component={LoginScreen}
            options={{
              tabBarLabel: "Profile",
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Ionicons name="person" size={30} color="#FFB703" />
                ) : (
                  <Ionicons name="person-outline" size={28} color="white" />
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
          <Stack.Screen name="WelcomeH" component={WelcomeH} options={{ headerShown: false }} />
          <Stack.Screen name="main" component={BotttomTabs} options={{ headerShown: false }} />
          <Stack.Screen name="see all" component={Seeallticket} options={{ headerShown: false }} />
          <Stack.Screen name="tikcet" component={TicketScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
  export default StackNavigator;
   const styles = StyleSheet.create({
         bottomTabBar: {
             backgroundColor: 'transparent',
             borderTopWidth: 0,
             position: 'absolute',
             height: 90,
             justifyContent: 'center',
             alignItems: 'center',
             shadowColor: 'black',
            shadowOpacity: 0.2,
         shadowRadius: 10,
            elevation: 10,
     },
     });
    