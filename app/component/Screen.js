import React from 'react';
import { Platform, SafeAreaView,StatusBar,StyleSheet } from 'react-native';
import  Constants  from 'expo-constants';
import colors from '../config/colors';

function Screen({children,bgcolor=colors.white}) {
    return (
        <SafeAreaView style={[styles.container,{backgroundColor:bgcolor}]}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingTop:Platform.OS === "android" ? StatusBar.currentHeight:0,
        flex:1
    }
})

export default Screen;