import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import Screen from '../../component/Screen';
import colors from '../../config/colors';
import Data from './Data';



function Quickappointment() {
    const [currentScreen, setCurrentScreen] = useState(0);
    const [inputText, setInputText] = useState('');
    const [goNext, setGoNext] = useState(true);
    const [ans1, setAns1]= useState([]);
    

    const handleNext = () => {
        if (currentScreen < Data.onboardingScreens.length - 1 && goNext) {
            setCurrentScreen(currentScreen + 1);
        }
    };

    const handleBack = () => {
        if (currentScreen > 0) {
            setCurrentScreen(currentScreen - 1);
        }
    };

    const renderAns1 = ({item}) =>{
        const isSelected = ans1.includes(item);
        return (
                <TouchableOpacity style={[styles.flatlistview,{backgroundColor:isSelected?colors.red:colors.white}]} onPress={()=>{
                    const sltAns =  isSelected ? ans1.filter((ans) => ans !== item) : [...ans1, item];
                    setAns1(sltAns);
                }}>
                    <Text style={{color:isSelected?colors.white:colors.red}}>{item}</Text>
                </TouchableOpacity>
        );
    }

    return (
        <Screen>
        <View style={styles.container}>
           
            <View style={styles.progressBar}>
                <View style={{ width: `${(currentScreen + 1) * (100 / Data.onboardingScreens.length)}%`,backgroundColor:colors.red, height:"100%" } } />
            </View>
           
            <View style={{flex:1, justifyContent:"center"}}>
            <View style={styles.content}> 
            <Text style={styles.text}>{Data.onboardingScreens[currentScreen].text}</Text>
                {currentScreen === 0 && (
                    <FlatList
                    data={Data.lowseverity}
                    numColumns={4}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderAns1}
                   
                    />
                )}
            </View>
            <View style={styles.touchableView}>
                <TouchableOpacity
                    style={{flex:.3}}
                    onPress={handleBack}/>   
                <TouchableOpacity
                    style={{flex:.7}}
                    onPress={handleNext}/>
                </View>
            </View>

                
               

            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        backgroundColor:colors.white,

    },
    progressBar: {
        width: '90%',
        height: 10,
        backgroundColor: colors.white,
        marginBottom: 20,
        borderRadius:10,
        overflow:"hidden",
        borderColor:colors.red,
        borderWidth:2
    },
    flatlistview:{
        height:30,
        borderWidth:2,
        borderColor:colors.red,
        padding:5,
        margin:5,
        borderRadius:5,
        justifyContent:"center",
        alignItems:"center"
    },
    content: {
        height:300,
        zIndex:1,
        justifyContent:"center",
        alignItems:"center",

    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    text: {
        fontSize: 35,
        fontWeight:"200",
        alignItems:"center",
        paddingHorizontal:20,
        marginBottom: 20,
        textAlign: 'center'
    },
    touchableView:{
        flex:1,
        flexDirection:"row",
        position: 'absolute',
        width: '100%',
        height: '100%',
    }
});

export default Quickappointment;