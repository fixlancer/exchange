import React, { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Button,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyText from '../../components/DefaultTextComponent/MyText';
import NavBar from '../../components/Navbars/Navbar';
import CompletedTrades from './CompletedTrades';
import OngoingTrades from './OngoingTrades';

import newStyles from '../Styles/Styles';
import HeaderBack from '../../components/Header/HeaderBack';
import { useTheme } from 'react-native-paper';
const { width, height } = Dimensions.get('screen');


const Trades = ({ navigation }) => {

  const [screen, setScreen] = useState(0);

  const theme = useTheme()
  const styles = newStyles(theme);

    const handleClick = (data) => {
      switch (data) {
        case 'Ongoing':
          return setScreen(0);
          break;
        case 'Completed':
          return setScreen(1);
          break;
        default:
          return setScreen(0);
      }
    };

    return (

      <View style={[styles.container]}>

        <SafeAreaView
          style={{
            height: height,
            width: width,
            flex: 1,
            backgroundColor: 'transparent',
          }}
          edges={['left', 'right', 'top']}>
        <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

          <HeaderBack navigation={navigation} headerTitle={'Trades'} />

          {screen === 0 ? (
            <OngoingTrades
            //  screen={handleClick}
              navigation={navigation}
            />
          ) : (
            <CompletedTrades
            //  screen={handleClick}
              navigation={navigation}
            />
          )}


        </SafeAreaView>
      </View>
    );
  };
  export default Trades;
