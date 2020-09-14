import React, { useEffect } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useAsyncStorage } from '@react-native-community/async-storage';

import * as parkinActions from '../store/actions/parkin.js';
import { useNavigation } from '@react-navigation/native';

const StartupScreen = props => {
    const dispatch = useDispatch();
    const { setItem, getItem } = useAsyncStorage('@userData')
    const navigation = useNavigation();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await getItem();
            if (!userData) {
                navigation.navigate('Auth');
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, id, tokenExpiry, } = transformedData;
            const expirationDate = new Date(tokenExpiry);

            if (expirationDate <= new Date() || !token || !id) {
                navigation.navigate('Auth');
                return;
            }

            dispatch(parkinActions.authenticate(transformedData));
            navigation.navigate('Map');
        };

        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color='blue' />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;
