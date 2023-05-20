import React from 'react';
import { Text, View, ImageBackground, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const DATA = [
    { id: '1', title: 'https://scenenoise.com/Content/Articles/Big_image/636760584956336181_F59B6982-F337-4EC6-9D39-B811FC0D25B8.jpeg', latitude: 45.8942635655478289, longitude: 10.18710378287, date: "2023-05-21" },
    { id: '2', title: 'https://static01.nyt.com/images/2014/02/17/world/TUNIS-1/TUNIS-1-articleLarge.jpg?quality=75&auto=webp&disable=upscale', latitude: 36.89426356478289, longitude: 10.18710378287, date: "2023-05-21" },
    { id: '3', title: 'https://cdn.sanity.io/images/ifm9m55z/production/ecbb684527dd250c0e23c905276f3be4d50033b6-4800x6000.jpg', latitude: 36.89426356478289, longitude: 10.18710378287, date: "2023-08-22" },
    { id: '4', title: 'https://cdn.sanity.io/images/ifm9m55z/production/ecbb684527dd250c0e23c905276f3be4d50033b6-4800x6000.jpg', latitude: 36.89426356478289, longitude: 10.18710378287, date: "2023-08-21" },
    { id: '5', title: 'Item 5' },
];

const Soon = () => {
    const now = new Date();
    const soonDate = new Date();
    soonDate.setDate(now.getDate() + 20);

    const renderItem = ({ item }) => {
        return (
            <View style={{}}>
                <ImageBackground source={{ uri: item.title }} style={{ width: 250, height: 200  ,marginLeft: 15 , borderRadius:5}}>
                    <Text style={{ color: 'white', fontSize: 18 }}>{item.date}</Text>
                </ImageBackground>
            </View>
        );
    };


    const soonEvents = DATA.filter(event => {
        const eventDate = new Date(event.date);

        return eventDate >= now && eventDate <= soonDate;
    }
    )
    return (
        <View style={{}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop:20 }}>
                
                <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', marginRight: 320  }}>Soon</Text>
                <AntDesign name="rightcircleo" size={24} color="white" style={{ marginTop: 20 , marginBottom:8}} />
            </View>
            <FlatList
                horizontal
                contentContainerStyle={{}}
                data={soonEvents}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />

        </View>
    );
};

export default Soon;
