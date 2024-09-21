/*
###

*/

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContactSupport, removeFcm } from '../../src/redux/redux/actions/userAction';
import DeviceInfo from 'react-native-device-info';
import { Alert, BackHandler, Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { getStatus } from '../../src//redux/redux/actions/userAction';

const UserStatus : any = ({ state, navigation }) => {

  const dispatch: any = useDispatch();
  const [myLoading, setmyLoading] = useState(false);
  // const [status, setStatus] = useState('');

  useEffect(() => {

    getStatusInfo();
  }, [state])

  const getStatusInfo = async () => {

    const id = await AsyncStorage.getItem('id');
    dispatch(
      getStatus(id)
    )
      .then((res) => {
        
        if (res == 'banned') {
          banned();
        }
      })

      .catch((err) => {

      });
  };


  const handleLogout = async () => {
    setmyLoading(true);
    const id = await AsyncStorage.getItem('id');
    const device_id = DeviceInfo.getDeviceId();
    //    console.log("IDDDDDDDDDDDDDDD", id);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('id');
    await AsyncStorage.clear();
    await messaging().deleteToken();
    dispatch(
      removeFcm({
        userid: id,
        deviceId: device_id
      })
    )
      .then(async (res) => {
        BackHandler.exitApp();
      
      })
      .catch((err) => {
        BackHandler.exitApp();
      });


  };

  const banned = () => { //THIS IS THe POPUP

    Alert.alert('Account Restricted',
      'Your account has been restricted due to possible violation of our Terms or Service. Check your email for further information',
      [
        {
          text: 'Exit',
          onPress: () => handleLogout()
        }
      ],
      { cancelable: false },
    )

  }

};

export default UserStatus;
