import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Map(props) {
    return(
        <View style={styles.container}>
            <Text>
            this is the map screen!
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

export default Map;
