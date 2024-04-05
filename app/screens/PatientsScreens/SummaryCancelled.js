import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import Screen from '../../component/Screen';
import AptList from '../../component/AptList';
import colors from '../../config/colors';
import { AuthContext } from '../../context/Authcontext';
import secretkeys from '../../config/secretkeys';
import ActivityIndicator from '../../component/ActivityIndicator';




function SummaryCancelled(props) {

    const {userToken} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false)
    const [appointments, setAppointments] = useState([]) ;
    const  [cancelledapt, setCancelledapt] = useState([]);

    const [refresh, setrefresh] = useState(false);

    const fetchData = () => {
        setIsLoading(true);
        fetch(`${secretkeys.localhost}/getappointments`,{
            method:'POST',
            headers:{
              'Content-Type': "application/json",
              'Authorization': `Bearer ${userToken}`
            },
            body:JSON.stringify({filter:"Cancelled"})
        }).then(res => res.json()).then( (data) => {
            const apt =data.appointments || [];
            //const cancelledapt = apt.filter(item => item.status === "Cancelled");
            setCancelledapt(apt) 
            setIsLoading(false);
        })
    }
   
    useEffect(()=>{
        fetchData()
    },[])

    useEffect(() => {
        setCancelledapt(appointments.filter(item => item.status == "Cancelled"));
    },[appointments] )

    const onDelete = (item) => {

        setIsLoading(true);
        fetch(`${secretkeys.localhost}/deleteapt`,{
            method:'POST',
            headers:{
              'Content-Type': "application/json",
            },
            body: JSON.stringify({id:item.id})
        }).then(res => res.json()).then( (data) => {
            fetchData()
        })
    }
    

    return (
        <>
        <FlatList
        data={cancelledapt}
        keyExtractor={(item,index)=> index.toString()}
        renderItem={({item})=> (<AptList 
                                date={item.date} 
                                des={item.sym}
                                docname={item.docname}
                                docspl={item.docspl}
                                time={item.time} 
                                onDelete= {() => onDelete(item)}
                                onPress={()=>console.log(item)}
                                />)}
        ItemSeparatorComponent={()=><View style={styles.separator}></View>}
        refreshing={refresh}
        onRefresh={()=>{
            fetchData()
        }} />

        { cancelledapt.length == 0 && <View style={{flex:1,  alignItems:"center"}}>
            <Text>Currently, there are no cancelled appointments.</Text>
        </View> }

        {isLoading && <ActivityIndicator/>}
       

        </>
    );
}
const styles = StyleSheet.create({
    separator:{
        width:"100%",
        height:2,
        backgroundColor:colors.grey2
    }
})

export default SummaryCancelled;