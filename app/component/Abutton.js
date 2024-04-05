import React from 'react';
import { StyleSheet,Text,TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable'


import colors from '../config/colors';

function Abutton({title, onPress,color="primary",textcolor='white',borcolor='white'}) {
    return (
        
       <TouchableOpacity style={[styles.button,{backgroundColor: colors[color], borderColor:colors[borcolor] }]} onPress={onPress}>
        <Text style={ [styles.bottontext, {color: colors[textcolor]}]}>{title}</Text>
       </TouchableOpacity>
      
    );
}

const styles = StyleSheet.create({
    button: {
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        padding:15,
        borderRadius: 10,
        marginVertical:10,
        borderWidth:3
        
    },
    bottontext :{
        color:colors.white,
        fontSize:18,
        textTransform:"uppercase",
        fontWeight:900
    }
})

export default Abutton;