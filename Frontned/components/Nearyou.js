import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const Nearyou = () => {
  return (
    <View style={{ }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Text style={{ color: "white", fontSize: 22, fontWeight: 'bold', marginRight: 280 }}>Near you</Text>
        <AntDesign name="rightcircleo" size={24} color="white" style={{ marginTop: 20 }} />
    </View>


</View>
  )
}

export default Nearyou