import React, {useState,useEffect} from 'react';
import { StyleSheet,
  View,
  Text,
  Image,
  Dimensions} from 'react-native';
import MapView , {Marker,Polyline} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapViewDirections from 'react-native-maps-directions';
import mapStyle from '../helper/mapStyle'
const { width, height } = Dimensions.get('window');

function arePointsNear(checkPoint, centerPoint, km) {
  var ky = 40000 / 360;
  var kx = Math.cos(Math.PI * centerPoint.latitude / 180.0) * ky;
  var dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx;
  var dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
}





export default MapRouting = () => {
  const [region, setRegion] = useState(null)
  const [distance, setDistance] = useState({})
  const [showInfo, setShowInfo] = useState(false)
  let mapview = null;

  useEffect(()=>{
  (async ()=>{
    let {status} =  await Permissions.askAsync(Permissions.LOCATION);
    if(status !== 'granted' )
       console.warn('permissions denaid')
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
    setRegion ( {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })
  })() 
},[])
 

useEffect(()=>{
  navigator.geolocation.watchPosition(
    position => {
      const { latitude, longitude } = position.coords;
      const newCoordinate = {
        latitude,
        longitude
      };
      setRegion({latitude,longitude})
     },
     error => console.warn('error',error),
     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
},[])
  return (
    <View style={styles.todoItem}>
      <MapView
      onPress={(e)=>{
        if(Object.keys(distance))
          setShowInfo(!showInfo)
    }}
      initialRegion={region}
      showsUserLocation={true}
      ref={c => mapview = c}
    loadingEnabled={true}
    followsUserLocation={true}
    provider='google'
    showsCompass={true}
    rotateEnabled={false}
    userLocationUpdateInterval={50}
    customMapStyle={mapStyle}
    timePrecision='now'

        style={{
          width:Dimensions.get('window').width,
          height:Dimensions.get('window').height
        }}
      >
    
    {/* <MapView
    onPress={(e)=>{
        if(Object.keys(distance))
          setShowInfo(!showInfo)
    }}
    ref={c => mapview = c}
    loadingEnabled={true}
    showsMyLocationButton={true}
    followsUserLocation={true}
    userLocationUpdateInterval={5000}
    userLocationPriority='balanced'
    provider='google'
    mapType='mutedStandard'
    customMapStyle={mapStyle}
      showsUserLocation={true}
      showsCompass={true}
      rotateEnabled={false}
      style={{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
      }}
    initialRegion={region}> */}
  <Marker
   draggable
    coordinate={{ latitude: 32.1450093,
      longitude:35.9712935,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,}}
    onDragEnd={(e) => console.warn({ x: e.nativeEvent.coordinate })}

  />
  {/* {(region &&<Marker coordinate={region}>
 <Image source={require('../assets/car3.png')}
  style={{width:50,height:50}}   />
</Marker>)} */}
   <MapViewDirections
   optimizeWaypoints={true}
   resetOnChange={true}
    origin={region}
    mode='DRIVING'
    strokeWidth={3}
    strokeColor="blue"
    onStart={(params)=>{
      // console.warn(params)
    }}
    onReady={result => {
      
    console.warn('hello ladies its ' , arePointsNear(region, { latitude: 31.891083,
      longitude:35.869195,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,}, 0.1));

        // console.log('bsbs moew',result)
        setDistance(result)
  if(mapview !== null){ 
    //  console.warn('result',result);
     console.warn('region',region);
       mapview.fitToCoordinates(result.coordinates, {
         
    edgePadding: {
            right: (width / 20),
            bottom: (height / 20),
            left: (width / 20),
            top: (height / 20),
          }
        })}
      }}
      
    onError={(err)=>console.warn(err)}
    destination={{ latitude: 31.891083,
      longitude:35.869195,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,}}
    apikey={'AIzaSyCqe0-6gegfRy-yIpJY8Z47ASajUQ8qbZE'}
  />
</MapView>
{(showInfo&&<Text style={{position:'absolute',bottom:15,backgroundColor:'white',width,}}>{`${distance.distance.toFixed(1)} KM will take ${Math.round(distance.duration)} min`}</Text>)}
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
