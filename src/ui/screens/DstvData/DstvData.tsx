import React, { useContext, useEffect, useMemo, useState, useRef } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
  StatusBar,
  Text,
  Platform,
  TouchableWithoutFeedback,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import newStyles from '../Styles/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyText from '../../components/DefaultTextComponent/MyText';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'react-native-paper';
import { NAIRA } from '../../../utils/utils';
import CustomToast from '../../components/CustomToast/CustomToast';
import { getSetting } from '../../../redux/redux/actions/settingAction';
import FormValue from './FormValue';
import { getSettings, getSubscriptionPlans, createSubscriptionBill } from '../../../redux/redux/actions/userAction';
import { useHomeStore, useSettingsStore } from '../../../stores/store';
import HeaderBack from '../../components/Header/HeaderBack';
import { moderateScale } from 'react-native-size-matters';
import IconM from 'react-native-vector-icons/Ionicons';
import SecurityCheck from '../Crypto/SecurityCheck/Index';
import CompletePurchase from './Modals/CompletePurchase';

const { width, height } = Dimensions.get('screen');

const DstvData = ({ navigation }) => {

  const { wallet } = useHomeStore();

  const nairaSign = '\u20A6';
  const theme = useTheme()
  const styles = newStyles(theme);

  const { settings, setSettings } = useSettingsStore();
  let [selectPlan, setPlan] = useState(null);
  let [selectPlan2, setPlan2] = useState(null);
  let [selectDecoder, setDecoder] = useState(null);

  const [cont, setCont] = useState('');
  const [show, setShow] = useState(false);
  const [biller_details, setBillerDetails] = useState([]); //for dstv
  const [amount, setAmount] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [retry, setRetry] = useState(0);

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

  const showToast = (type, msg) => {
    setToastType(type);
    setToastMsg(msg);
    setShow2(1);
    animateToast();
  };

  /* CUSTOM TOAST ENDS ============= */



  let [tab, setTab] = useState('Dstv');


  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(!show);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [show]);


  useEffect(() => {
    if (tab) {
      setIsLoading(true);
      getPlans();
    }

    setAmount(null)
    setAmount2(null)
  }, [tab])


  useEffect(() => {
    if (retry > 0) {
      setIsLoading(true);
      getPlans();
    }
  }, [retry])


  const getPlans = async () => {
    await getSubscriptionPlans(tab?.toLowerCase())
      .then((res) => {
        if (res) {
          setBillerDetails(res);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        showToast('Warning', 'Could not fetch plans. Please try again')
      })
  }

  const [isModalVisible, setModalVisible] = useState(false);
  const [isFormModal, setisFormModal] = useState(false);
  const [isVerified, setIsVerified] = useState(0);
  const [isSecure, setIsSecure] = useState(false);

  const [type, setType] = useState(null);

  const openModal = () => {
    setModalVisible(true);
    inputRef.current.blur()
  };


  const toggleModal = () => {
    setModalVisible(false);
  };


  const openFormValue = (item) => {
    setType(item);
    setisFormModal(true);
    inputRef.current.blur()
  }

  const closeFormValue = () => {
    setisFormModal(false);
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


  useEffect(() => {
    updateSettings();
  }, []);

  const updateSettings = async () => {
    await getSettings().then(res => {
      if (res) {
        setSettings(res);
      }
    }, err => {
      const { data } = err.response;
      showToast('Error', data.message);
    });
  }



  const callApi = () => {
    setIsSecure(false)
    setIsVerified(1)
    setIsLoading(true);

    createSubscriptionBill({
      billerName: tab === 'Dstv' ? selectPlan : selectPlan2,
      decoderNumber: selectDecoder,
      amount: tab === 'Dstv' ? amount : amount2,
      //  password: pass,
      category: tab === 'Dstv' ? 'DSTV' : 'GOTV'
    })
      .then((res) => {
        if (res?.status) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'DashBoard' }, { name: 'Success', params: { type: 'Bills', amount: tab === 'Dstv' ? amount : amount2, currency: selectDecoder + '/' + tab === 'Dstv' ? selectPlan : selectPlan2 } }],
          })
          setIsLoading(false)
        }
      })
      .catch((err) => {
        setIsLoading(false)
        showToast('Warning', err.response.data.message)
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

          <View style={[styles.newModalHeader, styles.RowB]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.b30, styles.alignCenter, styles.bgWhite, styles.borderDark, styles.mt10, { width: moderateScale(30), height: moderateScale(30) }]}>
              <IconM
                name={'close'}
                size={moderateScale(15)}
                color={theme.dark ? '#fff' : '#343434'}
                style={{}} />

            </TouchableOpacity>

            <View style={[styles.Row, styles.alignCenter, styles.mt10, styles.mb15, {}]}>
              <TouchableOpacity
                onPress={() => {
                  setTab('Dstv')
                  setDecoder('')
                }}
                style={[tab === 'Dstv' ? styles.lineBottomCatDark : null, styles.ph10, styles.mr15, styles.pb2]}>
                <Text style={[styles.textCenter, styles.fontSize15, styles.fontSemi, tab === 'Dstv' ? styles.textDark : styles.textLightGrey, {}]}>Dstv</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setTab('Gotv')
                  setDecoder('')
                }}
                style={[tab === 'Gotv' ? styles.lineBottomCatDark : null, styles.ph10, styles.pb2,]}>
                <Text style={[styles.textCenter, styles.fontSize15, styles.fontSemi, tab === 'Gotv' ? styles.textDark : styles.textLightGrey,]}>GOtv</Text>
              </TouchableOpacity>

            </View>

            <MyText style={[styles.pl5]}></MyText>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={[]}>


            {tab === 'Dstv' ? (
              <View style={[styles.ph15, styles.mt10]}>
                <View style={[styles.pl15, styles.mt10, styles.mb20]}>
                  <MyText style={[styles.tinyLabel,]}>Naira balance</MyText>
                  <Text style={[styles.largeLabel, styles.textDark, styles.fontSize25]}>{nairaSign}{wallet?.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 }).replace(/,/g, '')}</Text>
                </View>

                <View style={[styles.formWhite, styles.shadow, styles.b30, styles.bgWhite, styles.ph5, styles.pt10, styles.mb10]}>
                  <View style={[styles.ph10]}>
                    <MyText style={[styles.textGrey, styles.pl5, styles.fontRegular, styles.fontSize11, styles.mt10]}>Decoder number</MyText>


                    <TextInput
                      style={[styles.drop, styles.lineBottomLight, styles.textDark, styles.fontSize14, styles.fontRegular,]}
                      placeholderTextColor={'#808080'}
                      textAlign={'left'}
                      placeholder='e.g 7363829037'
                      keyboardType='numeric'
                      numberOfLines={1}
                      onChangeText={text => setDecoder(text)}
                      ref={inputRef}
                      value={selectDecoder}

                    />
                  </View>

                  <View style={[styles.formWhite, styles.bgGrey, styles.roundBorderBottom, styles.pt10, styles.mb5, { opacity: selectPlan ? 1 : 0.6 }]}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      disabled={isLoading}
                      onPress={() => selectPlan ? openFormValue('Dstv') : setRetry(retry + 1)}
                      style={[styles.ph15, styles.mb15]}>

                      <MyText style={[styles.tinyLabel, styles.fontSize11, styles.mt10]}>Dstv plan</MyText>

                      <View style={[styles.RowB, {}]}>
                        <MyText style={[styles.userLabel, styles.fontSize14, styles.mt5]}>{!selectPlan ? 'Please select a plan' : selectPlan}</MyText>

                        <IconM
                          name={'chevron-down'}
                          size={moderateScale(20)}
                          color={'#808080'}
                          style={{ marginTop: 0, }} />

                      </View>

                    </TouchableOpacity>


                    {amount > 0 ? (
                      <View style={[styles.ph10, styles.mb20, styles.RowB]}>
                        <MyText style={[styles.textGrey, styles.pl5, styles.fontRegular, styles.fontSize11, styles.mt10]}>Amount</MyText>
                        <MyText style={[styles.userLabel, styles.mt10, styles.fontSize14]}>{nairaSign}{amount}</MyText>
                      </View>
                    ) : null}

                  </View>

                </View>
              </View>

            ) : (
              <View style={[styles.ph15, styles.mt10]}>
                <View style={[styles.pl15, styles.mt10, styles.mb20]}>
                  <MyText style={[styles.tinyLabel,]}>Total balance</MyText>
                  <Text style={[styles.largeLabel, styles.textDark, styles.fontSize25]}>{nairaSign}{wallet?.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 }).replace(/,/g, '')}</Text>
                </View>

                <View style={[styles.formWhite, styles.shadow, styles.b30, styles.bgWhite, styles.ph5, styles.pt10, styles.mb10]}>
                  <View style={[styles.ph10]}>
                    <MyText style={[styles.textGrey, styles.pl5, styles.fontRegular, styles.fontSize11, styles.mt10]}>Decoder number</MyText>


                    <TextInput
                      style={[styles.drop, styles.lineBottomLight, styles.textDark, styles.fontSize14, styles.fontRegular,]}
                      placeholderTextColor={'#808080'}
                      textAlign={'left'}
                      placeholder='e.g 7363829037'
                      keyboardType='numeric'
                      numberOfLines={1}
                      onChangeText={text => setDecoder(text)}
                      ref={inputRef}
                      value={selectDecoder}

                    />
                  </View>

                  <View style={[styles.formWhite, styles.bgGrey, styles.roundBorderBottom, styles.pt10, styles.mb5, { opacity: selectPlan ? 1 : 0.6 }]}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      disabled={isLoading}
                      onPress={() => selectPlan2 ? openFormValue('GOtv') : setRetry(retry + 1)}
                      style={[styles.ph15, styles.mb15]}>

                      <MyText style={[styles.tinyLabel, styles.fontSize11, styles.mt10]}>GOtv plan</MyText>

                      <View style={[styles.RowB, {}]}>
                        <MyText style={[styles.userLabel, styles.fontSize14, styles.mt5]}>{!selectPlan2 ? 'Please select a plan' : selectPlan2}</MyText>

                        <IconM
                          name={'chevron-down'}
                          size={moderateScale(20)}
                          color={'#808080'}
                          style={{ marginTop: 0, }} />

                      </View>

                    </TouchableOpacity>


                    {amount2 > 0 ? (
                      <View style={[styles.ph10, styles.mb20, styles.RowB]}>
                        <MyText style={[styles.textGrey, styles.pl5, styles.fontRegular, styles.fontSize11, styles.mt10]}>Amount</MyText>
                        <MyText style={[styles.userLabel, styles.mt10, styles.fontSize14]}>{nairaSign}{amount2}</MyText>
                      </View>
                    ) : null}

                  </View>

                </View>
              </View>
            )}
          </ScrollView>

        </SafeAreaView>

        <View style={[styles.ph15, styles.pt15, styles.bottomBar]}>
          {
            tab === 'Dstv' ? (
              <>
                {selectDecoder && selectPlan ? (
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

              </>
            ) : (


              <>

                {selectDecoder && selectPlan2 ? (
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
              </>
            )

          }
        </View>



        {type === 'Dstv' ? (
          <FormValue
            isOpen={isFormModal}
            handleChange={closeFormValue}
            data={biller_details}
            type={type}
            dstv={(item) => setPlan(item)}
            gotv={(item) => setPlan2(item)}
            amount={(item) => setAmount(item)}

          />
        ) : (

          <FormValue
            isOpen={isFormModal}
            handleChange={closeFormValue}
            data={biller_details}
            type={type}
            dstv={(item) => setPlan(item)}
            gotv={(item) => setPlan2(item)}
            amount={(item) => setAmount2(item)}

          />
        )}

        <CompletePurchase
          isOpen={isModalVisible}
          handleChange={toggleModal}
          handleSubmit={handleSubmit}
          selectPlan={tab === 'Dstv' ? selectPlan : selectPlan2}
          selectDecoder={selectDecoder}
          navigation={navigation}
          amount={tab === 'Dstv' ? amount : amount2}
          fee={settings?.dstvGotvFee}
        />

        <SecurityCheck
          isOpen={isSecure}
          page={'Dstv_Gotv'}
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
    </TouchableWithoutFeedback >

  );
};

export default DstvData;
