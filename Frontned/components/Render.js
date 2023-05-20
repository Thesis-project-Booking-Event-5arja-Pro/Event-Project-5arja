import { View, Text, FlatList, ImageBackground, } from 'react-native';
import { FONTS, SIZES, COLORS, icons, images } from '../constants'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { McText, McIcon, McAvatar } from '../comp'


const Render = ({ data }) => {
    const navigation = useNavigation();

    const handleSeeAllPress = () => {

        navigation.navigate('see all');
    };

    const handleImagePress = (item) => {
        navigation.navigate('tikcet', { item });
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


    const renderItem = ({ item, index }) => (

        <TouchableOpacity onPress={() => { console.log(item, "item"), handleImagePress(item) }} activeOpacity={0.6}>
            <View style={{}}>
                <ImageBackground source={{ uri: item.img }} borderRadius={20} resizeMode='cover' style={{ width: 330, height: 380, marginTop: 20, marginLeft: 20 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 20, marginTop: -80 }}>
                    <View style={{ position: "absolute", top: -30, left: 20, marginTop: -30 }}>
                        <McText h1 style={{ fontWeight: "bold", color: "white", marginTop: -20 }}>{item.eventName}</McText>
                        <McText h4 style={{ fontWeight: "bold" }}>{formatDate(item.start_time)}</McText>
                    </View>

                </View>
            </View>

        </TouchableOpacity>
    );

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                <McText dd black style={{ marginLeft: 10, fontSize: 17, fontWeight: 700, marginTop: 60 }}>POPULAR EVENTS</McText>
                <TouchableOpacity onPress={handleSeeAllPress}>
                    <McText style={{ marginLeft: 188, textDecorationLine: 'underline', marginTop: 55 }}>See all</McText>
                </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                contentContainerStyle={{}}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />



        </View>


    );
};

export default Render;
