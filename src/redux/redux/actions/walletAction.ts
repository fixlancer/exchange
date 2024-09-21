import { ActionTypes } from '../constants';
import axios from 'axios';
import { GET_NEWS_URL, 
  GET_WALLET_URL} from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getWalletAmount = (id) => async (dispatch: any) => {
  const token = await AsyncStorage.getItem('token');

  return new Promise(async (resolve, reject) => {
    try {
      await 
        axios.get(`${GET_WALLET_URL}/${id}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
        })
        .then(async res => {
          if (res.status === 200) {
            dispatch({ type: ActionTypes.GET_WALLET_AMOUNT, payload: res.data.wallet });
            resolve(res.data.wallet);
          } else {
            reject(res.data);
          }
        });
    } catch (error) {
      reject(error);
    }
  });
};


export const getNews = (data:any) => async (dispatch: any) => {
    
  return new Promise(async (resolve, reject) => {
    try {
      await 
        axios.get(GET_NEWS_URL, {
          headers: {
              'Authorization': `Bearer ${data}`
          }
        })
        .then(async res => {
          if (res.status === 200) {
            dispatch({ type: ActionTypes.GET_NEWS, payload: res.data });
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

