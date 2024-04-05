import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import secretkeys from '../../config/secretkeys';
import { AuthContext } from '../../context/Authcontext';
import Screen from '../../component/Screen';
import colors from '../../config/colors';
import ActivityIndicator from '../../component/ActivityIndicator';
import UserListCard from '../../component/UserListCard';
import AptList from '../../component/AptList';


function PastAppointments(props) {

    const [loading, setLoading] = useState(false);
    const {userToken} =useContext(AuthContext);
    const [apt, setApt]=useState({});

    useEffect(()=>{ 
        setLoading(true);
        fetch(`${secretkeys.localhost}/getpastapt`, {
            method:"POST",
            headers:{
                'Content-Type': "application/json",
                'Authorization':`Bearer ${userToken}`
            }
        }).then(res=>res.json()).then(data => {

        if (data.error){
            setLoading(false);
            alert(data.error)
            }
            else{
            setLoading(false)
            setApt(data.appointments)
            }
        })
    },[])

    return (
        <>
        <Screen bgcolor={colors.white}>
        <Text style={styles.Headings} >Completed Appointments</Text>
            <View >
            <FlatList data={apt}
            keyExtractor={(item) => item._id}
            renderItem={({item}) => <AptList 
            date={item.date} 
            des={item.sym}
            docname={`${item.patient.firstname} ${item.patient.lastname}`}
            docspl={item.patient.dob}
            time={item.time} 
            onDelete= {() => onDelete(item)}
            onPress={()=>console.log(item)}
            />}/>
            </View>
            
        </Screen>
        { loading && <ActivityIndicator/> }
        { apt.length === 0 && 
        <View style={styles.nouserlist}>
        <Text style={styles.text}>There are no appointments today... </Text>
        </View>
        }
        </>
    );
}
const styles = StyleSheet.create({
    nouserlist:{
        ...StyleSheet.absoluteFillObject,
         justifyContent:"center",
         alignItems:"center",
         flex:1,
         zIndex:1
    },
    text:{
        fontSize:25,
        fontWeight:"500"
    },
    Headings:{
        fontSize:30,
        fontWeight:"bold",
        padding:8,
        color:colors.primartbluelight
    }
})

export default PastAppointments;