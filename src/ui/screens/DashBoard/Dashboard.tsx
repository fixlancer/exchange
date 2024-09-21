import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import React, { Fragment, useContext, useEffect, useMemo, useState, useRef } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
  StatusBar,
  Platform,
  Linking,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '../../components/Navbars/Navbar';
import MyText from '../../components/DefaultTextComponent/MyText';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletAmount } from '../../../redux/redux/actions/walletAction';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { RootState } from '../../../redux/redux/store/store';
import { getToken, NAIRA } from '../../../utils/utils';
const { width, height } = Dimensions.get('window');
import TopRatesBanner from '../../components/TopRatesBanner/TopRatesBanner';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modalbox';
import { getNotifications } from '../../../redux/redux/actions/notificationAction';
import { getSetting } from '../../../redux/redux/actions/settingAction';

import newStyles from '../Styles/Styles';
import CustomToast from '../../components/CustomToast/CustomToast';
import { getHomeScreenData, getNews } from '../../../redux/redux/actions/userAction';
import { useHomeStore, useNewsStore } from '../../../stores/store'
import HomeContent from './HomeContent';
import { useTheme } from 'react-native-paper';

const DashboardScreen = ({ route, navigation }) => {

  const { wallet, toprates, setHomeData } = useHomeStore();
  
  const theme = useTheme()
  const styles = newStyles(theme);

  const [ngnRate, setNgnRate] = useState(1450);

  const successFallback = route?.params?.successFallback;
  const successMessage = route?.params?.successMessage;

  const { news, setNews } = useNewsStore();

  const [isLoading, setisLoading] = useState(true);
  const [isRefreshing, setisRefreshing] = useState(false);
  const { setting } = useSelector((state: RootState) => state.settingReducer);

  /* CUSTOM TOAST ========== */

  const [toastType, setToastType] = useState('success');
  const [toastMsg, setToastMsg] = useState('');
  const [show, setShow] = useState(0);

  const slideAnim = useRef(new Animated.Value(120)).current;

  const animateToast = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: 120,
        duration: 200,
        useNativeDriver: true,
      }).start();
      setShow(0);
    }, 3500);
  };

  const showToast = (type, msg) => {
    setToastType(type);
    setToastMsg(msg);
    setShow(1);
    animateToast();
  };

  /* CUSTOM TOAST ENDS ============= */



  async function getCounter() {
    await getHomeScreenData().then((res) => {
      setHomeData(res);
      setisRefreshing(false)
      setisLoading(false)
    }).catch(
      (err) => {
        const { data } = err.response;
        setisRefreshing(false)
        setisLoading(false)
        showToast('Warning', 'An error occured while fetching data. Please refresh again')
      })

  }

  useEffect(() => {
    handleRefresh();
  }, [])

  useEffect(() => {
    if (successFallback) {
      showToast('Success', successMessage);
    }
  }, [successFallback])

  async function getHomeNews() {
    await getNews().then(res => {
      setNews(res);
    }).catch(err => {
      const { data } = err.response;
      showToast('Warning', 'An error occured fetching data. Please refresh again');
    })
  }
  const handleRefresh = async () => {
    setisRefreshing(true);
    setisLoading(true);
    await getCounter();
    await getHomeNews();
  };

  const newsData = [
    {
      text: 'Unlock 0.02 BTC welcome rewards',
      subText: 'New User Zone',
      image: require('../../../Assets/btc.png')
    },
    {
      text: 'Win N20,000 trading gifctards worth $3,000',
      subText: 'Rewards Unlocked',
      image: require('../../../Assets/splashimage.png')
    },
  ]

  const headerImg = require('../../../Assets/header.png');

  const usdBalance = wallet?.cashBalance / ngnRate;

  return (

    <View style={[styles.container,]}>

      {/*}   <Image
        source={headerImg}
        style={[styles.headerBG]}
        resizeMode={'cover'}
      />
  */}

      <SafeAreaView
        style={{
          height: height,
          width: width,
          flex: 1,
          backgroundColor: 'transparent',
        }}
        edges={['left', 'right', 'top']}>
        <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

      {/*}  <View style={[styles.mt20, styles.mb10, styles.ph15, styles.RowB, {}]}>

          {/*}     <Image
            source={require('../../../Assets/fejoraLogo-white.png')}
            style={styles.logoImg}
            resizeMode={'contain'}
          />
      


          <Text style={[styles.largeLabel, styles.textDark, styles.fontSize25]}>Welcome Jones</Text>
          <IconM
            name={'notifications-outline'}
            size={moderateScale(25)}
            color={'#808080'}
            style={[styles.mt5]} />
        </View>
*/}

        <HomeContent
          navigation={navigation}
          ngnBalance={wallet && wallet?.cashBalance}
          usdBalance={usdBalance}
          cryptoSettings={setting && setting[0].bitcoin_status}
          giftcardSettings={setting && setting[0].giftcard_status}
          news={newsData}
          isLoading={isLoading}
          handleRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          topRates={toprates} />

      </SafeAreaView>


      <NavBar
        navigation={navigation}
        activePage={'home'}
        backgroundColor={undefined}
      />

      {show !== 0 ? (

        <Animated.View
          style={{ transform: [{ translateY: slideAnim }], position: 'absolute', zIndex: 999, bottom: 0 }}>
          <CustomToast
            type={toastType}
            msg={toastMsg}
          />
        </Animated.View>
      ) : null}


    </View>

  );
};

export default DashboardScreen;
