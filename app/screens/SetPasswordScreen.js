import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput } from 'react-native';
import { head2 } from '../config/textfont';
import colors from '../config/colors';
import Abutton from '../component/Abutton';
import { AuthContext } from '../context/Authcontext';
import secretkeys from '../config/secretkeys';
import ActivityIndicator from '../component/ActivityIndicator';

function SetPasswordScreen({navigation,route}) {

const {userType,token, id} = route.params
//console.log(userType,token,id)

const {signin} = useContext(AuthContext)

const [fdata, setfdata] = useState({
    oldpassword: "",
    newpassword: "",
    cfmpassword: ""
});
const [errmsg,seterrmsg]=useState(null);
const [loading, setLoading] =useState(false);

const handleSubmit = () =>{

    if(!fdata.oldpassword|| !fdata.newpassword || !fdata.cfmpassword){
        seterrmsg("Please enter all feilds")
    }
    else if (fdata.newpassword !== fdata.cfmpassword){
        seterrmsg("Password doesnot match")
    }
    else{

        setLoading(true);
        fetch(`${secretkeys.localhost}/createpw/${id}`, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(fdata)
        }).then(res => res.json()).then( data =>{
            console.log(data)
    
            if (data.error){
                setLoading(false);
                seterrmsg(data.error);
               }
            else{
                setLoading(false);
                alert('Password has been updated');
                signin(userType, token);
                navigation.navigate("TabNavigator");       
            }
    
        })
    }
    
    
    }

    return (
        
        <>
         <View style={styles.container}>
            <Text style={styles.head1}>Create New Password</Text>
            { errmsg && <View style={styles.errmsg}><Text style={styles.errmsgtext}> {errmsg} </Text></View>}
            
            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Old Password</Text>
            <TextInput style={styles.inputfeild} placeholder='************' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setfdata({...fdata,oldpassword:text})}
            secureTextEntry
            onPressIn={()=>{seterrmsg(null)}}
            autoCapitalize='none'
            />
            </View>

            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>New Password</Text>
            <TextInput style={styles.inputfeild} placeholder='************' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setfdata({...fdata,newpassword:text})}
            secureTextEntry
            onPressIn={()=>{seterrmsg(null)}}
            autoCapitalize='none'
            />
            </View>

            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Confirm Password</Text>
            <TextInput style={styles.inputfeild} placeholder='************' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setfdata({...fdata,cfmpassword:text})}
            secureTextEntry
            onPressIn={()=>{seterrmsg(null)}}
            autoCapitalize='none'
            />
            </View>

            <View style={styles.emailcontainer}>
            <Abutton title={"Continue"} onPress={()=>handleSubmit()}/>
            </View>

        </View>
       {loading && <ActivityIndicator/>}
        </>
       
        
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
        marginVertical:30,
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

export default SetPasswordScreen;
