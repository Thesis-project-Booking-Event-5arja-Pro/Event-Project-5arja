import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const updateUser = (userData, token) => {
    setUser(userData);
    setToken(token);
  };

 
  return (
    <AuthContext.Provider value={{ user, token, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
