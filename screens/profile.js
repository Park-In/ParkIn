import React from 'react';
import {View, Text, StyleSheet,Image,Dimensions} from 'react-native';
const {width,height} = Dimensions.get('window')
function Profile(props) {
    return(
        <View style={styles.container}>
            <View style={styles.header}>

            <Image style={{width:150,height:150,borderRadius:75}} source={{uri:'https://i.pinimg.com/originals/c7/28/a8/c728a89a09e0bc6b0aabfcd44e3e4d52.jpg'}} />
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
