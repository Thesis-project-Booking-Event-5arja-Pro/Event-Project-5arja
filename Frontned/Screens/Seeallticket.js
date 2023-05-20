import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, Pressable , TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import { useNavigation } from '@react-navigation/native'
const { width } = Dimensions.get('window');

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    axios.get('http://192.168.104.3:5000/api/event/getAllevent')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleNav = (event) => {
    navigation.navigate('ticket', { item: event });
  };


  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={25} color="orange" />
        <TextInput
          style={styles.search}
          value={search}
          onChangeText={setSearch}
          placeholder="Search Events"
        />
        <Text style={styles.searchButton} onPress={() => console.log('Search pressed')}>Search</Text>
      </View>
      <ScrollView>
        {events.filter(event => event.eventName.toLowerCase().includes(search.toLowerCase())).map((event) => (
          <View key={event.id} style={styles.event}>
        <TouchableOpacity onPress={() => handleNav(event)} activeOpacity={0.6}>
  <Image source={{ uri: event.img }} style={styles.image} />
</TouchableOpacity>
            <Text style={styles.title}>{event.eventName}</Text>
            <Text style={styles.date}>{event.start_time}</Text>
         
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  search: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: 'orange',
    paddingLeft: 10,
    color: '#FFFFFF',
    fontSize: 18,
    borderRadius: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 8,
    color: '#1A1A1A',
    fontSize: 12,
  },
  image: {
    width: width - 20,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 10,
    backgroundColor: '#1A1A1A',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 12,
    backgroundColor: 'grey',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity:1,
    shadowRadius: 15,
    
    textAlign: 'center',
  },
});

export default EventList;
