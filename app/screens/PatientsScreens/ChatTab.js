import React, { useState, useCallback, useEffect, useContext } from 'react'
import Screen from '../../component/Screen';
import { StyleSheet, Text } from 'react-native';
import colors from '../../config/colors';
import { View, FlatList } from 'react-native';
import { Avatar } from 'react-native-paper';
import Chatlist from '../../component/Chatlist';
import secretkeys from '../../config/secretkeys';
import { AuthContext } from '../../context/Authcontext';

export function ChatTab({navigation,route}) {

const {item} = route.params??{};
const [isLoading, setIsLoading] =useState(false);
const [chatList, setChatList] = useState([]);
const {userToken} = useContext(AuthContext);
const [refresh, setrefresh] = useState(false);


const loadChat = () => {
      setIsLoading(true);
      fetch(`${secretkeys.localhost}/getChats`,{
            method:'POST',
            headers:{
              'Content-Type': "application/json",
              'Authorization': `Bearer ${userToken}`
            },
        }).then(res => res.json()).then( (data) => {
            setChatList(data.Chatlist)
            setIsLoading(false);  
        })
}

useEffect(()=>{
  loadChat()
},[]);

  return (
   <Screen>
    <Text style={styles.Headings}>Chat History</Text>
    <FlatList
    data={chatList}
    keyExtractor={(item,index)=> index.toString()}
    renderItem={({item})=>(<Chatlist doc={item.chatname} onPress={()=>navigation.navigate("ChatScreen", {item, user2id:item.id})}/>)}
    refreshing={refresh}
        onRefresh={()=>{
          loadChat()
        }} 
    ItemSeparatorComponent={()=>(<View style={{backgroundColor:colors.grey,width:'100%',height:1}}></View>)}
         />

    
   </Screen>
  )
}
const styles = StyleSheet.create({
  Headings:{
      fontSize:30,
      fontWeight:"bold",
      padding:8,
      color:colors.primartbluelight
  },
})

export default ChatTab;