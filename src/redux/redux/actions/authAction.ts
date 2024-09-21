import {ActionTypes} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {instance} from '../axios/axios';
import {
  EDIT_BANK_DETAILS_URL,
  EDIT_USER_DETAILS_URL,
  GET_USER_DETAILS_URL,
  LOGIN_URL,
  REGISTER_URL,
  POST_CHANGE_PASSWORD,
  RESEND_OTP,
  VERIFY_OTP
} from '../../services/api';

export interface LoginUser {
  identifier: string;
  password: string;
  deviceToken: string;
  deviceType: string;
  deviceId: string;
}

interface RegisterUser {
  email: string;
  password: string;
  phone: string;
  username: string;
  deviceToken: string;
  deviceType: string;
  deviceId: string;
}


export const loginUser = async(PostData: LoginUser) => {
    return await instance.post(LOGIN_URL, PostData).then(async (res: any) => {
      const payload = res?.data;
      return payload;
    });
};

export const registerUser = async (PostData: RegisterUser) => {
  return await instance.post(REGISTER_URL, PostData).then(async (res: any) => {
    const payload = res?.data;
    return payload;
  });
};

export const reSendOTP = async (PostData: any) => {
  return await instance.post(RESEND_OTP, PostData).then(async (res: any) => {
    const payload = res?.data;
    return payload;
  });
};

export const verifyOTP = async (PostData: any) => {
  return await instance.post(VERIFY_OTP, PostData).then(async (res: any) => {
    const payload = res?.data;
    return payload;
  });
};



export const editUserDetails = data => async dispatch => {
  return new Promise(async (resolve, reject) => {
    const token = await AsyncStorage.getItem('token');
    try {
      await axios
        .patch(
          EDIT_USER_DETAILS_URL,
          {
            name: data.name,
            email: data.email,
            phone: data.phone,
            full_name: data.fullName,
            bank_details: {
              account_name: data.accountName,
              account_number: data.bankAccount,
              bank_name: data.bankName,
              bank_code: data.bankCode,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(async res => {
          if (res.status === 200) {
            dispatch({type: ActionTypes.EDIT_USER_DETAILS, payload: res.data});
            // await AsyncStorage.setItem('id', res.data.user.id);
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

export const getUserDetails =
  ({token, userID}) =>
  async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (token !== null && userID !== null) {
          await axios
            .get(`${GET_USER_DETAILS_URL}/${userID}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(async res => {
              if (res.status === 200) {
                dispatch({
                  type: ActionTypes.GET_USER_DETAILS,
                  payload: res.data,
                });
                resolve(res.data);
              } else {
                reject(res.data);
              }
            });
        }
      } catch (error) {
        reject(error);
      }
    });
  };
export const updateBankDetails =
  ({token, userID, account_name, account_number, bank_name}) =>
  async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (token !== null && userID !== null) {
          await axios
            .post(
              `${EDIT_BANK_DETAILS_URL}`,
              {
                userID,
                bank_details: {
                  account_name,
                  account_number,
                  bank_name,
                },
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
                  type: ActionTypes.UPDATE_BANK_DETAILS,
                  payload: res.data,
                });
                resolve(res.data);
              } else {

                reject(res.data);
              }
            });
        }
      } catch (error) {
        reject(error);
      }
    });
  };
