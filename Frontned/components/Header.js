import styled from 'styled-components';
import { FONTS, SIZES, COLORS, icons, images } from '../constants'
import { McText, McIcon, McAvatar } from '../comp'
import { Text, View, StyleSheet, Button, SafeAreaView, Image, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';









const Header = () => {
    const API_KEY = '244299d2237389563a6bb563cce0b0c25';

    const IPSTACK_API_ENDPOINT = `http://api.ipstack.com/check?access_key=${API_KEY}`;
    const [adress, setAdress] = useState("")

    useEffect(() => {
        fetch(IPSTACK_API_ENDPOINT)
            .then(response => response.json())
            .then(data => {
                setAdress(data.country_code + ',' + data.city);
            })
            .catch(error => console.log(error));

        console.log(adress);


    }, [])


    return (
        <SafeAreaView style={styles.container}>



            <SectionHeader>



                <Image
                    source={{ uri: 'https://www.assyst.de/cms/upload/sub/digitalisierung/15-M.jpg' }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 25,
                        overflow: 'hidden',
                        position: 'absolute',
                        left: 360,
                        top: 20,
                    }}
                />



            </SectionHeader>

            {adress && adress !=="undefined,undefined" && <SectionHeader >





<Text style={{ color: "white", fontSize: 18, marginLeft: 130, marginTop: -15 , fontWeight:"bold" }}>{ adress}</Text>
  <Ionicons name="location" size={23} color="white" style={{ marginTop: -19, marginLeft: 6}} />





</SectionHeader>}

            


        </SafeAreaView>
    );
};
const SectionHeader = styled.View`
padding : 15px ${SIZES.padding};

fontSize:30px;
flex-direction:row




`;










const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,

    },
});

export default Header;