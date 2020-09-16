import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, Alert, Image, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useAsyncStorage } from '@react-native-community/async-storage';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';

// import Placesearch from 'react-native-placesearch';
// import GooglePlacesSearch from 'react-native-google-places-autocomplete';


import { useDispatch, useSelector } from 'react-redux';

import * as parkinActions from '../store/actions/parkin.js'

import GooglePlacesSearch from '../components/places-search.js'


function Map(props) {

    const dispatch = useDispatch();

    const { setItem, getItem } = useAsyncStorage('@userData');

    const [searchInput, setSearchInput] = useState('')
    const [isSearched, setIsSearched] = useState(false)
    const [offerParkModalVisible, setOfferParkModalVisible] = useState(false);
    const [reserverParkModalVisible, setReserveParkModalVisible] = useState(false);
    const [routingModalVisible, setRoutingModalVisible] = useState(false);

    // const [parks, setParks] = useState([]);

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
                id: 'QroFr5yp7gYRxWwPr9rYXLBxvId3',
                location: {
                    lat: 31.975500,
                    lng: 35.913930,
                },
            }
        ))
    }

    const searchClickHandler = (searchRevData) => {
        // const searchLocation = searchRevData.results[0].geometry.location
        setIsSearched(true);
        setMapRegion({
            latitude: searchRevData.lat,
            longitude: searchRevData.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
    }

    const showOfferModal = (park) => {
        setOfferParkModalVisible(!offerParkModalVisible)
    }

    const showReserveModal = (park) => {
        setReserveParkModalVisible(!routingModalVisible)
    }

    const showRoutingModal = (park) => {
        setRoutingModalVisible(!routingModalVisible)
    }


    return (
        <View style={styles.container}>
            <MapView region={mapRegion} style={styles.map}>
                <Marker
                    title='Your Location'
                    onPress={() => { setModalIsVisible(!modalIsVisible); console.log(parks) }}
                    coordinate={{
                        latitude: user.location.lat,
                        longitude: user.location.lng
                    }}
                >
                    <Image source={require('../assets/marker-36.png')} />
                </Marker>

                {
                    // isSearched ?
                    parks.map(park => {
                        console.log(park)
                        return (
                            <Marker onPress={() => showReserveModal(park)} key={park.location.lat + park.location.lng} title='Park' coordinate={{
                                latitude: park.location.lat,
                                longitude: park.location.lng
                            }}
                            >
                                <Image source={require('../assets/garage-30.png')} />
                            </Marker>
                        )
                    })
                    // :
                    // null
                }
            </MapView>

            <View style={styles.placesSearch}>
                <GooglePlacesSearch isSearchClicked={searchClickHandler} />
            </View>

            {/* <View style={styles.button}>
                <Button title='Offer a Park' onPress={offerParkConfirmation} />
            </View> */}

            {/* <Modal
                animationType='slide'
                visible={routingModalVisible}
                transparent
                backgroundColor='grey'>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }} onPress={showRoutingModal}>
                    <TouchableWithoutFeedback>
                        <View style={{ alignItems: 'center', height: '25%', width: '100%', backgroundColor: 'white', borderTopLeftRadius: 100, borderTopRightRadius: 100, borderColor: '#009387', borderWidth: 3, overflow: 'hidden' }}>
                            <View style={{ flex: 1, backgroundColor: '#009387', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 19, fontWeight: 'bold', width: '100%', textAlign: 'center' }}>ON YOUR WAY</Text>
                            </View>
                            <View style={{ flex: 4, backgroundColor: 'white', width: '100%', alignItems: 'center' }}>
                                <View style={{ backgroundColor: 'white', flex: 3, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                                    <View style={{ width: 70, height: 70, borderRadius: 35, borderColor:'purple', borderWidth: 2 }}>
                                        <Image style={{ width: '100%', height: '100%' }} source={require('../assets/logo.png')} />
                                    </View>
                                    <View>
                                        <Text style={{ color: 'black', fontWeight: 'bold', width: '120%', textAlign: 'center', fontSize: 15 }}>Owner</Text>
                                        <Text style={{ color: 'black', fontWeight: 'bold', width: '120%', textAlign: 'center', fontSize: 12 }}>Obada Tumah</Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: 'black', fontWeight: 'bold', width: '120%', textAlign: 'center', fontSize: 15 }}>Location</Text>
                                        <Text style={{ color: 'black', fontWeight: 'bold', width: '120%', textAlign: 'center', fontSize: 12 }}>Al-Dakhleyeh</Text>
                                    </View>

                                </View >
                                <View style={{ backgroundColor: 'white', flex: 2, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                                    <View>
                                        <Text style={{ color: 'black', fontWeight: 'bold', width: '120%', textAlign: 'center', fontSize: 15 }}>Arrive In</Text>
                                        <Text style={{ color: 'black', fontWeight: 'bold', width: '120%', textAlign: 'center', fontSize: 12 }}>23m</Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: 'black', fontWeight: 'bold', width: '120%', textAlign: 'center', fontSize: 15 }}>Distance Left</Text>
                                        <Text style={{ color: 'black', fontWeight: 'bold', width: '120%', textAlign: 'center', fontSize: 12 }}>10km</Text>
                                    </View>
                                </View>
                                <View style={{ backgroundColor: 'white', flex: 1, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 15 }}>Mobile: </Text>
                                    <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 12 }}>+962787579241</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>


            <Modal
                animationType='slide'
                visible={offerParkModalVisible}
                transparent
                backgroundColor='grey'>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }} onPress={showOfferModal}>
                    <TouchableWithoutFeedback>
                        <View style={{ alignItems: 'center', height: '25%', width: '100%', backgroundColor: 'white', borderTopLeftRadius: 100, borderTopRightRadius: 100, borderColor: '#009387', borderWidth: 3, overflow: 'hidden' }}>
                            <View style={{ flex: 1, backgroundColor: '#009387', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 19, fontWeight: 'bold', width: '100%', textAlign: 'center' }}>OFFER YOUR PARK</Text>
                            </View>
                            <View style={{ flex: 4, backgroundColor: 'white', width: '100%', alignItems: 'center' }}>
                                <View style={{ backgroundColor: 'white', flex: 3, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                                    <View style={{paddingHorizontal:25}}>
                                        <Text numberOfLines={13} style={{ color: 'black', fontWeight: 'bold',textAlign:'center', justifyContent:'center', fontSize: 15 }}>Would you like to attribute to the community and gain a few bucks at the same time by offering your park for reservation?</Text>
                                    </View>
                                </View >
                                <View style={{ backgroundColor: 'white', flex: 2, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                                    <View>
                                    <TouchableOpacity style={styles.button} onPress={() => { setModalIsVisible(!modalIsVisible) }}>
                                            <LinearGradient
                                                colors={['#08d4c4', '#01ab9d']}
                                                style={styles.signIn}
                                            >
                                                <Text style={styles.textSign, { color: '#fff' }}>
                                                    Cancel
                                                </Text>
                                            </LinearGradient>

                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={styles.button} onPress={() => { offerParkHandler }}>
                                            <LinearGradient
                                                colors={['#08d4c4', '#01ab9d']}
                                                style={styles.signIn}
                                            >
                                                <Text style={styles.textSign, { color: '#fff' }}>
                                                    Confirm
                                                </Text>
                                            </LinearGradient>

                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal> */}

            <Modal
                animationType='slide'
                visible={reserverParkModalVisible}
                transparent
                backgroundColor='grey'>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }} onPress={showReserveModal}>
                    <TouchableWithoutFeedback>
                        <View style={{ alignItems: 'center', height: '25%', width: '100%', backgroundColor: 'white', borderTopLeftRadius: 100, borderTopRightRadius: 100, borderColor: '#009387', borderWidth: 3, overflow: 'hidden' }}>
                            <View style={{ flex: 1, backgroundColor: '#009387', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 19, fontWeight: 'bold', width: '100%', textAlign: 'center' }}>RESERVE THIS PARK</Text>
                            </View>
                            <View style={{ flex: 4, backgroundColor: 'white', width: '100%', alignItems: 'center' }}>
                                <View style={{ backgroundColor: 'white', flex: 3, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                                    <View style={{ width: 70, height: 70, borderRadius: 35, borderColor: 'purple', borderWidth: 2 }}>
                                        <Image style={{ width: '100%', height: '100%' }} source={require('../assets/logo.png')} />
                                    </View>
                                    <View>
                                        <Text style={{ color: 'black', fontWeight: 'bold', width: '120%', textAlign: 'center', fontSize: 15 }}>Owner</Text>
                                        <Text style={{ color: 'black', fontWeight: 'bold', width: '120%', textAlign: 'center', fontSize: 12 }}>Obada Tumah</Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: 'black', fontWeight: 'bold', width: '120%', textAlign: 'center', fontSize: 15 }}>Location</Text>
                                        <Text style={{ color: 'black', fontWeight: 'bold', width: '120%', textAlign: 'center', fontSize: 12 }}>Al-Dakhleyeh</Text>
                                    </View>

                                </View >
                                <View style={{ backgroundColor: 'white', flex: 2, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                                <View>
                                    <TouchableOpacity style={styles.button} onPress={() => { setModalIsVisible(!modalIsVisible) }}>
                                            <LinearGradient
                                                colors={['#08d4c4', '#01ab9d']}
                                                style={styles.signIn}
                                            >
                                                <Text style={styles.textSign, { color: '#fff' }}>
                                                    Cancel
                                                </Text>
                                            </LinearGradient>

                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={styles.button} onPress={() => { offerParkHandler }}>
                                            <LinearGradient
                                                colors={['#08d4c4', '#01ab9d']}
                                                style={styles.signIn}
                                            >
                                                <Text style={styles.textSign, { color: '#fff' }}>
                                                    Confirm
                                                </Text>
                                            </LinearGradient>

                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ backgroundColor: 'white', flex: 1, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                                    <View >
                                        <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 12 }}>Mobile: </Text>
                                        <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 9 }}>+962787579241</Text>
                                    </View>
                                    <View >
                                        <Text style={{ color: 'black', fontWeight: 'bold', width: '120%', textAlign: 'center', fontSize: 12 }}>Arrive In</Text>
                                        <Text style={{ color: 'black', fontWeight: 'bold', width: '120%', textAlign: 'center', fontSize: 9 }}>23m</Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: 'black', fontWeight: 'bold', width: '120%', textAlign: 'center', fontSize: 12 }}>Distance Left</Text>
                                        <Text style={{ color: 'black', fontWeight: 'bold', width: '120%', textAlign: 'center', fontSize: 9 }}>10km</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
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
        // position: 'absolute',
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
    placesSearch: {
        position: 'absolute',
        top: 50,
        flex: 1,
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
    },
    signIn: {
        height: 38,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        // width: '200%',
        // paddingHorizontal:100,
        alignItems: 'center',
    },

})

export default Map;
