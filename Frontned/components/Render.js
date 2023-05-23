import { View, Text, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

const Render = ({ data }) => {
  const navigation = useNavigation();

  const handleSeeAllPress = () => {
    navigation.navigate('see all');
  };

  const handleImagePress = (item) => {
    navigation.navigate('TicketScreen', { item }); // Pass the item as a parameter to the 'ticket' screen
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const renderItem = ({ item }) => (<>
   {item && <TouchableOpacity onPress={() => handleImagePress(item)} activeOpacity={0.6}>
      <View>
        <ImageBackground source={{ uri: item.img }} borderRadius={20} resizeMode='cover' style={{ width: 330, height: 380, marginTop: 20, marginLeft: 20 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 20, marginTop: -80 }}>
          <View style={{ position: 'absolute', top: -30, left: 20, marginTop: -30 }}>
            <Text style={{ fontWeight: 'bold', color: 'white', marginTop: -20 }}>{item.eventName}</Text>
            <Text style={{ fontWeight: 'bold' }}>{formatDate(item.start_time)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>}
    </>
  );

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
        <Text style={{ marginLeft: 10, fontSize: 17, fontWeight: '700', marginTop: 60 }}>POPULAR EVENTS</Text>
        <TouchableOpacity onPress={handleSeeAllPress}>
          <Text style={{ marginLeft: 188, textDecorationLine: 'underline', marginTop: 55 }}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        contentContainerStyle={{}}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} // Ensure the key is a string
      />
    </View>
  );
};

export default Render;
