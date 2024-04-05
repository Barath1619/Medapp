import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

function ActivityIndicator(props) {
    return (
       <View style={[StyleSheet.absoluteFillObject,styles.container]}>
        <LottieView 
        source={require("../assets/animation_2.json")} 
        autoPlay
        loop
        style={{
            width: 100,
            height: 100,
          }}/>
       </View>
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        zIndex:1,
        backgroundColor:"rgba(78,84,88,0.5)"
    }
})

export default ActivityIndicator;