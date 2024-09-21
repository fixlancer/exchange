import AsyncStorage from '@react-native-async-storage/async-storage';

export const NAIRA = '\u20A6';

export const getToken = async (setToken, setId) => {
  try {
    const value = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    setToken(value)
    setId(id)
  } catch (e) {
    // error reading value\
    console.log('error', e);
  }
};
