import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
//import { head2 } from '../config/textfont';
import colors from '../config/colors';
import Abutton from '../component/Abutton';
import Screen from '../component/Screen';
import { Button, RadioButton } from 'react-native-paper';
import secretkeys from '../config/secretkeys';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FlatList } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { DatePicker } from 'expo';


function SignupScreen({navigation}) {

    const [secretKey, setSecretKey] =useState("");
    const postcodeRegex = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i;

    const [fdata, setfdata]=useState({
        firstname:"",
        lastname:"",
        dob:"12/12/1997",
        phoneno:"",
        email:"",
        conemail:"",
        address:"",
        zip:"",
        password:"",
        userType:"Patient",
    });
    const [showDate, setShowDate] = useState(false);
    const [errmsg,seterrmsg]=useState(null);
    const [date, setDate] = useState(new Date())


    const onChangeDate = (event, selectedDate) => {
        const Dob = selectedDate || null;
        setDate(selectedDate);
       
        setShowDate(Platform.OS === 'ios');
        let tdate = new Date(Dob);
        let fDob= tdate.getDate()+'/'+(tdate.getMonth()+1)+'/'+tdate.getFullYear();
 
        setfdata({...fdata,dob:fDob})
     
    }
    const handleSubmit = () => {
        
        if (    fdata.firstname =="" ||
                fdata.address =="" ||
                fdata.lastname =="" ||
                fdata.conemail ==""||
                fdata.email ==""||
                fdata.dob==""||
                fdata.zip=="" ||
                fdata.phoneno==""){
                    seterrmsg("Please enter all feilds");
                    return;         
        }
        else{
            if(fdata.email != fdata.conemail){
                seterrmsg("email did not match");
                return;
            }
            else if ( fdata.userType==="Admin" && secretKey!==secretkeys.adminkey){
                seterrmsg("incorrect secret key");
            }  else if ( fdata.userType==="Admin" && (!fdata.password || fdata.password.length < 8)){
                seterrmsg("please enter valid password, password must be 8 characters longs");
            }
            else if(!postcodeRegex.test(fdata.zip)){
                seterrmsg("Please enter valid Postcode")
            }
            else{

                if (fdata.userType==="Admin"){
                    
                    fetch(`${secretkeys.localhost}/verify`,{
                        method:'POST',
                        headers:{
                            'Content-Type': "application/json"  
                        },
                        body: JSON.stringify(fdata)
                    })
                    .then(res =>res.json()).then(
                        data =>{
                            if (data.error){
                                seterrmsg(data.error)
                            }
                            else if(data.message) {
                                
                                console.log(data.udata);
                                alert(data.message);
                                navigation.navigate('verifypage',{userdata:data.udata})
                        }
                        }
                    )
                }
                else{
                    fetch(`${secretkeys.localhost}/userapprove`,{
                        method:'POST',
                        headers:{
                            'Content-Type': "application/json"  
                        },
                        body: JSON.stringify(fdata)
                    }).then(res => res.json()).then(
                        data =>{
                            if (data.error){
                                seterrmsg(data.error)
                            }
                            else if(data.message) {
                            
                                alert(data.message);
                                navigation.navigate('Login',{userdata:data.udata})
                        }
                        }

                    )
                }
            }
        }
    }
    
    return (
        
        <Screen>
            <ScrollView >
            <View style={styles.container}>
            <Text style={styles.head1}>Register</Text>
            { errmsg && <View style={styles.errmsg}><Text style={styles.errmsgtext}> {errmsg} </Text></View>}
            <Text style={styles.head2}></Text>
           
            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Who are you registering as ?</Text>
            <RadioButton.Group onValueChange={(value)=>setfdata({...fdata,userType:value})} value={fdata.userType  }>
            <View style={styles.radioinputfeild}>
            <RadioButton.Item label="Patient" value="Patient" />
            <RadioButton.Item label="Admin" value="Admin"/>
            </View>
            </RadioButton.Group>
            </View>
            {fdata.userType === "Admin" && <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Secret Key</Text>
            <TextInput style={styles.inputfeild} placeholder='Alex' placeholderTextColor={colors.grey} 
            onChangeText={(text)=>setSecretKey(text)}
            onPressIn={()=>{seterrmsg(null)}}
            autoComplete='name'
            autoCapitalize='none'
            />
            </View>}
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
            <Text style={styles.head2}>Date of Birth</Text>
            <TouchableOpacity 
            style={styles.inputfeild}
            onPress={()=>setShowDate(true)}
            >
            <Text>{fdata.dob}</Text>
            </TouchableOpacity>
            { showDate && (<><DateTimePicker
            value={date}
            display='spinner'
            onChange={onChangeDate}
            maximumDate={new Date('2015-12-31')}
            />
            {Platform.OS === 'ios' &&<Abutton 
            title="Done"
            style={{backgroundColor:colors.white, width:100, alignSelf:"center"}} 
            onPress={()=>setShowDate(false)} />}
            </>)}

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
            secureTextEntry
            onChangeText={(text)=>setfdata({...fdata,conemail:text})}
            onPressIn={()=>{seterrmsg(null)}}
            autoCapitalize='none'
            autoComplete='email'/>
            </View>

            {fdata.userType === "Admin" && <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Password</Text>
            <TextInput style={styles.inputfeild} placeholder='******' placeholderTextColor={colors.grey} 
            onChangeText={(text)=>setfdata({...fdata,password:text})}
            onPressIn={()=>{seterrmsg(null)}}
            secureTextEntry
            autoComplete='name'
            autoCapitalize='none'
            />
            </View>}

            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Address</Text>
            <TextInput style={styles.inputfeild} placeholder='106E filber village' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setfdata({...fdata,address:text})}
            onPressIn={()=>{seterrmsg(null)}}
            />
            </View>

            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>ZIP Code</Text>
            <TextInput style={styles.inputfeild} placeholder='LE2 7PT' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setfdata({...fdata,zip:text})}
            onPressIn={()=>{seterrmsg(null)}}
            autoCapitalize='none'
            autoComplete='postal-code'/>
            </View>

            <View style={styles.emailcontainer}>
            <Abutton title={"Register"} onPress={()=>handleSubmit()}/>
            </View>
            <Text style={styles.loginhere1}> Already Registered? <Text style={styles.loginhere2} onPress={()=>navigation.navigate("Login")}>Login Here</Text></Text>
            </View>
            </ScrollView>
        </Screen>
        
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
        color: colors.primary,
        textAlign: "center",
        fontWeight:"bold"
    },
    head2: {
        fontSize: 18,
        color: colors.secondary,
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
        borderColor:colors.primary

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

export default SignupScreen;