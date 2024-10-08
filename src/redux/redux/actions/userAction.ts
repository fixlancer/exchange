import {ActionTypes} from '../constants';
import axios from 'axios';
import {
  GET_USER_ID,
  CHANGE_PASSWORD,
  REMOVE_FCM,
  SET_FCM,
  CUSTOMER_SUPPORT_GUEST,
  VERIFY_BANK_ACCOUNT,
  RESET_PASSWORD,
  VERIFY_CODE,
  SET_NEW_PASS,
  GET_STATUS,
  GET_NEWS,
  GET_HOME_SCREEN_DATA,
  POST_CHANGE_PASSWORD,
  GET_PROFILE,
  GET_BANK_NAMES,
  POST_EDIT_BANK_DETAILS,
  GET_SETTINGS,
  POST_WITHDRAW_AMOUNT,
  GET_WITHDRAWAL_TRANSACTIONS,
  GET_TRANSACTION_HISTORY,
  POST_RETRY_CARD,
  GET_DATA_AIRTIME_BUNDLE,
  GET_GOTV_DSTV_PLANS,
  POST_CREATE_DSTV_GOTV_BILL,
  POST_CREATE_DATA_AIRTIME_BILL,
  USER_LOGOUT
} from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {instance} from '../axios/axios';

// Generated by https://quicktype.io

export interface ChangePassword {
  currentPassword: string;
  newPassword:     string;
}



export const getHomeScreenData =  async () => {
  return await instance.get(GET_HOME_SCREEN_DATA).then(async (res: any) => {
    const {topRates,wallet} = res?.data?.data;
    const payload = {toprates:topRates,wallet};
    console.log('HomeScData response', payload);
    return payload;
  });
};

export const getNews =  async () => {
  return await instance.get(GET_NEWS).then(async (res: any) => {
    const payload = res?.data?.data;
    console.log('getNews response', payload);
    return payload;
  });
};

export const changePassword = async(PostData: ChangePassword) => {
  return await instance.post(POST_CHANGE_PASSWORD, PostData).then(async (res: any) => {
    const payload = res?.data;
    console.log('response', payload);
    return payload;
  });
};


export const getProfile =  async () => {
  return await instance.get(GET_PROFILE).then(async (res: any) => {
    const payload = res?.data?.data;
    console.log('getProfile response', payload);
    return payload;
  });
};

export const getBankNames =  async (nextPage:any) => {
  return await instance.get(`${GET_BANK_NAMES}?&page=100${nextPage?`&nextPage=${nextPage}`:""}`).then(async (res: any) => {
    const payload = res?.data?.data;
    console.log('getBankNames response', res);
    return payload;
  });
};

export const editBankDetails = async(PostData:any) => {
  return await instance.post(POST_EDIT_BANK_DETAILS, PostData).then(async (res: any) => {
    const payload = res?.data;
    console.log('response', payload);
    return payload;
  });
};


export const getSettings =  async () => {
  return await instance.get(GET_SETTINGS).then(async (res: any) => {
    const payload = res?.data?.data[0];
    console.log('GET_SETTINGS response', payload);
    return payload;
  });
};


export const withdrawSpecificAmount = async(PostData: any) => {
  return await instance.post(POST_WITHDRAW_AMOUNT, PostData).then(async (res: any) => {
    console.log('response', res?.data);
    return res?.data;
  });
};


export const getWithdrawalTransactions = async(page:number,status:string) => {
  return await instance.get(`${GET_WITHDRAWAL_TRANSACTIONS}?page=${page}&&status=${status}`).then(async (res: any) => {
    const payload = res?.data?.data;
    console.log('getWithdrawalTransactions response', payload);
    return payload;
  });
};

export const getCompletedTransactionsHistory =  async (page:number) => {
  return await instance.get(`${GET_TRANSACTION_HISTORY}?page=${page}`).then(async (res: any) => {
    const payload = res?.data?.data;
    console.log('getCompletedTransactionsHistory response', payload);
    return payload;
  });
};

export const updateGiftCardDetails = async(PostData: any) => {
  return await instance.post(POST_RETRY_CARD, PostData).then(async (res: any) => {
    console.log('response', res?.data);
    return res?.data;
  });
};

export const getDataBundle =  async (type:string) => {
  return await instance.get(`${GET_DATA_AIRTIME_BUNDLE}?${type}=1`).then(async (res: any) => {
    const payload = res?.data?.data;
    console.log('getDataBundle response', payload);
    return payload;
  });
};

