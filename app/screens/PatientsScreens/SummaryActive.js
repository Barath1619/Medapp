import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import Screen from '../../component/Screen';
import AptList from '../../component/AptList';
import colors from '../../config/colors';
import secretkeys from '../../config/secretkeys';
import { AuthContext } from '../../context/Authcontext';
import ActivityIndicator from '../../component/ActivityIndicator';
import Swipeable from 'react-native-gesture-handler/Swipeable';


function SummaryActive(props) {
    
    const {userToken} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false)
    const [appointments, setAppointments] = useState([]) ;
    const  [activeapt, setActiveapt] = useState([]);
    const [refresh, setrefresh] = useState(false);

    const fetchData = () => {
        setIsLoading(true);
        fetch(`${secretkeys.localhost}/getappointments`,{
            method:'POST',
            headers:{
              'Content-Type': "application/json",
              'Authorization': `Bearer ${userToken}`
            },
            body:JSON.stringify({filter:"Active"})
        }).then(res => res.json()).then( (data) => {
            const apt =data.appointments || [];
            //const activeapt = apt.filter(item => item.status === "Active");
            setActiveapt(apt);
            setIsLoading(false);
        })
    }
   
    useEffect(()=>{
        fetchData()
    },[])


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
    const  onCancel = (item) => {
        setIsLoading(true);
        fetch(`${secretkeys.localhost}/cancelapt`,{
            method:'POST',
            headers:{
              'Content-Type': "application/json",
            },
            body: JSON.stringify({id:item.id})
        }).then(res => res.json()).then( (data) => {
            alert(data.message);
            fetchData()
        })
    }


    return (
        <>
      
        <FlatList
        data={activeapt}
        keyExtractor={(item,index)=> index.toString()}
        renderItem={({item})=> (<AptList 
                                date={item.date} 
                                des={item.sym}
                                docname={item.docname}
                                docspl={item.docspl}
                                time={item.time} 
                                onPress={()=>console.log(item)}
                                onDelete= {() => onDelete(item)}
                                onCancel={()=> onCancel(item)}
                                status={item.status}
                                />)}
        ItemSeparatorComponent={()=><View style={styles.separator}></View>}
        refreshing={refresh}
        onRefresh={()=>{
            fetchData();
        }}
        />
        { activeapt.length === 0 && <View style={{flex:1,  alignItems:"center"}}>
            <Text>Currently, there are no active appointments.</Text>
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

export default SummaryActive;