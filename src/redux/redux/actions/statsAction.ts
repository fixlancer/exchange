import {ActionTypes} from '../constants';
import axios from 'axios';
import {
  UPDATE_STATS,
  GET_STATS
} from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const editUserStats = ({userID, total_trades,completed_cards,declined_cards,pending_cards,completed_cards_transValue,pending_cards_transValue,declined_cards_transValue}) =>
  async (dispatch: any) => {
    const token = await AsyncStorage.getItem('token');
    return new Promise(async (resolve, reject) => {
      try {
        await axios
          .patch(
            `${UPDATE_STATS}/${userID}`,
            {
                total_trades,
                completed_cards,
                declined_cards,
                pending_cards,
                completed_cards_transValue,
                declined_cards_transValue,
                pending_cards_transValue,
            
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(async res => {
            if (res.status === 200) {
              dispatch({type: ActionTypes.UPDATE_USER_STATS, payload: res.data});
              resolve(res.data);
            } else {
              reject(res.data);
            }
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };


  export const getUserStats= (id) => async dispatch  =>  {
    // if(tradeData.length !==0) tradeData = []; 
//     const id = await AsyncStorage.getItem('id');
  
//   console.log(id);
      return new Promise(async (resolve, reject) => {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        try {
          
           await axios
            .get(`${GET_STATS}/${id}`,  {
      
              headers: {
                Authorization: `Bearer ${token}`,
              
              },
  
            
            })
            .then(async res => {
              if (res.status === 200) {
              dispatch({ type: ActionTypes.GET_USER_STATS,payload: res.data });
                // console.log("GIFT CARD DATA -> " ,res.data)
               
                resolve(res.data);
                // console.log("GET RES => ",res.data);
                
                // console.log(res.data);
                // setTradeData(res.data);
            //    console.log(tradeData);
              //   for(var i =0;i<tradeData.length;i++)
              //  a.push(tradeData[i].selected[i]);
              //  console.log(a);
              
              } else {
                reject(res.data);
                
              }
            });
        } catch (error) {
          console.log("ERRORRRR");
          reject(error);
        }
      });
  
  
    };
