import React, { useContext, useState } from 'react';
import Screen from '../../component/Screen';
import { View,StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import Data from './Data';
import colors from '../../config/colors';
import DocModel from '../../component/DocModel';
import Abutton from '../../component/Abutton';
import secretkeys from '../../config/secretkeys';
import { AuthContext } from '../../context/Authcontext';

function ResultScreen({navigation,route}) {

    const {userToken} = useContext(AuthContext)

    const [selectedRating, setSelctedRating] = useState(null)
    const [docType, setDocType] = useState("General Practitioner");
    const [time, setTime] = useState(1);
    const [loading, setLoading] = useState(false)

    const renderItem = ({item, index}) => {


        return (
            <TouchableOpacity style={[styles.flatlistview,{backgroundColor:selectedRating===index?colors.red:colors.white}]} onPress={()=>{
                
                setSelctedRating(index); 
                setTime(index+1);
            }}>
                <Text style={{color:selectedRating===index?colors.white:colors.red}}>{item}</Text>
            </TouchableOpacity>
    );
    }

    const handleSubmit = () =>{

        console.log(time, docType)

        setLoading(true);
                fetch(`${secretkeys.localhost}/bookemergencyapt`,{
                    method:'POST',
                    headers:{
                        'Content-Type': "application/json",
                        'Authorization': `Bearer ${userToken}`  
                    },
                    body: JSON.stringify({time, docType})
                })
                .then(res =>res.json()).then(
                    data =>{
                       
                       if (data.error){
                        setLoading(false);
                        //seterrmsg(data.error)
                        console.log(data.error)
                       }
                       else{
                        setLoading(false);
                        navigation.navigate("Appointmenttab")
                        alert(data.message);
                       }
                    }
                )
            

    }
     
    return (
        <Screen>
            <View style={styles.container}>
                
            <Text
             style={styles.text}>Please select Time and Specalist </Text>
            <Text style={{fontSize:18, paddingVertical:5}}>
                In Next
            </Text>
            <View style={{height:60}}>
            <FlatList
            data={Data.time}
            numColumns={3}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            />  
            </View>
            <DocModel docType={docType} setDocType={setDocType}/>
            <View style={{width:"60%"}}>
            <Abutton title="Continue" color='red' onPress={()=>{
                handleSubmit()
            }}/>
            </View>
            </View>

        </Screen>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    text: {
        fontSize: 35,
        fontWeight:"200",
        alignItems:"center",
        paddingHorizontal:20,
        marginBottom: 20,
        textAlign: 'center'
    },
    flatlistview:{
        height:30,
        borderWidth:2,
        borderColor:colors.red,
        padding:5,
        margin:5,
        borderRadius:5,
        justifyContent:"center",
        alignItems:"center"
    },
})

export default ResultScreen;