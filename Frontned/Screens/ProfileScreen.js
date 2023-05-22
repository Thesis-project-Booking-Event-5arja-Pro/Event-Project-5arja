import React, { useContext, useState, useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  View,
  Pressable,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import tailwind from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";
import * as ImagePicker from "expo-image-picker/src/ImagePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar } from "native-base";
import { Center, Actionsheet, useDisclose } from "native-base";
import axios from "axios";
import URL from "../api/client";
import { Entypo } from "@expo/vector-icons";
import Setting from "./Setting";
import { Divider } from "native-base";
export default function ProfileScreen() {
  const navigation = useNavigation();
  const { updateUser, user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclose();
  const { setProfileIMG } = useContext(AuthContext);
  const { profileIMG } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const windowWidth = Dimensions.get("window").width;
  const { signOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut();
      navigation.navigate("Login")
    
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImage(uri);
      setProfileIMG(uri);
    }
  };
 
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      setImage(uri);
      handleSave(uri);
      setProfileIMG(uri);
    } else {
      console.log("Image selection canceled.");
    }
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append("profile-image", {
      uri: image,
      type: "image/jpeg",
      name: "profile-image.jpg",
    });
    try {
      const response = await axios.post(
        `${URL}/api/image-upload/uploadFile`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleSave(uri);
      setProfileIMG(uri);
      setImage(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const selectImage = () => {
    onOpen();
  };
  const handlenavtoedit = () => {
    navigation.navigate("setting");
  };
const handleFavoUser=()=>{
  navigation.navigate("liked")
}
  return (
    <SafeAreaView style={tailwind`flex-1 bg-black`}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable style={{flexDirection:"column-reverse" , marginLeft:350}} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#fff" />
        </Pressable>
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <Center>
              <View style={{ width: 50, marginLeft: -75, borderRadius: 25 }}>
                <Pressable onPress={onOpen}>
                  <Avatar
                    bg="white"
                    size="2xl"
                    source={{
                      uri: profileIMG,
                    }}
                  ></Avatar>
                </Pressable>

                <Center>
                  <View onPress={selectImage}>
                    <Actionsheet isOpen={isOpen} onClose={onClose}>
                      <Actionsheet.Content>
                        <Actionsheet.Item onPress={takePhoto}>
                          Take Photo
                        </Actionsheet.Item>
                        <Actionsheet.Item onPress={pickImage}>
                          Choose from Gallery
                        </Actionsheet.Item>
                      </Actionsheet.Content>
                    </Actionsheet>
                  </View>
                </Center>
              </View>
            </Center>

            <Text style={styles.userName}>{user.userName}</Text>
            <View style={styles.userBtnWrapper}>
              <View style={styles.userBtnWrapper}>
                <TouchableOpacity style={styles.userBtn}>
                  <Text style={styles.userBtnTxt} onPress={handlenavtoedit}>
                    Edit profile
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Divider
            my="2"
            _light={{
              bg: "muted.800",
            }}
            _dark={{
              bg: "muted.50",
            }}
          />
          <View style={{borderRadius:25,}}>
          <Text style={styles.userInfoSubTitle}>{user.email}</Text>
          </View>
          <Text style={styles.userInfoSubTitle}>{user.phone_number}</Text>
        </View>
        <Pressable style={tailwind`flex-row gap-2 px-8 mr-63 mt-20`} onPress={handleFavoUser}>
          {/* setting help */}
          <Entypo name="ticket" size={24} color="white" />
          <Text style={tailwind`text-white text-lg `}>event's</Text>
        </Pressable>
        <Pressable style={tailwind`flex-row  gap-2 px-8 mr-66 p-5`}>
          <Ionicons name="help-buoy-outline" size={24} color="#fff" />
          <Text style={tailwind`text-white text-lg`}>Help</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "white",
    textAlign: "center",
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  userBtn: {
    borderColor: "orange",
    borderWidth: 2,
    borderRadius: 3,
    width: 300,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    textAlign: "center",
    color: "orange",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
    padding: 15,
  },
});
