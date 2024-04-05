import React, { useContext, useEffect } from 'react';
import { Text, TouchableOpacity,View, StyleSheet } from 'react-native';


import Screen from '../../component/Screen';
import colors from '../../config/colors';
import Icons, { Icon } from '../../component/Icons';
import { AuthContext } from '../../context/Authcontext';

function AppointmentTab( {navigation}) {



    return (
        <Screen bgcolor={colors.white}>
        
        <Text style={styles.Headings} >Appointments</Text>
        

        <TouchableOpacity onPress={() => navigation.navigate('AppointDocs')}>
        <View style={styles.cardview}>
        <Icons type={Icon.MaterialCommunityIcons} name="calendar-check" color={colors.primaryblue} shape={33} size={30} radius={15} bgcolor={colors.default} />
        <View style={styles.Textfeildview}>
        <Text style={styles.Textfield}>Book an Appointment</Text>
        <Text style={styles.Textfieldlight}>Use this for low or moderate severity</Text>
        </View>
        <Icons type={Icon.Entypo} name="chevron-small-right"  size={25} />
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> navigation.navigate("EmergencyAppointment")}>
        <View style={styles.cardview}>
        <Icons type={Icon.FontAwesome} name="user" color={colors.primaryblue} shape={33} size={30} radius={15} bgcolor={colors.default} />
        <View style={styles.Textfeildview}>
        <Text style={styles.Textfield}>Emergency Appointment</Text>
        <Text style={styles.Textfieldlight}>Use this for high severity</Text>
        </View>
        <Icons type={Icon.Entypo} name="chevron-small-right"  size={25} />
        </View>
        </TouchableOpacity>
       </Screen>
    );
}
const styles = StyleSheet.create({
    Headings:{
        fontSize:30,
        fontWeight:"bold",
        padding:8,
        color:colors.primartbluelight
    },
   
    cardview:{
        width:'90%',
        height:100,
        backgroundColor:colors.white,
        alignSelf:"center",
        borderRadius:10,
        borderWidth:1,
        borderColor:colors.grey,
        alignItems:"center",
        padding:10,
        marginTop:10,
        flexDirection:"row",
        
    },
    Textfeildview:{
        flex:1,
        paddingHorizontal:10,
    },
    Textfield:{
        fontSize:22,
        fontWeight:"400",
    },
    Textfieldlight:{
        fontSize:15,
        paddingLeft:2,
        paddingTop:2,
        color:colors.grey
    },
})

export default AppointmentTab;