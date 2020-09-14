import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './navigation/parkin.js';
import 'react-native-gesture-handler';

export default function App() {
  return (
    // <Provider store={store}>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    /* </Provider> */
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
