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
import AvailabilityTab from '../screens/DoctorScreens/AvailabilityTab';
import ScheduleTab from '../screens/DoctorScreens/ScheduleTab';
import CheckinScreen from '../screens/DoctorScreens/CheckinScreen';
import ChatScreen from '../screens/ChatScreen';
import PastAppointments from '../screens/DoctorScreens/PastAppointments';
import CancelledAppointments from '../screens/DoctorScreens/CancelledAppointments';
import DailyAppointment from '../screens/DoctorScreens/DailyAppointment';

const Stack = createStackNavigator();

const AvailabilityStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="AvailabilityTab" component={AvailabilityTab} options={{ headerShown: false }} />
        <Stack.Screen name="Checkin" component={CheckinScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  };

  const ScheduleStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Appointmenttab" component={ScheduleTab} options={{ headerShown: false }} />
        <Stack.Screen name="DailyApt" component={DailyAppointment} options={{ headerShown: false }} />
        <Stack.Screen name="PastApt" component={PastAppointments} options={{ headerShown: false }} />
        <Stack.Screen name="CancelledApt" component={CancelledAppointments} options={{ headerShown: false }} />
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


const Tablist = [
    { route: 'Schedule', label: 'AppointmentSchedule', type: Icon.MaterialCommunityIcons, activeIcon: 'calendar-check', inActiveIcon: 'calendar-check-outline', component: ScheduleStack },
    { route: 'Availability', label: 'Availability', type: Icon.MaterialCommunityIcons, activeIcon: 'view-list', inActiveIcon: 'view-list-outline', component: AvailabilityStack  },
    { route: 'Chat', label: 'Chat', type: Icon.Ionicons, activeIcon: 'chatbubbles', inActiveIcon: 'chatbubbles-outline', component: ChatStack },
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

function TabNavigatorDoc(props) {

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

export default TabNavigatorDoc;