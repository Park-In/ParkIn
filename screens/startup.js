import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function StartUp(props) {
    return(
        <View style={styles.container}>
            <Text>
                this is the startup screen!
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

export default StartUp;
