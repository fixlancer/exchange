import {
  View, Text, Dimensions, Platform, StyleSheet, TouchableOpacity, Image,
  Animated, FlatList, ScrollView, StatusBar, RefreshControl,
} from 'react-native'
import React, { useState, useRef } from 'react'
import MyText from '../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import newStyles from '../Styles/Styles';
import Carousel from 'react-native-snap-carousel';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Modal from 'react-native-modalbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
const { width, height } = Dimensions.get('window');
import MarketList from '../Crypto/Market/MarketList';
import RateList from './RateList';
import { useTheme } from 'react-native-paper';

interface Props {
  navigation: any;
  ngnBalance: any;
  usdBalance: any;
  cryptoSettings: any;
  giftcardSettings: any;
  news: any;
  isLoading: any;
  handleRefresh: any;
  isRefreshing: any;
  topRates: any;
}

const Item = ({ item, index, subCat, ngnRate, btcPrice, navigation }) => {

  return (
    <MarketList
      title={item.title}
      lastPrice={item.lastPrice}
      ngnRate={ngnRate}
      btcPrice={btcPrice}
      subTitle={item.subTitle}
      priceChangePercent={item.priceChangePercent}
      subCat={subCat}
      navigation={navigation}

    />
  )
}

const ItemRate = ({ item, index, btcPrice, ngnBuyRate, subCat, navigation }) => {

  return (
    <RateList
      cardName={item.cardName}
      cardValue={item.cardValue}
      rate={item.cardRate}
      subCat={subCat}
      btcPrice={btcPrice}
      ngnBuyRate={ngnBuyRate}
      navigation={navigation}

    />
  )
}

