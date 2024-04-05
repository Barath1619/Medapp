import React, { useContext, useEffect, useRef, useState } from 'react';
import Screen from '../component/Screen';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import colors from '../config/colors';
import io from 'socket.io-client'
import secretkeys from '../config/secretkeys';
import { AuthContext } from '../context/Authcontext';

const socket = io(secretkeys.socketio)

function ChatScreen({navigation, route}) {

    const {item, user2id} = route.params;
    const [user1, setuser1] = useState(null);
    const [user2, setuser2] = useState(null);
    const [userid, setUserid] = useState(null);
    const [roomid, setRoomid] = useState(null);
    const [chat, setChat] = useState([]);
    const [currentmessage, setCurrentmessage] = useState(null);
    const {userToken} = useContext(AuthContext);

    const scrollViewRef = useRef();

    const sortroomid = (id1, id2) => {
        if (id1 > id2) {
            return id1 +"$"+ id2
        } else {
            return id2 +"$"+ id1
        }
    }
    const loadMessages = (roomid) => {
        //console.log("3")
        fetch(`${secretkeys.localhost}/getchathistory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomid  })
        }).then(res => res.json())
            .then(data => {
                setChat(data)
            })
    }

    const loadData = () =>{
        //console.log(item.id)
        fetch(`${secretkeys.localhost}/userdetails`,{
                method:'POST',
                headers:{
                  'Content-Type': "application/json",
                  'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({id:user2id})
        }).then(res => res.json()).then(async (data) => {
            
            let roomid = sortroomid(data.user1, data.user2);
            setRoomid(roomid);
            setuser1(data.user1);
            setUserid(data.user1);
            setuser2(data.user2);
            socket.emit('joined', {roomid:roomid, })
            loadMessages(roomid)
        })
    }

    useEffect(()=>{
        
        loadData();
    },[])

    

    useEffect(() => {
    
        socket.on('receive_message', (data) => {
            console.log('recieved message - ', data);
            if(roomid){

                loadMessages(roomid);
            }
        })
    }, [socket])

    const sendMessage = () => {
        const messagedata = {
            message: currentmessage,
            roomid: roomid,
            sender: user1,
            receiver: user2
        }

        fetch(`${secretkeys.localhost}/savechat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messagedata)
        }).then(res => res.json()).then((data) => {
            if(data.message){
                setCurrentmessage("");
                socket.emit('send_message', messagedata)
                loadMessages(roomid)
            }
            else{
                alert('somthing went wrong');
                setCurrentmessage("");
            }
        })
            
    }


    return (
        <Screen>

       
        <View style={styles.container}>
            <View style={styles.s1}>
                <TouchableOpacity onPress={() => navigation.navigate('Chattab')} style={styles.goback}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="gray" />
                </TouchableOpacity>

                
                     <View style={{height:50, width:50,borderWidth:2, borderColor:colors.blue, borderRadius:40, backgroundColor:"white", justifyContent:"center",
                     alignItems:"center"}}>
                                <Text style={{fontSize:35, color:colors.primaryblue}}>{"B".toUpperCase()}</Text>

                       </View>
                    <Text style={styles.username}>{item.docname||item.chatname}</Text>
            </View>



            <ScrollView style={styles.messageView}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                {
                    chat.map((item, index) => {

                        
                        return (
                            <View style={styles.message} key={index}>
                               
                                {
                                    item.sender != userid && item != '' &&
                                    <View style={styles.messageLeft}>
                                        <Text style={styles.messageTextLeft}>{item.message}</Text>
                                    </View>
                                }
                                 {
                                    item.sender == userid &&
                                    <View style={styles.messageRight}>
                                        <Text style={styles.messageTextRight}>{item.message}</Text>
                                    </View>
                                }
                            </View>
                        )
                    })
                }
            </ScrollView>


            <View style={styles.sbottom}>
                <TextInput style={styles.sbottominput} placeholder='Type a message'
                    placeholderTextColor={'grey'}
                    onChangeText={(text) => setCurrentmessage(text)}
                    value={currentmessage}
                    multiline
                    maxHeight={150}                    
                />
                <TouchableOpacity >
                    {
                        currentmessage ?
                            <MaterialIcons name="send" size={24} color="white"
                                onPress={() => sendMessage()}
                            /> :
                            <MaterialIcons name="send" size={24} color="grey" />
                    }


                </TouchableOpacity>
            </View>
        </View>
        </Screen>
    )
}



const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.default,
    },
    profilepic: {
        width: 40,
        height: 40,
        borderRadius: 25,
    },
    username: {
        color: colors.primaryblue,
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    s1: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.white,
        padding: 10,
    },
    sbottom: {
        width: '98%',
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth:2,
        borderColor:colors.grey2,
        alignSelf:"center",
        justifyContent: 'space-between',
        padding: 10,
        position: 'absolute',
        bottom: 5,
        borderRadius: 30,
    },
    sbottominput: {
        width: '80%',
        minHeight:30,
        fontSize: 17,
        alignSelf:"center",
        color: 'white',
    },

    message: {
        width: '100%',
        borderRadius: 10,
    },
    messageView: {
        width: '100%',
        marginBottom: 65,
    },
    messageRight: {
        width: '100%',
        alignItems: 'flex-end',
       
    },
    messageTextRight: {
        color: 'white',
        backgroundColor: colors.blue2,
        minWidth: 100,
        padding: 10,
        fontSize: 17,
        borderRadius:7,
        overflow:"hidden",
        margin: 10,
    },
    messageLeft: {
        width: '100%',
        alignItems: 'flex-start',
        // backgroundColor:'red'
    },
    messageTextLeft: {
        color: '#222222',
        backgroundColor: colors.white,
        fontSize: 17,
        minWidth: 100,
        padding: 10,
        overflow:"hidden",
        borderRadius: 7,
        margin: 10,
    },
})


export default ChatScreen;