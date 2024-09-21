import {ActionTypes} from '../constants';
import axios from 'axios';
import {ADD_BONUS_LIST_URL, GET_BONUS_LIST_URL,UPDATE_BONUS_STATUS,DISPLAY_BONUS_LIST} from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getBonusList = () => async dispatch => {
  return new Promise(async (resolve, reject) => {
    const token = await AsyncStorage.getItem('token');
    try {
      await axios
        .get(GET_BONUS_LIST_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async res => {
          if (res.status === 200) {
            dispatch({type: ActionTypes.GET_BONUS_LIST, payload: res.data});
            resolve(res.data);
          } else {
            reject(res.data);
          }
        });
    } catch (error) {
      reject(error);
    }
  });
};
