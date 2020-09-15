import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { LinearGradient } from 'expo-linear-gradient';


import * as parkinActions from '../store/actions/parkin.js'
import { useSelector } from 'react-redux';

const GOOGLE_PLACES_API_KEY = 'AIzaSyCqe0-6gegfRy-yIpJY8Z47ASajUQ8qbZE'; // never save your real api key in a snack!

const App = () => {
    const [searchClicked, setSearchClicked] = useState(false);
    const [geoData, setGeoData] = useState();

    useEffect(() => {
        const afunc = async () => {
            try {
                console.log(geoData);
                let placeTitle = geoData.description;
                console.log(placeTitle, 'placeTitle');
                console.log(typeof placeTitle, 'placeTitleType');
                const placeTitleTransformed = replaceAllChar(placeTitle);
                // const placeTitleTransformed = placeTitle.replaceAll(' ', '20%').replaceAll(',', '');
                console.log(placeTitleTransformed);

                const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${placeTitleTransformed}&key=AIzaSyCqe0-6gegfRy-yIpJY8Z47ASajUQ8qbZE`;

                const rawGeoPlace = await fetch(url);
                const geoRes = await rawGeoPlace.json()

                console.log(geoRes)

                setSearchClicked(false);
            } catch (err) {
                console.log(err)
            }
        }
        afunc();

    }, [geoData])

    const replaceAllChar = (string) => {
        let newString = ''
        for (let i = 0; i < string.length; i++) {
            if (string[i] == ' ') {
                newString = newString + '+'
            }
            else if (string[i] == ',') {
                newString = newString;
            } else {
                newString = newString + string[i]
            }
        }
        return newString;
    }


    return (
            <View style={styles.container}>
                <GooglePlacesAutocomplete
                    query={{
                        key: GOOGLE_PLACES_API_KEY,
                        language: 'en', // language of the results
                        components: 'country:jo',
                    }}
                    onPress={(data, details = null) => { setSearchClicked(true); setGeoData(data) }}
                    onFail={(error) => console.error(error)}
                    GoogleReverseGeocodingQuery={{
                        globalCode: '8G3QXW00+',
                    }}
                    styles={{
                        textInputContainer: {
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderTopWidth: 0,
                            borderBottomWidth: 0,
                        },
                        textInput: {
                            marginLeft: 0,
                            marginRight: 0,
                            height: 38,
                            color: '#5d5d5d',
                            fontSize: 16,
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb',
                        },
                        listView: {
                            height: 500
                        },

                    }}
                />
            <TouchableOpacity style={styles.button} onPress={() => { }}>
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign, { color: '#fff' }}>
                        Find Parks
                        </Text>
                </LinearGradient>

            </TouchableOpacity>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },

    button: {
        width: '50%',
        alignItems: 'center',
        marginTop: 50,
        position:'absolute',
    },
    signIn: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default App;