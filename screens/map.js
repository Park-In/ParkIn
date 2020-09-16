import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, Alert, Image } from 'react-native';
import { useAsyncStorage } from '@react-native-community/async-storage';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
// import Placesearch from 'react-native-placesearch';
// import GooglePlacesSearch from 'react-native-google-places-autocomplete';


import { useDispatch, useSelector } from 'react-redux';

import * as parkinActions from '../store/actions/parkin.js'
import { TextInput } from 'react-native-gesture-handler';

import GooglePlacesSearch from '../components/places-search.js'


function Map(props) {

    const dispatch = useDispatch();

    const { setItem, getItem } = useAsyncStorage('@userData');

    const [searchInput, setSearchInput] = useState('')

    const [mapRegion, setMapRegion] = useState({
        latitude: 31.9539,
        longitude: 35.9106,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
        dispatch(parkinActions.fetchUsers())
        dispatch(parkinActions.fetchParks())
    }, [])

    const users = useSelector(state => state.parkin.users);
    const user = useSelector(state => state.parkin.currentUser);
    const parks = useSelector(state => state.parkin.parks);
    // console.log('usersbefore', users)
    // console.log('userbefore', user)
    console.log('parksbefore', parks)


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
        Alert.alert('Confirmation', 'Do you want to offer you park for reservation?', [{ text: 'yes', onPress: offerParkHandler }, { text: 'no' }])
    }

    const offerParkHandler = () => {
        // dispatch(parkinActions.offerPark(user))
        dispatch(parkinActions.offerPark(
            {
                id: 'QroFr5yp7gYRxWwPr9rYXLBxvIh7',
                location:{
                    lat: 32.004252,
                    lng: 35.916090,
                },
            }
        ))

    }

    const parkSearchHandler = (park) => {

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

            <View style={styles.placesSearch}>
            <GooglePlacesSearch />
            </View>
            
            <View style={styles.button}>
                <Button title='Offer a Park' onPress={offerParkConfirmation} />
            </View>
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
    form: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        width: Dimensions.get('window').width * .8,
        height: Dimensions.get('window').height * 0.15,
        top: Dimensions.get('window').height * 0.05,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 2,
        padding: 15
    },
    placesSearch:{
        position:'absolute',
        top:50,
        flex:1,
        width: Dimensions.get('window').width * .8,
        height: Dimensions.get('window').height * 0.15,
    },
    formButton: {
        // position:'absolute',
        // bottom:0
    },
    formInput: {
        borderBottomColor: 'black',
        borderBottomWidth: 3,
    }

})

export default Map;
