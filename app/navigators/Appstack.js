import React, { useCallback, useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LoginScreen from '../screens/LoginScreen';
import Homepage from '../screens/Homepage';
import TabNavigator from '../screens/TabNavigator';
import TabNavigatorDoc from './TabNavigatorDoc';
import TabNavigatorAdmin from './TabNavigatorAdmin'; 
import { AuthContext } from '../context/Authcontext';
import SetPasswordScreen from '../screens/SetPasswordScreen';

function Appstack(props) {

  const { userType, isLoading} = useContext(AuthContext)
  //const userType="Admin"

  if (isLoading){
    return(
    <ActivityIndicator/>
    )
  }

  const Stack = createNativeStackNavigator();
  
    return (
        
    <Stack.Navigator>

      {/* <Stack.Screen name="SetPassword" component={SetPasswordScreen} options={{
        headerShown:false
      }}/> */}

      <Stack.Screen name="TabNavigator" component={ userType=="Patient" ? TabNavigator : userType=="Doctor" ? TabNavigatorDoc : TabNavigatorAdmin } options={{headerShown:false}}/>  

      <Stack.Screen name="Homepage" component={Homepage} options={{headerShown:false}}/> 

      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>

    </Stack.Navigator>
  
    );
}

export default Appstack;