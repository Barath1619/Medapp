import React, { useCallback, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthContext } from '../context/Authcontext';
import { View } from 'react-native';
import Appstack from '../navigators/Appstack';
import Authstack from '../navigators/Authstack';
import ActivityIndicator from '../component/ActivityIndicator';


function Appnav(props) {

    const Stack = createNativeStackNavigator();
    
    const {isLoading, userToken} = useContext(AuthContext);

    if (isLoading){
      return(
      <ActivityIndicator/>
      )
    }

  return (
      <NavigationContainer>
        {userToken !== null ? <Appstack/> : <Authstack/>}
      </NavigationContainer>
  );
}


export default Appnav;