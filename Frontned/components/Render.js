import React from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


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

  const handlefilter = () => {
    if (data) {
      return filtredData = data.filter((e) => e.rating > 3)
    }
    else {
      return data
    }


  }



  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImagePress(item)} activeOpacity={0.6}>
      <View>
        <ImageBackground source={{ uri: item.img }} borderRadius={20} resizeMode='cover' style={{ width: 330, height: 380, marginTop: 20, marginLeft: 20 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 20, marginTop: -80 }}>
          <View style={{ position: 'absolute', top: -30, left: 20, marginTop: -30 }}>
            <View style={styles.dateContainer}>
              <Text style={{ fontWeight: 'bold', color: 'white', marginTop: -20, fontSize: 26 }}>{item.title}</Text>
              <Text style={styles.dateText}>{formatDate(item.start_time)}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
        <Text style={{ marginLeft: 10, fontSize: 17, fontWeight: '700', marginTop: 60, color: "white" }}>POPULAR EVENTS</Text>
        <TouchableOpacity onPress={handleSeeAllPress}>
          <Text style={{ marginLeft: 188, textDecorationLine: 'underline', marginTop: 55, color: "white" }}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        contentContainerStyle={{}}
        data={handlefilter()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
    opacity: 0.8,
    padding: 3,
    paddingTop: 20,
    paddingHorizontal: 5,
    marginTop: -4
  },
  dateText: {
    fontSize: 15.6,
    marginLeft: -75,
    color: 'grey',
  },
});

export default Render;
