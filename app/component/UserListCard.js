import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import colors from '../config/colors';
import Icons, { Icon } from './Icons';

function UserListCard({item,onPressReject,onPressApprove}) {
    return (
        <View>

        
       <View style={styles.container}>
        <View style={{paddingHorizontal:5,paddingTop:5,}}>
        <Text style={styles.name}> {item.firstname} {item.lastname}</Text>
        <View style={styles.subtitlecontainer}>
        <Text style={styles.subtitle}>DOB: {item.dob}</Text>
        <Text style={styles.subtitle}>Phone No: {item.phoneno}</Text>
        </View>
        <View style={styles.subtitlecontainer}>
        <Text style={styles.subtitle}>zipcode: {item.zip}</Text>
        <Text style={styles.subtitle}>User Type: {item.userType}</Text>
        </View>
        <View style={styles.subtitlecontainer}>
        <Text style={styles.subtitle}>Email: {item.email}</Text>
        </View>
        </View>
        <View style={styles.subtitlecontainer2}>
        <TouchableOpacity style={styles.reject} onPress={onPressReject}>
        <Text style={{color:colors.white, fontWeight:"800", fontSize:18}}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accept} onPress={onPressApprove}>
        <Text style={{color:colors.white, fontWeight:"800", fontSize:18}}>Approve</Text>
        </TouchableOpacity>
        </View>
        </View>
       </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width:"95%",
        alignSelf:"center",
        height:170,
        backgroundColor:colors.white,
        borderRadius:10,
        marginVertical:5,
        flex:1,
        overflow:"hidden",
        
    },
    name:{
        fontSize:23,
        fontWeight:"bold",
        color:colors.primartbluelight
    },
    subtitlecontainer:{
        flexDirection:"row",
        padding:5,
    },
    subtitlecontainer2:{
        flexDirection:"row",
        marginTop:2,
        flex:1
    },
    subtitle:{
        fontSize:16,
        flex:1,
        color:colors.grey
    },
    reject:{
        backgroundColor:colors.red,
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    accept:{
        backgroundColor:colors.green,
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }


})

export default UserListCard;