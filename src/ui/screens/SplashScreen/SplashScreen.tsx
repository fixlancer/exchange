import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Platform,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
const { width, height } = Dimensions.get('screen');

const textList = ['Setting up the environment', 'Fetching market rates', 'Loading available bonus', 'Loading payment systems', 'Setting up the environment', 'Fetching market rates', 'Loading available bonus', 'Loading payment systems']

const SplashScreen = ({ navigation }) => {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [newText, setnewText] = useState('');

  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * textList.length);
    setnewText(textList[index]);
  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffle, 500);
    return () => clearInterval(intervalID);

  }, [shuffle]);

  useEffect(() => {
    getData();

  }, [token]);

  const getData = async () => {

    try {
      const value = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
      const role = await AsyncStorage.getItem('role');
      
      if (value !== null) {
        // // value previously stored
        setToken(value);
        setId(id);
        
        if (role === 'Admin') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'AdminWithdrawalHome' }]
          })
        } else if (role === 'Moderator') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'ModeratorScreen' }]
          })
        } else if (role === 'User') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'DashBoardScreen' }]
          })
        } else if (role === '') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'SignInScreen' }]
          })
        }
      } else {
        navigation?.replace('LandingScreen');
      }
    } catch(e){
      <></>
    }
  };

  return (
    <View
      style={{
        height: '100%',
        width: width,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1cc88a',
      }}>
      <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />

      <View style={{ alignSelf: 'center', }}>
       <Text style={styles.text}>{newText}</Text>
    </View>
  </View>

    );
};

const styles = StyleSheet.create({
  text: {
    fontSize:13,
    color: '#fff',
    textAlign: 'center',
    fontFamily: "Nunito-Regular",
  },
});
export default SplashScreen;
