import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GOOGLE_PLACES_API_KEY = 'AIzaSyCqe0-6gegfRy-yIpJY8Z47ASajUQ8qbZE'; // never save your real api key in a snack!

const App = () => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en', // language of the results
          components: 'country:us',
        }}
        onPress={(data, details = null) => console.log(data)}
        onFail={(error) => console.error(error)}
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
        }}
      />
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
});

export default App;