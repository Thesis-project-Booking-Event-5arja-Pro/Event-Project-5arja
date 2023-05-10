import React, { useLayoutEffect } from 'react'
import { withExpoSnack } from 'nativewind';
import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, ImageBackground, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const TicketScreen = ({ route }) => {
  const { item } = route.params;

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
        <View>
        </View>
      </ScrollView>
    </View>
  )
}

export default TicketScreen;
