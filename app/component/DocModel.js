import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Button } from 'react-native-paper';
import colors from '../config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Icons from './Icons';
import { Icon } from './Icons';
import Screen from './Screen';
import Abutton from './Abutton';

function DocModel({docType, setDocType}) {

    const [modalVisible, setModalVisible] = useState(false);

    const items =[
        {
            label:"General Practitioner",
            id:1,
            bgcolor:colors.c1,
            icon:""
        },
        {
            label:"Gynecology",
            id:2,
            bgcolor:colors.c1,
            icon:""
        },
        {
            label:"Cardiology",
            id:3,
            bgcolor:colors.c1,
            icon:""
        },
        {
            label:"Dermatology",
            id:4,
            bgcolor:colors.c1,
            icon:""
        },
        {
            label:"Orthopedics",
            id:5,
            bgcolor:colors.c1,
            icon:""
        },
        {
            label:"Neurology",
            id:6,
            bgcolor:colors.c1,
            icon:""
        },
        {
            label:"Gastroenterology",
            id:7,
            bgcolor:colors.c1,
            icon:""
        },
        {
            label:"Pulmonology",
            id:8,
            bgcolor:colors.c1,
            icon:""
        },{
            label:"Neurosurgery",
            id:9,
            bgcolor:colors.c1,
            icon:""
        }

    ]


    const PickerItem = ({ onPress, item}) =>{

        return(
            <TouchableOpacity onPress={onPress} style={{width:"34%"}}>
                <View style={{paddingHorizontal:10, paddingVertical:5, alignItems:"center"}}>
                <View style={{width:80, height:80, backgroundColor:item.bgcolor, justifyContent:"center", alignItems:"center", borderRadius:55}}>
                <Icons type={Icon.MaterialCommunityIcons} name="apps-box" iconcolor="white" size={40} />
                </View>
                <Text style={{paddingTop:5, textAlign:"center"}}>{item.label}</Text>
                </View>
                
            </TouchableOpacity>
        );
    }


    return (
        <>
        <TouchableWithoutFeedback onPress={()=>setModalVisible(true)}>
            <View
            style={styles.category}
            onChangeText={(text)=>setDocType(text)}
            >
            <MaterialCommunityIcons name="doctor" size={40} color = {colors.grey}/>
            <Text style={{flex:1, left:10}} >{docType||"Specality"}</Text>
            <MaterialCommunityIcons name="chevron-down" size={40} color = {colors.grey}/>
            </View> 
            </TouchableWithoutFeedback>


        <Modal visible={modalVisible} animationType='slide'>
        <Screen>
        <Abutton title='close' onPress={()=>setModalVisible(false)} />
        <FlatList 
        data={items}
        numColumns={3}
        keyExtractor={item => item.id.toString()}
        renderItem={({item})=><PickerItem
        item={item}
        onPress={()=>{
            setDocType(item.label)
            setModalVisible(false)
        }}/>
    }
        />
        </Screen>
        </Modal>
        </>
    );
}
const styles = StyleSheet.create({
    category:{
        width:"85%",
        height:60,
        borderColor:colors.grey,
        borderWidth:2,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"space-between",
        color:colors.grey,
        flexDirection:"row",
        marginVertical:5
    }
})

export default DocModel;