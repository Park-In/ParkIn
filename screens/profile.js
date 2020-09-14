import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Profile(props) {
    return(
        <View style={styles.container}>
            <Text>
            this is the profile screen!
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

export default Profile;
