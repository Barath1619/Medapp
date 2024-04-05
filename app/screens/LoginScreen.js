import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput } from 'react-native';
import { head2 } from '../config/textfont';
import colors from '../config/colors';
import Abutton from '../component/Abutton';
import { AuthContext } from '../context/Authcontext';
import secretkeys from '../config/secretkeys';
import ActivityIndicator from '../component/ActivityIndicator';
import { registerIndieID } from 'native-notify';
import axios from 'axios';

function LoginScreen({navigation}) {

const {signin} = useContext(AuthContext)

const [fdata, setfdata] = useState({
    email: "",
    password: ""
});
const [errmsg,seterrmsg]=useState(null);
const [loading, setLoading] =useState(false);

const handleSubmit = () =>{
    
    if (  fdata.email ==""|| fdata.password==""){
                    seterrmsg("Please enter all feilds");
                    return;         
        }
        else{
                setLoading(true);
                fetch(`${secretkeys.localhost}/signin`,{
                    method:'POST',
                    headers:{
                        'Content-Type': "application/json"  
                    },
                    body: JSON.stringify(fdata)
                })
                .then(res =>res.json()).then(
                    data =>{
                       //console.log( data)
                       if (data.error){
                        setLoading(false);
                        seterrmsg(data.error)
                       }
                       else{
                        setLoading(false);
                        if(data.newUser==1){
                            navigation.navigate("SetPassword", {userType:data.userType,token:data.token, id:data.id});
                            //signin(data.userType, data.token);
                        }
                        else{
                            console.log(data.token)
                            signin(data.userType, data.token);
                            registerIndieID(`${fdata.email}`, 11470, 'vlWrDSIZ9I74ltjyZe0csb');
                            navigation.navigate("TabNavigator");
                        }
                       
                        
                       }
                    }
                )
            
        }
    }

    return (
        
        <>
        <View style={styles.container}>
            <Text style={styles.head1}>SIGN IN</Text>
            
            <Image style={styles.docimg}  source={require("../assets/docimg.jpg")}/>
            { errmsg && <View style={styles.errmsg}><Text style={styles.errmsgtext}> {errmsg} </Text></View>}
            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Email Address</Text>
            <TextInput style={styles.inputfeild} placeholder='Alex.mercer@gmail.com' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setfdata({...fdata,email:text})}
            onPressIn={()=>{seterrmsg(null)}}
            autoCapitalize='none'
            />
            </View>
            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Password</Text>
            <TextInput style={styles.inputfeild} placeholder='************' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setfdata({...fdata,password:text})}
            secureTextEntry
            onPressIn={()=>{seterrmsg(null)}}
            autoCapitalize='none'
            />
            </View>
            <Text> Forgot Password?</Text>

            <View style={styles.emailcontainer}>
            <Abutton title={"Login"} onPress={()=>handleSubmit()}/>
            </View>
            <Text> I'm a new user. <Text style={styles.Reghere} onPress={()=>navigation.navigate("Signup")}>Register Here</Text></Text>

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

export default LoginScreen;
