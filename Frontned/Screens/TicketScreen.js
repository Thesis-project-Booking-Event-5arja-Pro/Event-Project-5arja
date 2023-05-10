import { View, Text, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { withExpoSnack } from 'nativewind';
import { useNavigation } from "@react-navigation/native";
import { tailwind } from 'react-native-tailwindcss';


const TicketScreen = ({ route }) => {
    const { item } = route.params;
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Ticket.com',
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "white"


            },
            headerStyle: {
                backgroundColor: "black",
                opacity: 0.7,
                height: 110


            },

        })

    }, [])


    return (
        <View className="flex-1 items-center justify-center  bg-white">

            <Image source={{ uri: item.title }} style={{ width: 200, height: 200 }} />
            <Text className="text-3xl">dsd</Text>
        </View>
    )
}

export default TicketScreen