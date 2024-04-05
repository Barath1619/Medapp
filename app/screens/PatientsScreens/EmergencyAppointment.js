import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import Screen from '../../component/Screen';
import colors from '../../config/colors';
import Data from './Data';
import Abutton from '../../component/Abutton';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';



function EmergencyAppointment({navigation}) {

    const [currentScreen, setCurrentScreen] = useState(0);
    const [inputText, setInputText] = useState('');
    const [goNext, setGoNext] = useState(false);
    const [ans1, setAns1]= useState([]);
    const [ans2, setAns2]= useState([]);
    const [ans3, setAns3]= useState(null);
    const [ans4, setAns4]= useState(null);
    const [ans5, setAns5]= useState(null);
    const [ans6, setAns6]= useState(null);

    const [selectedRating, setSelctedRating] = useState(null)
    const [goNext1,  setGoNext1] =useState(false);

    useEffect(() => {
        if (goNext1) {
            handleNext();
            setGoNext1(false); 
        }
    }, [goNext1]);

    const handleNext = () => {
        if (currentScreen < Data.onboardingScreens.length - 1 && (goNext||goNext1)) {
            setCurrentScreen(currentScreen + 1);
            setGoNext(false);
            setGoNext1(false);
        }
        if(ans6){
            calculateHealthScore(ans1,ans2,ans3,ans4,ans5,ans6);
        }
         
    };

    const handleBack = () => {
        if (currentScreen > 0) {
            setCurrentScreen(currentScreen - 1);
        }
    };

    const handleNone = () => {
    
        if(currentScreen === 0){

            setAns1([]);
            setGoNext1(true);
            handleNext();
        }
        if(currentScreen === 1){

            setAns2([]);
            setGoNext1(true);
            handleNext();
        }
        if(currentScreen === 3){

            setAns4(0);
            setGoNext1(true);
            handleNext();
        }
        if(currentScreen === 5){

            setAns6("None");
            setGoNext(true);
            handleNext();
        }
        
    }

    const renderAns1 = ({item}) =>{
        const isSelected = ans1.includes(item);
        return (
                <TouchableOpacity style={[styles.flatlistview,{backgroundColor:isSelected?colors.red:colors.white}]} onPress={()=>{
                    const sltAns =  isSelected ? ans1.filter((ans) => ans !== item) : [...ans1, item];
                    setAns1(sltAns);
                    if(sltAns.length>0)
                        setGoNext(true);
                }}>
                    <Text style={{color:isSelected?colors.white:colors.red}}>{item}</Text>
                </TouchableOpacity>
        );
    }

    const renderAns2 = ({item}) =>{
        const isSelected = ans2.includes(item);
        //console.log(ans2)
        return (
                <TouchableOpacity style={[styles.flatlistview,{backgroundColor:isSelected?colors.red:colors.white}]} onPress={()=>{
                    //console.log(ans2)
                    const sltAns =  isSelected ? ans2.filter((ans) => ans !== item) : [...ans2, item];
                    setAns2(sltAns);
                    if(sltAns.length>0)
                        setGoNext(true);
                }}>
                    <Text style={{color:isSelected?colors.white:colors.red}}>{item}</Text>
                </TouchableOpacity>
        );
    }

    const renderAns4 = ({item, index}) =>{
        
        return (
                <TouchableOpacity style={[styles.flatlistview,{backgroundColor:selectedRating===index?colors.red:colors.white}]} onPress={()=>{
                    setAns4(item);
                    setSelctedRating(index);
                    setGoNext(true);
                }}>
                    <Text style={{color:selectedRating===index?colors.white:colors.red}}>{item}</Text>
                </TouchableOpacity>
        );
    }

   

    const calculateHealthScore = (ans1,ans2,ans3,ans4,ans5,ans6) => {
    
        const symWeights = {
        "Fever": 2,
        "Cough": 2,
        "Cold": 2,
        "Fatigue": 3,
        "Loss Of Smell": 2,
        "Loss Of Taste": 2,
        "Sore Throat": 2,
        "Runny Nose":2,
        "Sneezing":1,
        "Nausea":2,
        "Stomach Upset":2,
        "Diarrhea":3,
        "Swollen Glands":3,

         "Shortness Of Breath": 6,
         "Palpitation": 5,
         "Seizures":8, 
         "Chest Pain":8, 
         "Uncontrolled Bleeding":7, 
         "Abdominal Pain":8, 
         "Severe Dehydration":5, 
        "Loss of Consciousness":7, 
        "Confusion":7, 
        "Persistent Vomiting or Diarrhea":7, 
        "Severe Dehydration":6,

         "None":0,

         "Hypertension":8,
         "Diabetes":7,
         "Heart Disease":10,
         "Arthritis":6,
         "Migraine":8,
         "Allergies":5,
         "Depression":6,
         "Thyroid Disorders":6,
         "Chronic Obstructive Pulmonary Disease":9,
         "Gastroesophageal Reflux Disease":7,
         "Cancer":10,
         "Chronic Kidney Disease":8,
         "Bipolar Disorder":6,
     };
 
     const symScore = (ans1.reduce((total, symptom) => total + (symWeights[symptom] || 0), 0)) * ans3 + ans2.reduce((total, symptom) => total + (symWeights[symptom] * ans3 || 0), 0);
 
     const medCond =  (symWeights[ans6] || 0);

     console.log(symScore, medCond)

    

if (ans5<30){
    if(symScore >= 36 || ans2.length>1||ans3>8||(symScore >= 15 && medCond>0)){
        //console.log("grant")
        navigation.navigate("Result")
    }
    else{
        alert("Sorry, your not acceptable for emergency appointment");
        navigation.navigate("Appointmenttab")
    }

}
else if(ans5>=30 && ans5<50||(symScore >= 15 && medCond>0)){
    if(symScore >= 25 || ans2.length>0||ans3>6){
        navigation.navigate("Result")
    }
    else{
        alert("Sorry, your not acceptable for emergency appointment");
        navigation.navigate("Appointmenttab")
    }

}
else if(ans5>50){
    if(symScore >= 20 || ans2.length>1||ans3>4||(symScore >= 15 && medCond>0)){
        navigation.navigate("Result")
    }
    else{
        alert("Sorry, your not acceptable for emergency appointment");
        navigation.navigate("Appointmenttab")
    }

}
    
     
     }

    return (
       <Screen bgcolor={colors.white}>
        <View style={styles.container}>
            <View style={styles.progressBar}>
                <View style={{ width: `${(currentScreen + 1) * (100 / Data.onboardingScreens.length)}%`,backgroundColor:colors.red, height:"100%" } } />
            </View>

            <View style={{width:'100%',height:"100%", justifyContent:"center"}}>
            <View style={styles.content}> 
            <Text style={styles.text}>{Data.onboardingScreens[currentScreen].text}</Text>
                {currentScreen === 0 && (
                    <FlatList
                    data={Data.lowseverity}
                    numColumns={4}
                    horizontal={false}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderAns1}
                    />
                )}

                {currentScreen === 1 && (
                                    
                                    <FlatList
                                    data={Data.moderateseverity}
                                    numColumns={3}
                                    keyExtractor={(_, index) => index.toString()}
                                    renderItem={renderAns2}
                                    />
                                  
                                )}     

                {currentScreen === 2 && (
                                   <TextInput style={{width:100,height:40, borderBottomColor:colors.black, borderBottomWidth:2, textAlign:"center"}}
                                    placeholder='no. of day'
                                    keyboardType='number-pad'
                                    onChangeText={(text)=>{
                                        setAns3(text);
                                        if(text!=="")
                                            setGoNext(true);
                                        else
                                            setGoNext(false);
                                    }}/>
                                )}


                {currentScreen === 3 && (
                                    <FlatList
                                    data={Data.rating}
                                    numColumns={5}
                                    keyExtractor={(_, index) => index.toString()}
                                    renderItem={renderAns4}
                                    />
                                )}

                
                
                {currentScreen === 4 && (
                                   <TextInput style={{width:100,height:40, borderBottomColor:colors.black, borderBottomWidth:2, textAlign:"center"}}
                                    placeholder='Your age'
                                    keyboardType='number-pad'
                                    onChangeText={(text)=>{
                                        setAns5(text);
                                        if(text!=="")
                                            setGoNext(true);
                                        else
                                            setGoNext(false);
                                    }}/>
                                )}

                {currentScreen === 5 && (
                                     

                                     <View style={{ width:"70%",marginBottom:20}}>
                                         <Dropdown
                                         style={{width:'100%', height:60}}
                                         label='Medical Condition'
                                         data={Data.medicalCondition}
                                         onChangeText={(item)=>setAns6(item)}
                                       
                                       />
                                        </View>

                                
                                )}
                



               {(currentScreen === 0||currentScreen === 1||currentScreen === 3|| currentScreen === 5) && <TouchableOpacity style={[styles.flatlistview,{backgroundColor:colors.red, height:40, width:200}]} onPress={handleNone} >
                    <Text style={{color:colors.white}}>None</Text>
                    
                </TouchableOpacity> }


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

        zIndex:1,
        justifyContent:"center",
        alignItems:"center",
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
        //backgroundColor:"yellow",
        height: '100%',
    }
});

export default EmergencyAppointment;