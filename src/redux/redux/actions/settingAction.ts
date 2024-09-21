import {ActionTypes} from '../constants';
import axios from 'axios';
import {GET_SETTING} from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const getSetting = () => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    const token = await AsyncStorage.getItem('token');
    try {
      await axios
        .get(GET_SETTING, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async res => {
          if (res.status === 200) {
            dispatch({type: ActionTypes.GET_SETTING, payload: res.data.settings});
            resolve(res.data.settings);
          } else {
            reject(res.data.settings);
          }
        });
    } catch (error) {
      reject(error);
    }
  });
};