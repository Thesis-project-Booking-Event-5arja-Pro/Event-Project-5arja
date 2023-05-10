import React, { useState } from 'react';
import { Button,  TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import {  Text,  TouchableOpacity, StyleSheet,SafeAreaView,KeyboardAvoidingView, Pressable, Dimensions } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { useNavigation } from '@react-navigation/native';
const AddUserScreen = ({navigation}) => {
    // const navigation=useNavigation()
  const dbRef = db.collection('kharja');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const togglePasswordVisibility = () => {
    setIsHidden(!isHidden);
  };
  const storeUser = () => {
    if (name === '') {
      alert('Fill at least your name!');
    } else {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, pass);
      dbRef
        .add({
          name:name,
          email:email,
          pass:pass
        })
        .then((res) => {
          setName('');
          setEmail('');
          setPass('');
          setIsLoading(false);
          navigation.navigate('Login');
        })
        .catch((err) => {
          console.error('Error found: ', err);
          setIsLoading(false);
        });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{
        flex: 2,
        backgroundColor: "black",
        padding: 10,
        alignItems: "center",
      }} >
        <KeyboardAvoidingView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
            }}>
            <Text
              style={{fontFamily:"Boba Milky", color: "white", fontSize: 17, fontWeight: "700" }}
            >
             Hello 👋 
            </Text>
           
          </View>
          {/*  email view */}
          <View style={{ marginTop: 50 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                Name
              </Text>
              <TextInput
                value={name}
                onChangeText={(text) => setName({text})}
                placeholder="enter name"
                placeholderTextColor={"grey"}
                style={{
                  fontSize: email ? 18 : 18,
                  borderRadius: 10,
                  borderColor: "white",
                  backgroundColor:"white",
                  borderWidth: 1,
                  marginVertical: 10,
                  width: '100%',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  paddingRight: 30,
                  borderRadius:30,
                }}
              />
            <View>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail({text})}
                placeholder="enter email"
                placeholderTextColor={"grey"}
                style={{
                  fontSize: email ? 18 : 18,
                  borderRadius: 10,
                  borderColor: "white",
                  backgroundColor:"white",
                  borderWidth: 1,
                  marginVertical: 10,
                  width: '100%',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  paddingRight: 30,
                  borderRadius:30,
                }}
              />
            </View>
          </View>
          {/*  password view */}
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              password
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextInput
                  value={pass}
                  onChangeText={(text) => setPass(text)}
                  placeholder="enter password"
                  placeholderTextColor={"grey"}
                  style={{
                    fontSize: pass ? 18 : 18,
                    borderRadius: 10,
                    borderColor: "white",
                    borderWidth: 1,
                    marginVertical: 10,
                    backgroundColor:"white",
                    width: '100%',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    flex: 1,
                    paddingRight: 30,
                    borderRadius:50
                  }}
                  secureTextEntry={isHidden}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: 10,
                    height: "100%",
                    justifyContent: "center",
                  }}>
                  <Icon
                    name={isHidden ? "eye-slash" : "eye"}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* forget password text button */}
          <Text
            onPress={() => console.log('forget')}
            style={{
              textAlign: 'right', color: 'red'
            }}>
            forget password ?
          </Text>
          <Text
            onPress={()=>navigation.navigate("Login")}
            style={{
              textAlign: 'left', color: 'white'
            }}>
        already have an account ?
          </Text>
          <View>
            {/* <Checkbox label="Remember me"  /> */}
  
          </View>
          {/* login button */}
          <Pressable
            onPress={() => console.log('login')}
            style={{
              width: 350,
              backgroundColor: "#003580",
              padding: 20,
              borderRadius: 15,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text
              style={{
  
                textAlign: "center",
                color: "white",
                fontSize: 17,
                fontWeight: "bold",
              }} onPress={storeUser}
            >
              Create an account
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 35,
//   },
//   inputGroup: {
//     flex: 1,
//     padding: 0,
//     marginBottom: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#cccccc',
//   },
//   preloader: {
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
});

export default AddUserScreen;
