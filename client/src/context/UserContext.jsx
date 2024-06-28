import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isLogIn, setisLogIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('data');
    if (storedUser) {
        setToken(JSON.parse(storedUser).token);
        setUserType(JSON.parse(storedUser).type)
        setisLogIn(JSON.parse(storedUser).login)
    }
  }, [token,userType,isLogIn]);


  console.log(token ,userType ,isLogIn);

//   const updateUser = (userData) => {
//     setToken(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('data');
  };

  const contextValue = {
    token,
    userType,
    isLogIn,
    // updateUser,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider