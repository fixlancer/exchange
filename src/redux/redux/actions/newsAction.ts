import { ActionTypes } from '../constants';
import axios from 'axios';
import { GET_NEWS_URL } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getNewsList = () => async (dispatch: any) => {
    
  return new Promise(async (resolve, reject) => {
    const token = await AsyncStorage.getItem('token');
    try {
      await 
        axios.get(GET_NEWS_URL, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
        })
        .then(async res => {
          if (res.status === 200) {
            dispatch({ type: ActionTypes.GET_NEWS, payload: res.data.news });
            resolve(res.data.news);
          } else {
            reject(res.data.news);
          }
        });
    } catch (error) {
      reject(error);
    }
  });
};


