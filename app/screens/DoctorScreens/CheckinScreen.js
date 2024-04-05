import React, { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../config/colors';
import Screen from '../../component/Screen';
import { Calendar } from 'react-native-calendars';
import Abutton from '../../component/Abutton';
import { AuthContext } from '../../context/Authcontext';
import secretkeys from '../../config/secretkeys';
import ActivityIndicator from '../../component/ActivityIndicator';

function CheckinScreen(props) {

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelctedSlot]= useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [appointments, setAppointments] = useState({});
    const [slots, setslots] =useState(["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"]);
    const {userToken} = useContext(AuthContext)
    useEffect(()=>{
        setIsLoading(true);
        fetch(`${secretkeys.localhost}/ExistingAvailability`,{
            method:'GET',
            headers:{
                'Content-Type': "application/json",
                'Authorization':`Bearer ${userToken}`
            },
        }).then(res => res.json()).then(data =>{
         
            setAppointments(data.appointments)
            setIsLoading(false);
        })
    },[])


    const TimeSlots = ({  selectedDate, selectedSlots }) => {
        const timeSlots = slots;

        const renderItem = ({ item, index }) => {
        const isSelected = selectedSlot.includes(item);
        return (
            <TouchableOpacity 
            onPress={ ()=> {
                const sltslot =  isSelected ? selectedSlot.filter((slots) => slots !== item) : [...selectedSlot, item];
                setSelctedSlot(sltslot);
            }} 
            style={[styles.timeSlot,{backgroundColor : isSelected ? colors.primaryblue :colors.white}]}>
              <Text style={[styles.timeSlotText,{color : isSelected ? colors.white :colors.primaryblue }]}>{item}</Text>
            </TouchableOpacity>
          );}

        return (
          <View style={styles.timeSlotcontainer}>
             <FlatList
        data={timeSlots}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
      />
          </View>
        );
      };


    const handleDateSelect = (date) => {

        setSelectedDate(date.dateString);
        const existingSlots = appointments[date.dateString] || [];
        setSelctedSlot(existingSlots)
    
      };

    const handleSubmit = () => {
    
    const slots = [];

    for (const slot of selectedSlot) {
        const [hours, minutes] = slot.split(":");
        const thisTime = new Date(0, 0, 0, hours, minutes);
        slots.push(slot);

        for (let i = 15; i < 60; i += 15) {
            thisTime.setMinutes(thisTime.getMinutes() + 15);
            slots.push(`${thisTime.getHours()}:${thisTime.getMinutes()}`);
        }
      }
      console.log(slots)

        const avlappoint ={
            ...appointments,
            [selectedDate]:slots 
        }
        
        setAppointments(avlappoint)

        setIsLoading(true);
        fetch(`${secretkeys.localhost}/DoctorCheckIn`,{
            method:'POST',
            headers:{
                'Content-Type': "application/json",
                'Authorization':`Bearer ${userToken}`
            },
            body: JSON.stringify({appointments : avlappoint})
        }).then(res => res.json()).then(data =>{
            if (data.error){
                setIsLoading(false);
                alert(data.error)
               }
            else{
                alert(data.message)
                setAppointments(data.appointments)
                setIsLoading(false);
            }
            
        })

        
    }

      // Calculate the current date
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const minDate = `${year}-${month}-${day}`;

    return(
        <>
        <Screen>
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

        
        {selectedDate && <TimeSlots selectedDate={selectedDate}  />}
        <View style={styles.buttoncontainer}>
        <Abutton title="Confirm Availability" color='primaryblue' onPress={handleSubmit}/>
        </View>
        
        </Screen>
        {isLoading && <ActivityIndicator/> }
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
      timeSlotText: {
        textAlign: 'center',
        fontWeight:"800"
      },
      flatListContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
      },

      buttoncontainer:{
        flex:1,
        justifyContent:"flex-end",
        marginHorizontal:20,
        marginVertical:10
      }
  });

export default CheckinScreen;