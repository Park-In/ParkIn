import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, Alert, Image } from 'react-native';
import { useAsyncStorage } from '@react-native-community/async-storage';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import * as parkinActions from '../store/actions/parkin.js'
import { TextInput } from 'react-native-gesture-handler';


function Map(props) {
    
    const dispatch = useDispatch();

    const {setItem, getItem} = useAsyncStorage('@userData');

    const [mapRegion, setMapRegion] = useState({
        latitude: 31.9539,
        longitude: 35.9106,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
        dispatch(parkinActions.fetchUsers())
    }, [])

    const users = useSelector(state => state.parkin.users);
    const user = useSelector(state => state.parkin.currentUser);
    // console.log('usersbefore', users)

    // console.log('userbefore', user)

    useEffect(() => {
        const getLocalInfo = async () => {
            const userDataString = await getItem();
            const userData = JSON.parse(userDataString);
            console.log('got userdata', userData);
        }
        getLocalInfo();
    }, [])

    if (Object.keys(user).length !== 0) {

        useEffect(() => {
            // console.log('userExists', users)
            setMapRegion({
                latitude: user.location.lat,
                longitude: user.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
        }, [setMapRegion])

    } else {
        console.log('users', users)
    }

    const offerParkConfirmation = () => {
        Alert.alert('Confirmation','Do you want to offer you park for reservation?',[{text:'yes', onPress:offerParkHandler}, {text:'no'}])
    }

    const offerParkHandler = () => {
        dispatch(parkinActions.offerPark(user))
    }



    return (
        <View style={styles.container}>
            <MapView region={mapRegion} style={styles.map}>
                <Marker title='Your Location' coordinate={{
                    latitude: mapRegion.latitude,
                    longitude: mapRegion.longitude
                }}
                >
                    <Image source={require('../assets/active-marker-64.png')} />
                    </Marker>
            </MapView>

            <View style={styles.form}>
                <TextInput />
                <View style={styles.formButton}>
                <Button  title='Search' />
                </View>
            </View>

            {/* <View style={styles.button}>
                <Button title='Offer a Park' onPress={offerParkConfirmation} />
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    map: {
        width: Dimensions.get('window').width * .95,
        height: Dimensions.get('window').height
    },
    button: {
        position: 'absolute',
    },
    form:{
        flex:1,
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.15,
        top:0,
        backgroundColor:'white'
    },
    formButton:{
        position:'relative',
        bottom:0
    }   
})

export default Map;
