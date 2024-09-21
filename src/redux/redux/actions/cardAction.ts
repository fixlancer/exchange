import { ActionTypes } from '../constants';
import axios from 'axios';
import { CARD_URL, GET_CODES,DELETE_ALL_GIFTCARDS,GET_GIFTCARD_BY_ID,GET_OUR_RATES,GET_CARDLIST,GET_STARTING_CODES_OF} from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {instance} from '../axios/axios';
import { Buffer } from 'buffer';
// export const getCardList = () => async dispatch => {
//   return new Promise(async (resolve, reject) => {
//     const token = await AsyncStorage.getItem('token');
//  //   console.log(token);
//     try {
//       await axios
//         .get(CARD_URL, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then(async res => {
//           if (res.status === 200) {
//             dispatch({ type: ActionTypes.GET_CARDS, payload: res.data });
//             // console.log("CARD DATA" ,res.data)
//             resolve(res.data);
//           } else {
//             reject(res.data);
//           }
//         });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };


export const getCardList =  async () => {
  return await instance.get(GET_CARDLIST).then(async (res: any) => {
    const cards = res?.data?.data;
    console.log('GET_CARDS response', res);
    return cards;
  });
};

export const getStartingCodes =  async (title:string) => {
  return await instance.get(GET_STARTING_CODES_OF+title).then(async (res: any) => {
    const StartingCodes = res?.data?.data;
    console.log('GET_CARDS response', StartingCodes);
    return StartingCodes;
  });
};

export const uploadImage = async (image: any) => {
  const cloudName = 'djxgn4hxe'; // Replace with your Cloudinary cloud name
  const apiKey = '956179866627869'; // Replace with your Cloudinary API key
  const apiSecret = 'sNpjGeyk7rJueM07ytl9UIP0KBA'; // Replace with your Cloudinary API secret
  const uploadPreset = 'fejora'; // Replace with your Cloudinary upload preset

  const data = new FormData();
  data.append('file', {
    uri: image.imageUri,
    type: image.imgType,
    name: image.imgName,
  } as any);

  data.append('upload_preset', uploadPreset);

  const headers = {
    'Content-Type': 'multipart/form-data',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
  };

  try {
    const cloudinaryAPIUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const uploadResponse = await axios.post(cloudinaryAPIUrl, data, { headers });

    console.log('Upload response:', uploadResponse.data);
    return uploadResponse.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    return;
  }
};



export const onCancelDeleteCard = ({selected}) =>
async (dispatch: any) => {
  const token = await AsyncStorage.getItem('token');
  console.log(selected);

  return new Promise(async (resolve, reject) => {
    try {
      await axios
      .patch(DELETE_ALL_GIFTCARDS, {

                 selected

      },
      {
            
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                
            },
            )
           .then(async res => {
          if (res.status === 200) {
            dispatch({type: ActionTypes.DELETE_GIFTCARDS, payload: res.data});
            resolve(res.data);
          } else {
            reject(res.data);
            // console.log('error');
          }
        });
    } catch (error) {
      console.log(error.response.request._response);
      reject(error.response.request._response);
    }
  });
};        



export const getCodesBytitle = ({title}) =>      
async (dispatch: any) => {
  const token = await AsyncStorage.getItem('token');
  return new Promise(async (resolve, reject) => {
    try {
      await axios.get(
          `${GET_CODES}/${title}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(async res => {
          if (res.status === 200) {
            dispatch({type: ActionTypes.GETCODES , payload: res.data});
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



export const getGiftcardById = ({giftcard_id}) =>
async (dispatch: any) => {
  const token = await AsyncStorage.getItem('token');
  return new Promise(async (resolve, reject) => {
    try {
      await axios
        .post(
          GET_GIFTCARD_BY_ID,
          {
             giftcard_id
          
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(async res => {
          if (res.status === 200) {
            dispatch({type: ActionTypes.GET_GIFTCARDBYID, payload: res.data.giftcards});
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





export const getOurRates = ({title,country,card_type,card_value,starting_code}) =>
async (dispatch: any) => {
  const token = await AsyncStorage.getItem('token');
  return new Promise(async (resolve, reject) => {
    try {
      await axios
        .post(
          GET_OUR_RATES,
          {
            title,country,card_type,card_value, starting_code
          
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(async res => {
          if (res.status === 200) {
            dispatch({type: ActionTypes.GET_GIFTCARDBYID, payload: res.data});
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
