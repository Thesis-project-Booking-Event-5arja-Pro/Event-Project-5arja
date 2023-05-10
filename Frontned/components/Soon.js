import { View, Text } from 'react-native'
import React from 'react'
import { color } from 'react-native-reanimated'
import { AntDesign } from '@expo/vector-icons';

const Feautred = () => {
    return (
        <View style={{}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ color: "white", fontSize: 22, fontWeight: 'bold', marginRight: 290 }}>Soon</Text>
                <AntDesign name="rightcircleo" size={24} color="white" style={{ marginTop: 20 }} />
            </View>
            <Text style={{ color: "white", fontSize: 12, }}>desc slmsdsb</Text>
        </View>

    )
}

export default Feautred