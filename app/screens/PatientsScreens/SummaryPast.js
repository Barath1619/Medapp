import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Screen from '../../component/Screen';
import AptList from '../../component/AptList';
import colors from '../../config/colors';
import { AuthContext } from '../../context/Authcontext';
import secretkeys from '../../config/secretkeys';
import ActivityIndicator from '../../component/ActivityIndicator';
import TransparentModal from '../../component/TransparentModal';

function SummaryPast({navigation}) {

    const {userToken} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false)
    const [appointments, setAppointments] = useState([]) ;
    const  [pastapt, setpastapt] = useState([]);
    const [refresh, setrefresh] = useState(false);
   const [ modalVisible, setModalVisible]= useState(false);
   const [selectedItem, setSelectedItem] = useState(null);

    const fetchData = () => {
        setIsLoading(true);
        fetch(`${secretkeys.localhost}/getappointments`,{
            method:'POST',
            headers:{
              'Content-Type': "application/json",
              'Authorization': `Bearer ${userToken}`
            },
            body:JSON.stringify({filter:"Past"})
        }).then(res => res.json()).then( (data) => {
            const apt =data.appointments || [];
           // const pastapt = apt.filter(item => item.status === "Past");
            
            setpastapt(apt) 
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
            setIsLoading(false);
        })
    }
    const onSelect = (item) => {
        console.log(item)
        setSelectedItem(item)
        setModalVisible(true);

    }
    

    
    return (
        <>
        <FlatList
        data={pastapt}
        keyExtractor={(item,index)=> index.toString()}
        renderItem={({item})=> (<AptList 
                                date={item.date} 
                                des={item.sym}
                                docname={item.docname}
                                docspl={item.docspl}
                                time={item.time} 
                                onDelete= {() => onDelete(item)}
                                onPress={()=>onSelect(item)}
                                />)}
        ItemSeparatorComponent={()=><View style={styles.separator}></View>} 
        refreshing={refresh}
        onRefresh={()=>{
            fetchData()
        }} 
        />

        { pastapt.length === 0 && <View style={{flex:1,  alignItems:"center"}}>
            <Text>Currently, there are no past appointments.</Text>
        </View> }

        {isLoading && <ActivityIndicator/>}

       <TransparentModal isVisible={modalVisible} setModalVisible={setModalVisible}navigation={navigation} item={selectedItem}/>

    


       {/* Modal for apt */}
       

        </>
    );
}
const styles = StyleSheet.create({
    separator:{
        width:"100%",
        height:2,
        backgroundColor:colors.grey2
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"rgba(78,84,88,1)"
      },
      modalContent: {
        backgroundColor: 'white',
        width: '70%',
        height: 200,
        borderRadius: 10,
        padding: 20,
      },
})

export default SummaryPast;