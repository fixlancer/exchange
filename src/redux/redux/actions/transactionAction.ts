import {ActionTypes} from '../constants';
import axios from 'axios';
import {
  GET_TRANSACTION_BY_ID,
  CREATE_WITHDRAW,
  GET_PENDING_WITHDRAWAL,
  GET_ALL_PENDING_WITHDRAWALS_BY_ID,
  AIRTIME_AND_DATA_PAYMENTS,
  GET_BILLERS,
  GET_CABLE_BILLERS,
  DSTV_GOTV_PAYMENTS,
  GET_BANKS,
  GET_TRANS_COUNT,
  GET_PENDING_WITHDRAWAL_COUNT_USER,
  GET_DECLINED_WITHDRAWAL_COUNT_USER
} from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getTransCount = (id) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    const token = await AsyncStorage.getItem('token');
    try {
      await axios
        .get(`${GET_TRANS_COUNT}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async res => {
          if (res.status === 200) {
            dispatch({
              type: ActionTypes.GET_TRANSCOUNT,
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

  export const getTransactionByID = (id,skip,limit) => async dispatch => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      try {
        await axios
          .get(`${GET_TRANSACTION_BY_ID}/${id}/${skip}/${limit}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async res => {
            if (res.status === 200) {
              dispatch({
                type: ActionTypes.GET_TRANSACTIONUSER,
                payload: res.data.transactions,
              });
              resolve(res.data.transactions);
            } else {
              reject(res.data);
            }
          });
      } catch (error) {
        reject(error);
      }
    });
  };


  export const getPendingWithdrawalCountUser = (userID) => async dispatch => {   //admin
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      try {
        await axios
          .get(`${GET_PENDING_WITHDRAWAL_COUNT_USER}/${userID}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async res => {
            if (res.status === 200) {
              dispatch({
                type: ActionTypes.GET_PENDING_WITHDRAWAL_COUNT_USER,
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

  export const getDeclinedWithdrawalCountUser = (userID) => async dispatch => {   //admin
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      try {
        await axios
          .get(`${GET_DECLINED_WITHDRAWAL_COUNT_USER}/${userID}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async res => {
            if (res.status === 200) {
              dispatch({
                type: ActionTypes.GET_DECLINED_WITHDRAWAL_COUNT_USER,
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





  export const getPendingWithdrawalTransactionByID = (id,limit,skip) => async dispatch => {     //get all withdrawal transactions of a specific user (naam p mt jaana)
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      try {
        await axios
          .get(`${GET_PENDING_WITHDRAWAL}/${id}/${limit}/${skip}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async res => {
            if (res.status === 200) {
              dispatch({
                type: ActionTypes.GET_WITHDRAW,
                payload: res.data.transactions,
              });
              resolve(res.data.transactions);
            } else {
              reject(res.data);
            }
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  export const getAllpendingwithdrawalbyid = (id,limit,skip) => async dispatch => {     //get all pending withdrawals by id !!
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      try {
        await axios
          .get(`${GET_ALL_PENDING_WITHDRAWALS_BY_ID}/${id}/${limit}/${skip}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async res => {
            if (res.status === 200) {
              dispatch({
                type: ActionTypes.GET_WITHDRAWAL_BY_ID,
                payload: res.data.transactions,
              });
              resolve(res.data.transactions);
            } else {
              reject(res.data);
            }
          });
      } catch (error) {
        reject(error);
      }
    });
  };




  export const createwithdrawalTransactions =
  ({trade_name,transaction_amount,account_name,account_number,bank_name,bank_code,userID,status,transaction_type,password}) =>
  async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      try {
        await axios
          .post(
            CREATE_WITHDRAW,
            {
              trade_name,
              transaction_amount,
              bank_details : {
                account_name,
                account_number,
                bank_name,
                bank_code,
              },
              userID,
              status,
              transaction_type,
              password,
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
                type: ActionTypes.CREATEWITH_DRAW,
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

  export const airTime_And_Data_payments = ({id, account, network, category, phone, amount,pass}) => async dispatch => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      try {
        await axios
          .post(AIRTIME_AND_DATA_PAYMENTS, {
            userid : id,
            acc : account,
            network : network,
            cat : category,
            phone : phone,
            amount : amount,
            pass : pass,

            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async res => {
            if (res.status === 200) {
              dispatch({
                type: ActionTypes.AIR_TIME_DATA_PAYMENTS,
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


  export const dstv_gotvPayments = ({id, type,decoderno, amount,pass}) => async dispatch => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      try {
        await axios
          .post(DSTV_GOTV_PAYMENTS, {
            userid : id,
            type : type,
            decoderno : decoderno,
            amount : amount,
            pass : pass,

            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async res => {
            if (res.status === 200) {
              dispatch({
                type: ActionTypes.DSTV_GOTV_PAYMENTS,
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

  export const getBillerfromFlutterWave = () => async dispatch => { //get data bundle billers
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      try {
        await axios
          .get(GET_BILLERS, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async res => {
            if (res.status === 200) {
              dispatch({
                type: ActionTypes.GET_BILLERS,
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


  export const getDstvgotvBillers = () => async dispatch => { //get dstv/gotv billers

    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      try {
        await axios
          .get(GET_CABLE_BILLERS, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async res => {
            if (res.status === 200) {
              dispatch({
                type: ActionTypes.GET_CABLE_BILLERS,
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


  export const getBanks = () => async dispatch => { //get banks from paystack api

    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      try {
        await axios
          .get(GET_BANKS, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async res => {
            if (res.status === 200) {
              dispatch({
                type: ActionTypes.BANK_NAMES,
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