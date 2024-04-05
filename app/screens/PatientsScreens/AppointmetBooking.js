import React, { useContext, useState } from 'react';

import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';



import Screen from '../../component/Screen';
import colors from '../../config/colors';
import Abutton from '../../component/Abutton';
import ActivityIndicator from '../../component/ActivityIndicator';
import secretkeys from '../../config/secretkeys';
import { AuthContext } from '../../context/Authcontext';


function AppointmetBooking({navigation, route}) {

  const {userToken} = useContext(AuthContext);

  const { docdetails, appointments} = route.params;


    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelctedSlot]= useState(null);
    const [slot, setSlot] = useState("");
    const [sym, setsym] = useState("");
    const [desc, setdesc] = useState("");
    const [loading, setLoading] = useState(false);
    const [datatimeslot, setDataTimeSlot] =useState(appointments);

    
    const TimeSlots = ({ timeSlotsMap, selectedDate }) => {
        const timeSlots = timeSlotsMap[selectedDate]?.filter(slot => !slot.endsWith("00")) || [];
        

        const renderItem = ({ item, index }) => (
          
            <TouchableOpacity 
            onPress={()=> {
                setSelctedSlot(index);
                setSlot(item)
            }} 
            style={[styles.timeSlot,{backgroundColor : selectedSlot==index? colors.primaryblue:colors.white}]}>
              <Text style={[styles.timeSlotText,{color : selectedSlot==index? colors.white :colors.primaryblue}]}>{item}</Text>
            </TouchableOpacity>
          );
      
        return (
          <View style={styles.timeSlotcontainer}>
             <FlatList
        data={timeSlots }
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
      />
     
          
      </View>
        );
      };


    const handleDateSelect = (date) => {
        setSelectedDate(date.dateString);
       
      };

    const handlebooking = () => {
      setLoading(true);

      if(!selectedDate || !slot || !sym || !desc){
        setLoading(false);
        alert("Kindly enter all details")
      }
      else{

      fetch(`${secretkeys.localhost}/confirmbooking`,{
        method:'POST',
        headers:{
          'Content-Type': "application/json",
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          doctor: docdetails.docid,
          date:selectedDate,
          time:slot,
          sym,
          desc
        })
      }).then(res => res.json()).then(data =>{
        if(data.error){
          alert(data.error);
        }
        else{
          alert(data.message);
          navigation.navigate("Appointmenttab");
          navigation.navigate('Summary',{screen:"Summarytab"})
        }
    })
  }

 

    }

      // Calculate the current date
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const minDate = `${year}-${month}-${day}`;

    return(
     <>
        
        <Screen bgcolor={colors.default}>
         
        <View style={styles.container}>
          
        <Calendar style={styles.calendar}  minDate={currentDate.toDateString()} onDayPress={handleDateSelect}
        markedDates={{ [selectedDate]: { selected: true } }}
        theme={{selectedDayBackgroundColor:colors.primaryblue,
                todayTextColor:colors.primaryblue,
                arrowColor:colors.primaryblue,
                monthTextColor:colors.primaryblue,
                textDayFontWeight: '800', 
                textMonthFontWeight: '800', 
                }}  />
        </View>
        {!datatimeslot[selectedDate] && selectedDate && <Text style={{textAlign:"center", marginTop:100}}>Please select other data Date, there seem to be no available appointments for doctor on this date</Text>}

        {!selectedDate && <Text style={{textAlign:"center", marginTop:100}}>Please select a Date</Text>}
        
        <TimeSlots selectedDate={selectedDate} timeSlotsMap={datatimeslot} />
        <ScrollView>   
        {datatimeslot[selectedDate]?.length > 0 && (<View>
        <View style={styles.timeSlotcontainer2}>
        <Text style={styles.appointtext}>Appointment with: <Text style={styles.doctext}>Dr.{docdetails.docname}</Text></Text>

          <TextInput style={styles.symptom} 
          placeholder='Symptoms' 
          placeholderTextColor={colors.grey}
          onChangeText={(text) => setsym(text)}
          /> 

          <TextInput style={styles.description} 
          placeholder='How are you feeling today ?' 
          placeholderTextColor={colors.grey}
          multiline={true} 
          numberOfLines={4} 
          textAlignVertical="top" 
          onChangeText={(text)=> setdesc(text)} /> 

          <View style={{flexDirection:'row', 
          marginVertical:10, 
          }}>
            <View style={styles.dateview}>
              <Text style={{fontSize:24}}>
            {selectedDate || "Date"}
              </Text>
            </View>
            <View style={styles.dateview}>
              <Text style={{fontSize:24}} >
            {slot|| "Time"}
              </Text>
            </View>
              
          </View>
          </View>

          <View style={styles.buttoncontainer}>
        <Abutton title="Book" color='primaryblue' onPress={handlebooking}/>
        </View>
          </View> )}
          </ScrollView>     
          
        
       
        </Screen>
        
        {loading && <ActivityIndicator/>}
        </>
        
    );
  };


  const styles = StyleSheet.create({
    container: {
        width:'100%',
        marginTop:10,
        
    },
    calendar:{
        width:'90%',
        borderRadius:10,
        alignSelf:"center",
        padding:5,
        shadowColor:colors.black,
        shadowOffset:{width:2,height:3},
        shadowOpacity:.5,
        shadowRadius:5,
        elevation:5
    },
    
      timeSlot: {
        width:"30%",
        padding: 10,
        margin: 5,
        backgroundColor: '#ccc',
        borderRadius: 5,
        borderWidth:2,
        borderColor:colors.primaryblue
      },
      timeSlotcontainer:{
        marginTop:20,
        alignItems:"center",
        marginHorizontal:20,
        padding:5,
      },
      timeSlotcontainer2:{
        flex:1,
        alignItems:"center",
        marginHorizontal:20,
        padding:5,
      },
      timeSlotText: {
        textAlign: 'center',
        fontWeight:"800"
      },
      flatListContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
      },

      buttoncontainer:{
        height:100,
        justifyContent:"flex-end",
        marginHorizontal:20,
        
      },
      appointtext:{
        fontSize:16,
        marginBottom:10,
        color: colors.grey
      },
      doctext:{
        fontSize:20,
        fontWeight:"700",
        color:colors.hotpink
      },
      description:{
        width:'100%',
        height:100,
        backgroundColor:colors.white,
        borderColor:colors.primaryblue,
        borderWidth:2,
        marginVertical:10,
        borderRadius:10,
        paddingHorizontal:10
      },
      symptom:{
        width:'100%',
        height:60,
        backgroundColor:colors.white,
        borderColor:colors.primaryblue,
        borderWidth:2,
        marginVertical:10,
        borderRadius:10,
        paddingHorizontal:10
      },
      dateview:{
        flex:1, 
        justifyContent:"center", 
        alignItems:"center",
        padding:10,
        backgroundColor:colors.white,
        borderColor:colors.primaryblue,
        borderWidth:2,
        borderRadius:10,
        margin:1

      }
  });

export default AppointmetBooking;