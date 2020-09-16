import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { LinearGradient } from 'expo-linear-gradient';


import * as parkinActions from '../store/actions/parkin.js'
import { useSelector } from 'react-redux';

const GOOGLE_PLACES_API_KEY = 'AIzaSyCqe0-6gegfRy-yIpJY8Z47ASajUQ8qbZE'; // never save your real api key in a snack!

const App = (props) => {
    const [revLocation, setRevLocation] = useState({});
    const [geoData, setGeoData] = useState();
    const [revGeoData, setRevGeoData] = useState();


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
                setRevGeoData(geoRes);
                setRevGeoData(geoRes.results[0].geometry.location);
                // console.log(geoRes);
                console.log('results', geoRes.results[0].geometry.location);
                props.isSearchClicked(geoRes.results[0].geometry.location)
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
        <GooglePlacesAutocomplete
            query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'en', // language of the results
                components: 'country:jo',
            }}
            onPress={(data, details = null) => { setGeoData(data) }}
            onFail={(error) => console.error(error)}
            GoogleReverseGeocodingQuery={{
                globalCode: '8G3QXW00+',
            }}
            styles={{
                container:{
                },
                textInputContainer: {
                    backgroundColor: '#009387',
                    borderWidth:2,
                    borderColor:'#009387',
                    paddingHorizontal:10,
                    borderTopLeftRadius:15,
                    borderTopRightRadius:15,
                },
                textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    color: '#5d5d5d',
                    fontSize: 16,
                    borderRadius:15,
                },
                predefinedPlacesDescription: {
                    color: '#1faadb',
                },
                listView: {
                    backgroundColor:'white',
                    borderBottomColor:'#009387'
                },
                poweredContainer:{
                    display:'none'
                },
                powered:{
                    display:'none'
                },
                loader:{
                    backgroundColor:'black'
                }

            }}
        >

            {/* <TouchableOpacity style={styles.button} onPress={() => { props.isSearchClicked(revGeoData) }}>
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign, { color: '#fff' }}>
                        Find Parks
                        </Text>
                </LinearGradient>

            </TouchableOpacity> */}
        </GooglePlacesAutocomplete>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        // padding: 8,
    },

    button: {
        // width: '50%',
        // alignItems: 'center',
        // marginTop: 50,
        // position:'absolute',
    },
    signIn: {
        height: 38,
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