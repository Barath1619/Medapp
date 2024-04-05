import React, { useEffect, useRef, useState } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { Text,StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';


import Icons, { Icon } from '../component/Icons';
import AccountTab from '../screens/PatientsScreens/AccountTab'
import UserTab from '../screens/AdminScreens/UserTab'
import DocTab from '../screens/AdminScreens/DocTab'
import DocRegisterScreen from '../screens/AdminScreens/DocRegisterScreen'
import colors from '../config/colors';
import UserApprovalList from '../screens/AdminScreens/UserApprovalList';
import UserList from '../screens/AdminScreens/UserList';



const Stack = createStackNavigator();

const UserStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Usertab" component={UserTab} options={{ headerShown: false }} />
        <Stack.Screen name="UserList" component={UserList} options={{ headerShown: false }} />
        <Stack.Screen name="UserApprovalList" component={UserApprovalList} options={{ headerShown: false }} />
        {/* Add more screens as needed */}
      </Stack.Navigator>
    );
  };

const DocStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Doctab" component={DocTab} options={{ headerShown: false }} />
        <Stack.Screen name="DocRegister" component={DocRegisterScreen} options={{ headerShown: false }} />
        {/* Add more screens as needed */}
      </Stack.Navigator>
    );
  };


const Tablist = [
    { route: 'Users', label: 'Users', type: Icon.FontAwesome, activeIcon: 'user', inActiveIcon: 'user-o', component: UserStack },
    { route: 'Doctors', label: 'Doctors', type: Icon.FontAwesome, activeIcon: 'stethoscope', inActiveIcon: 'stethoscope', component: DocStack  },
    { route: 'Account', label: 'Account', type: Icon.FontAwesome, activeIcon: 'user-circle-o', inActiveIcon: 'user-circle', component: AccountTab },
  ];


const TabBarButton = (props) =>{
     const {item, onPress, accessibilityState} = props;
     // console.log(props)
     const focused= accessibilityState.selected;
     const vRef= useRef(null);
    useEffect(()=>{
        if(focused){
            vRef.current.animate({0:{scale:1,rotate:"0deg"}, 1:{scale:1.5,rotate:"360deg"}})
        }
        else{
            vRef.current.animate({0:{scale:1.5,rotate:"360deg"}, 1:{scale:1,rotate:"0deg"}})
        }
    },[focused])

    return(
            
            <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={1}> 
            <Animatable.View style={styles.container} ref={vRef} duration={500}>
            <Icons  type={item.type} name={ focused ? item.activeIcon : item.inActiveIcon } color={focused?colors.primaryblue: colors.primartbluelight}/>
            </Animatable.View>
            </TouchableOpacity>
    );
}


const Tab = createBottomTabNavigator();

function TabNavigatorAdmin(props) {

    return (
        <Tab.Navigator
         screenOptions={{
            headerShown:false,
        }
         }>
            { Tablist.map( (item, index)=> {

                return (
                    <Tab.Screen key={item.route} name={item.route} component={item.component} options={{
                        tabBarLabel:item.label,
                        // tabBarIcon: ({color,focused}) => (<Icons color={colors.blue} type={item.type}  name={ focused ? item.activeIcon : item.inActiveIcon }/>),
                        tabBarButton: (props) => (<TabBarButton {...props} item={item} />)
                    }}/>
                );
                
                
            } )}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems:"center",
    }
})

export default TabNavigatorAdmin;