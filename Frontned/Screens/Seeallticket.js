import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from 'react'
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";



const DATA = [
    { id: '1', title: 'https://themusicessentials.com/wp-content/uploads/2016/11/unnamed-2-15-696x464.jpg', name: "tale of us1", date: "5/02/20225", lineup: "argey,daniel", localstion: "mexuioscjc", desc: "ras tnbirs" },
    { id: '2', title: 'https://themusicessentials.com/wp-content/uploads/2016/11/unnamed-2-15-696x464.jpg', name: "tale of us2", date: "5/02/20225", lineup: "argey,daniel", localstion: "mexuioscjc", desc: "ras tnbirs" },
    { id: '3', title: 'https://themusicessentials.com/wp-content/uploads/2016/11/unnamed-2-15-696x464.jpg', name: "tale of us3", date: "5/02/20225", lineup: "argey,daniel", localstion: "mexuioscjc", desc: "ras tnbirs" },
    { id: '4', title: 'https://themusicessentials.com/wp-content/uploads/2016/11/unnamed-2-15-696x464.jpg', name: "tale of us4", date: "5/02/20225", lineup: "argey,daniel", localstion: "mexuioscjc", desc: "ras tnbirs" },
];

const Seeallticket = () => {
    return (
        <View style={{ backgroundColor: "black" }}>rr
            <Pressable
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    marginTop: 30,
                    padding: 12,
                    backgroundColor: "black",
                }}
            >
                <Pressable
                    onPress={() => setModalVisibile(!modalVisibile)}
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    <Octicons name="arrow-switch" size={22} color="gray" />
                    <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8, color: "white" }}>
                        sort
                    </Text>
                </Pressable>

                <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="filter" size={22} color="gray" />
                    <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8, color: "white" }}>
                        Filter
                    </Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Map", {
                    searchResults: searchPlaces,
                })} style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesome5 name="map-marker-alt" size={22} color="gray" />
                    <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8, color: "white" }}>
                        Map
                    </Text>
                </Pressable>
            </Pressable>


        </View>)
}

export default Seeallticket