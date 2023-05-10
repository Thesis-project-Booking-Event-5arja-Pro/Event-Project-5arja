import { Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Render from '../components/Render';
import { ScrollView } from 'react-native-gesture-handler';
import Feautred from '../components/Feautred'
import Soon from '../components/Soon'
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Nearyou from '../components/Nearyou';




const HomeScreen = () => {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();

  Location.setGoogleApiKey("AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg");

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location:");
      console.log(currentLocation);
    };
    getPermissions();
  }, []);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons name="notifications" size={24} color="white" style={{ marginRight: 20 }} />

      )


    })

  }, [])

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
      <Header />
      <Render />

     

        <Feautred   />
        <Soon />
        <Nearyou/>
      

    </ScrollView>
  )
}

export default HomeScreen