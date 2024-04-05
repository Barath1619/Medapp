import React, { useEffect, useState } from 'react';
import Screen from '../../component/Screen';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icons, { Icon } from '../../component/Icons';
import colors from '../../config/colors';
import secretkeys from '../../config/secretkeys';
import ActivityIndicator from '../../component/ActivityIndicator';


function AppointmentDocs({navigation}) {

    const [isLoading, setIsLoading] = useState(false);
    const [docdetails, setDocDetails] = useState([]);
    useEffect(()=>{
        setIsLoading(true);
        fetch(`${secretkeys.localhost}/getdocs`,{
            method:'GET',
            headers:{
                'Content-Type': "application/json",
            },
        }).then(res => res.json()).then(data =>{
            
            setDocDetails(data.alldocs)
            setIsLoading(false);

        })
    },[])

    const DocList = ({onPress, docName, docspl="General"}) => {
        return(
        <TouchableOpacity onPress={onPress}>
        <View style={styles.cardview}>
        <Icons type={Icon.FontAwesome} name="user" color={colors.primaryblue} shape={33} size={30} radius={15} bgcolor={colors.default} />
        <View style={styles.Textfeildview}>

        <Text style={styles.Textfield}>{docName}</Text>
        <Text style={styles.Textfieldlight}>{docspl}</Text>
        </View>
        <Icons type={Icon.Entypo} name="chevron-small-right"  size={25} />
        </View>
        </TouchableOpacity>
        );
    }

    return (

        <>
        {isLoading && <ActivityIndicator/>}
       
        <Screen>
    
        <FlatList
        data={docdetails}
        //keyExtractor={(item, index) =>{ index.toString()}}
        renderItem={({item}) => (<DocList onPress={()=> navigation.navigate("Appointbooking",{appointments:item.availAppointments, docdetails:item})} docName={item.docname} /> )}
        />

        </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    Headings:{
        fontSize:30,
        fontWeight:"bold",
        padding:8,
        color:colors.primartbluelight
    },
    cardview:{
        width:'90%',
        height:100,
        backgroundColor:colors.white,
        alignSelf:"center",
        borderRadius:10,
        borderWidth:1,
        borderColor:colors.grey,
        alignItems:"center",
        padding:10,
        marginTop:10,
        flexDirection:"row",
    },
    Textfeildview:{
        flex:1,
        paddingHorizontal:10,
    },
    Textfield:{
        
        fontSize:23,
        fontWeight:"400",
        
    },
    Textfieldlight:{
        fontSize:15,
        paddingLeft:2,
        paddingTop:2,
        color:colors.grey
    },
})

export default AppointmentDocs;