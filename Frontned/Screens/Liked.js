import { View, Text, SafeAreaView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { Avatar, Button, Card } from "react-native-paper";
import URL from "../api/client";
import { ScrollView } from "native-base";
const Liked = () => {
  const [likes, setLikes] = useState([]);
  const { user } = useContext(AuthContext);
  const email = user.email;
  console.log(user.email);
  useEffect(() => {
    axios
      .get(`http://${URL}:5000/api/likes/${email}`)
      .then((res) => {
        setLikes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(likes);

  return (
    <ScrollView style={{ backgroundColor: "black", flex: 1 }}>
      <View>
        {likes.map((e, i) => (
          <Card style={{ backgroundColor: "white",padding:5 }}>
            <Card.Title />
            <Card.Content>
              <Text variant="titleLarge">{e.title}</Text>
              <Text variant="bodyMedium">{e.description}</Text>
            </Card.Content>
            <Card.Cover source={{ uri: e.img }} />
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

export default Liked;
