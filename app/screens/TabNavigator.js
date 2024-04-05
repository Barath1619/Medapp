import React, { useEffect, useRef, useState } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { Text,StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';


import Icons, { Icon } from '../component/Icons';
import AccountTab from '../screens/PatientsScreens/AccountTab'
import ChatTab from '../screens/PatientsScreens/ChatTab'
import SummaryTab from '../screens/PatientsScreens/SummaryTab'
import AppointmentTab from '../screens/PatientsScreens/AppointmentTab'
import colors from '../config/colors';
import AppointmetBooking from './PatientsScreens/AppointmetBooking';
import AppointmentDocs from './PatientsScreens/AppointmentDocs';
import Quickappointment from './PatientsScreens/Quickappointment';
import EmergencyAppointment from './PatientsScreens/EmergencyAppointment'
import ResultScreen from './PatientsScreens/ResultScreen';
import ChatScreen from './ChatScreen';
import FeedbackScreen from './PatientsScreens/FeedbackScreen';
import Prescriptions from './PatientsScreens/Prescriptions';


const Stack = createStackNavigator();

const AppointmentStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Appointmenttab" component={AppointmentTab} options={{ headerShown: false }} />
        <Stack.Screen name="AppointDocs" component={AppointmentDocs} options={{ headerShown: false }} />
        <Stack.Screen name="Appointbooking" component={AppointmetBooking} options={{ headerShown: false }} />
        <Stack.Screen name="EmergencyAppointment" component={EmergencyAppointment} options={{ headerShown: false }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  };

const ChatStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Chattab" component={ChatTab} options={{ headerShown: false }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    );
  };

  const SummaryStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Summarytab" component={SummaryTab} options={{ headerShown: false }} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Prescriptions" component={Prescriptions} options={{ headerShown: false }} />

      </Stack.Navigator>
    );
  };



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
const Tablist = [
  { route: 'Appointment', label: 'Appointment', type: Icon.MaterialCommunityIcons, activeIcon: 'calendar-check', inActiveIcon: 'calendar-check-outline', component: AppointmentStack },
  { route: 'Summary', label: 'Summary', type: Icon.MaterialCommunityIcons, activeIcon: 'view-list', inActiveIcon: 'view-list-outline', component: SummaryStack  },
  { route: 'Chat', label: 'Chat', type: Icon.Ionicons, activeIcon: 'chatbubbles', inActiveIcon: 'chatbubbles-outline', component: ChatStack },
  { route: 'Account', label: 'Account', type: Icon.FontAwesome, activeIcon: 'user-circle-o', inActiveIcon: 'user-circle', component: AccountTab },
];

const Tab = createBottomTabNavigator();

function TabNavigator(props) {

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
                         //tabBarIcon: ({color,focused}) => (<Icons color={colors.blue} type={item.type}  name={ focused ? item.activeIcon : item.inActiveIcon }/>),
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

export default TabNavigator;