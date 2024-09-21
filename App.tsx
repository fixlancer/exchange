/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *  
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/Routes/Routes';
import RoutesGuest from './src/Routes/RoutesGuest';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/redux/redux/store/store';
import { ToastProvider } from 'react-native-toast-notifications';
import { NativeBaseProvider } from 'native-base';
import { notificationListener, requestUserPermission, } from './src/utils/notificationServices';
import SplashScreen from 'react-native-splash-screen';
import InternetConnectionAlert from "react-native-internet-connection-alert";
import {  AppState } from 'react-native';
import UserStatus from './src/utils/UserStatus';
import { Appearance, useColorScheme } from 'react-native';
import { Provider as PaperProvider, DarkTheme, DefaultTheme } from 'react-native-paper';
// import { Cloudinary } from "@cloudinary/url-gen";

export const ThemeContext = createContext({isDark: false})

const App = ({ navigation }:any) => {


const colorScheme = useColorScheme();

const [isDark, setIsDark] = useState(colorScheme === 'dark')

useEffect(() => {
  const subscription = Appearance.addChangeListener(({ colorScheme}) => {
    setIsDark(colorScheme === 'dark')
  })
  return () => {
    subscription.remove();
  }
}, [])

const theme = isDark ? DarkTheme : DefaultTheme;

//  console.log("process.env.REACT_APP_CLOUDINARY_CLOUD_NAME", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
 
//  const cld = new Cloudinary({
//   cloud: {
//       cloudName: 'demo'
//   }
// });

//  const cloud = new Cloudinary({
//     config: {
//       cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
//       apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
//       apiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
//     }
//   });

  const appState = useRef(AppState.currentState);


 // TO check if user is on the APP
  useEffect(() => {
    AppState.addEventListener('change', handleChange);

    // return () => {
    //   AppState.removeEventListener('change', handleChange);
    // }
  }, [])

  const handleChange = (nextAppState:any) => {

    if (appState.current.match(/inactive|background/) && nextAppState === "active") {

     // setCheck(check => check);
      


    } else {

    //  setCheck(0);
    }

    appState.current = nextAppState;
  //  setCheck(appState.current)
  }

// END -----------------------------



  useEffect(() => {
    getData();
    requestUserPermission();
    notificationListener();
    // checkUpdateNeeded();

  }, []);


  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [state, setState] = useState('');

  const getData = async () => {

    try {
      const role = await AsyncStorage.getItem('role');
      const value = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');

       if (id != null) {
         setUserRole('User');
         SplashScreen.hide();
      //   // // value previously stored
      //   setToken(value);
      //   setId(id);
       } else {
      //  setTimeout(() => {
          setUserRole("Guest");
          SplashScreen.hide();
          
      //  }, 500)
       }

    } catch (e) {
      setUserRole("Guest");
      SplashScreen.hide();
    }
  };




  // const checkUpdateNeeded = async () => {
  //   try {
  //     let updateNeeded = await VersionCheck.needUpdate();
  //     if (updateNeeded.isNeeded) {

  //       Alert.alert('Update Required',
  //         'A new version is available. Please update your app to the latest version to continue usage',
  //         [
  //           {
  //             text: 'Update',
  //             onPress: () => {
  //               BackHandler.exitApp();
  //               Linking.openURL(updateNeeded.storeUrl);
  //             }
  //           }
  //         ],
  //         { cancelable: false },
  //       )
  //     }

  //   } catch (e) { }
  // }

  return (
    <ThemeContext.Provider value={{isDark}}>
    <PaperProvider theme={theme}>
      <NativeBaseProvider>
        <ReduxProvider store={store}>
          <ToastProvider>
            <NavigationContainer
            onStateChange={(res) => setState(state => state + 1)}>
              {userRole === 'User' ? (
                <>
                  <Routes />
                  <UserStatus state={state} navigation={navigation}  />
                </>
              ) : userRole === 'Guest' ? (
                <RoutesGuest />
              ) : null}
            </NavigationContainer>
          </ToastProvider>
        </ReduxProvider>
      </NativeBaseProvider>
      </PaperProvider>
      </ThemeContext.Provider>
  );
};


export default App;