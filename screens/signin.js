import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    ActivityIndicator
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import * as parkInActions from '../store/actions/parkin.js'



const SignInScreen = () => {

    const navigation = useNavigation();

    const [data, setData] = useState({
        email: '',
        password: '',
        checkTextInputChange: false,
        secureTextEntry: true
    });

    const dispatch = useDispatch();


    const [userLocation, setUserLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);

    const signHandler = async () => {
        setIsFetching(true);

        try {

            const { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                Alert.alert('Permession Needed!', 'The location permission is needed to be able to use the app', [{ text: 'ok' }]);
                setIsFetching(false);

                return;
            }
            const location = await Location.getCurrentPositionAsync({ timeout: 5000 });

            await dispatch(parkInActions.signIn(data.email, data.password, { lat: location.coords.latitude, lng: location.coords.longitude }))

            setUserLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
            navigation.navigate('Map');
        } catch (err) {
            setIsFetching(false);
            Alert.alert('Error!', err.message, [{ text: 'ok' }])
        }
    }

    const textInputChange = (value) => {
        if (value.length !== 0) {
            setData({
                ...data,
                email: value,
                checkTextInputChange: true
            })
        } else {
            setData({
                ...data,
                email: value,
                checkTextInputChange: false
            })
        }
    }

    passwordInputChange
    const passwordInputChange = (value) => {
        if (value.length !== 0) {
            setData({
                ...data,
                password: value,
            })
        } else {
            setData({
                ...data,
                email: value,
            })
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle='light-content' />
            <View style={styles.header}>
                <Text style={styles.text_header}>
                    Welcome!
                </Text>
            </View>
            <Animatable.View
                animation='fadeInUpBig'
                style={styles.footer}>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" size={20} color="#05375a" />
                    <TextInput
                        placeholder='Your Email'
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(textValue => textInputChange(textValue))}
                    />
                    {data.checkTextInputChange ?
                        <Animatable.View
                            animation='bounceIn'
                        >
                            <Feather
                                name='check-circle'
                                color='green'
                                size={20}
                            />
                        </Animatable.View>
                        :
                        null
                    }
                </View>
                <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
                <View style={styles.action}>
                    <Feather name="lock" size={20} color="#05375a" />
                    <TextInput
                        placeholder='Your Password'
                        style={styles.textInput}
                        autoCapitalize='none'
                        secureTextEntry={data.secureTextEntry ? true : false}
                        onChangeText={(textValue => passwordInputChange(textValue))}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        <Feather
                            name={data.secureTextEntry ? 'eye-off' : 'eye'}
                            color='gray'
                            size={20}
                        />
                    </TouchableOpacity>
                </View>


                <TouchableOpacity style={styles.button} onPress={signHandler}>
                    <LinearGradient
                        colors={['#08d4c4', '#01ab9d']}
                        style={styles.signIn}
                    >
                        {isFetching ?
                            <ActivityIndicator size='large' color='#fff' />
                            :
                            <Text style={styles.textSign, { color: '#fff' }}>
                                Sign In
                        </Text>
                        }
                    </LinearGradient>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign], {
                        color: '#009387'
                    }}>Sign Up</Text>
                </TouchableOpacity>

            </Animatable.View>
        </View>
    )

}


export default SignInScreen;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -5,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
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