import {ActionTypes} from '../constants';
import axios from 'axios';
import {
  GET_TOP_RATE,
} from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


  export const getToprates= () => async dispatch  =>  {

      return new Promise(async (resolve, reject) => {
        const token = await AsyncStorage.getItem('token');
        try {
          
           await axios
            .get(GET_TOP_RATE,  {
      
              headers: {
                Authorization: `Bearer ${token}`,
              
              },
  
            
            })
            .then(async res => {
              if (res.status === 200) {
              dispatch({ type: ActionTypes.GET_TOPRATE,payload: res.data });  
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

