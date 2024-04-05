import React from 'react';
import { Platform, Text,StyleSheet } from 'react-native';
import colors from '../config/colors';

function Atext({children}) {
    return (
        <Text style={styles.text} >{children}</Text>
    );
}



const styles = StyleSheet.create({
    text: {
        color:colors.primary,
        ...Platform.select(
            {
                ios:{
                    fontFamily:"Avenir",
                    fontSize:18
                },
                android:{
                    fontFamily:"Roboto",
                    fontSize:18
                }
            }
        )
        

    }
})

export default Atext;
