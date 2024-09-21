import React, { useState } from 'react';
import {
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

import { Alert } from 'react-native';
// import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification, { Importance } from "react-native-push-notification";




PushNotification.createChannel(
  {
    channelId: "channel-id", // (required)
    channelName: "My channel", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');


  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {

        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {

      console.warn('Unable to get messaging token.', error);
    }
  } else {
    console.log('Failed to retrieve fcm token');
  }
};

export const notificationListener = async () => {


  // const [isCardModal, setisCardModal] = useState(false);
  // const closeModal = () => {
  //     setisCardModal(false);
  //   };

  //   const openModal = () => {
  //     setisCardModal(true);
  //   };


  PushNotification.getChannels(function (channel_ids) {

  })

  messaging().onNotificationOpenedApp(async remoteMessage => {

    // openModal(); //this should call the modal

    PushNotification.localNotification({
      message: remoteMessage.data?.body,
      title: remoteMessage.data?.title,
      bigPictureUrl: remoteMessage.data?.image,
      channelId: 'channel-id',
      onlyAlertOnce : true,
      vibrate: true



    })
    // ...
  });

  messaging().onMessage(async remoteMessage => {


    PushNotification.localNotification({
      message: remoteMessage.data?.body,
      title: remoteMessage.data?.title,
      bigPictureUrl: remoteMessage.data?.image,
      channelId: 'channel-id',
      onlyAlertOnce : true,
      vibrate: true


    })

    // Alert.alert(JSON.stringify(remoteMessage.data.body));

  });
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    PushNotification.localNotification({
      message: remoteMessage.data?.body,
      title: remoteMessage.data?.title,
      bigPictureUrl: remoteMessage.data?.image,
      channelId: 'channel-id',
      onlyAlertOnce : true,
      vibrate: true

    })
  })

  messaging()
    .getInitialNotification()
    .then(async remoteMessage => {
      if (remoteMessage) {

        //
      }
    });

  // return (

  // <View>
  //     <CardModal
  //     title={title} //enter correct props
  //     message={body} //enter correct props
  //     bigPictureUrl={image} //enter correct props
  //     isOpen={isCardModal}
  //     handleChange={closeModal}
  //   />

  // </View>
  // )

};
