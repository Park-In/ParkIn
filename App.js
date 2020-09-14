import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {registerForPushNotificationsAsync} from './notifications'
export default function App() {
  const [pushToken,setPushToken] = useState('');
  useEffect(() => {
    // push token to store in database 
    registerForPushNotificationsAsync().then(token => setPushToken(token));
    
  });

  async function sendPushNotification(pushToken) {
    const message = {
      to: pushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { data: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  async function sendPushNotification2() {
    const message = {
      to: '', // add the push token here ------------------------------//--------------
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { data: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>


      <Button
        title="Press to Send Notification to your device"
        onPress={async () => {
          await sendPushNotification(pushToken);
        }}
      />
      
      <Button
        title="Press to Send Notification to custom device*******"
        onPress={async () => {
          await sendPushNotification2();
        }}
      />
      <StatusBar style="auto" />
    </View>
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
