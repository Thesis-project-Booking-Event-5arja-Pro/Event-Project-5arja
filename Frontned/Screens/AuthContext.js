import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [profileIMG, setProfileIMG] = useState(null);
  const [emailAuth, setEmailAuth] = useState("");
  const updateUser = (userData, token, image) => {
    setUser(userData);
    setToken(token);
    setProfileIMG(image);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        updateUser,
        profileIMG,
        setProfileIMG,
        setEmailAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
