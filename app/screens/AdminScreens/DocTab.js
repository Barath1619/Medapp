import React from 'react';
import Screen from '../../component/Screen';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icons, { Icon } from '../../component/Icons';
import colors from '../../config/colors';

function DocTab({navigation}) {
    return (
        <Screen>
            <TouchableOpacity onPress={() => navigation.navigate('DocRegister')}>
        <View style={styles.cardview}>
        <Icons type={Icon.MaterialCommunityIcons} name="calendar-check" color={colors.white} shape={33} size={30} bgcolor={colors.primaryblue} />
        <Text style={styles.Textfield}> Register a Doctor</Text>

        <Icons type={Icon.FontAwesome} name="chevron-right" color={colors.primaryblue} size={35} />
        </View>
        </TouchableOpacity>
        </Screen>
    );
}

const styles = StyleSheet.create({
    Headings:{
        fontSize:30,
        fontWeight:"bold",
        padding:8,
        color:colors.primartbluelight
    },
    cardview:{
        width:'90%',
        height:100,
        backgroundColor:colors.white,
        alignSelf:"center",
        borderRadius:10,
        alignItems:"center",
        padding:10,
        marginTop:10,
        flexDirection:"row",
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: .7,
        shadowRadius: 5,
        elevation: 5,
        
    },
    Textfield:{
        padding:10,
        fontSize:23,
        flex:1
    }
})

export default DocTab;