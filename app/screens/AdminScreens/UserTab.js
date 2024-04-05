import React from 'react';
import Screen from '../../component/Screen';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Icons, { Icon } from '../../component/Icons';
import colors from '../../config/colors';

function UserTab({navigation}) {
    return (
        <Screen>
        <TouchableOpacity onPress={() => navigation.navigate('UserApprovalList')}>
        <View style={styles.cardview}>
        <Icons type={Icon.FontAwesome} name="user-plus" color={colors.primaryblue} shape={33} size={30} radius={15} bgcolor={colors.default} />
        <View style={styles.Textfeildview}>

        <Text style={styles.Textfield}> User Approval List</Text>
        <Text style={styles.Textfieldlight}> Users waiting for approval</Text>
        </View>
        <Icons type={Icon.Entypo} name="chevron-small-right"  size={25} />
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('UserList')}>
        <View style={styles.cardview}>
        <Icons type={Icon.FontAwesome5} name="users" color={colors.primaryblue} shape={33} size={30} radius={15} bgcolor={colors.default} />
        <View style={styles.Textfeildview}>
        <Text style={styles.Textfield}> User List</Text>
        <Text style={styles.Textfieldlight}> Approved User List </Text>
        </View>
        <Icons type={Icon.Entypo} name="chevron-small-right"  size={25} />
        </View>
        </TouchableOpacity>
        </Screen>
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
        // shadowColor: colors.grey2,
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: .7,
        // shadowRadius: 5,
        // elevation: 5,
        
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

export default UserTab;