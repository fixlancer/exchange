import React, { useContext, useRef, useEffect, useMemo, useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Animated,
  ScrollView,
  StatusBar,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomToast from '../../components/CustomToast/CustomToast';
import MyText from '../../components/DefaultTextComponent/MyText';
import CompletePurchase from './Modals/CompletePurchase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { getWalletAmount } from '../../../redux/redux/actions/walletAction';
import { RootState } from '../../../redux/redux/store/store';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBillerfromFlutterWave } from '../../../redux/redux/actions/transactionAction';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { NAIRA } from '../../../utils/utils';
import IconM from 'react-native-vector-icons/Ionicons';
import FormValue from './FormValue';
import BundleValue from './BundleValue';
import { useHomeStore } from '../../../stores/store';
import { getDataBundle, createDataBill } from '../../../redux/redux/actions/userAction';
import HeaderBack from '../../components/Header/HeaderBack';
import newStyles from '../Styles/Styles';
import { moderateScale } from 'react-native-size-matters';
import HeaderSubBack from '../../components/Header/HeaderSubBack';
import SecurityCheck from '../Crypto/SecurityCheck/Index';

const { width, height } = Dimensions.get('screen');
const AirtimeData = ({ navigation }: any) => {
  const { wallet } = useHomeStore();
  let [account, setAccount] = useState(`cash Balance (N${wallet?.cashBalance || 0})`);
  let [network, setNetwork] = useState('');
  let [cat, setCat] = useState('');
  let [bundle, setBundle] = useState(null);
  let [phone, setPhone]: any = useState('');
  let [amount, setAmount] = useState('');
  const [retry, setRetry] = useState(0);

  const [show, setShow] = useState(false);
  const [errorBundle, setErrorBundle] = useState(null);
  // const { billers } = useSelector((state: RootState) => state.getTransaction);

  const [biller_details, setBillerDetails] = useState([]); //for specific network selected data bundles

  const theme = useTheme()
  const styles = newStyles(theme);

  const nairaSign = '\u20A6';
  const inputRef = useRef(null);


  /* CUSTOM TOAST ========== */

  const [toastType, setToastType] = useState('success');
  const [toastMsg, setToastMsg] = useState('');
  const [show2, setShow2] = useState(0);

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
      setShow2(0);
    }, 3500);
  };

  const showToast = (type: any, msg: any) => {
    setToastType(type);
    setToastMsg(msg);
    setShow2(1);
    animateToast();
  };

  /* CUSTOM TOAST ENDS ============= */


  useEffect(() => {

    if (retry > 0 && cat === 'Data') {
      setIsLoading(true);
      getDataBundles('data');
    }
  }, [retry])

  const getDataBundles = async (network: any) => {
    await getDataBundle(network)
      .then((res) => {
        if (res) {
          setBillerDetails(res || []);
        }
      })
      .catch((err) => {
        showToast('Warning', 'Could not fetch data plans. Please try again')

      }).finally(() => {
        setIsLoading(false);
      })
  }


  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(!show);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [show]);


  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isvalueModal, setisValueModal] = useState(false);
  const [isbundleModal, setisBundleModal] = useState(false);
  const [type, setType] = useState(null);
  const [isVerified, setIsVerified] = useState(0);
  const [isSecure, setIsSecure] = useState(false);

  const toggleModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    
    inputRef.current.blur()
    if (cat === 'Data' && bundle === null) {
      setErrorBundle('required');
    } else {
      setModalVisible(true);
    }
  };

  const openFormValue = (item: any) => {
    inputRef.current.blur()
    setType(item);
    setisValueModal(true);
  }

  const closeFormValue = () => {
    setType(null);
    setisValueModal(false);
  }

  const openBundleValue = () => {
    setisBundleModal(true);
  }

  const closeBundleValue = () => {
    setisBundleModal(false);
  }

  
  const closeSecure = () => {
    setIsSecure(false);
}

  const handleSubmit = () => {
    toggleModal();

    if (isVerified === 0) {
      setIsSecure(true);
    } else {
      callApi();
    }
  }


  const callApi = () => {

    setIsSecure(false)
    setIsVerified(1)
    setIsLoading(true);
    createDataBill({
      //  password: pass,
      // network: network,
      category: cat === 'Airtime' ? 'AIRTIME' : "DATA",
      amount: amount,
      phone: '234' + phone,
      billerName: cat === 'Airtime' ? network : bundle
    })
      .then((res) => {
        if (res?.status) {
          
          navigation.reset({
            index: 0,
            routes: [{ name: 'DashBoard' }, { name: 'Success', params: { type: 'Bills', amount: cat === 'Airtime' ? amount : amount + ' - ' + bundle, currency: network + ' - ' + cat } }],
        })
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        showToast('Warning', err.response.data.message);
        //  props.handleChange();
      });
  };



  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current.blur()}>
      <View style={[styles.container, styles.midBgGrey]}>

        <SafeAreaView
          style={{
            height: height,
            width: width,
            flex: 1,
            backgroundColor: 'transparent',
          }}
          edges={['left', 'right', 'top']}>

          <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

          <HeaderSubBack navigation={navigation} />

          <ScrollView style={[styles.ph15,]}>

            <View style={[styles.mt10]}>
              <View style={[styles.pl15, styles.mt10, styles.mb20]}>
                <MyText style={[styles.tinyLabel,]}>Naira balance</MyText>
                <Text style={[styles.largeLabel, styles.textDark, styles.fontSize25]}>{nairaSign}{wallet?.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 }).replace(/,/g, '')}</Text>
              </View>

              <View style={[styles.formWhite, styles.shadow, styles.b30, styles.bgWhite, styles.pb15, styles.ph5, styles.pt5, styles.mb10]}>
                <View style={[styles.formWhite, styles.bgGrey, styles.roundBorderTop, styles.pt10, styles.mb5,]}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => openFormValue('Network')}
                    style={[styles.ph15, styles.mb15]}>

                    <MyText style={[styles.tinyLabel, styles.fontSize11, styles.mt10]}>Network</MyText>

                    <View style={[styles.RowB, {}]}>
                      <MyText style={[styles.userLabel, styles.fontSize14, styles.mt5]}>{!network ? 'Select network' : network}</MyText>

                      <IconM
                        name={'chevron-down'}
                        size={moderateScale(20)}
                        color={'#808080'}
                        style={{ marginTop: 0, }} />

                    </View>

                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => openFormValue('Category')}
                    style={[styles.ph15, styles.mb15]}>

                    <MyText style={[styles.tinyLabel, styles.fontSize11, styles.mt10]}>Category</MyText>

                    <View style={[styles.RowB, {}]}>
                      <MyText style={[styles.userLabel, styles.fontSize14, styles.mt5]}>{!cat ? 'Select category' : cat}</MyText>

                      <IconM
                        name={'chevron-down'}
                        size={moderateScale(20)}
                        color={'#808080'}
                        style={{ marginTop: 0, }} />

                    </View>

                  </TouchableOpacity>

                  {cat === 'Data' ? (

                    <TouchableOpacity
                      activeOpacity={0.7}
                      disabled={isLoading}
                      onPress={() => bundle ? openBundleValue() : setRetry(retry + 1)}
                      style={[styles.ph15, styles.mb15, { opacity: isLoading ? 0.6 : 1 }]}>

                      <MyText style={[styles.tinyLabel, styles.fontSize11, styles.mt10]}>Data plans</MyText>

                      <View style={[styles.RowB, {}]}>
                        <MyText style={[styles.userLabel, styles.fontSize14, styles.mt5]}>{!bundle ? 'Select plan' : bundle}</MyText>

                        <IconM
                          name={'chevron-down'}
                          size={moderateScale(20)}
                          color={'#808080'}
                          style={{ marginTop: 0, }} />

                      </View>

                    </TouchableOpacity>
                  ) : null}

                </View>




                <View style={[styles.ph10]}>
                  <MyText style={[styles.textGrey, styles.pl5, styles.fontRegular, styles.fontSize11, styles.mt10]}>Amount</MyText>

                  <TextInput
                    style={[styles.drop, styles.lineBottomLight, styles.mb10, styles.textDark, styles.fontSize14, styles.fontRegular, { opacity: cat === 'Data' ? 0.6 : 1 }]}
                    placeholderTextColor={'#808080'}
                    textAlign={'left'}
                    placeholder='e.g 1000'
                    keyboardType='numeric'
                    numberOfLines={1}
                    ref={inputRef}
                    editable={cat === 'Data' ? false : true}
                    onChangeText={number => setAmount(number)}
                    value={amount}

                  />

                </View>


                <View style={[styles.ph10]}>
                  <MyText style={[styles.textGrey, styles.pl5, styles.fontRegular, styles.fontSize11, styles.mt10]}>Phone number</MyText>

                  <View style={[styles.Row]}>
                    <MyText style={[styles.textGrey, styles.pl5, styles.fontRegular, styles.fontSize14, { marginTop: 14 }]}>+234</MyText>
                    <TextInput
                      style={[styles.drop, styles.textDark, styles.fontSize14, styles.fontRegular,]}
                      placeholderTextColor={'#808080'}
                      textAlign={'left'}
                      placeholder="xxx xxx xxxx"
                      keyboardType='numeric'
                      numberOfLines={1}
                      ref={inputRef}
                      onChangeText={(number: any) => {
                        setPhone(number)
                      }}
                      value={phone}
                      maxLength={10}

                    />
                  </View>
                </View>

              </View>
            </View>


          </ScrollView>


        </SafeAreaView>

        <View style={[styles.ph15, styles.pt15, styles.bottomBar]}>
          {phone && amount && account && network && cat ? (
            <TouchableOpacity
              onPress={openModal}
              style={[styles.submitButton, styles.bgGreen]}>
              <MyText style={[styles.buttonLabel]}>Continue
              </MyText>
            </TouchableOpacity>
          ) : (
            <View
              style={[styles.submitButton, styles.bgGreen, { opacity: 0.5 }]}>
              <MyText style={[styles.buttonLabel]}>Continue
              </MyText>
            </View>
          )}
        </View>

        <FormValue
          isOpen={isvalueModal}
          handleChange={closeFormValue}
          type={type}
          account={(item: any) => setAccount(item)}
          network={(item: any) => setNetwork(item)}
          cat={(item: any) => {
            setCat(item);
            setRetry(retry + 1)
          }}
        />

        <BundleValue
          isOpen={isbundleModal}
          handleChange={closeBundleValue}
          data={biller_details}
          bundle={(item: any) => setBundle(item)}
          amount={(item: any) => setAmount(item)}

        />

        <CompletePurchase
          isOpen={isModalVisible}
          handleChange={toggleModal}
          handleSubmit={handleSubmit}
          acc={account}
          network={network}
          bundle={cat === 'Airtime' ? '' : bundle}
          cat={cat}
          amount={amount}
          phone={phone}
          navigation={navigation}
        />

        <SecurityCheck
          isOpen={isSecure}
          page={'Airtime_Data'}
          handleSubmit={callApi}
          handleChange={closeSecure}
          navigation={navigation}
        />

        {isLoading ? (
          <View style={[styles.loader, styles.alignCenter]}>
            <View style={[styles.b30, styles.p10, styles.alignCenter, styles.shadow, { opacity: 0.9, backgroundColor: theme.dark ? '#343434' : '#fff' }]}>
              <ActivityIndicator color={theme.dark ? '#fff' : '#343434'} size={'small'} />
            </View>
          </View>
        ) : null}



        {show2 !== 0 ? (

          <Animated.View
            style={{ transform: [{ translateY: slideAnim }], position: 'absolute', zIndex: 999, bottom: 0 }}>
            <CustomToast
              type={toastType}
              msg={toastMsg}
            />
          </Animated.View>
        ) : null}

      </View>

    </TouchableWithoutFeedback>

  );
};

export default AirtimeData;