const HomeContent: React.FC<Props> = props => {
  const { navigation, ngnBalance, usdBalance, cryptoSettings, giftcardSettings, handleRefresh, isRefreshing, news, isLoading, topRates } = props;

  const theme = useTheme()
  const styles = newStyles(theme);

  const CloudinaryBaseUrl = process.env.REACT_APP_CLOUDINARY_BASEURL;

  const [mainCat, setMainCat] = useState('Spot')
  const [subCat, setSubCat] = useState('USDT');
  const [cat, setCat] = useState('Crypto');

  const ngnRate = 1450;
  const ngnBuyRate = 1500;
  const btcPrice = 51000;


  const isCarousel = useRef(null);
  const swipeRender = ({ item, index }) => {
    return (
      <View key={index} style={[styles.b15, styles.RowB, styles.borderWidthDark, styles.pt15, styles.ph15, { height: moderateScale(100) }]}>
        <View style={[, { width: '65%' }]}>
          <MyText style={[styles.tinyLabel]}>{item.subText}</MyText>
          <Text style={[styles.userLabel, styles.fontSize15,]}>{item.text}</Text>
        </View>

        <Image
          style={{ height: 60, width: 60, }}
          // source={{ uri: item?.image ? CloudinaryBaseUrl + item?.image : item?.url }}
          source={item.image}
          resizeMode={'contain'}
        />
      </View>
    )
  }

  const handleClick = (data) => {
    if (data === 'Crypto') {
      setCat('Crypto');
      setMainCat('Spot')
      setSubCat('USDT')
    } else {
      setCat('Giftcard');
      setMainCat('All')
      setSubCat('NGN');
    }
  }


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

  const sortedNew = cryptoList.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));

  const sortedGainers = cryptoList.filter(item => {
    return parseFloat(item?.priceChangePercent) > 0 && item?.tradingStatus;
  });

  const sortedLosers = cryptoList.filter(item => {
    return parseFloat(item?.priceChangePercent) < 0 && item?.tradingStatus;
  });


  const filterData = () => {
    switch (mainCat) {
      case 'Spot':
        if (subCat === 'USDT') {
          return (
            USDTPair.map((item, index) => {
              return (
                <View key={index}>
                  <RenderItem item={item} index={index} />
                </View>
              )
            })
          )
        }
        else if (subCat === 'NGN') {
          return (
            NGNPair.map((item, index) => {
              return (
                <View key={index}>
                  <RenderItem item={item} index={index} />
                </View>
              )
            })
          )
        }
        else {
          return (
            BTCPair.map((item, index) => {
              return (
                <View key={index}>
                  <RenderItem item={item} index={index} />
                </View>
              )
            })
          )
        }
        break;
      case 'Gainers':
        return (
          sortedGainers.map((item, index) => {
            return (
              <View key={index}>
                <RenderItem item={item} index={index} />
              </View>
            )
          })
        )
        break;
      case 'Losers':
        return (
          sortedLosers.map((item, index) => {
            return (
              <View key={index}>
                <RenderItem item={item} index={index} />
              </View>
            )
          })
        )
        break;
      case 'New listings':
        return (
          sortedNew.map((item, index) => {
            return (
              <View key={index}>
                <RenderItem item={item} index={index} />
              </View>
            )
          })
        )
        break;
      default:
        return null;
    }
  }

  const filteredRates = () => {
    switch (mainCat) {
      case 'All':
        return topRates.map((item, index) => (
          <View key={index}>
            <RenderRate item={item} index={index} />
          </View>
        )
        );
        break;
      case 'Best sellers':

        const calcRate = item => item?.cardValue * item?.cardRate;
        const best = topRates.slice().sort((a, b) => calcRate(b) - calcRate(a));
        const topBest = best.slice(0, 2);
        return (
          topBest.map((item, index) => {
            return (
              <View key={index}>
                <RenderRate item={item} index={index} />
              </View>
            )
          })
        );
        break;
      default:
        return null;
    }
  }

  const links = [
    { title: 'Airtime' },
    { title: 'DSTV' },
    { title: 'Transactions' },
    { title: 'Bonus' },
  ]

  const handleLinks = (data) => {
    switch (data) {
      case 'Transactions':
        return navigation.navigate('TransactionHistory', { tab: 'Deposit' })
        break;
      case 'Airtime':
        return navigation.navigate('AirtimeData');
        break;
      case 'DSTV':
        return navigation.navigate('DstvData');
        break;
      case 'Bonus':
        return navigation.navigate('BonusDash')
      default:
        return null;
    }
  }


  const iconName = (data) => {
    switch (data) {
      case 'Transactions':
        return 'stopwatch-outline';
        break;
      case 'Airtime':
        return 'phone-portrait-outline';
        break;
      case 'DSTV':
        return 'tv-outline';
        break;
      case 'Bonus':
        return 'trophy-outline';
      default:
        return null;
    }
  }

  const RenderRate = ({ item, index }) => {
    return (
      <ItemRate item={item} index={index} btcPrice={btcPrice} ngnBuyRate={ngnBuyRate} subCat={subCat} navigation={navigation} />

    )
  }


  const RenderItem = ({ item, index }) => {
    return (

      <Item item={item} index={index} subCat={subCat} ngnRate={ngnRate} btcPrice={btcPrice} navigation={navigation} />

    )
  }

  const seperator = () => {

    return (
      <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: '#f2f2f2' }} />
    )
  }

  const HeaderComp = () => {
    return (
      <View style={[styles.pt10, { height: 'auto' }]}>

        <View style={[styles.Row, styles.ph15, styles.lineBottomDark, styles.pb5, styles.mb10, { width: '100%' }]}>
          <TouchableOpacity
            onPress={() => handleClick('Crypto')}
            style={[styles.tabLineAuto, styles.mr20, { borderColor: 'transparent', }]}>
            <Text style={[styles.fontSize17, styles.fontSemi,  cat === 'Crypto' ? styles.textDark : styles.textLightGrey ]}>Crypto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleClick('Giftcard')}
            style={[styles.tabLineAuto, { borderColor: 'transparent', }]}>
            <Text style={[styles.fontSemi, styles.fontSize17, styles.ph10,  cat === 'Giftcard' ? styles.textDark : styles.textLightGrey]}>Giftcard</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.Row, styles.mb10, styles.mt5, { width: '100%', }]}>

          <TouchableOpacity
            onPress={() => {
              setMainCat('Spot')
              setSubCat('USDT')
            }}
            style={[styles.tabLineAuto, styles.ph15, styles.mr10, { width: 'auto', borderColor: mainCat === 'Spot' ? '#1cc88a' : 'transparent', }]}>
            <MyText style={[styles.fontSize15, mainCat === 'Spot' ? styles.textDark : styles.textGrey]}>Spot</MyText>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => {
              setMainCat('New listings')
              setSubCat('')
            }}
            style={[styles.tabLineAuto, styles.ph15, styles.mr10, { width: 'auto', borderColor: mainCat === 'New listings' ? '#1cc88a' : 'transparent', }]}>
            <MyText style={[styles.textCenter, styles.fontSize15, styles.fontSemi, mainCat === 'New listings' ? styles.textDark : styles.textGrey]}>New listings</MyText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setMainCat('Gainers')
              setSubCat('')
            }}
            style={[styles.tabLineAuto, styles.ph15, styles.mr10, { width: 'auto', borderColor: mainCat === 'Gainers' ? '#1cc88a' : 'transparent', }]}>
            <MyText style={[styles.textCenter, styles.fontSize15, styles.fontSemi, mainCat === 'Gainers' ? styles.textDark : styles.textGrey]}>Gainers</MyText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setMainCat('Losers')
              setSubCat('')
            }}
            style={[styles.tabLineAuto, styles.ph15, { width: 'auto', borderColor: mainCat === 'Losers' ? '#1cc88a' : 'transparent', }]}>
            <MyText style={[styles.textCenter, styles.fontSize15, styles.fontSemi, mainCat === 'Losers' ? styles.textDark : styles.textGrey]}>Losers</MyText>
          </TouchableOpacity>

        </View>

        {mainCat === 'Spot' ? (
          <View style={[styles.Row, styles.ph15, styles.pt5, styles.mb5, { width: '100%' }]}>
            <TouchableOpacity
              onPress={() => setSubCat('USDT')}
              style={[styles.tabLineAuto, styles.b8, subCat === 'USDT' ? styles.bgGrey : null, styles.ph10, styles.mr15, subCat === 'USDT' ? styles.borderWidthDark : null, { borderWidth: 1,}]}>
              <MyText style={[styles.textCenter, styles.fontSize12, styles.fontRegular, subCat === 'USDT' ? styles.textDark : styles.textGrey]}>USDT</MyText>
            </TouchableOpacity>

            {NGNPair.length > 0 ?
              <TouchableOpacity
                onPress={() => setSubCat('NGN')}
                style={[styles.tabLineAuto, styles.b8, subCat === 'NGN' ? styles.bgGrey : null, styles.ph10, styles.mr15, subCat === 'NGN' ? styles.borderWidthDark : null, { borderWidth: 1, }]}>
                <MyText style={[styles.textCenter, styles.fontSize12, styles.fontRegular, subCat === 'NGN' ? styles.textDark : styles.textGrey]}>NGN</MyText>
              </TouchableOpacity>
              : null}

            {BTCPair.length > 0 ?
              <TouchableOpacity
                onPress={() => setSubCat('BTC')}
                style={[styles.tabLineAuto, styles.b8, subCat === 'BTC' ? styles.bgGrey : null, styles.ph10, subCat === 'BTC' ? styles.borderWidthDark : null, { borderWidth: 1, }]}>
                <MyText style={[styles.textCenter, styles.fontSize12, styles.fontRegular, subCat === 'BTC' ? styles.textDark : styles.textGrey]}>BTC</MyText>
              </TouchableOpacity>
              : null}
          </View>
        ) : null
        }

      </View>
    )
  }

  const RenderHead = () => {
    return (

      <View style={[styles.pt10, { height: 'auto' }]}>
        <View style={[styles.Row, styles.ph15, styles.lineBottomDark, styles.pb5, styles.mb10, { width: '100%' }]}>
          <TouchableOpacity
            onPress={() => handleClick('Crypto')}
            style={[styles.tabLineAuto, styles.mr20, { borderColor: 'transparent', }]}>
            <Text style={[styles.fontSize17, styles.fontSemi, cat === 'Crypto' ? styles.textDark : styles.textLightGrey]}>Crypto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleClick('Giftcard')}
            style={[styles.tabLineAuto, { borderColor: 'transparent', }]}>
            <Text style={[styles.fontSemi, styles.fontSize17, styles.ph10, cat === 'Giftcard' ? styles.textDark : styles.textLightGrey]}>Giftcard</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.Row, styles.mb10, styles.mt5, { width: '100%', }]}>

          <TouchableOpacity
            onPress={() => {
              setMainCat('All')
              setSubCat('NGN')
            }}
            style={[styles.tabLineAuto, styles.ph15, styles.mr10, { width: 'auto', borderColor: mainCat === 'All' ? '#1cc88a' : 'transparent', }]}>
            <MyText style={[styles.fontSize15, mainCat === 'All' ? styles.textDark : styles.textGrey]}>All</MyText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setMainCat('Best sellers')
              setSubCat('NGN')
            }}
            style={[styles.tabLineAuto, styles.ph15, styles.mr10, { width: 'auto', borderColor: mainCat === 'Best sellers' ? '#1cc88a' : 'transparent', }]}>
            <MyText style={[styles.textCenter, styles.fontSize15, styles.fontSemi, mainCat === 'Best sellers' ? styles.textDark : styles.textGrey]}>Best sellers</MyText>
          </TouchableOpacity>

          
          <TouchableOpacity
            onPress={() => navigation.navigate('BonusDash')}
            style={[styles.tabLineAuto, styles.ph15, styles.mr10, { width: 'auto', borderColor: mainCat === 'Bonus' ? '#1cc88a' : 'transparent', }]}>
            <MyText style={[styles.textCenter, styles.fontSize15, styles.fontSemi, mainCat === 'Bonus' ? styles.textDark : styles.textGrey]}>Bonus</MyText>
          </TouchableOpacity>

        </View>


        <View style={[styles.Row, styles.ph15, styles.pt5, styles.mb5, { width: '100%' }]}>

          <TouchableOpacity
            onPress={() => setSubCat('NGN')}
            style={[styles.tabLineAuto, styles.b8, subCat === 'NGN' ? styles.bgGrey : null, styles.ph10, styles.mr15, subCat === 'NGN' ? styles.borderWidthDark : null, { borderWidth: 1, }]}>
            <MyText style={[styles.textCenter, styles.fontSize12, styles.fontRegular, subCat === 'NGN' ? styles.textDark : styles.textGrey]}>NGN</MyText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSubCat('BTC')}
            style={[styles.tabLineAuto, styles.b8, subCat === 'BTC' ? styles.bgGrey : null, styles.ph10, subCat === 'BTC' ? styles.borderWidthDark : null, { borderWidth: 1,  }]}>
            <MyText style={[styles.textCenter, styles.fontSize12, styles.fontRegular, subCat === 'BTC' ? styles.textDark : styles.textGrey]}>BTC</MyText>
          </TouchableOpacity>

        </View>

      </View>
    )
  }


  const nairaSign = '\u20A6';


  return (

    <ScrollView contentContainerStyle={[styles.iosBar, { flexGrow: 1 }]}
      stickyHeaderIndices={[1]}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          tintColor={'#343434'}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      }>


      <View style={[styles.mt15, styles.pt10, { minHeight: moderateScale(300) }]}>
        <View style={[styles.RowB, styles.pb15, styles.mb15]}>
          <View style={[styles.ph15]}>
            <MyText style={[styles.tinyLabel,]}>Total balance</MyText>
            <Text style={[styles.largeLabel, styles.textDark, styles.fontSize25]}>{nairaSign}{ngnBalance}</Text>
            <MyText style={[styles.tinyLabel, styles.pt5]}>= ${usdBalance.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 }).replace(/,/g, '')}</MyText>
          </View>
        </View>

        <View style={[styles.ph15, styles.mb20]}>

          {isLoading ? (
            <View style={[styles.bgWhite, styles.borderWidthDark, styles.b30, styles.mb10, { flex: 1 }]}>
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item height={100} width={'100%'} borderRadius={15} />
              </SkeletonPlaceholder>
            </View>
          ) : (
            <View style={[styles.bgWhite, styles.b15, styles.mb10, styles.alignCenter, { flex: 1, }]}>
              {news ? (
                <Carousel
                  data={news}
                  ref={isCarousel}
                  renderItem={swipeRender}
                  sliderWidth={width}
                  itemWidth={width - wp(8)}
                  layout={'default'}
                  autoplay={true}
                  loop={true}


                />
              ) : (

                <View style={[styles.bgWhite, styles.mb10, styles.alignCenter, { flex: 1, marginVertical: -5, }]}>
                  <SkeletonPlaceholder>
                    <SkeletonPlaceholder.Item height={70} width={'100%'} borderRadius={30} />
                  </SkeletonPlaceholder>
                </View>
              )}
            </View>
          )}

        </View>

        <View style={[styles.ph15, styles.mb30]}>
          <Text style={[styles.userLabel, styles.fontSize17, styles.mb20]}>Quick links</Text>

          <View style={[styles.ph15, styles.RowB]}>
            {links.map((i, index) => {
              return (
                <View key={index} style={[, { width: 'auto', }]}>
                  <TouchableOpacity
                    onPress={() => handleLinks(i.title)}
                    style={[styles.alignCenter]}>
                    <View style={[styles.bgWhite, styles.alignCenter, styles.borderWidthGreen, styles.b30, { width: moderateScale(40), height: moderateScale(40) }]}>
                      <IconM
                        name={iconName(i.title)}
                        size={moderateScale(15)}
                        color={'#1cc88a'}
                        style={[]} />
                    </View>
                    <MyText style={[styles.tinyLabel, styles.pt10]}>{i.title}</MyText>
                  </TouchableOpacity>
                </View>
              )
            }
            )}

          </View>

        </View>


      </View>

      <View style={{backgroundColor: theme.dark ? '#000' : '#fff'}}>
        {cat === 'Crypto' ?
          <HeaderComp /> : <RenderHead />
        }
      </View>

      <View>
        {cat === 'Crypto' ? filterData() : (
          <>
            {isLoading ? (
              <View style={[styles.ph5, styles.bgLightGrey, { flex: 1 }]}>
                <View style={styles.emptyCont}>
                  <SkeletonPlaceholder >
                    <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between">
                      <SkeletonPlaceholder.Item flexDirection="row">
                        <SkeletonPlaceholder.Item height={20} width={20} borderRadius={30} />
                        <SkeletonPlaceholder.Item marginLeft={8} height={20} width={150} borderRadius={10} />
                      </SkeletonPlaceholder.Item>
                      <SkeletonPlaceholder.Item height={20} width={50} borderRadius={10} />
                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder>

                </View>

                <View style={styles.emptyCont}>
                  <SkeletonPlaceholder >
                    <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between">
                      <SkeletonPlaceholder.Item flexDirection="row">
                        <SkeletonPlaceholder.Item height={20} width={20} borderRadius={30} />
                        <SkeletonPlaceholder.Item marginLeft={8} height={20} width={150} borderRadius={10} />
                      </SkeletonPlaceholder.Item>
                      <SkeletonPlaceholder.Item height={20} width={50} borderRadius={10} />
                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder>
                </View>
              </View>
            ) : (
              !cryptoSettings ?
                filteredRates()
                :
                <View style={[styles.alignCenter, styles.ph15, styles.mt20]}>
                  <IconM
                    name={'warning-outline'}
                    size={moderateScale(25)}
                    color={'#f27415'}
                    style={{ marginTop: 0, }} />

                  <MyText style={[styles.tinyLabel, styles.mt10, styles.textCenter]}>
                    We are currently not accepting Giftcard trades at the moment. Check back later</MyText>
                </View>
            )}
          </>

        )}
      </View>

    </ScrollView>

  )
}

export default HomeContent;