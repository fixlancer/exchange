import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
  SectionList,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import MyText from '../../components/DefaultTextComponent/MyText';
import newStyles from '../Styles/Styles';
import Modal from 'react-native-modalbox';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

import CryptoList from './Components/CryptoList';
import SelectCurrency from './Components/SelectCurrency';
import HeaderModalClose from '../../components/Header/HeaderModalClose';
import MarketList from './Market/MarketList';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

interface Props {
  isOpen: any;
  tradeType: any;
  handleChange: any;
  navigation: any;
}

const Item = ({ item, index, subCat, tradeType, ngnRate, btcPrice, navigation }) => {

  return (
    <CryptoList
      title={item.title}
      lastPrice={item.lastPrice}
      subTitle={item.subTitle}
      ngnRate={ngnRate}
      btcPrice={btcPrice}
      tradeType={tradeType}
      priceChangePercent={item.priceChangePercent}
      subCat={subCat}
      navigation={navigation}

    />
  )
}

const SelectCrypto: React.FC<Props> = props => {
  const { isOpen, tradeType, handleChange, navigation } = props;

  const theme = useTheme()
  const styles = newStyles(theme);
  const [swapTradeType, setSwapTradeType] = useState(tradeType);

  useEffect(() => {
    setSwapTradeType(tradeType)
  }, [tradeType])

  const close = () => {
    handleChange()
  }

  const [subCat, setSubCat] = useState('NGN');

  const ngnRate = 1450;
  const btcPrice = 51000;

  const cryptoList =
    [
      {
        status: 'Fiat',
        data: [
          {
            id: 2,
            title: 'USDT',
            subTitle: 'TetherUS',
            lastPrice: 0.99,
            vol: '0',
            priceChangePercent: '0',
            pair: ['BTC', 'NGN'],
            tradingStatus: true,
          },
        ]
      },
      {
        status: 'Crypto',
        data: [
          {
            id: 1,
            title: 'BTC',
            subTitle: 'Bitcoin',
            lastPrice: 51000,
            vol: '2100000000',
            priceChangePercent: '-4.3',
            pair: ['USDT', 'NGN'],
            tradingStatus: true,
          },
          {
            id: 2,
            title: 'ETH',
            subTitle: 'Ethereum',
            lastPrice: 3000,
            vol: '100000000',
            priceChangePercent: '+1.3',
            pair: ['USDT', 'NGN', 'BTC'],
            tradingStatus: true,
          },
          {
            id: 3,
            title: 'DOGE',
            subTitle: 'Dogecoin',
            lastPrice: 0.9056,
            vol: '3000000',
            priceChangePercent: '-1.3',
            pair: ['USDT'],
            tradingStatus: true,
          },
          {
            id: 4,
            title: 'SHIB',
            lastPrice: 0.0000466,
            subTitle: 'SHIBA INU',
            vol: '21000000',
            priceChangePercent: '-14.3',
            pair: ['USDT', 'NGN'],
            tradingStatus: true,
          },
          {
            id: 5,
            title: 'BNB',
            lastPrice: 809,
            subTitle: 'BNB',
            vol: '71700000',
            priceChangePercent: '+4.7',
            pair: ['USDT', 'NGN', 'BTC'],
            tradingStatus: true,
          },
          {
            id: 6,
            title: 'ETC',
            lastPrice: 120.3,
            subTitle: 'Ethereum Classic',
            vol: '58310000',
            priceChangePercent: '-8.4',
            pair: ['USDT', 'NGN'],
            tradingStatus: true,
          },
          {
            id: 7,
            title: 'XRP',
            subTitle: 'Ripple',
            lastPrice: 3.567,
            vol: '2100000000',
            priceChangePercent: '-4.3',
            pair: ['USDT', 'NGN'],
            tradingStatus: true,
          },
          {
            id: 8,
            title: 'LTC',
            subTitle: 'Litecoin',
            lastPrice: 69.56,
            vol: '340000',
            priceChangePercent: '-7.3',
            pair: ['USDT', 'NGN'],
            tradingStatus: true,
          },
          {
            id: 9,
            title: 'XLM',
            subTitle: 'Stellar Lumens',
            lastPrice: 0.1156,
            vol: '210000',
            priceChangePercent: '-14.3',
            pair: ['USDT'],
            tradingStatus: true,
          },
          {
            id: 10,
            title: 'ADA',
            subTitle: 'Cardano',
            lastPrice: 0.6043,
            vol: '8564300',
            priceChangePercent: '-1.8',
            pair: ['USDT'],
            tradingStatus: true,
          },
        ]
      }
    ]


  const USDTPair = cryptoList.filter(item => {
    return item?.data[0].pair?.includes('USDT');
  })

  const NGNPair = cryptoList.filter(item => {
    return item?.data[0].pair?.includes('NGN');
  })

  const BTCPair = cryptoList.filter(item => {
    return item?.data[0].pair?.includes('BTC');
  })

  const filterData = () => {
    switch (subCat) {
      case 'USDT':
        return USDTPair;
        break;
      case 'NGN':
        return NGNPair;
        break
      case 'BTC':
        return BTCPair;
        break;
      default:
        return null;
    }
  }

  const header = (section) => {
    return (
      section.status === 'Fiat' ? (
        <View style={[styles.pt15, styles.pl15, styles.pb10]}>
          <Text style={[styles.largeLabel, styles.textDark]}>Fiat</Text>
        </View>
      ) : section.status === 'Crypto' ? (
        <View style={[styles.pt15, styles.pl15, styles.pb10]}>
          <Text style={[styles.largeLabel, styles.textDark]}>Crypto</Text>
        </View>
      ) : null
    )
  }

  const renderCrypto = ({ item, index }) => {
    return (

      <Item item={item} index={index} subCat={subCat} tradeType={tradeType} ngnRate={ngnRate} btcPrice={btcPrice} navigation={navigation} />

    )
  }

  const seperator = () => {

    return (
      <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: theme.dark ? '#535353' : '#f2f2f2' }} />
    )
  }

  return (

    <Modal isOpen={isOpen}
      style={[styles.container]}
      keyboardTopOffset={Platform.OS == 'ios' ? 22 : 0}
      swipeToClose={false}
      onClosed={close}
      backdropOpacity={1}
      backdropColor={'transparent'}
      position="top">


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

          <View style={[styles.newModalHeader, styles.RowB]}>
            <TouchableOpacity
              onPress={() => handleChange()}
              style={[styles.b30, styles.alignCenter, styles.bgWhite, styles.borderDark, styles.mt10, { width: moderateScale(30), height: moderateScale(30) }]}>
              <IconM
                name={'close'}
                size={moderateScale(15)}
                color={theme.dark ? '#fff' : '#343434'}
                style={{}} />

            </TouchableOpacity>

            <View style={[styles.Row, styles.alignCenter, styles.mt10, {}]}>
              <TouchableOpacity
                onPress={() => setSwapTradeType('Buy')}
                style={[styles.ph10, styles.mr15, styles.pb2, swapTradeType === 'Buy' ? styles.lineBottomCatDark : null ]}>
                <Text style={[styles.textCenter, styles.fontSize15, styles.fontSemi, swapTradeType === 'Buy' ? styles.textDark : styles.textLightGrey, { }]}>Buy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSwapTradeType('Sell')}
                style={[swapTradeType === 'Sell' ? styles.lineBottomCatDark : null, styles.ph10, styles.pb2, { }]}>
                <Text style={[styles.textCenter, styles.fontSize15, styles.fontSemi, swapTradeType === 'Sell' ? styles.textDark : styles.textLightGrey,]}>Sell</Text>
              </TouchableOpacity>
            </View>

            <MyText style={[styles.pl5]}></MyText>
          </View>

          <View style={[styles.Row, styles.mt20, styles.ph15, styles.mb5, { width: '100%' }]}>
            {NGNPair.length > 0 ?
              <TouchableOpacity
                onPress={() => setSubCat('NGN')}
                style={[styles.tabLineAuto, styles.b8, subCat === 'NGN' ? styles.bgGrey : null, styles.ph10, styles.mr15, subCat === 'NGN' ? styles.borderWidthDark : null, { borderWidth:1 }]}>
                <MyText style={[styles.textCenter, styles.fontSize12, styles.fontRegular, subCat === 'NGN' ? styles.textDark : styles.textGrey ]}>NGN</MyText>
              </TouchableOpacity>
              : null}

            <TouchableOpacity
              onPress={() => setSubCat('USDT')}
              style={[styles.tabLineAuto, styles.b8, subCat === 'USDT' ? styles.bgGrey : null, styles.ph10, styles.mr15, subCat === 'USDT' ? styles.borderWidthDark : null, { borderWidth:1 }]}>
              <MyText style={[styles.textCenter, styles.fontSize12, styles.fontRegular, subCat === 'USDT' ? styles.textDark : styles.textGrey ]}>USDT</MyText>
            </TouchableOpacity>

            {BTCPair.length > 0 ?
              <TouchableOpacity
                onPress={() => setSubCat('BTC')}
                style={[styles.tabLineAuto, styles.b8, subCat === 'BTC' ? styles.bgGrey : null, styles.ph10, subCat === 'BTC' ? styles.borderWidthDark : null, { borderWidth:1}]}>
                <MyText style={[styles.textCenter, styles.fontSize12, styles.fontRegular, subCat === 'BTC' ? styles.textDark : styles.textGrey ]}>BTC</MyText>
              </TouchableOpacity>
              : null}
          </View>


          <SectionList
            sections={filterData()}
            renderSectionHeader={({ section }) => header(section)}
            contentContainerStyle={[styles.iosBar, { flexGrow: 1 }]}
            renderItem={renderCrypto}
            keyExtractor={(item) => item.id.toString()}
          //  ItemSeparatorComponent={seperator}
          />


        </SafeAreaView>


      </View >

    </Modal >
  );
};


export default SelectCrypto;