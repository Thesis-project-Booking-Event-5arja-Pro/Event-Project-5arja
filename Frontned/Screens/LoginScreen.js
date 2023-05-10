import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Pressable, Dimensions } from 'react-native';
import { firebase } from 'firebase/auth';
import firestore from 'firebase/firestore';
import { auth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigation } from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './HomeScreen';
const LoginScreen = () => {


  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  ;
  const [error, setError] = useState(null);
  const [SubmitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const togglePasswordVisibility = () => {
    setIsHidden(!isHidden);
  };
  const handleRememberMeChange = (value) => {
    setRememberMe(value);
  };

  const navigation = useNavigation()
  const handleLogin = () => {

    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)

      .then(async (res) => {
        setSubmitButtonDisabled(false);
        console.log("done");
        console.log(res);

        navigation.navigate('HomeScreen')
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
        console.log(err);
      });
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
            style={{ fontFamily: "Boba Milky", color: "white", fontSize: 17, fontWeight: "700" }}
          >
            Hi, Wecome Back! 👋
          </Text>

        </View>
        {/*  email view */}
        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Email
            </Text>
            <TextInput
              value={values.email}
              onChangeText={(text) => setValues({ ...values, email: text })}
              placeholder="enter email"
              placeholderTextColor={"grey"}
              style={{
                fontSize: values.email ? 18 : 18,
                borderRadius: 10,
                borderColor: "white",
                backgroundColor: "white",
                borderWidth: 1,
                marginVertical: 10,
                width: '100%',
                paddingHorizontal: 10,
                paddingVertical: 5,
                paddingRight: 30,
                borderRadius: 30,
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
                value={values.pass}
                onChangeText={(text) => setValues({ ...values, pass: text })}
                placeholder="enter password"
                placeholderTextColor={"grey"}
                style={{
                  fontSize: values.pass ? 18 : 18,
                  borderRadius: 10,
                  borderColor: "white",
                  borderWidth: 1,
                  marginVertical: 10,
                  backgroundColor: "white",
                  width: '100%',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  flex: 1,
                  paddingRight: 30,
                  borderRadius: 50
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
          onPress={() => navigation.navigate("account")}
          style={{
            textAlign: 'left', color: 'white'
          }}>
          create acounte
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
            }}
          >
            Login
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({

});

export default LoginScreen
