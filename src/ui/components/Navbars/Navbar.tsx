import React, { useState, Fragment } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import newStyles from '../../screens/Styles/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconA from 'react-native-vector-icons/AntDesign';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import MyText from '../DefaultTextComponent/MyText';
import HomeMenu from '../../screens/DashBoard/HomeMenu';
import SelectCrypto from '../../screens/Crypto/SelectCrypto';
import ListModal from '../../screens/Crypto/Deposit/Modal/ListModal';
import { useTheme } from 'react-native-paper';

const Navbar = ({ navigation, activePage, backgroundColor }) => {


  const theme = useTheme()
  const styles = newStyles(theme);

  const [isCrypto, setIsCrypto] = useState(false);
  const [tradeType, setTradeType] = useState('');
  const [isList, setIsList] = useState(false);
  const [type, setType] = useState('');
  const [isHome, setHome] = useState(false);

  const handleHome = () => {
    setHome(false);
  }

  const openModal = (data) => {
    switch (data) {
      case 'Buy':
        setTradeType('Buy');
        setIsCrypto(true);
        break;
      case 'Sell':
        setTradeType('Sell');
        setIsCrypto(true);
        break;
      case 'Deposit':
        setType('Deposit');
        setIsList(true);
        break;
      case 'Withdraw':
        setType('Withdraw');
        setIsList(true);
        break;
      default:
        return null;
    }
  }

  const closeCrypto = () => {
    setIsCrypto(false);
  }

  const closeList = () => {
    setIsList(false);
  }

  return (
    <Fragment>
      <View style={[styles.pt15, styles.bottomBar,]}>
        <View style={[styles.pb5,  { flexDirection: 'row', justifyContent: 'space-around', }]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('DashBoard');
          }}
          style={[styles.alignCenter]}>
          <IconA
            name={'home'}
            color={activePage === 'home' ? '#1cc88a' : '#808080'}
            size={moderateScale(21)}
          />
          <MyText style={[styles.tinyDark, activePage === 'home' ? styles.textGreen : styles.textGrey, styles.fontSize8, styles.textCenter]}>Home</MyText>

           </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('Card');
          }}
          style={[styles.alignCenter]}>
          <IconM
            name={'card-outline'}
            color={activePage === 'card' ? '#1cc88a' : '#808080'}
            size={moderateScale(21)}
          />
          <MyText style={[styles.tinyDark, activePage === 'card' ? styles.textGreen : styles.textGrey, styles.fontSize8, styles.textCenter, ]}>Card</MyText>

          </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            isHome ? handleHome() : setHome(true)
          }}
          style={[styles.alignCenter, styles.b30, styles.bgGreen, {width:moderateScale(35), height:moderateScale(35)}]}>
            {isHome ?
          <IconA
            name={'close'}
            color={'#fff'}
            size={moderateScale(20)}
          />
            :
          <IconA
            name={'swap'}
            color={'#fff'}
            size={moderateScale(20)}
          />
            }
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('Wallet');
          }}
          style={[styles.alignCenter]}>
          <IconM
            name={'wallet-outline'}
            color={activePage === 'wallet' ? '#1cc88a' : '#808080'}
            size={moderateScale(21)}
          />          
          <MyText style={[styles.tinyDark, activePage === 'wallet' ? styles.textGreen : styles.textGrey, styles.fontSize8, styles.textCenter, ]}>Wallet</MyText>

       </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('Settings');
          }}
          style={[styles.alignCenter]}>
          <IconM
            name={'settings-outline'}
            color={activePage === 'settings' ? '#1cc88a' : '#808080'}
            size={moderateScale(21)}
          />          
          <MyText style={[styles.tinyDark, activePage === 'settings' ? styles.textGreen : styles.textGrey, styles.fontSize8, styles.textCenter, ]}>Settings</MyText>

        </TouchableOpacity>
        </View>
      </View>

      <HomeMenu
        isOpen={isHome}
        openModal={openModal}
        handleChange={handleHome}
        navigation={navigation}
      />

      <SelectCrypto
        isOpen={isCrypto}
        tradeType={tradeType}
        handleChange={closeCrypto}
        navigation={navigation}
      />

      <ListModal
        isOpen={isList}
        type={type}
        handleChange={closeList}
        navigation={navigation}
      />

    </Fragment>
  );
};

export default Navbar;
