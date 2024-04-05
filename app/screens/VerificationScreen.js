import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput } from 'react-native';
import { head2 } from '../config/textfont';
import colors from '../config/colors';
import Abutton from '../component/Abutton';
import secretkeys from '../config/secretkeys';

function VerificationScreen({navigation,route}) {
    const { userdata} = route.params;
    
    const [ucode, setUcode]=useState("")
    const [errmsg,seterrmsg]=useState(false);
    const [vcode, setVcode]=useState("")

    useEffect(()=>{
        setVcode(userdata[0]?.vcode);
        //console.log(vcode)
    })
    const handleSubmit = () =>{
        console.log(ucode);
        if (!ucode){
            seterrmsg("please enter the verification code");
            return;
        }
        else if(ucode!=vcode){
            seterrmsg("Incorrent Code");
            
        }
        else{
            const fdata={ 
                    firstname: userdata[0]?.firstname ,
                    lastname:userdata[0]?.lastname,
                    dob:userdata[0]?.dob,
                    phoneno:userdata[0]?.phoneno,
                    email:userdata[0]?.email,
                    conemail:userdata[0]?.conemail,
                    address:userdata[0]?.address,
                    zip:userdata[0]?.zip,
                    userType:userdata[0]?.userType,
                    password:userdata[0]?.password
                 }
                 fetch(`${secretkeys.localhost}/signup`,{
                    method:'POST',
                    headers:{
                        'Content-Type': "application/json"  
                    },
                    body: JSON.stringify(fdata)
                 })
                 .then(res =>res.json()).then(data =>{
                    if(data.message ==="User Registered Successfully"){
                        alert(data.message);
                        navigation.navigate('Login')
                    }
                    else{
                        alert("Something went wrong !! please try sign up again");
                    }
                })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.head1}>Password Verification</Text>
            
            <Image style={styles.docimg}  source={require("../assets/docimg.jpg")}/>
            { errmsg && <View style={styles.errmsg}><Text style={styles.errmsgtext}> {errmsg} </Text></View>}
            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Verification Code</Text>
            <TextInput style={styles.inputfeild} placeholder='Enter 6 digit verification code' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setUcode(text)}
            onPressIn={()=>{seterrmsg(null)}}/>
            </View>
            <View style={styles.emailcontainer}>
            <Abutton title={"Verify"} onPress={()=>handleSubmit()}/>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({

    container:{
        height:"100%",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:colors.white
    },
    docimg:{
        width:350,
        height:350
    },
    head1: {
        fontSize: 35,
        color: colors.primary,
        textAlign: "center",
        fontWeight:"bold"
    },
    head2: {
        fontSize: 18,
        color: colors.secondary,
        textAlign: "left",
        fontWeight:800,
        paddingHorizontal:10
        
    },
    emailcontainer:{
        paddingHorizontal:20,
        width:"100%",
        marginVertical:10
    },
    inputfeild:{
        backgroundColor:colors.white,
        borderWidth:2,
        padding:20,
        borderRadius:10,
        marginVertical:5,
        borderColor:colors.primary

    },
    Reghere:{
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

export default VerificationScreen;
