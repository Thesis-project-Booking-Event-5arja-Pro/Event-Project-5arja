import React, { useLayoutEffect, useState } from 'react'
import { withExpoSnack } from 'nativewind';
import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";


import { Fontisto } from '@expo/vector-icons';



const TicketScreen = ({ route }) => {
  const { item } = route.params;
  console.log(item);

  const [showCalendar, setShowCalendar] = useState(false); 
  
const rbk = {
  latitude: item.latitude,
  longitude: item.longitude,
};

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView>
        <ImageBackground
          resizeMode="cover"
          source={{ uri: item.title }}
          style={{ width: "100%", height: 360, opacity: 0.9 }}
        >
          <View style={{ position: 'absolute', top: 30, left: 10 }}>
            <Ionicons name='share-outline' size={30} color='white' />

          </View>
          <View style={{ position: 'absolute', top: 35, right: 10 }}>
            <Ionicons name='heart-outline' size={30} color='white' />

          </View>


        </ImageBackground>

        <Text style={{ color: 'white', fontSize: 28, marginTop: -85, marginLeft: 20 }}>{item.name}</Text>
        <Text style={{ color: "grey", fontSize: 14, marginLeft: 23 }}> Starting at 9:00Am</Text>

        <TouchableOpacity style={{
          backgroundColor: "grey",
          borderRadius: 5,
          padding: 10,
          margin: 10,
          alignSelf: 'flex-end',
          display: "flex",
          textAlign: "left", marginTop: -30
        }} onPress={() => setShowCalendar(!showCalendar)}>
          <Text style={styles.buttonText}>See date         <Fontisto name="date" size={22} color="white" /></Text>


        </TouchableOpacity>

        {showCalendar && (
          <Calendar style={{backgroundColor:"white"}}

            markedDates={{
              [item.date]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
            }}
          />
        )}




<View style={{ marginTop: 30 }}>
  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
    <View style={{ flex: 1, borderBottomWidth: 1, borderColor: "white", marginRight: 15 }}></View>
    <Text style={{ color: "white", fontSize: 20 }}>About this event</Text>
    <View style={{ flex: 1, borderBottomWidth: 1, borderColor: "white", marginLeft: 15 }}></View>
  </View>
  <Text style={{ color: "white", fontSize: 16 }}>{item.desc}</Text>
</View>

<View style={{ marginTop: 30 }}>
  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
    <View style={{ flex: 1, borderBottomWidth: 1, borderColor: "white", marginRight: 15 }}></View>
    <Text style={{ color: "white", fontSize: 20 }}>Line up</Text>
    <View style={{ flex: 1, borderBottomWidth: 1, borderColor: "white", marginLeft: 15 }}></View>
  </View>
  <Text style={{ color: "white", fontSize: 16 }}>{item.lineup}</Text>
</View>



<View style={{ marginTop: 30 }}>
  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
    <View style={{ flex: 1, borderBottomWidth: 1, borderColor: "white", marginRight: 15 }}></View>
    <Text style={{ color: "white", fontSize: 20 }}>Location</Text>
    <View style={{ flex: 1, borderBottomWidth: 1, borderColor: "white", marginLeft: 15 }}></View>

  </View>

</View>
<View >
    <MapView
  style={{width:"100%", height:220 , backgroundColor:"black" ,}}
      initialRegion={{
        ...rbk,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }} 
    >
      <Marker coordinate={rbk} />
    </MapView>
  </View>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1E90FF',
    borderRadius: 100,
    padding: 10,
    margin: 10,
    alignSelf: 'center',
    opacity: 0.1
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -3,

  },
});

export default TicketScreen;
