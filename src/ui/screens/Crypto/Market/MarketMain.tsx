import { View, Text, Dimensions, Platform, StyleSheet, TouchableOpacity, FlatList, ScrollView, StatusBar, } from 'react-native'
import React, { useState } from 'react'
import MyText from '../../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import newStyles from '../../Styles/Styles';
import Modal from 'react-native-modalbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
const { width, height } = Dimensions.get('window');
import MarketList from './MarketList';
import { useTheme } from 'react-native-paper';

interface Props {
  navigation: any;
}

const Item = ({ item, index, subCat, ngnRate, btcPrice, navigation }) => {

  return (
    <MarketList
      title={item.title}
      lastPrice={item.lastPrice}
      ngnRate={ngnRate}
      subTitle={item.subTitle}
      btcPrice={btcPrice}
      priceChangePercent={item.priceChangePercent}
      subCat={subCat}
      navigation={navigation}

    />
  )
}

const MarketMain: React.FC<Props> = props => {
  const { navigation } = props;

  const theme = useTheme()
  const styles = newStyles(theme);

  const [mainCat, setMainCat] = useState('Spot')
  const [subCat, setSubCat] = useState('USDT');

  const ngnRate = 1450;
  const btcPrice = 51000;

  const cryptoList =
    [
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

  const USDTPair = cryptoList.filter(item => {
    return (item.pair?.includes('USDT') && item?.tradingStatus)
  })

  const NGNPair = cryptoList.filter(item => {
    return (item.pair?.includes('NGN') && item?.tradingStatus)
  })

  const BTCPair = cryptoList.filter(item => {
    return (item.pair?.includes('BTC') && item?.tradingStatus)
  })

  const sortedGainers = cryptoList.filter(item => {
    return parseFloat(item?.priceChangePercent) > 0 && item?.tradingStatus;
  });

  const sortedLosers = cryptoList.filter(item => {
    return parseFloat(item?.priceChangePercent) < 0  && item?.tradingStatus;
  });


  const filterData = () => {
    switch (mainCat) {
      case 'Spot':
        if (subCat === 'USDT') {
          return USDTPair;
        }
        else if (subCat === 'NGN') {
          return NGNPair;
        } 
        else {
          return BTCPair;
        }
        break;
      case 'Gainers':
        return sortedGainers;
        break;
      case 'Losers':
        return sortedLosers;
        break;
      default:
        return USDTPair;
    }
  }

  const renderItem = ({ item, index }) => {
    return (

      <Item item={item} index={index} subCat={subCat} ngnRate={ngnRate} btcPrice={btcPrice} navigation={navigation} />

    )
  }

  const seperator = () => {

    return (
      <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: '#f2f2f2' }} />
    )
  }

  return (

    <>
        <View style={[styles.Row, styles.mb10, styles.mt5, { width: '100%' }]}>
          <TouchableOpacity
            onPress={() => {
              setMainCat('Spot')
              setSubCat('USDT')
            }}
            style={[styles.tabLineAuto, { width: width / 3, borderColor: mainCat === 'Spot' ? '#1cc88a' : 'transparent', }]}>
            <MyText style={[styles.fontSize15, { color: mainCat === 'Spot' ? '#343434' : '#808080' }]}>Spot</MyText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setMainCat('Gainers')
              setSubCat('')
            }}
            style={[styles.tabLineAuto, { width: width / 3, borderColor: mainCat === 'Gainers' ? '#1cc88a' : 'transparent', }]}>
            <MyText style={[styles.textCenter, styles.fontSize15, styles.fontSemi, { color: mainCat === 'Gainers' ? '#343434' : '#808080' }]}>Gainers</MyText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setMainCat('Losers')
              setSubCat('')
            }}
            style={[styles.tabLineAuto, { width: width / 3, borderColor: mainCat === 'Losers' ? '#1cc88a' : 'transparent', }]}>
            <MyText style={[styles.textCenter, styles.fontSize15, styles.fontSemi, { color: mainCat === 'Losers' ? '#343434' : '#808080' }]}>Losers</MyText>
          </TouchableOpacity>

        </View>

      {mainCat === 'Spot' ? (
        <View style={[styles.Row, styles.ph15, styles.pt5, styles.mb5, { width: '100%' }]}>
          <TouchableOpacity
            onPress={() => setSubCat('USDT')}
            style={[styles.tabLineAuto, styles.b8, subCat === 'USDT' ? styles.bgGrey: null, styles.ph10, styles.mr15, { borderWidth: 1, borderColor: subCat === 'USDT' ? '#ddd' : 'transparent', }]}>
            <MyText style={[styles.textCenter, styles.fontSize12, styles.fontRegular, { color: subCat === 'USDT' ? '#343434' : '#808080' }]}>USDT</MyText>
          </TouchableOpacity>

          {NGNPair.length > 0 ?
          <TouchableOpacity
            onPress={() => setSubCat('NGN')}
            style={[styles.tabLineAuto, styles.b8, subCat === 'NGN' ? styles.bgGrey: styles.bgWhite, styles.ph10, styles.mr15, { borderWidth: 1, borderColor: subCat === 'NGN' ? '#ddd' : 'transparent', }]}>
            <MyText style={[styles.textCenter, styles.fontSize12, styles.fontRegular, { color: subCat === 'NGN' ? '#343434' : '#808080' }]}>NGN</MyText>
          </TouchableOpacity>
          : null }

          {BTCPair.length > 0 ?
          <TouchableOpacity
            onPress={() => setSubCat('BTC')}
            style={[styles.tabLineAuto, styles.b8, subCat === 'BTC' ? styles.bgGrey: styles.bgWhite, styles.ph10, { borderWidth: 1, borderColor: subCat === 'BTC' ? '#ddd' : 'transparent', }]}>
            <MyText style={[styles.textCenter, styles.fontSize12, styles.fontRegular, { color: subCat === 'BTC' ? '#343434' : '#808080' }]}>BTC</MyText>
          </TouchableOpacity>
          : null }
        </View>
      ) : null}

      <FlatList
        data={filterData()}
        contentContainerStyle={[styles.iosBar, { flexGrow: 1 }]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={seperator}
      />


    </>

  )
}

export default MarketMain;