import React from 'react';
import { ImageBackground, View,StyleSheet, Image } from 'react-native';
import colors from '../config/colors';

function ProfileScreen(props) {
    return (
       
            <ImageBackground blurRadius={5} resizeMode='cover' source={require("../assets/profilebackground.jpg")} style={styles.imagebg}>
                <View style={styles.profilepic}>
                    <Image  style={styles.avatar} source={require("../assets/profileavatar.png")}/>
                </View>
            </ImageBackground>
        
    );
}

const styles = StyleSheet.create({   
    imagebg:{
        width: "100%",
        height: 300,
        justifyContent:'center',
        alignItems: "center"
    },
    profilepic: {
        width: 140,
        height: 140,
        borderRadius: 100,
        borderWidth:5,
        borderColor:colors.grey,
        backgroundColor: colors.white,
        overflow:'hidden',
        justifyContent:"center",
        alignItems:"center"
    },
    avatar:{
        width:120,
        height:120,
        borderRadius: 100
    }

})

export default ProfileScreen;