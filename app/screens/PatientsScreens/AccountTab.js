
import React, { useContext, useEffect, useState } from 'react';
import Abutton from '../../component/Abutton';
import { StyleSheet, View } from 'react-native';
import { AuthContext } from '../../context/Authcontext';
import Screen from '../../component/Screen';
import Icons, { Icon } from '../../component/Icons';
import colors from '../../config/colors';
import { Text } from 'react-native';
import secretkeys from '../../config/secretkeys';
import ActivityIndicator from '../../component/ActivityIndicator';
import axios from 'axios';


function AccountTab({navigation}) {

    const {signout,userToken} =useContext(AuthContext);
    const [loading,setLoading] =useState(false);
    const [name, setName] =useState("");
    const [email, setemail] =useState("");
    const [pno, setPno] =useState("");
    const [userType, setUserType] =useState("");
    const [zip, setZip] =useState("");
    const [address,setAddress] = useState("");
    const [spy, setSpy] = useState("")

    useEffect(()=>{
        setLoading(true);
        fetch(`${secretkeys.localhost}/getuserdetails`, {
            method:"POST",
            headers:{
                'Content-Type': "application/json",
                'Authorization':`Bearer ${userToken}`
            }
        }).then(res=>res.json()).then(data => {

        if (data.error){
            setLoading(false);
            alert(data.error)
            }
            else{
               
                setName(data.userdata.name);
                setPno(data.userdata.pno);
                setUserType(data.userdata.userType);
                setZip(data.userdata.zipcode);
                setemail(data.userdata.email);
                setAddress(data.userdata.address)
                setLoading(false);
                setSpy(data.userdata.speciality)
            }
        })

    },[])

    const handleLogout = () =>{
        signout();
        navigation.navigate('Login');
    }

     return (
        <>
       <Screen bgcolor={colors.white}>
        <View style={styles.container}>
            <View style={styles.image}> 
            <Icons type={Icon.FontAwesome} name="user" size={90} color={colors.grey} />
            </View>
            <Text style={styles.textname}>{name}</Text>
            <Text style={styles.textid}>{email}</Text>

            <View style={styles.detailsView}>
            <View style={{marginVertical:10}}>
            <Text style={styles.detailText1 }>Phone Number</Text>
            <Text style={styles.detailText2 }>{pno}</Text>
            </View> 
            <View style={{marginVertical:10}}>
            <Text style={styles.detailText1 } >Account Type</Text>
            <Text style={styles.detailText2 }>{userType}</Text>
            </View> 
            <View style={{marginVertical:10}}>
            <Text style={styles.detailText1 } >{userType=="Doctor"?"Speciality":"Address"}</Text>
            <Text style={styles.detailText2 }>{userType=="Doctor"?spy:address}</Text>
            </View> 
            {userType=="Doctor"?null:<View style={{marginVertical:10}}>
            <Text style={styles.detailText1 } >Zip Code</Text>
            <Text style={styles.detailText2 }>{zip}</Text>
            </View> }
              
            </View>
            <View style={{width:"70%", position:"absolute", bottom:10}}> 
            <Abutton title={"Logout"}
            onPress={() =>handleLogout()}/>
            </View>
            
            {/* <View style={{width:"70%", position:"absolute", bottom:80}}> 
            <Abutton title={"Logout"}
            onPress={()=>{
                axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: `${email}`,
      appId: 11470,
      appToken: 'vlWrDSIZ9I74ltjyZe0csb',
      title: 'Test push notification',
      message: 'Test'
 });
            }}/>
            </View> */}
        
        </View>
        </Screen>
        {loading&& <ActivityIndicator/>}
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"flex-start",
        alignItems:"center"
    },
    image:{
        width:120,
        height:120,
        borderRadius:60,
        backgroundColor:colors.default,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:5,
        borderColor:colors.black,
        borderBottomColor:colors.green,
    },
    textname:{
        paddingTop:10,
        fontSize:26
    },
    textid:{
        fontSize:16,
        color:colors.grey
    },
    detailsView:{
        width:'92%',
        marginTop:50,
        backgroundColor:colors.nblue,
        borderRadius:15,
        padding:15,
        paddingVertical:30,
        
    },
    detailText1:{
        fontSize:16,
        fontWeight:"500",
        color:colors.yellow
    },
    detailText2:{
        fontSize:20,
        fontWeight:"500",
        color:colors.white
    }
})

export default AccountTab;