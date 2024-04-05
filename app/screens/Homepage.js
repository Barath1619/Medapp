import React, { useContext } from 'react';
import Abutton from '../component/Abutton';
import { StyleSheet, View } from 'react-native';
import { AuthContext } from '../context/Authcontext';


function Homepage({navigation}) {

    const {signout,userToken} =useContext(AuthContext);

    const handleLogout = () =>{
        signout();
        //console.log(userToken)
        navigation.navigate('Login');
    }
     return (
       
        <View style={styles.container}>

            <Abutton title={"Logout"}
            onPress={() =>handleLogout()}/>
        
        </View>
        

    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default Homepage;