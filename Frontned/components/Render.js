import { View, Text, FlatList, ImageBackground, } from 'react-native';
import { FONTS, SIZES, COLORS, icons, images } from '../constants'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { McText, McIcon, McAvatar } from '../comp'

const DATA = [
    { id: '1', title: 'https://themusicessentials.com/wp-content/uploads/2016/11/unnamed-2-15-696x464.jpg' },
    { id: '2', title: 'https://pbs.twimg.com/ext_tw_video_thumb/1579837438280830977/pu/img/uoZK4DCQIP9sO-K8?format=jpg&name=large' },
    { id: '3', title: 'https://pbs.twimg.com/ext_tw_video_thumb/1579837438280830977/pu/img/uoZK4DCQIP9sO-K8?format=jpg&name=large' },
    { id: '4', title: 'https://pbs.twimg.com/ext_tw_video_thumb/1611795399513186308/pu/img/GEhwJfW0cqvrrulP?format=jpg&name=large' },
    { id: '5', title: 'Item 5' },
];

const Render = () => {
    const navigation = useNavigation();

    const handleSeeAllPress = () => {
        navigation.navigate('see all');
    };

    const handleImagePress = (item) => {
        navigation.navigate('tikcet', { item });
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => handleImagePress(item)}>
            <View style={{ marginLeft: 20 }}>
<<<<<<< HEAD
                <ImageBackground source={{ uri: item.title }}  resizeMode='cover' style={{ width: 330, height: 350, marginTop: 20 }} />
=======
                <ImageBackground source={{ uri: item.title }} resizeMode='cover' style={{ width: 330, height: 350, marginTop: 10 }} />
>>>>>>> 7f05c75d92c992ac0a3ac6ca0c9f6845d2dbbf49
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
                <McText dd black style={{ marginLeft: 10, fontSize: 17, fontWeight: 700, marginTop: 10 }}>POPULAR EVENTS</McText>
                <TouchableOpacity onPress={handleSeeAllPress}>
                    <McText style={{ marginLeft: 165, textDecorationLine: 'underline' }}>See all</McText>
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
