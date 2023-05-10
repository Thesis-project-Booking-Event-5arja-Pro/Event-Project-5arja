import React from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Video, ResizeMode } from 'expo-av';



const WelcomeH = ({ navigation }) => {


    return (

        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
            }}>

            <View style={{ marginTop: 20 }}>

                <Text
                    style={{
              
                        fontWeight: 'bold',
                        fontSize: 30,
                        color: '#20315f',
                    }}>


                </Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Video


                    source={require('../unit/vedio.mp4')}
                    style={{ height: 300, width: 300 }}

                    resizeMode="cover"
                    shouldPlay



                />
            </View>

            <View>


            </View>
            <TouchableOpacity
                style={{
                    backgroundColor: '#FFB703',
                    padding: 20,
                    width: '90%',
                    borderRadius: 10,
                    marginBottom: 50,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
                onPress={() => navigation.navigate('Login')}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 18,
                        textAlign: 'center',
                        fontWeight: 'bold',
                      
                    }}>
                    Book your ticket
                </Text>
                <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: '#FFB703',
                    padding: 20,
                    width: '90%',
                    borderRadius: 10,
                    marginBottom: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: -30,
                    marginBottom: 90
                }}
                onPress={() => navigation.navigate('main')}>

                <Text
                    style={{ 
                        color: 'white',
                        fontSize: 18,
                        textAlign: 'center',
                        fontWeight: 'bold',
            
                    }}>
                    Take a look
                </Text>

                <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />

            </TouchableOpacity>

        </SafeAreaView>
    );
};

export default WelcomeH;
