import React from 'react';
import { Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';
import colors from '../config/colors';

function Chatlist({doc, date="", sym="", onPress}) {
    return (
        <View>
        <TouchableHighlight underlayColor={colors.grey2} style={{flexDirection:"row",paddingVertical:10, paddingHorizontal:10, backgroundColor:colors.white}} onPress={onPress} >
        <>
        <View style={{height:70,borderWidth:2, borderColor:colors.primaryblue, width:70, borderRadius:40, backgroundColor:colors.white, justifyContent:"center",
      alignItems:"center"}}>
        <Text style={{fontSize:50, color:colors.primaryblue}}>{doc[0].toUpperCase()}</Text>
        </View>
        <View style={{justifyContent:"center", padding:10}}>
            <Text style={{fontSize:20,} }>{doc}</Text>
            {date&&<Text>Appointment dated:{date}</Text>}
            {sym&&<Text>Symptom:{sym}</Text>}
        </View>
        </>
        </TouchableHighlight>
      </View>
    );
}

export default Chatlist;