import React, { useState } from 'react';
import {View, Text, StyleSheet,TextInput, Button, Alert, ActivityIndicator} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import * as parkInActions from '../store/actions/parkin.js'

function AuthScreen (props){
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [userLocation, setUserLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(true);


    const signHandler = async () =>{
        setIsFetching(true);

        try{
        const {status} = await Permissions.askAsync(Permissions.LOCATION);
        if(status !== 'granted'){
            Alert.alert('Permession Needed!', 'The location permission is needed to be able to use the app', [{text:'ok'}]);
            setIsFetching(false);

            return;
        }
        const location = await Location.getCurrentPositionAsync({timeout:5000});
        // await dispatch(parkInActions.setLocation({
        //     lat: location.coords.latitude,
        //     lng: location.coords.longitude,
        // }));

        isSignUp ? 
        await dispatch(parkInActions.signUp(email, password, {lat: location.coords.latitude, lng: location.coords.longitude})) 
        : await dispatch(parkInActions.signIn(email, password, {lat: location.coords.latitude, lng: location.coords.longitude}))
        
        setUserLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
        // console.log('location',location);
        navigation.navigate('Map');
    }catch(err){
        setIsFetching(false);
        Alert.alert('Error!', err.message, [{text:'ok'}])
    }
    }

    const emailHandler = (email) => {
        setEmail(email)
    }
    const passHandler = (password) => {
        setPassword(password)
    }

    const switchSignHandler = () =>{
        setIsSignUp(!isSignUp);
    }


    return(
        <View style={styles.container}>
            <Text>
                This is the auth screen!
            </Text>
            <Text>
                Email
            </Text>
            <TextInput style={{borderBottomColor:'#ccc', borderBottomWidth:3, marginBottom:10}} onChangeText={emailHandler} keyboardType='email-address'/>
            <Text>
                Password
            </Text>
            <TextInput style={{borderBottomColor:'#ccc', borderBottomWidth:3, marginBottom:10}} onChangeText={passHandler} secureTextEntry autoCapitalize='none'/>

            {!isFetching ?
            <>
            <Button title={isSignUp ? 'SignUp' : 'SignIn'} onPress={signHandler}/>
            <Button title={isSignUp ? 'Switch to signin' : 'Switch to signup'} onPress={switchSignHandler}/>
            </>
            :
            <ActivityIndicator size='large' color='blue'/>
            }   
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'

    }
})

export default AuthScreen;