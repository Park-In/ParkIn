import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Auth(props) {
    return(
        <View style={styles.container}>
            <Text>
            this is the auth screen!
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',

    }
})

export default Auth;
