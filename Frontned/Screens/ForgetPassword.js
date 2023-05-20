import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, Alert } from "react-native";
import { Input, Box, Button } from "native-base";
import axios from "axios"

const ForgetPassword = () => {
  const [emailValid, setEmailValid] = useState("");

  const handleForgetPassword = async () => {
    try {
      const response = await axios.post(
        `http://${URL}:5000/api/client/resetpassword`,
        { email: emailValid }
      );
      console.log(response.data);
      // Display success message or alert
      Alert.alert("Success", "Password reset email sent successfully");
    } catch (error) {
      console.log(error);
      // Display error message or alert
      Alert.alert("Error", "Failed to send password reset email");
    }
  };

  const handleEmailChange = (text) => {
    setEmailValid(text);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ backgroundColor: "black", padding: 10 }}>
          <View>
            <View style={{ marginTop: 250 }}>
              <Box alignItems="center">
                <Input
                  mx="3"
                  placeholder="email@gmail.com"
                  w="100%"
                  value={emailValid}
                  onChangeText={handleEmailChange}
                />
              </Box>
              <Box alignItems="center">
                <Button onPress={handleForgetPassword}>Click Me</Button>
              </Box>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgetPassword;
