import React from 'react';
import Screen from '../../component/Screen';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icons, { Icon } from '../../component/Icons';
import colors from '../../config/colors';


function AvailabilityTab({navigation}) {
    return (
        <Screen>
        <Text style={styles.Headings} >Check-In</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Checkin')}>
        <View style={styles.cardview}>
        <Icons type={Icon.FontAwesome} name="user-plus" color={colors.primaryblue} shape={33} size={30} radius={15} bgcolor={colors.default} />
        <View style={styles.Textfeildview}>

        <Text style={styles.Textfield}>Check-in your Availability</Text>
        <Text style={styles.Textfieldlight}>Make entry of your Availability to take appointments</Text>
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

export default AvailabilityTab;