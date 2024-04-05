import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Screen from './Screen';
import colors from '../config/colors';
import { Swipeable } from 'react-native-gesture-handler';
import Icons, { Icon } from './Icons';

function AptList({date, time, des, docspl, docname, onPress, onDelete, onCancel, status}) {

    const newdate= new Date(date);
    const day = newdate.getDate(); 
    const monthIndex = newdate.getMonth();
    const year = newdate.getFullYear();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    const monthName = monthNames[monthIndex];
    const formattedDate = `${monthName} ${day}`;

    const Rightcomponent = ({onDelete, onCancel, status}) => {

      return ( 
         <View style={{ width:status == "Active"?80:80, flexDirection:"row"}}>
            {/* <TouchableOpacity style={{backgroundColor:"red", flex:1, justifyContent:"center", alignItems:"center", }} onPress={onDelete} >
            <Icons type={Icon.FontAwesome5} name="trash-alt" color={colors.white} size={30} />
            </TouchableOpacity> */}
            {status == "Active" && <TouchableOpacity style={{backgroundColor:"orange", flex:1, justifyContent:"center", alignItems:"center"}} onPress={onCancel}>
            <Icons type={Icon.MaterialCommunityIcons} name="book-cancel" color={colors.white} size={35}/>
            </TouchableOpacity>}
         </View>
      );
    }


    return (
            <Swipeable renderRightActions={() => ( <Rightcomponent status={status} onCancel={onCancel} onDelete={onDelete} />)}>
            <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.dataView}>
                <Text style={styles.textfeild}>{formattedDate}</Text>
                <Text style={styles.textfeild} >{year}</Text>
            </View> 
            <View style={styles.descrip}>
                <Text style={styles.textDes}>{des}</Text>
                <Text style={styles.textTime} >{time}</Text>
                <Text style={styles.textDocname}>{docname}</Text>
                <Text style={styles.textDocspl}>{docspl}</Text>
            </View>

            </TouchableOpacity>
            </Swipeable>
        
       
    );
}
const styles = StyleSheet.create({
     container:{
        flexDirection:"row",
        padding:10,
        backgroundColor:colors.white,
        justifyContent:"center",
        alignItems:"center"
     },
     dataView:{
        width:110,
        height:110,
        borderRadius:80,
        backgroundColor:colors.white,
        borderWidth:2,
        borderColor:colors.primartbluelight,
        justifyContent:"center",
        alignItems:"center"
     },
     textfeild:{
        color:colors.primaryblue,
        fontSize:17,
        fontWeight:"500",
     },
     descrip:{
        flex:1,
        justifyContent:"center",
        padding:10
     },
     textDes:{
        fontWeight:"700",
        fontSize:18,
        color:colors.primaryblue,
        paddingVertical:2
     },
     textTime:{
        fontWeight:"700",
        fontSize:20,
        color:colors.primary,
        paddingVertical:2
     },
     textDocname:{
        fontSize:18,
        color:colors.primaryblue,
        paddingVertical:0
     },
     textDocspl:{
        fontSize:15,
        color:colors.grey2,
        paddingVertical:0
     }
})
export default AptList;