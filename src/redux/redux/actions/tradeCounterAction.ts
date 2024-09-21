import {ActionTypes} from '../constants';
import axios from 'axios';
import {
GET_TRADE_COUNTER,
} from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getTradeCounters= (id) => async dispatch  =>  {

      return new Promise(async (resolve, reject) => {
        const token = await AsyncStorage.getItem('token');
   
        try {
          
           await axios
            .get(`${GET_TRADE_COUNTER}/${id}`,  {
      
              headers: {
                Authorization: `Bearer ${token}`,
              
              },
  
            
            })
            .then(async res => {
              if (res.status === 200) {
              dispatch({ type: ActionTypes.GET_TRADECOUNTER,payload: res.data });
               
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

