import { View, Text, SafeAreaView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { Avatar, Button, Card } from "react-native-paper";
import URL from "../api/client";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "native-base";
import { useFonts } from 'expo-font';

const Liked = ({ route }) => {
  const navigation = useNavigation();
  const { delete: delte } = route.params;
  console.log(delte, "friom b");

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const [likes, setLikes] = useState([]);
  const { user } = useContext(AuthContext);
  const email = user.email;
  console.log(user.email);

  useEffect(() => {
    axios
      .get(`http://${URL}:5001/api/likes/${email}`)
      .then((res) => {
        setLikes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [delte]);

  const handleNav = (event) => {
    navigation.navigate("TicketScreen", { item: event });
  };

  return (
    <ScrollView style={{ backgroundColor: "black", flex: 1 }}>
      <View>
        <Text style={{ color: "white", fontSize: 30, marginTop: 50, textAlign: "center", marginBottom: 10, fontWeight: "bold" }}>LIKED EVENTS</Text>
        {likes.length === 0 ? (
          <Text style={{ color: "white", textAlign: "center", fontSize: 23, marginTop: 300 , fontWeight:"bold" ,  fontFamily: 'System' }}>you don't have any likes yet &#x1F60A;</Text>
        ) : (
          likes.map((e, i) => (
            <View key={i}>
              <Card style={{ backgroundColor: "#99A5B7", opacity: "0.8", padding: 5, paddingTop: 10, marginTop: 15, flex: 1, flexDirection: "column", margin: 15, borderRadius: 22 }}>
                <Card.Title />
                <Card.Content>
                  <Text variant="titleLarge" style={{ fontSize: 30, marginTop: -35, fontWeight: "600" }}>{e.title}</Text>
                  <Text variant="bodyMedium" style={{ fontSize: 18, marginBottom: 8 }}>{e.description}</Text>
                  <Text variant="bodyMedium" style={{ fontSize: 18, marginBottom: 8, marginTop: 10 }}> Date: {formatDate(e.start_time.slice(0, 10))}</Text>
                </Card.Content>
                <Card.Cover style={{ width: 300, marginLeft: 40, marginBottom: 10 }} source={{ uri: e.img }} />
                <Button textColor="white" onPress={() => handleNav(e)} style={{ backgroundColor: "black", marginBottom: 10, padding: 3 }}>Get Your Ticket</Button>
              </Card>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default Liked;
