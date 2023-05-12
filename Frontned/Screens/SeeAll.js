import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

 const EventList = ()=> {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/event/getAllevent')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      {events.map((event) => (
        <View key={event.id} style={styles.event}>
          <Image source={{ uri: event.img }} style={styles.image} />
          <Text style={styles.title}>{event.eventName}</Text>
          <Text style={styles.date}>{event.date}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  event: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: '#999',
  },
});

export default EventList