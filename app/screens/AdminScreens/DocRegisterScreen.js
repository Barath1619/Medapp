import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, ScrollView } from 'react-native';

import colors from '../../config/colors';
import Abutton from '../../component/Abutton';
import Screen from '../../component/Screen';
import secretkeys from '../../config/secretkeys';
import ActivityIndicator from '../../component/ActivityIndicator';

function DocRegisterScreen({navigation}) {


    const [fdata, setfdata]=useState({
        firstname:"",
        lastname:"",
        phoneno:"",
        email:"",
        conemail:"",
        userType:"Doctor",
        speciality:"",
    });
    const [loading, setLoading] = useState(false)
    const [errmsg,seterrmsg]=useState(null);

    const handleSubmit = () => {
    
        if (    fdata.firstname =="" ||
                fdata.lastname =="" ||
                fdata.conemail ==""||
                fdata.email ==""||
                fdata.phoneno==""||
                fdata.speciality==""){
                    seterrmsg("Please enter all feilds");
                    return;         
        }
        else{
            if(fdata.email != fdata.conemail){
                seterrmsg("email did not match");
                return;
            }
            else{
                setLoading(true);
                fetch(`${secretkeys.localhost}/docsignup`,{
                    method:'POST',
                    headers:{
                        'Content-Type': "application/json"  
                    },
                    body: JSON.stringify(fdata)
                })
                .then(res =>res.json()).then(
                    data =>{
                        if (data.error){
                            
                            setLoading(false);
                            seterrmsg(data.error)
                        }
                        else if(data.message) {
                            
                            //console.log(data.message);
                            setLoading(false);
                            alert(data.message);
                            navigation.navigate('Doctab')
                    }
                    }
                )
            }
        }
    }
    
    return (
        <>
       {loading && <ActivityIndicator/>} 
        <Screen>
            <ScrollView >
            <View style={styles.container}>
            <Text style={styles.head1}>Doctor Registration</Text>
            { errmsg && <View style={styles.errmsg}><Text style={styles.errmsgtext}> {errmsg} </Text></View>}
            <Text style={styles.head2}></Text>
           
            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>First Name</Text>
            <TextInput style={styles.inputfeild} placeholder='Alex' placeholderTextColor={colors.grey} 
            onChangeText={(text)=>setfdata({...fdata,firstname:text})}
            onPressIn={()=>{seterrmsg(null)}}
            autoComplete='name'
            autoCapitalize='none'
            />
            </View>
            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Last Name</Text>
            <TextInput style={styles.inputfeild} placeholder='Mercer' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setfdata({...fdata,lastname:text})}
            onPressIn={()=>{seterrmsg(null)}}
            autoComplete="name"
            autoCapitalize='none'/>
            </View>

            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Speciality</Text>
            <TextInput style={styles.inputfeild} placeholder='cardio' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setfdata({...fdata,speciality:text})}
            onPressIn={()=>{seterrmsg(null)}}
            />
            </View>

            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Phone Number</Text>
            <TextInput style={styles.inputfeild} placeholder='(123) 4567891' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setfdata({...fdata,phoneno:text})}
            onPressIn={()=>{seterrmsg(null)}}
            keyboardType='number-pad'/>
            </View>

            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Email ID</Text>
            <TextInput style={styles.inputfeild} placeholder='medcare@gmail.com' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setfdata({...fdata,email:text})}
            onPressIn={()=>{seterrmsg(null)}}
            keyboardType='email-address'
            autoCapitalize='none'/>
            </View>

            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Confirm Email ID</Text>
            <TextInput style={styles.inputfeild} placeholder='medcare@gmail.com' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setfdata({...fdata,conemail:text})}
            onPressIn={()=>{seterrmsg(null)}}
            autoCapitalize='none'
            autoComplete='email'/>
            </View>

            <View style={styles.emailcontainer}>
            <Abutton title={"Register"} onPress={()=>handleSubmit()} color="blue2"/>
            </View>
            
            </View>
            </ScrollView>
        </Screen>
        </>
        
    );
}

const styles = StyleSheet.create({

    scrollcontainer:{
        flexGrow: 1,
        
    },

    container:{
        height:"100%",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    docimg:{
        width:350,
        height:350
    },
    head1: {
        fontSize: 35,
        color: colors.blue2,
        textAlign: "center",
        fontWeight:"bold"
    },
    head2: {
        fontSize: 18,
        color: colors.blue,
        textAlign: "left",
        fontWeight:600,
        paddingHorizontal:10
        
    },
    emailcontainer:{
        paddingHorizontal:20,
        width:"100%",
        marginVertical:5
    },
    inputfeild:{
        backgroundColor:colors.white,
        borderWidth:2,
        padding:18,
        borderRadius:10,
        marginVertical:5,
        borderColor:colors.blue2

    },
    radioinputfeild:{
        backgroundColor:colors.white,
        borderWidth:2,
        borderRadius:10,
        marginVertical:5,
        flexDirection:"row",
        borderColor:colors.primary,
        justifyContent:"space-between"

    },
    loginhere1:{
        textAlign:"center",
        marginVertical:5,
        
    },
    loginhere2:{
        fontSize: 18,
        color: colors.primary,
        textAlign: "left",
        fontWeight:800,
        paddingHorizontal:10
        
    },
    errmsg:{
        
        backgroundColor:colors.hotpink,
        borderRadius:10,
        paddingVertical:5,
        paddingHorizontal:20,
        marginVertical:10
       
    },

    errmsgtext:{
        color:colors.white,
        textAlign:"center",
        fontWeight:"bold",
        fontSize:16,
    }
    
})

export default DocRegisterScreen;