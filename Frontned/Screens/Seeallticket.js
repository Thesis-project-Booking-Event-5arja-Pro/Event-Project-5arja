import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import { useNavigation } from '@react-navigation/native'
import URL from '../api/client';
const { width } = Dimensions.get('window');

const EventList = () => {
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    axios.get(`http://${URL}:5001/api/event/getallevent`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleNav = (event) => {
    navigation.navigate('TicketScreen', { item: event });
  };


  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>

        <TextInput
          style={styles.search}
          value={search}
          onChangeText={setSearch}
          placeholder="Search Events"
          placeholderTextColor="grey"
        />
        <FontAwesome name="search" onPress={() => console.log('Search pressed')} size={19} color="grey" style={{ marginTop: 30, position: "absolute", left: 340, top: 16 }} />

      </View>
      <ScrollView>
        {events.filter(event => event.title.toLowerCase().includes(search.toLowerCase())).map((event) => (
          <View key={event.id} style={styles.event}>
            <TouchableOpacity onPress={() => handleNav(event)} activeOpacity={0.6}>
              <Image source={{ uri: event.img }} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.date}>{formatDate(event.start_time)}</Text>

          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 30,
  },
  search: {
    marginTop: 30,
    flex: 1,
    height: 35,
    borderWidth: 1,
    borderColor: 'grey',
    paddingLeft: 10,
    color: '#FFFFFF',
    fontSize: 18,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    color: "white"
  },

  image: {
    width: width - 20,
    height: 200,
    borderRadius: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 21,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 10,
    backgroundColor: '#1A1A1A',
    padding: 18,
    borderRadius: 10,
    textAlign: 'center',
    paddingBottom: 30

  },
  date: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 12,
    position: "absolute",

    top: 260,
    left: 150,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 15,
    textAlign: 'center',
  },
});

export default EventList;