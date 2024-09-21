import {ActionTypes} from '../constants';
import axios from 'axios';
import {SEND_NOTIFICATION_URL,GET_NOTIFICATION_URL} from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const sendNotification =
  ({title, message, image,sendAsPopup}) =>
  async dispatch => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        await axios
          .post(
            SEND_NOTIFICATION_URL,
            {
              title,
              body: message,
              image,
              popup : sendAsPopup,
           
            },
            axiosConfig,
          )
          .then(async res => {
            if (res.status === 200) {
              dispatch({
                type: ActionTypes.SEND_NOTIFICATION,
                payload: res.data,
              });
              resolve(res.data);
            } else {
              reject(res.data);
            }
          });
      } catch (error) {
        reject(error.response.request._response);
      }
    });
  };


  export const getNotifications = () => async dispatch => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      try {
        await axios
          .get(GET_NOTIFICATION_URL, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async res => {
            if (res.status === 200) {
              dispatch({
                type: ActionTypes.GET_NOTIFICATION,
                payload: res.data.Notification,
              });
              resolve(res.data.Notification);
            } else {
              reject(res.data);
            }
          });
      } catch (error) {
        reject(error);
      }
    });
  };