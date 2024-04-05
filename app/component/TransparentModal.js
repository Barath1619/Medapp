import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../config/colors';


function TransparentModal({isVisible, setModalVisible, item, navigation}) {

  console.log(item);
    const Chat = ( ) => {
        navigation.navigate("Chat",{  screen: 'ChatScreen',params:{item, user2id:item.docid}});
        setModalVisible(false)
    }

    const Feedback = ( ) => {
        navigation.navigate("Feedback",{aptid:item.id});
        setModalVisible(false)
    }

    const  Prescriptions = ( ) => {
        navigation.navigate("Prescriptions",{aptid:item.id});
        setModalVisible(false)
    }

    return (
        <Modal
        visible={isVisible}
        animationType='fade'
        transparent={true}
        
      >
        <View style={styles.modalContainer} >
          <View style={styles.modalContent}>
          <TouchableOpacity onPress={Chat } style={{width:'70%', justifyContent:"center", alignItems:"center", height:50, backgroundColor:colors.primartbluelight, borderRadius:5}}>
                <Text style={{color:colors.white, fontSize:20}}>Chat Consultation</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={Feedback} style={{width:'70%',marginTop:10, justifyContent:"center", alignItems:"center", height:50, backgroundColor:colors.primartbluelight, borderRadius:5}}>
                <Text style={{color:colors.white, fontSize:20}}>Send Feedback</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={Prescriptions} style={{width:'70%',marginTop:10, justifyContent:"center", alignItems:"center", height:50, backgroundColor:colors.primartbluelight, borderRadius:5}}>
                <Text style={{color:colors.white, fontSize:20}}>Prescriptions</Text>
            </TouchableOpacity>
           
            <TouchableOpacity onPress={()=>setModalVisible(false)} style={{width:'100%',bottom:0,position:"absolute", justifyContent:"center", alignItems:"center", height:50, backgroundColor:colors.default}}>
                <Text style={{color:colors.red, fontSize:20}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:"rgba(78,84,88,0.5)"
    },
    modalContent: {
      backgroundColor: 'white',
      width: '70%',
      height: 300,
      paddingTop:40,
      alignItems: 'center',
      borderRadius: 10,
      overflow:"hidden"
    },
  });

export default TransparentModal;