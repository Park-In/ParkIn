import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAsyncStorage } from '@react-native-community/async-storage';

function Map(props) {

    const { setItem, getItem } = useAsyncStorage('@userData')

    useEffect(() => {
        const getLocalInfo = async () => {
            const userDataString = await getItem();
            const userData = JSON.parse(userDataString);
            console.log('got userdata', userData);
        }
        getLocalInfo();
    }, [])
    
    return (
        <View style={styles.container}>
            <Text>
                this is the map screen!
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Map;
