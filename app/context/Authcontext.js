import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userType, setUserType] =useState(null);

    const signin = (userType,token) => {
        setIsLoading(true);
        setUserToken(token);
        setUserType(userType);
        AsyncStorage.setItem('userToken', token);
        AsyncStorage.setItem('userType', userType);
        setIsLoading(false);
    }
    const signout = () => {
      setIsLoading(true);
      setUserToken(null);
      setUserType(null);
      AsyncStorage.removeItem('userToken');
      AsyncStorage.removeItem('userType');
      setIsLoading(false);
  }
    const isLoggedIn = async () => {
      try{
        setIsLoading(true);
        let userToken1 = await AsyncStorage.getItem('userToken');
        let userType1 = await AsyncStorage.getItem('userType');
        setUserToken(userToken1);
        setUserType(userType1);
        setIsLoading(false);
      }catch(e) {
        console.log(`error while logging asyncstorage ${e}`)
      }

    }

    useEffect(()=>{
      isLoggedIn();
    },[]);
 
  
    // Define your authentication functions and state management here
  
    return (
      <AuthContext.Provider value={{ signin,isLoggedIn, signout,userToken,isLoading, userType }}>
        {children}
      </AuthContext.Provider>
    );
  };