import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { StyleSheet,View } from 'react-native';
import colors from '../config/colors';


export const Icon = {
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons,
    Feather,
    FontAwesome,
    FontAwesome5,
    AntDesign,
    Entypo,
    SimpleLineIcons,
    Octicons,
    Foundation,
    EvilIcons,
}

function Icons({type, name, color, size = 24, style, shape ,radius=shape*2, bgcolor=colors.white}) {

    const Tag = type;
    

        

        if (shape){
            return (
                <View style={{
                    width: shape*2,
                    height:shape*2,
                    backgroundColor:bgcolor,
                    justifyContent:"center",
                    alignItems:"center",
                    borderRadius:radius
                }}>
                    <Tag name={name} size={size} color={color} style={style}/>            
                </View>
        );
        }
        else{
            return (<Tag name={name} size={size} color={color} style={style}/> );
    }
}
    

const styles = StyleSheet.create({
    
})
export default Icons;