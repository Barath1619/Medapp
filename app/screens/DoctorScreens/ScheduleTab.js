import React from 'react';
import Screen from '../../component/Screen';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icons, { Icon } from '../../component/Icons';
import colors from '../../config/colors';


function ScheduleTab({navigation}) {
    
    return (
        <Screen>
        <Text style={styles.Headings} >Schedule</Text>

        {/* DailyAppointment */}
        <TouchableOpacity onPress={() => navigation.navigate('DailyApt')}>
        <View style={styles.cardview}>
        <Icons type={Icon.FontAwesome} name="user-plus" color={colors.primaryblue} shape={33} size={30} radius={15} bgcolor={colors.default} />
        <View style={styles.Textfeildview}>

        <Text style={styles.Textfield}>Daily Appointment</Text>
        <Text style={styles.Textfieldlight}>Daily Patients Appointments</Text>
        </View>
        <Icons type={Icon.Entypo} name="chevron-small-right"  size={25} />
        </View>
        </TouchableOpacity>

        {/* Past Appointments*/}
        <TouchableOpacity onPress={() => navigation.navigate('PastApt')}>
        <View style={styles.cardview}>
        <Icons type={Icon.FontAwesome} name="user-plus" color={colors.primaryblue} shape={33} size={30} radius={15} bgcolor={colors.default} />
        <View style={styles.Textfeildview}>

        <Text style={styles.Textfield}>Completed Appointment</Text>
        <Text style={styles.Textfieldlight}>All Completed Appointments</Text>
        </View>
        <Icons type={Icon.Entypo} name="chevron-small-right"  size={25} />
        </View>
        </TouchableOpacity>

        {/* Cancelled Appointments*/}
        <TouchableOpacity onPress={() => navigation.navigate('CancelledApt')}>
        <View style={styles.cardview}>
        <Icons type={Icon.FontAwesome} name="user-plus" color={colors.primaryblue} shape={33} size={30} radius={15} bgcolor={colors.default} />
        <View style={styles.Textfeildview}>

        <Text style={styles.Textfield}>Cancelled Appointment</Text>
        <Text style={styles.Textfieldlight}>All Cancelled Appoinment</Text>
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
    Headings:{
        fontSize:30,
        fontWeight:"bold",
        padding:8,
        color:colors.primartbluelight
    },
    Textfield:{
        
        fontSize:23,
        fontWeight:"400",
        
    },
    Textfieldlight:{
        fontSize:15,
        paddingLeft:2,
        paddingTop:2,
        color:colors.grey
    },
})


export default ScheduleTab;