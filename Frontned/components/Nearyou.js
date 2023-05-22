
import { View, Text, FlatList, ImageBackground, } from 'react-native';
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const DATA = [
  { id: '1', title: 'https://pbs.twimg.com/ext_tw_video_thumb/1632742503672578049/pu/img/-Qqs4xhjoaUdelmf?format=jpg&name=large', latitude: 45.8942635655478289, longitude: 10.18710378287 },
  { id: '2', title: 'https://images.ra.co/c81e9396753156f7d0f34179bcb67291345953b8.jpg', latitude: 36.89426356478289, longitude: 10.18710378287 },
  { id: '3', title: 'https://cdn.sanity.io/images/ifm9m55z/production/ecbb684527dd250c0e23c905276f3be4d50033b6-4800x6000.jpg', latitude: 36.89426356478289, longitude: 10.18710378287 },
  { id: '4', title: 'https://cdn.sanity.io/images/ifm9m55z/production/ecbb684527dd250c0e23c905276f3be4d50033b6-4800x6000.jpg', latitude: 36.89426356478289, longitude: 10.18710378287 },
  { id: '5', title: 'Item 5' },
];
const maxDistance = 10
const Nearyou = ({ latitude, longitude }) => {
  console.log(latitude, longitude);
  const renderItem = ({ item, index }) => (
    <View>
      <ImageBackground
        source={{ uri: item.title }}
        resizeMode='cover'
        borderRadius={5}
        style={{ width: 250, height: 200, marginTop: 20, borderRadius: 80, marginLeft: 15, marginBottom: 105 }}
      >
      </ImageBackground>
    </View>
  );

  const filteredData = DATA.filter(item => {
    if (!item.latitude || !item.longitude) {
      return true;
    }
    const distance = calcDistance(latitude, longitude, item.latitude, item.longitude);
    console.log(distance);
    return distance <= maxDistance;
  });




  return (
    <View style={{}}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Text style={{ color: "white", fontSize: 22, fontWeight: 'bold', marginRight: 290, marginTop:15 }}>Nearest</Text>
        <AntDesign name="rightcircleo" size={24} color="white" style={{ marginTop: 20 }} />
      </View>
      <FlatList
        horizontal
        contentContainerStyle={{}}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />




    </View>
  )
}

export default Nearyou


function calcDistance(lat1, long1, lat2, long2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLong = (long2 - long1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}


const distance = calcDistance(36.89429403027687, 10.187089918936618, 36.6080788, 10.172398);
