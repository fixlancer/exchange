import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
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
  KeyboardAvoidingView,
  Animated,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import MyText from '../../components/DefaultTextComponent/MyText';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modalbox';
import styles from './Style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EditIcon from 'react-native-vector-icons/MaterialIcons';
import RefreshIcon from 'react-native-vector-icons/MaterialIcons';

import { getToken, NAIRA } from '../../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import CustomToast from '../../components/CustomToast/CustomToast';
import { useAuthStore, useSettingsStore } from '../../../stores/store';
import { getProfile, getSettings, withdrawSpecificAmount } from '../../../redux/redux/actions/userAction';
const { width, height } = Dimensions.get('screen');

const Withdrawal = ({ route, navigation }) => {
  const { user, bankDetail, setUsers, setBankDetail } = useAuthStore();
  const { settings, setSettings } = useSettingsStore();

  // const { users } = useSelector((state: RootState) => state.authReducer);
  const { balance } = route?.params;
  const wallet : number = balance;
  // const { setting } = useSelector((state: RootState) => state.settingReducer);
  const setting: any = useState([]);
  const dispatch: any = useDispatch();
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [walletLoading, setWalletLoading] = React.useState(false);


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

  // useEffect(() => {
  //   getToken(setToken, setId);
  //   dispatch(getSetting());

  // }, []);


  // console.log("SETTING", setting);
  // useEffect(() => {
  //   if (token !== null && id !== null && users === null) {
  //     try {

  //       dispatch(
  //         getUserDetails({
  //           token,
  //           userID: id,
  //         }),
  //       )


  //       // setWalletLoading(true);
  //       // dispatch(getWalletAmount(id)).then(res => { if (res) setWalletLoading(false) })
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, [users, token, id]);

  // useEffect(() => {

  //   dispatch(getWalletAmount(id)).then(res => { if (res) setWalletLoading(false) })

  // }, [walletLoading])


  const callWithdrawAPI = () => {

    setIsLoading(true);
    dispatch(
      // createwithdrawalTransactions({

      //   trade_name: 'Withdrawal',
      //   transaction_amount: withdrawAmount,
      //   account_name: user.account_name || users?.user?.bank_details.account_name,
      //   account_number: user.account_number || users?.user?.bank_details.account_number,
      //   bank_name: user.bank_name || users?.user?.bank_details.bank_name,
      //   bank_code: user.bank_code || users?.user?.bank_details.bank_code,
      //   userID: id,
      //   status: 'Pending',
      //   transaction_type: 'Debit',
      //   password: password,
      // })
    )
      .then(res => {

        setIsLoading(false);
        showToast('Success', res.message);
        // dispatch(getPendingWithdrawalTransactionByID(id));
        // dispatch(getAllpendingwithdrawalbyid(id)).then(res => {
        //   if (res)
        //   navigation.navigate('WithdrawStatus');
        // })

        setWithdrawAmount(0);
        setPassword('');

      })
      .catch(err => {
        setIsLoading(false);
        showToast('Warning', err.response.data.message)
      });

  }

  useEffect(() => {
    updateSettings();
    updateUserDetails();
  }, []);

  const updateUserDetails = async () => {
    setWalletLoading(true);
    await getProfile().then(res => {
      if (res) {
        // setUsers(res);
        setBankDetail({
          accountNumber: res.accountNumber,
          bankCode: res.bankCode,
          bankName: res.bankName,
          accountTitle: res.accountTitle,
        });
      }
    }, err => {
      const { data } = err.response;
      showToast('Error', data.message);
    }).finally(() => {
      setWalletLoading(false);
    })
  }


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

  const withdrawAmountNow = async () => {
    setWalletLoading(true);
    await withdrawSpecificAmount({
      amount: Number(withdrawAmount) || 0,
      password: password,
    }).then(res => {
      if (res?.status) {
        setWithdrawAmount(0);
        setPassword('');
          navigation.push('DashBoardScreen', { successFallback: true, successMessage:res?.message });
      }
    }, err => {
      const { data } = err.response;
      showToast('Error', data.message);
    }).finally(() => {
      setWalletLoading(false);
    })
  }
  return (

    <View
      style={{
        height: height,
        width: width,
        flex: 1,
        backgroundColor: '#fff',
      }}
      pointerEvents={isLoading ? "none" : "auto"}>

      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView
        style={{
          height: height,
          width: width,
          flex: 1,
          backgroundColor: '#fff',
        }}
        edges={['left', 'right', 'top']}>

        <View style={styles.header}>
          <View style={styles.headerUpperArea}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon
                name={'arrow-back-ios'}
                size={20}
                color={'#808080'}
                style={{ marginTop: 10, marginLeft: 15 }}
              />
            </TouchableOpacity>
            <MyText
              style={{
                fontSize: 16, marginTop: 7,
                color: '#343434',
                marginLeft: wp(20),
              }}>
              Withdrawal
            </MyText>
            <MyText></MyText>
          </View>
        </View>

        <View style={{
          marginHorizontal: 0, paddingHorizontal: 0,
          borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#f1f1f1', backgroundColor: '#fff',
          marginVertical: 0, elevation: 0, height: 90
        }}>


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 25, }}>
            <View>
              <MyText
                style={{
                  color: '#808080',
                  fontFamily: 'Nunito-Regular',
                  fontSize: 10,
                }}>
                Available Balance
              </MyText>
              {walletLoading ? (
                <View style={{ flex: 1, justifyContent: 'flex-start', marginTop: 10, }}>
                  <View style={styles.loader}>
                    <ActivityIndicator size="small" color={'#808080'} />
                  </View>
                </View>
              ) : (
                <MyText
                  style={{
                    color: '#1cc88a',
                    fontSize: 22,
                    fontWeight: '600',
                    marginTop: 5,
                    marginLeft: 0,
                  }}>
                  {NAIRA}{wallet}
                </MyText>

              )}
            </View>

            <View>
              <View style={{ width: 35, height: 35, backgroundColor: '#e6eef0', justifyContent: 'center', borderRadius: 30, padding: 5, }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('WithdrawStatus')}>
                  <Icon
                    name={'assignment'}
                    size={20}
                    color={'#808080'}
                    style={{ alignSelf: 'center', justifyContent: 'center' }}
                  />
                </TouchableOpacity>
              </View>
              <MyText style={{ fontSize: 10, color: '#808080', marginRight: 2, textAlign: 'center' }}>History</MyText>
            </View>

          </View>


        </View>

        <ScrollView showsVerticalScrollIndicator={false}>

          {settings && settings.allowWithdrawal === false ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center', padding: 8, paddingHorizontal: 20,
                marginVertical: 20,
              }}>
              <MyText
                style={{
                  fontSize: 11, textAlign: 'center',
                  fontFamily: 'Nunito-Regular', color: '#ff0000',
                }}>
                We are currently not accepting Withdrawals at the moment. Check back later
              </MyText>
            </View>
          ) : null}

          <View style={styles.mainBody}>
            <View style={{ marginTop: 5, backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 15, }}>


              <View style={styles.floatValueContainer}>
                <TextInput
                  style={styles.headerHeading2}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="gray"
                  keyboardType='numeric'
                  placeholder="0"
                  value={String(withdrawAmount || '') || ""}
                  // value=''
                  textAlign={'center'}
                  onChangeText={(e: any) => {
                    setWithdrawAmount(Number(e));
                  }} />
              </View>

            </View>

            <View style={{ marginTop: 5, backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 15, }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontFamily: 'Nunito-SemiBold', color: '#343434' }}>
                  Bank Details
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => updateUserDetails()}
                    activeOpacity={0.8}
                    style={{ justifyContent: 'center', marginBottom: 8, marginRight: 5 }}>
                    <RefreshIcon name="refresh" color={'#808080'} size={18} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ justifyContent: 'flex-end', flexDirection: 'row', alignContent: 'center' }}
                    onPress={() =>
                      navigation.navigate('EditProfile', {
                        token: token,
                        userID: id,
                        bank: {
                          accountName: bankDetail?.accountTitle,
                          accountNumber: bankDetail?.accountNumber,
                          bankName: bankDetail?.bankName
                        },
                      })
                    }
                    activeOpacity={0.8}>


                    <View style={styles.editIconContainer}>
                      <MyText style={{ fontSize: 13, color: '#808080', marginTop: 2, marginRight: 5 }}>Edit</MyText>
                      <EditIcon name="edit" color={'#808080'} style={{ alignSelf: 'center' }} size={15} />
                    </View>
                  </TouchableOpacity>
                </View>

              </View>

              <View style={styles.bankAccountInfoContainer}>

                <View>
                  <View style={styles.infoRow}>
                    <MyText style={{ fontSize: 13, color: '#808080' }}>
                      Acc Name:
                    </MyText>
                    <MyText style={{ marginLeft: 10, fontSize: 13 }}>
                      {bankDetail?.accountTitle}
                    </MyText>
                  </View>
                  <View style={styles.infoRow}>
                    <MyText style={{ fontSize: 13, color: '#808080' }}>
                      Acc No:
                    </MyText>
                    <MyText style={{ marginLeft: 30, fontSize: 13 }}>
                      {bankDetail?.accountNumber}
                    </MyText>
                  </View>
                  <View style={styles.infoRow}>
                    <MyText style={{ fontSize: 13, color: '#808080' }}>
                      Name of Bank:
                    </MyText>
                    <MyText style={{ marginLeft: 45, fontSize: 13 }}>
                      {bankDetail?.bankName}
                    </MyText>
                  </View>


                </View>
              </View>
            </View>

            <TextInput
              style={styles.NewTextInputStyle}
              placeholder={'Enter your Password'}
              placeholderTextColor={'#808080'}
              numberOfLines={1}
              value={password}
              secureTextEntry={true}
              // value={}
              onChangeText={text => setPassword(text)}
            />

            <View style={{ height: 20 }}></View>
            <MyText style={{ fontSize: 10, color: '#808080' }}>
              Withdrawals are processed within 20-30mins
            </MyText>

          </View>

        </ScrollView>

        {withdrawAmount > 0 ? (

          <View style={{ backgroundColor: '#fff', paddingHorizontal: 15, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#f2f2f2', paddingBottom: Platform.OS === 'ios' ? 40 : 15 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <MyText style={{ fontSize: 10, marginTop: 10, color: '#808080' }}>Receive amount</MyText>

                <MyText style={{ fontSize: 16, marginVertical: 3, color: '#343434' }}>
                  {NAIRA}{
                  (withdrawAmount - (settings.withdrawalFee || 0)) <= 0 ? 0 : (withdrawAmount - (settings.withdrawalFee || 0)) 
                   }</MyText>

                <MyText style={{ fontSize: 10, color: '#808080' }}>Withdrawal Fee: {NAIRA}{settings && (settings?.withdrawalFee || 0)}
                </MyText>
              </View>

              <View>

                {settings && settings?.allowWithdrawal === true ? (
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={{
                        alignItems: 'center',
                        marginTop: 5,
                      }}
                      disabled={isLoading || walletLoading || withdrawAmount === 0 || password === '' || withdrawAmount > wallet || withdrawAmount < settings.withdrawalFee} 
                      onPressIn={() => {
                        withdrawAmountNow();
                      }}>

                      <View
                        style={[styles.submitBtn, {
                          alignItems: 'center',
                          marginTop: 15,
                        }]}>
                        <MyText style={{ fontSize: 13, textAlign: 'center', color: '#fff' }}>Withdraw
                        </MyText>
                      </View>

                    </TouchableOpacity>
                  </View>


                ) : (
                  <View
                    style={[styles.submitBtn, {
                      alignItems: 'center',
                      marginTop: 5, backgroundColor: '#f2f2f2'
                    }]}>
                    <MyText style={{ fontSize: 13, textAlign: 'center', color: '#808080' }}>Withdrawal Disabled
                    </MyText>
                  </View>

                )
                }
              </View>

            </View>
          </View>
        ) : null}


      </SafeAreaView>

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={'white'} size={'large'} />
        </View>
      ) : null}


      {show !== 0 ? (

        <Animated.View
          style={{ transform: [{ translateY: slideAnim }], position: 'absolute', zIndex: 999, bottom: 0 }}>
          <CustomToast
            type={toastType}
            msg={toastMsg}
          />
        </Animated.View>
      ) : null}

    </View >

  );

};

export default Withdrawal;
