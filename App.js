import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './navigation/parkin.js';
import 'react-native-gesture-handler';

import * as registerForPushNotificationsAsync from './helper/notifications.js';

import { createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import * as Notifications from 'expo-notifications';

import parkinReducer from './store/reducers/parkin.js';

const rootReducer = combineReducers({
  parkin: parkinReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const url = response;
    });
  },[Notifications])

  return (
     <Provider store={store}>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
     </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
