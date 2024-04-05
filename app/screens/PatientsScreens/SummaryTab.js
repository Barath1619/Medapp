import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import Screen from '../../component/Screen';
import SummaryActive from './SummaryActive';
import SummaryPast from './SummaryPast';
import SummaryCancelled from './SummaryCancelled';
import colors from '../../config/colors';

const Tab = createMaterialTopTabNavigator();

function SummaryTab(props) {
    return (
        <Screen bgcolor={colors.white}>
         <Text style={styles.Headings} >Summary</Text>
         <Tab.Navigator
         screenOptions={{
            tabBarActiveTintColor: colors.primaryblue, 
            tabBarInactiveTintColor: colors.primartbluelight, 
            tabBarStyle: {
              backgroundColor: colors.white,
            },
            tabBarIndicatorStyle: {
              backgroundColor: colors.primaryblue,
              height:4
            },
            tabBarLabelStyle: {
                fontSize: 16, 
                fontWeight: '800', 
                textTransform: 'capitalize'
              },
            
          }}
         
          >
         <Tab.Screen name="Active" component={SummaryActive} />
         <Tab.Screen name="Past" component={SummaryPast} />
         <Tab.Screen name="Cancelled" component={SummaryCancelled} />
        </Tab.Navigator>
       </Screen>
    );
}

const styles = StyleSheet.create({
    Headings:{
        fontSize:30,
        fontWeight:"bold",
        padding:8,
        color:colors.primartbluelight
    }});

export default SummaryTab;