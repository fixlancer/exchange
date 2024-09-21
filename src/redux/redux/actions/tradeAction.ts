import { ActionTypes } from '../constants';
import axios from 'axios';
import { CREATE_TRADE,POST_CHECK_CARD_RATE,POST_USER_TRADE,GET_TRADES_BY_STATUS_AND_PAGE_NO} from '../../services/api';
import { GET_TRADE } from '../../services/api';
import { UPDATE_TRADE } from '../../services/api';
import { UPDATE_TRADESTATUS } from '../../services/api';
import { UPDATE_ON_RETRY } from '../../services/api';
import { ONGOING_COUNT } from '../../services/api';
import { COMPLETED_COUNT } from '../../services/api';
import {instance} from '../axios/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const checkCardRate =  async (body:any) => {
  return await instance.post(POST_CHECK_CARD_RATE, body).then(async (res: any) => {
    const data = res?.data?.data;
    console.log('checkCardRate response', data);
    return data;
  });
};

export const AddTrade =  async (body:any) => {
  return await instance.post(POST_USER_TRADE, body).then(async (res: any) => {
    const data = res?.data?.data;
    console.log('AddTrade response', data);
    return data;
  });
};

export const getTradesByPage_And_Status =  async (status:string, page:number) => {
  console.log('getTradesByPage_And_Status', status, page);
  return await instance.get(`${GET_TRADES_BY_STATUS_AND_PAGE_NO}page=${page}&tradeStatus=${status}`).then(async (res: any) => {
    const TradesData = res?.data?.data;
    console.log('getTradesByPage_And_Status response', res?.data);
    if(res?.data?.message == "No Completed trades found" || res?.data?.message == "No Pending trades found" || res?.data?.message == "No Ongoing trades found") return null;
    return TradesData;
  });
};

export const getTrade= (id,skip,limit) => async dispatch  =>  {
    // if(tradeData.length !==0) tradeData = []; 
    // const id = await AsyncStorage.getItem('id');
  
  
      return new Promise(async (resolve, reject) => {
        const token = await AsyncStorage.getItem('token');
        try {
          
           await axios
            .get(`${CREATE_TRADE}/${id}/${skip}/${limit}`,  {
      
              headers: {
                Authorization: `Bearer ${token}`,
              
              },
            })
            .then(async res => {
              if (res.status === 200) {
              dispatch({ type: ActionTypes.GET_TRADE,payload: res.data });
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



export const getTradebyID:any = (tradeid:any) => async (dispatch:any) =>  {
          return new Promise(async (resolve, reject) => {
            const token = await AsyncStorage.getItem('token');
            console.log(token);
            try {
              
               await axios
                .get(`${GET_TRADE}/${tradeid}`,  {
          
                  headers: {
                    Authorization: `Bearer ${token}`,
                  
                  },
      
                
                })
                .then(async res => {
                  if (res.status === 200) {
                  dispatch({ type: ActionTypes.GET_TRADE_ID,payload: res.data });
                   
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
    
  
  
            
            export const updateTrade = ({cardID, status,rate_sold,net_profit}) =>
            async (dispatch: any) => {
              const token = await AsyncStorage.getItem('token');
              return new Promise(async (resolve, reject) => {
                try {
                  await axios
                    .patch(
                      `${UPDATE_TRADE}/${cardID}`,
                      {
                          status,
                          rate_sold,
                          net_profit
                      
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      },
                    )
                    .then(async res => {
                      if (res.status === 200) {
                        dispatch({type: ActionTypes.UPDATE_TRADEDATA, payload: res.data});
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
            
            
            export const updateTradeStatus = ({tradeID,isModerator}) =>
            async (dispatch: any) => {
              const token = await AsyncStorage.getItem('token');
              return new Promise(async (resolve, reject) => {
                try {
                  await axios
                    .patch(
                      `${UPDATE_TRADESTATUS}/${tradeID}`,
                      {
                          isModerator
                      
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      },
                    )
                    .then(async res => {
                      if (res.status === 200) {
                        dispatch({type: ActionTypes.UPDATE_TRADEDATASTATUS, payload: res.data});
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
            


            export const onRetryUpdate = ({cardID, cardCode,image,trade_title,trade_id }) =>        //retry card update
            async (dispatch: any) => {
              const token = await AsyncStorage.getItem('token');
              return new Promise(async (resolve, reject) => {
                try {
                  await axios
                    .patch(
                      `${UPDATE_ON_RETRY}/${cardID}`,
                      {
                          
                        cardCode,
                        image,
                        trade_title,
                        trade_id

                      
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      },
                    )
                    .then(async res => {
                      if (res.status === 200) {
                        dispatch({type: ActionTypes.UPDATE_ONRETRY, payload: res.data});
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
            



  export const OngoingTradeCount = (id) => async dispatch => { //user side 
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      try {
        await axios
          .get(`${ONGOING_COUNT}/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async res => {
            if (res.status === 200) {
              dispatch({
                type: ActionTypes.ONGOING__COUNT,
                payload: res.data,
              });
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

  export const CompletedTradeCount = (id) => async dispatch => { //user side 
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      try {
        await axios
          .get(`${COMPLETED_COUNT}/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async res => {
            if (res.status === 200) {
              dispatch({
                type: ActionTypes.COMPLETED__COUNT,
                payload: res.data,
              });
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
