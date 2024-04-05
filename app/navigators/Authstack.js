import React, { useCallback, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import WelcomesScreen from '../screens/WelcomesScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import VerificationScreen from '../screens/VerificationScreen';
import Homepage from '../screens/Homepage';
import TabNavigator from '../screens/TabNavigator';
import { AuthContext } from '../context/Authcontext';
import TabNavigatorDoc from './TabNavigatorDoc';
import TabNavigatorAdmin from './TabNavigatorAdmin';
import SetPasswordScreen from '../screens/SetPasswordScreen';



function Authstack(props) {
    const Stack = createNativeStackNavigator();
    const { userType } = useContext(AuthContext)

    return (
    
    <Stack.Navigator>
   
      <Stack.Screen name="Welcome Screen" component={WelcomesScreen} options={{
        headerShown:false
      }}/> 
     
      <Stack.Screen name="Signup" component={SignupScreen} options={{
        headerShown:false
      }}/>

      <Stack.Screen name="Login" component={LoginScreen} options={{
        headerShown:false
      }}/>

      <Stack.Screen name="Homepage" component={Homepage} options={{
        headerShown:false
      }}/> 
  
      <Stack.Screen name="verifypage" component={VerificationScreen} options={{
        headerShown:false
      }}/>

      <Stack.Screen name="SetPassword" component={SetPasswordScreen} options={{
        headerShown:false
      }}/>
       
      <Stack.Screen name="TabNavigator" component={ userType=="Patient" ? TabNavigator : userType=="Doctor" ? TabNavigatorDoc : TabNavigatorAdmin } options={{headerShown:false}}/>  

    </Stack.Navigator>
    
    );
}

export default Authstack;