export const getSubscriptionPlans =  async (type:string) => {
  return await instance.get(`${GET_GOTV_DSTV_PLANS}?${type}=1`).then(async (res: any) => {
    const payload = res?.data?.data;
    console.log('getSubscriptionPlans response', payload);
    return payload;
  });
};

export const createDataBill = async(PostData: any) => {
  return await instance.post(POST_CREATE_DATA_AIRTIME_BILL, PostData).then(async (res: any) => {
    console.log('response', res?.data);
    return res?.data;
  });
};

export const createSubscriptionBill = async(PostData: any) => {
  return await instance.post(POST_CREATE_DSTV_GOTV_BILL, PostData).then(async (res: any) => {
    console.log('response', res?.data);
    return res?.data;
  });
};

export const userLogout = async(PostData: any) => {
  return await instance.post(USER_LOGOUT, PostData).then(async (res: any) => {
    console.log('userLogout', res?.data);
    return res?.data;
  });
};

  export const getUserbyId = (id) => async (dispatch: any) => {
    const token = await AsyncStorage.getItem('token');
    
    return new Promise(async (resolve, reject) => {
      try {
     await axios
          .get(`${GET_USER_ID}/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async res => {
            if (res.status === 200) {
              dispatch({type: ActionTypes.GET_USER_BY_ID, payload: res.data});
              
             
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



  export const removeFcm = ({userid,deviceId}) => async (dispatch: any) => {
    const token = await AsyncStorage.getItem('token');
    return new Promise(async (resolve, reject) => {
      try {
        await axios
          .patch(
            REMOVE_FCM,
            {
              userid,
              deviceId
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(async res => {
            if (res.status === 200) {
              dispatch({type: ActionTypes.REMOVE_FCM_TOKEN, payload: res.data});
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


  export const setFcm = ({userid,fcmToken,deviceId}) => async (dispatch: any) => {
    const token = await AsyncStorage.getItem('token');
    return new Promise(async (resolve, reject) => {
      try {
        await instance
          .patch(
            SET_FCM,
            {
              userid,
              fcmToken,
              deviceId
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(async res => {
            if (res.status === 200) {
              dispatch({type: ActionTypes.REMOVE_FCM_TOKEN, payload: res.data});
              resolve(res.data);
            } else {
              reject(res.data);
            }
          });
      } catch (error) {
        console.log("error setting fcm");
        
        reject(error);
      }
    });
  };


  

  export const ContactSupport=
  ({name,email,message,isGuest}) =>
  async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      try {
        await axios
          .post(
            CUSTOMER_SUPPORT_GUEST,
            {
              name,
              email,
              message,
              isGuest,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(async res => {
            if (res.status === 200) {
              dispatch({
                type: ActionTypes.SUPPORT_GUEST,
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



  export const ResolveAccountNumber = ({accno, bankcode}) => async (dispatch: any) => {
    
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token')
      try {
     await axios
          .get(`${VERIFY_BANK_ACCOUNT}/${accno}/${bankcode}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async res => {
            if (res.status === 200) {
              dispatch({type: ActionTypes.RESOLVE_ACC, payload: res.data});
              
             
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


  export const ResetuserPassword=
  ({identity}) =>
  async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      try {
        await axios
          .post(
            RESET_PASSWORD,
            {
              identity
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(async res => {
            if (res.status === 200) {
              dispatch({
                type: ActionTypes.RESET_PASS,
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

  export const verifyCode =
  ({email,code}) =>
  async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      try {
        await axios
          .post(
            VERIFY_CODE,
            {
              email,code
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(async res => {
            if (res.status === 200) {
              dispatch({
                type: ActionTypes.VERIFY_CODE,
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

  export const setNewpass =
  ({email,pass,repeatpass}) =>
  async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      try {
        await axios
          .post(
            SET_NEW_PASS,
            {
              email,pass,repeatpass
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(async res => {
            if (res.status === 200) {
              dispatch({
                type: ActionTypes.SET_NEWPASS,
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



  export const getStatus = (id) => async (dispatch: any) => {
    
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token')
      try {
     await axios
          .get(`${GET_STATUS}/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async res => {
            if (res.status === 200) {
              dispatch({type: ActionTypes.GET_STATUS, payload: res.data});
              
             
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