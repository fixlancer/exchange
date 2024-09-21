// axiosInstance.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  // baseURL: "http://localhost:3000/api/v1",
  baseURL: process.env.REACT_APP_BASEURL,
});
console.log('process.env.REACT_APP_API_URL', process.env.REACT_APP_BASEURL);

const updateToken = async (paramToken) => {
  instance.defaults.headers['auth_token'] = process.env.REACT_APP_USER_AUTHTOKEN;
  await AsyncStorage.getItem('token').then(val => {
    if(val || paramToken) {
      instance.defaults.headers['Authorization'] = `Bearer ${paramToken || val}`;
    }
  });
};

updateToken();
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export { instance, updateToken };
