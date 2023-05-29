import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [profileIMG, setProfileIMG] = useState(null);
  const [emailAuth, setEmailAuth] = useState("");
  const [Qr, setQR] = useState("");
  const updateUser = (userData, token, image) => {
    setUser(userData);
    setToken(token);
    setProfileIMG(image);
  };

  const signOut = async () => {
    try {
     
      await AsyncStorage.removeItem("userToken");
      setUser("");
      setToken("");
      setProfileIMG(null);
      setEmailAuth("");
      
      
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        updateUser,
        profileIMG,
        setProfileIMG,
        emailAuth,
        setEmailAuth,
        signOut,
        setQR,
        Qr,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
