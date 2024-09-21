import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableNativeFeedback,
  Keyboard,
  StatusBar,
  ActivityIndicator,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyText from '../../components/DefaultTextComponent/MyText';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';

import { verifyCode } from '../../../redux/redux/actions/userAction';
import { reSendOTP, verifyOTP } from '../../../redux/redux/actions/authAction';
import CustomToast from '../../components/CustomToast/CustomToast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../../../stores/store';
import {updateToken} from '../../../redux/redux/axios/axios';
const { width, height } = Dimensions.get('screen');

const ResetCode = ({ route, navigation }) => {
  const {user, setUsers} = useAuthStore();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
  const { _id, email,role,status,username,phone,isRetry } = route?.params;
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



  const handleResendCode = async () => {
    setIsResendLoading(true);
   await reSendOTP({
      trader: _id,
    })
      .then((res) => {
        if (res?.status) {
          if(isRetry){
            showToast('Success', 'OTP sent successfully');
            return;
          }
          showToast('Success', res.message);
        }
      }, err => {
        showToast('Error', err.response.data.message);
      })
      .finally(() => {
        setIsResendLoading(false);
      })

  };

  useEffect(() => {
    if(isRetry){
      handleResendCode();
    }
  }, [isRetry])


  const handleSubmit = async () => {
    if (code.length < 6) {
      showToast('Error', 'Please enter a valid 6 digit OTP code');
      return;
    }
    setIsLoading(true);
  await verifyOTP({
      trader: _id,
      otpKey: code,
    })
      .then(async (res) => {
        if (res?.status) {
          setUsers({...res?.data?.user});
          await updateToken(res?.data?.token);
          await AsyncStorage.setItem('token', res?.data?.token);
          //  await AsyncStorage.setItem('id', user?._id);
          //  await AsyncStorage.setItem('role', user?.role);
          navigation.reset({
            index: 0,
            routes: [{ name: 'DashBoard', params:{
              successFallback:true,
              successMessage:"Email Verified Successfully!"
            }}],
          })
        }
      }, err => {
        showToast('Error', err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      })

  }

  return (
    <View
      style={{
        flex: 1,
        height: height,
        width: width,
        backgroundColor: '#f3f5f9',
      }}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#f3f5f9',
        }}>

        <ScrollView>
          <View style={[styles.Bg, { flex: 1 }]}>
            <View
              style={{
                alignSelf: 'center', marginBottom: 10,
              }}>
              <Image
                source={require('../../../Assets/fejoraLogo.png')}
                style={styles.image}
              />
            </View>

            <View>
              <Text style={[styles.Heading]}>Verify Email</Text>

              <MyText style={[styles.subHeading]}>
                Please enter the One Time Password (OTP) sent to {'\n'} {email}
              </MyText>
            </View>

            <View style={styles.drop}>
              <TextInput
                style={[styles.text, {}]}
                placeholder={'Enter OTP'}
                onChangeText={text => setCode(text)}
                placeholderTextColor={'#333333'}></TextInput>
              <Icons
                name={'email-lock'}
                size={20}
                color={'#808080'}
                style={{
                  marginRight: 10,
                  marginTop: 12,
                }}></Icons>
            </View>


            <View>
              {isLoading ? (
                <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 20 }}>
                  <ActivityIndicator color={'#343434'} size={'small'} />
                </View>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPressIn={() => handleSubmit()}
                  disabled={!code}
                  style={[styles.GreenButton, { alignItems: 'center' }]}>
                  <MyText style={styles.buttonText} >Submit</MyText>

                </TouchableOpacity>
              )}
            </View>


            <View style={styles.BottomRowContainer1}>

              {
                isResendLoading ? (
                  <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 20 }}>
                    <ActivityIndicator color={'#343434'} size={'small'} />
                  </View>
                ) :
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleResendCode}
                    style={[styles.resendButton]}>
                    <Text style={styles.resendButtonText}>
                      Resend OTP
                    </Text>
                  </TouchableOpacity>}
            </View>
            {Platform.OS == 'ios' ? (
              <View style={styles.bottomContainerForIos} />
            ) : null}

          </View>

        </ScrollView>


      </SafeAreaView>

      {show !== 0 ? (
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
            position: 'absolute',
            zIndex: 999,
            bottom: 0,
          }}>
          <CustomToast type={toastType} msg={toastMsg} />
        </Animated.View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    width: RFValue(150),
    height: RFValue(50),
    marginTop: 0,
  },
  Bg: {
    //flex: 75,
    //height: '75%',
    backgroundColor: '#f3f5f9',
    width: width,
    alignSelf: 'flex-end',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  Heading: {
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 10,
    fontFamily: 'Nunito-Bold',
    color: '#343434',
  },
  subHeading: {
    fontWeight: '400',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 20,
    color: '#808080',
  },
  GreenButton: {
    borderRadius: 8,
    paddingHorizontal: RFValue(10),
    paddingVertical: Platform.OS === 'android' ? RFValue(9) : RFValue(12),
    marginTop: RFValue(22),
    textAlignVertical: 'center',
    justifyContent: 'center',
    height: RFValue(54),
    backgroundColor: '#1CC88A',
    alignSelf: 'center',
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Nunito-Regular',
    color: '#fff',
  },
  BottomRowContainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  bottomContainerForIos: {
    height: 30,
    width: '100%',
    backgroundColor: 'transparent',
    //backgroundColor: '#1CC88A',
  },
  text: {
    alignSelf: 'center', marginTop: 0,
    paddingLeft: 15,
    width: '90%',
    fontSize: 13, marginRight: 0,
    height: 45,
    fontFamily: 'Nunito-Regular',
  },
  drop: {
    backgroundColor: '#fff',
    height: 'auto', flexDirection: 'row',
    width: '100%', paddingHorizontal: 0,
    paddingVertical: 0, borderRadius: 10,
    alignSelf: 'center', marginTop: 10,
    borderWidth: StyleSheet.hairlineWidth, borderColor: '#ddd',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f5f9',
  },
  resendButton: {
    borderColor: '#1CC88A',
    borderWidth: 1,
    padding: 7,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  resendButtonText: {
    color: '#1CC88A',
    fontSize: 13,
    textAlign: 'center',
  },
});

export default ResetCode;
