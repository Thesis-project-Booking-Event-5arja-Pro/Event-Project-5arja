import React, { useState } from "react";
import { StyleSheet, View, Text, ImageBackground, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Frames, CardNumber, ExpiryDate, Cvv, SubmitButton } from "frames-react-native";
import { Video, ResizeMode } from 'expo-av';

export default function Scrennpayment({ route }) {
  const { infopurche } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      {loading ? (
        <View>
         <Video


         source={require('../unit/waitticket.mp4')}
         style={{ height: 350, width: 350 }}

         resizeMode="cover"
         shouldPlay



     />
      
        <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      ) : (
        
        <>
          <Text style={{ color: "white", fontSize: 25, marginBottom: 50 }}>Get your Ticket Now</Text>
          <View style={styles.paymentInfoContainer}>
            <View style={styles.eventInfoContainer}>
              <ImageBackground
                resizeMode="cover"
                source={{ uri: infopurche.img }}
                style={styles.eventImage}
                borderRadius={5}
              />
              <View style={styles.eventDetails}>
                <Text style={styles.eventDate}>Event Date: {infopurche.start_time}</Text>
                <Text style={styles.eventPrice}>Event Price: {infopurche.price} DT</Text>
                <Text style={styles.eventName}>Event name: {infopurche.eventName}</Text>
                <Text style={styles.eventName}>Event localisation: {infopurche.location}</Text>
              </View>
            </View>
          </View>

          <Frames
            config={{
              debug: true,
              publicKey: "pk_test_4296fd52-efba-4a38-b6ce-cf0d93639d8a",
            }}
            cardTokenized={() => {
              setLoading(true); 

              
           
              

              setTimeout(() => {
                setLoading(false);
                navigation.navigate("qr",{event:infopurche});
              }, 5000)
            }}
          >
            <CardNumber
              style={styles.cardNumber}
              placeholderTextColor="#9898A0"
            />

            <View style={styles.dateAndCode}>
              <ExpiryDate style={styles.expiryDate} placeholderTextColor="#9898A0" />
              <Cvv style={styles.cvv} placeholderTextColor="#9898A0" />
            </View>

            <SubmitButton
              title="Pay Now"
              style={styles.button}
              textStyle={styles.buttonText}
              onPress={() => {
               
              
              }}
            />
          </Frames>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 80,
    paddingLeft: 10,
    paddingRight: 10,
  },
  paymentInfoContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
  },
  eventInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventImage: {
    width: 150,
    height: 150,
    borderRadius: 5,
    marginRight: 15,
    borderRadius: 5,
  },
  eventDetails: {
  flex: 1,
  },
  eventDate: {
  color: "white",
  fontSize: 18,
  marginBottom: 5,
  },
  eventPrice: {
  color: "white",
  fontSize: 18,
  },
  eventName: {
  color: "white",
  fontSize: 18,
  marginTop: 5,
  },
  dateAndCode: {
  marginTop: 15,
  flexDirection: "row",
  justifyContent: "space-between",
  },
  cardNumber: {
  fontSize: 18,
  height: 50,
  color: "#FEFFFF",
  backgroundColor: "#1B1C1E",
  borderColor: "#3A4452",
  borderRadius: 5,
  borderWidth: 0,
  },
  expiryDate: {
  fontSize: 18,
  height: 50,
  width: "48%",
  color: "#FEFFFF",
  backgroundColor: "#1B1C1E",
  borderWidth: 0,
  },
  cvv: {
  fontSize: 18,
  height: 50,
  width: "48%",
  color: "#FEFFFF",
  backgroundColor: "#1B1C1E",
  borderWidth: 0,
  },
  button: {
  height: 50,
  borderRadius: 5,
  marginTop: 20,
  justifyContent: "center",
  backgroundColor: "#4285F4",
  },
  buttonText: {
  color: "white",
  fontSize: 16,
  },
  });
  
  
