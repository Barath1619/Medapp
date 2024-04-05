import React from 'react';
import { ImageBackground, View, StyleSheet, Image } from 'react-native';

import colors from '../config/colors';
import Abutton from '../component/Abutton';

function WelcomesScreen({navigation}) {
    return (
       <View style={styles.background} >
        <Image source={require("../assets/MedicalLogo.png")} style={styles.logo}/>
        <View style={styles.buttonview}>

        <Abutton title={"Login"} onPress={()=>navigation.navigate('Login')}/>
        <Abutton title={"Signup"} onPress={()=>navigation.navigate('Signup')} color='white' textcolor='primary' borcolor='primary'  />
        
        </View>
       </View>
       
    );
}

const styles = StyleSheet.create({

    background: {
        flex:1, 
        justifyContent: "flex-end",
        alignItems: 'center',
        backgroundColor:colors.white,
        
    },
    buttonview:{
        flex:.4,
        width:"100%",
        padding:20,
        backgroundColor: colors.secondary,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
   
    logo:{
        width:'90%',
        height:300,
        position:'absolute',
        top: 120,

    }

    
})

export default WelcomesScreen;