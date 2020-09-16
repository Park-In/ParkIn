import React from 'react';
import {View, Text, StyleSheet,Image,Dimensions} from 'react-native';
const {width,height} = Dimensions.get('window')
function Profile(props) {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Still Under Development</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor:'#009387',
        width,
        height: height * 0.30
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})

export default Profile;
