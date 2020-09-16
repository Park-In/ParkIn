import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { LinearGradient } from 'expo-linear-gradient';


import * as parkinActions from '../store/actions/parkin.js'
import { useSelector } from 'react-redux';

const GOOGLE_PLACES_API_KEY = 'AIzaSyCqe0-6gegfRy-yIpJY8Z47ASajUQ8qbZE'; // we will be deactivating the key after development

const App = (props) => {
    const [revLocation, setRevLocation] = useState({});
    const [geoData, setGeoData] = useState();
    const [revGeoData, setRevGeoData] = useState();


    useEffect(() => {
        const afunc = async () => {
            try {
                let placeTitle = geoData.description;
                const placeTitleTransformed = replaceAllChar(placeTitle);

                const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${placeTitleTransformed}&key=AIzaSyCqe0-6gegfRy-yIpJY8Z47ASajUQ8qbZE`;

                const rawGeoPlace = await fetch(url);
                const geoRes = await rawGeoPlace.json()
                setRevGeoData(geoRes);
                setRevGeoData(geoRes.results[0].geometry.location);
                props.isSearchClicked(geoRes.results[0].geometry.location)
            } catch (err) {
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
                language: 'en',
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