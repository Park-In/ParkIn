import React, {useState,useEffect} from 'react';
import { StyleSheet,
  View,
  Text,
   Dimensions} from 'react-native';
import MapView , {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapViewDirections from 'react-native-maps-directions';
const test = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6f9ba5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3C7680"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ]
export default MapRouting = () => {
  const [region, setRegion] = useState(null)
  
useEffect(()=>{
  (async ()=>{
    let {status} =  await Permissions.askAsync(Permissions.LOCATION);
    if(status !== 'granted' )
       console.warn('permissions denaid')
  
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
    // console.warn(location.coords) 
    setRegion ( {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })
  })() 
},[])

  // const [doneState, setDone] = useState(false);
  return (
    <View style={styles.todoItem}>
    <MapView
    //   style={StyleSheet.absoluteFill}
    // ref={(c)=>console.warn(JSON.stringify(c))}
    // onPress={(e)=>console.warn(JSON.stringify(e))}
    // userLocationAnnotationTitle='hello'
    loadingEnabled={true}
    showsMyLocationButton={true}
    followsUserLocation={true}
    userLocationUpdateInterval={5000}
    userLocationPriority='balanced'
    provider='google'
    mapType='mutedStandard'
    customMapStyle={test}
      showsUserLocation={true}
      showsCompass={true}
      rotateEnabled={false}
      style={{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
      }}
    initialRegion={region}>
  <Marker
   draggable
    coordinate={{ latitude: 32.1450093,
      longitude:35.9712935,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,}}
    onDragEnd={(e) => console.warn({ x: e.nativeEvent.coordinate })}
  />
   <MapViewDirections
    origin={region}
    mode='DRIVING'
    strokeWidth={3}
    strokeColor="blue"
    onStart={(params)=>{
      console.warn(params)
    }}
    onReady={(params)=>{
      console.warn(`ready `,params);
    }}
    onError={(err)=>console.warn(err)}
    destination={{ latitude: 32.1450093,
      longitude:35.9712935,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,}}
    apikey={'AIzaSyCqe0-6gegfRy-yIpJY8Z47ASajUQ8qbZE'}
  />
</MapView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',

  },
  todoText: {
    borderColor: '#afafaf',
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    minWidth: "50%",
    textAlign: "center"
  },
});
