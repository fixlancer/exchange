import React, { useContext, useEffect, useMemo, useState } from 'react';
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
  StatusBar,
} from 'react-native';
import Bitcoin from './Bitcoin';
import GiftCards from './GiftCard';
import Usdt from './Usdt';
import MyText from '../../../components/DefaultTextComponent/MyText';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import styles from './Style';
const { width, height } = Dimensions.get('window');
const btnSetected: any = {
  backgroundColor: '#1cc88a',
  color: '#fff',
  zIndex: 0,
  fontFamily: 'Nunito-Regular',
  borderRadius:4,
  fontSize:13,
  elevation: 0,
};
const OurRate = ({ navigation }) => {
  const [giftCards, setGiftCards] = useState(btnSetected);
  const [bitcoin, setBitcoin] = useState({});
  const [usdt, setUSDT] = useState({});
  const [screen, setScreen] = useState(0);

  const activeButton = (buttonType: string) => {
    console.log(buttonType);
    if (buttonType === 'giftCards') {
      setGiftCards(btnSetected);
      setScreen(0);
      setBitcoin({});
      setUSDT({});
    }
    if (buttonType === 'bitcoin') {
      setGiftCards({});
      setBitcoin(btnSetected);
      setUSDT({});
      setScreen(1);
    }
    if (buttonType === 'usdt') {
      setGiftCards({});
      setBitcoin({});
      setUSDT(btnSetected)
      setScreen(2);
    }
  };
  return (
    <View style={{height: height, width: width, flex: 1, backgroundColor:'#fff'}}>
    <StatusBar translucent backgroundColor='transparent' />
    <SafeAreaView
      style={{
        height: height,
        width: width,
        flex: 1,
        backgroundColor: '#fff'
      }}
      edges={['left', 'right', 'top']}>
     
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ marginLeft: 15, marginTop: 5 }}
            onPress={() => navigation.goBack(null)}>
            <Icon
              name={'arrow-back-ios'}
              size={20}
              color={'#343434'}
              style={{ marginTop: 10 }}></Icon>
          </TouchableOpacity>
          <MyText style={styles.headerHeading}>Our Rates</MyText>
          <MyText></MyText>
        </View>

        {screen === 0 ? (
          <GiftCards
            activeButton={activeButton}
            giftCards={giftCards}
            bitcoin={bitcoin}
            usdt={usdt}
          />
        ) : screen === 1 ? (
          <Bitcoin
            activeButton={activeButton}
            giftCards={giftCards}
            bitcoin={bitcoin}
            usdt={usdt}
          />
        ) : (
          <Usdt
            activeButton={activeButton}
            giftCards={giftCards}
            bitcoin={bitcoin}
            usdt={usdt}
          />
        )}
        
    </SafeAreaView>
    </View>
  );
};
export default OurRate;
