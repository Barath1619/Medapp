import React, { useEffect, useId, useState } from 'react';
import { View,Text, FlatList, Alert, StyleSheet } from 'react-native';
import Screen from '../../component/Screen';
import secretkeys from '../../config/secretkeys';
import UserListCard from '../../component/UserListCard';
import colors from '../../config/colors';
import ActivityIndicator from '../../component/ActivityIndicator';
import UserListCard2 from '../../component/UserListCard2';


function UserList(props) {
    const [userlist, setUserlist] = useState([]);
    const [loading, setLoading] = useState(false);
   

    useEffect(()=>{
        fetch(`${secretkeys.localhost}/getallusers`,{
            method:'GET',
            headers:{
                'Content-Type': "application/json"  
            },
        }).then(res => res.json()).then(data =>{
            setUserlist(data.userlist)
            
        })
    },[])

    const handleRejection = (userid) =>{
console.log(userid)
         setLoading(true);
         fetch(`${secretkeys.localhost}/deleteuseradmin/${userid}`,{
            method:'DELETE',
            headers:{
                'Content-Type': "application/json"
            },
        }).then(res => res.json()).then( (data) => {
            setUserlist(data.userlist);
            setLoading(false);
            alert(data.message);
        })
        .catch((error)=>{
            setLoading(false);
            console.error('Error:', error);
        });

    }

    


    return (
        <>
        <Screen bgcolor={colors.default}>
            <View >
            <FlatList data={userlist}
            keyExtractor={(item) => item._id}
            renderItem={({item}) => <UserListCard2 item={item} onPressReject={() => handleRejection(item._id)}/>}/>
            </View>
            
        </Screen>
        { loading && <ActivityIndicator/> }
        { userlist?.length === 0 && 
        <View style={styles.nouserlist}>
        <Text style={styles.text}>There are no Patients to approve... </Text>
        </View>
        }
        </>   
    );
}

const styles = StyleSheet.create({
    nouserlist:{
        ...StyleSheet.absoluteFillObject,
         justifyContent:"center",
         alignItems:"center",
         flex:1,
         zIndex:1
    },
    text:{
        fontSize:25,
        fontWeight:"500"
    }
})

export default UserList;