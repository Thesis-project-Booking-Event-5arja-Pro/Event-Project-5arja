import React, { useState, useEffect, useContext } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground
} from "react-native";
import { Button, Modal, HStack, VStack, Center, FlatList } from "native-base";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import URL from "../api/client";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const W = Dimensions.get("window").width;

const MyTickets = () => {
  const [selectedPrinter, setSelectedPrinter] = React.useState();
  const { user } = useContext(AuthContext);
  
  const [myTickets, setMyTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const email = user.email;

  useEffect(() => {
    axios
      .get(`http://${URL}:5000/api/booking/${email}`)
      .then((res) => {
        setMyTickets(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const printToFile = async (item) => {
    const html = `
    <html>
    <head>
        <style>
            @page {
                size: A4;
                margin: 0;
            }
    
            body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                padding: 20px;
            }
    
            .logo {
                position: relative;
                margin: 0 auto;
                width: 100%;
                height: 200px;
                background-image: url("${item.img}");
                background-size: cover;
                background-position: center;
        
            }
    
            .logo img {
                max-width: 150px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
    
            .ticket {
                width: 600px;
                height: 700px;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                border: 1px solid #ccc;
                margin: 0 auto;
            }
    
            .event-info {
                margin-bottom: 20px;
                text-align: center;
            }
    
            .event-info h2 {
                margin-bottom: 10px;
                font-size: 24px;
            }
    
            .event-info p {
                margin: 5px 0;
                color: #555;
            }
    
            .user-info {
                margin-top: 20px;
            }
    
            .user-info p {
                margin-bottom: 5px;
                color: #555;
            }
    
            .qr-code {
                text-align: center;
                margin-top: 30px;
            }
    
            .qr-code img {
                max-width: 200px;
            }
        </style>
    </head>
    <body>
        <div class="ticket">
            <div class="logo">
               
            </div>
            <div class="event-info">
                <h2>Event ${item.title}</h2>
                <p>Date: ${item.data}</p>
                <p>Time: ${item.start_time}${item.end_time}</p>
                <p>Location: ${item.location}</p>
            </div>
            <div class="user-info">
                <p><strong>Name:</strong>${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Order ID:</strong> ${user.phone_number}</p>
            </div>
            <div class="qr-code">
                <img src="https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png" alt="QR Code">
            </div>
        </div>
    </body>
    </html>
    
    
    `;
    
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: "100%",
        minHeight: "100%",
        paddingVertical: 20,
        position: "relative",
        backgroundColor: "black",
      }}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>My Tickets</Text>
      </View>
      <FlatList
        style={styles.container}
        data={myTickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <View style={styles.imageBg}>
              <View
                style={{
                  backgroundColor: "transparent",
                  alignItems: "center",
                  marginBottom: 10,
                  borderRadius: 25,
                }}
              >
                <Image style={styles.itemImage} source={{ uri: item.img }} />
                <View style={{ position: "absolute", top: 25 }}></View>
                <View style={styles.itemInner}>
                  <Text style={styles.itemName}>{item.title}</Text>
                  <Text style={styles.itemSaleOff}>{item.price} DT</Text>
                </View>
              </View>
            </View>
            <Center>
              <Button
                style={{ position: "absoluter" }}
                onPress={() => setShowModal(true)}
              >
                Check your Ticket
              </Button>
              <View>
                <Modal
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                  size="lg"
                >
                  <Modal.Content
                    style={{ backgroundColor: "black" }}
                    maxWidth="350"
                  >
                    <Modal.CloseButton />
                    <Modal.Header style={{ backgroundColor: "black" }}>
                      <Text style={{ color: "white" }}>Your Ticket</Text>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: "black" }}>
                      <VStack space={3}>
                        <HStack alignItems="center" justifyContent="space-between">
                          <ImageBackground style={{ width: 150, height: 150 }} source={{ uri: "https://www.techopedia.com/wp-content/uploads/2023/03/aee977ce-f946-4451-8b9e-bba278ba5f13.png" }} />
                          <Text fontWeight="medium" style={{ color: "white" }}>
                            Price
                          </Text>
                          <Text style={{ color: "white" }}>
                            {item.price}.00 DT
                          </Text>
                        </HStack>
                      </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        flex="1"
                        style={{ color: "white", backgroundColor: "gray" }}
                        onPress={() => printToFile(item)} // Pass the item data as a parameter
                      >
                        Continue
                      </Button>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>
              </View>
            </Center>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center", color: "white" }}>
            No tickets found...
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default MyTickets;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingHorizontal: 5,
    borderRadius: 35,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingBottom: 20,
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
    flex: 1,
  },
  itemImage: {
    width: (W - 60) / 2,
    height: (W - 40) / 2,
    backgroundColor: "blue",
    marginLeft: 160,
  },
  itemContainer: {
    marginRight: 20,
  },
  itemPrice: {
    fontWeight: "bold",
    fontSize: 18,
    padding: 10,
  },
  itemPriceOriginal: {
    color: "gray",
    fontWeight: "500",
    fontSize: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: -9,
  },
  itemInner: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "space-between",
    padding: 12,
  },
  imageBg: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  itemTime: {
    color: "#eee",
    fontWeight: "600",
    fontSize: 14,
  },
  itemSaleOff: {
    fontWeight: "normal",
    color: "white",
    alignItems: "center",
    alignSelf: "center",
    padding: 5,
    marginLeft: -280,
  },
});
