import * as Notifications  from 'expo-notifications';
import * as Permissions  from 'expo-permissions';
import Constants from 'expo-constants';
import {Platform} from 'react-native';

export const registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
  } else {
    alert('Must use physical device for Push Notifications');
  }

//   if (Platform.OS === 'android') {
//     Notifications.createChannelAndroidAsync('default', {
//       name: 'default',
//       sound: true,
//       priority: 'max',
//       vibrate: [0, 250, 250, 250],
//     });
//   }
};
 
