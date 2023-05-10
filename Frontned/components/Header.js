import styled from 'styled-components';
import { FONTS, SIZES, COLORS, icons, images } from '../constants'
import { McText, McIcon, McAvatar } from '../comp'
import { Text, View, StyleSheet, Button, SafeAreaView, Image, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';


const Header = () => {
    const today = new Date();
    const dateString = today.toDateString()
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

            <SectionHeader style={{ marginTop: -43, marginLeft: 15 }}>
                <SectionSearch >
                    <SearchView >

                        <TextInput style={{ width: 230, color: "white", fontSize: 17, }} placeholder="Search For events" placeholderTextColor={COLORS.lightGray} ></TextInput>
                        <McIcon source={icons.search}></McIcon>
                    </SearchView>


                </SectionSearch>
            </SectionHeader>


        </SafeAreaView>
    );
};
const SectionHeader = styled.View`
padding : 15px ${SIZES.padding};
justify-content : space-between;
fontSize:30px;
flex-direction:row




`;

const SectionSearch = styled.View`
margin: 15px ${SIZES.padding};
margin-left : 5px
height: 48px;
background-color: ${COLORS.input};
border-radius: 15px;



`;

const SearchView = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-top:15px
padding-right:18px
padding-left:20
color:white



`;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,

    },
});

export default Header;