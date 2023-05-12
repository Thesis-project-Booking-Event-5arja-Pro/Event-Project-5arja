import { View, Text, FlatList, ImageBackground, } from 'react-native';
import { FONTS, SIZES, COLORS, icons, images } from '../constants'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { McText, McIcon, McAvatar } from '../comp'

const DATA = [
    { id: '1', title: 'https://themusicessentials.com/wp-content/uploads/2016/11/unnamed-2-15-696x464.jpg' ,   latitude: 45.8942635655478289, longitude: 10.18710378287, name:"Tatak dom tak", date: "2023-05-15", lineup: "Sven Väth, Nina Kraviz, Ilario Alicante, Adam Beyer, Richie Hawtin, Craig Richards, DJ Koze, Gerd Janson, Seth Troxler and Ricardo Villalobos.", localstion: "mexuioscjc", desc: "Born in Toronto, Karm moved to Italy when he was just a child. It was at the tender age of ten when his parents took him to a classical concert that he felt “true love at first sight.” He dreamed of becoming a pianist but eventually settled for law school. Matteo left New York when he was just a year old and spent his late teens booking techno artists for his loft parties. After Karm quit law school, the pair met while studying music production at the SAE Institute." },
    { id: '2', title: 'https://imageio.forbes.com/blogs-images/lisakocay/files/2018/09/r85N0KgQ.jpeg?format=jpg&width=1200',latitude: 45.8942635655478289, longitude: 10.18710378287 ,  name:"event chikimama"  , date: "5/02/20225", lineup: "argey,daniel", localstion: "mexuioscjc", desc: "ras tnbirs"},
    { id: '3', title: 'https://themusicessentials.com/wp-content/uploads/2016/11/unnamed-2-15-696x464.jpg', latitude: 45.8942635655478289, longitude: 10.18710378287 ,  name:"event chikombo"   , date: "5/02/20225", lineup: "argey,daniel", localstion: "mexuioscjc", desc: "ras tnbirs" },
    { id: '4', title: 'https://imageio.forbes.com/blogs-images/lisakocay/files/2018/09/r85N0KgQ.jpeg?format=jpg&width=1200' ,  latitude: 45.8942635655478289, longitude: 10.18710378287 , name:"event chbikyaMama"  , date: "5/02/20225", lineup: "argey,daniel", localstion: "mexuioscjc", desc: "ras tnbirs"  },
    { id: '5', title: 'Item 5' },
];
const Render = () => {
    const navigation = useNavigation();

    const handleSeeAllPress = () => {
       
        navigation.navigate('SeeAll');
    };

    const handleImagePress = (item) => {
        navigation.navigate('tikcet', { item });
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => handleImagePress(item)}>
            <View style={{ marginLeft: 20 }}>
                <ImageBackground source={{ uri: item.title }}  resizeMode='cover' style={{ width: 330, height: 350, marginTop: 20 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 20, marginTop: -80 }}>
                    <View>
                        <McText h2>Tale of us</McText>
                        <McText h5 style={{}}>1 dec - jakarta indonesia</McText>
                    </View>
                    <MaterialIcons name="favorite-border" size={30} color="white" style={{}} />
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
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id} 
            />



        </View>


    );
};

export default Render;
