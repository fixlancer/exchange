import React, { useContext, useEffect, useMemo, useState, useRef } from 'react';
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
  Animated,
  ActivityIndicator,
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyText from '../../components/DefaultTextComponent/MyText';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modalbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/redux/actions/authAction';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContactSupport, setFcm } from '../../../redux/redux/actions/userAction';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import CustomToast from '../../components/CustomToast/CustomToast';
import { updateToken } from '../../../redux/redux/axios/axios';
import { useAuthStore } from '../../../stores/store'
import HeaderBack from '../../components/Header/HeaderBack';
import newStyles from '../Styles/Styles';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const SignInScreen = ({ navigation }) => {

  const { user, setUsers } = useAuthStore();

  const theme = useTheme()
  const styles = newStyles(theme);
  //  console.log("user", user);

  const dispatch: any = useDispatch();
  const [id, setId] = useState(null);
  const [token, setToken] = useState(null);
  const [identifier, setEmail] = useState('buqueihautulli-6774@yopmail.com');
  const [password, setPassword] = useState('11221122');
  const [emailErrorText, setEmailErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fcmToken, setfcmtoken] = useState('');
  const [deviceId, setdeviceid] = useState('');

  const [name_support, setNameSupport] = useState('');
  const [email_support, setEmailSupport] = useState('');
  const [msg_support, setMsgSupport] = useState('');
  const [supportFormLoading, setSupportformLoading] = useState(false);

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
  useEffect(() => {
    updateToken();
    const removeToken = async () => {
      await AsyncStorage.removeItem('token', () => {
      })
    }
    removeToken();

    getToken();
  }, []);

  async function getToken() {
    try {
      const device_id = DeviceInfo.getDeviceId();
      setdeviceid(device_id);
      const firebaseToken = await messaging().getToken();
      setfcmtoken(firebaseToken);
    } catch (error) {

    }
  }


  // const getData = async () => {
  //   await AsyncStorage.clear();
  //   try {
  //     const value = await AsyncStorage.getItem('token');
  //     const id = await AsyncStorage.getItem('id');
  //     setId(id);
  //     if (value !== null) {
  //       navigation.navigate('DashBoardScreen');
  //     }
  //   } catch (e) {
  //     // error reading value\
  //   }
  // };

  const clearErrors = () => {
    setEmailErrorText('');
    setPasswordErrorText('');
  };

  const doLogin = () => {
    setIsLoading(true);
    loginUser({
      identifier,
      password,
      deviceToken: fcmToken,
      deviceId: deviceId,
      deviceType: Platform.OS === 'ios' ? 'IOS' : Platform.OS === 'android' ? 'Android' : 'Web'
    })
      .then(async (res: any) => {

        if (res?.status) {
          const { token, user } = res?.data;
          setUsers(user);
          await updateToken(token);
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('id', user?._id);
          await AsyncStorage.setItem('role', user?.role);
          setIsLoading(false);
          showToast('Success', res?.message);
          navigation.reset({
            index: 0,
            routes: [{ name: 'DashBoard' }]
          })
        }
        showToast('Warning', res.message);
      }, (err: any) => {

        setIsLoading(false);
        showToast(
          'Warning',
          err.response.data?.message,
        );
        if (err.response.data?.message === 'User not verified') {
          navigation.navigate('FirstTimer', {
            _id: err.response.data?.data?.userId,
            username: '',
            isRetry: true,
            identifier
          })
        }
      })
  };

  const handleLogin = () => {
    try {
      if (identifier === '') {
        showToast('Warning', 'Username or Email required');
        //setEmailErrorText('Username or Email required');
      } else if (password === '') {
        //   setPasswordErrorText('Password required');
        showToast('Warning', 'Your Password is required');
      } else {
        clearErrors();
        doLogin();
      }
    } catch (error) { }
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [isBoxVisible, setBoxVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleM = () => {
    setBoxVisible(true);
  };

  const closeM = () => {
    setBoxVisible(false);
  };

  const sendEmail = () => {
    //CONTACT SUPPORT GUEST
    setSupportformLoading(true);
    dispatch(
      ContactSupport({
        name: name_support,
        email: email_support,
        message: msg_support,
        isGuest: true,
      }),
    )
      .then(res => {
        setSupportformLoading(false);
        showToast('Success', 'Email sent');
      })
      .catch(err => {
        setSupportformLoading(false);
        showToast('Warning', err.response.data.message);
      });
  };

  const bgImg = require('../../../Assets/premiumBG.png');

  return (
    <View style={[styles.container]}>

      {theme.dark ? null :
        <Image
          source={bgImg}
          style={styles.accountBG}
        />
      }

      <SafeAreaView
        style={{
          height: height,
          width: width,
          flex: 1,
          backgroundColor: 'transparent',
        }}
        edges={['left', 'right', 'top']}>
        <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

        <HeaderBack navigation={navigation} headerTitle={'Login'} />

        <ScrollView contentContainerStyle={[styles.iosBar, styles.mt20, styles.ph15, { flexGrow: 1 }]}>

          <View
            style={[styles.ph15]}>
            <Formik
              initialValues={{ email: '' }}
              onSubmit={values => console.log(values)}>
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <>
                  {emailErrorText ? (
                    <View style={styles2.errorBg}>
                      <MyText style={styles2.errorLabel}>
                        {emailErrorText}
                      </MyText>
                    </View>
                  ) : passwordErrorText ? (
                    <View style={styles2.errorBg}>
                      <MyText style={styles2.errorLabel}>
                        {passwordErrorText}
                      </MyText>
                    </View>
                  ) : null}

                  <View style={styles2.drop}>
                    <TextInput
                      style={[styles2.text, {}]}
                      placeholder={'Username or Email'}
                      value={identifier}
                      onChangeText={text => setEmail(text.trim())}
                      placeholderTextColor={'#333333'}></TextInput>
                    <Icon
                      name={'face'}
                      size={20}
                      color={'#808080'}
                      style={{ marginTop: 12 }}></Icon>
                  </View>

                  <View style={styles2.drop}>
                    <TextInput
                      style={[styles2.text, {}]}
                      placeholder={'Password'}
                      placeholderTextColor={'#333333'}
                      value={password}
                      onChangeText={text => setPassword(text)}
                      //onChangeText={text => setTitle(text)}
                      //value={Title}
                      secureTextEntry={true}></TextInput>
                    <Icon
                      name={'lock'}
                      size={20}
                      color={'#808080'}
                      style={{ marginTop: 12 }}></Icon>
                  </View>
                </>
              )}
            </Formik>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ForgetPasswordScreen');
              }}>
              <MyText
                style={{
                  fontSize: 12,
                  color: '#808080',
                  fontFamily: 'Nunito-Regular',
                  marginTop: 10,
                  marginBottom: 15,
                  textAlign: 'right',
                }}>
                Reset Password
              </MyText>
            </TouchableOpacity>

            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles1.GreenButton,
                  { alignItems: 'center', marginBottom: hp(0.3) },
                ]}
                disabled={isLoading}
                onPressIn={() => {
                  handleLogin();
                  // navigation.navigate('DashBoardScreen');
                }}>
                <MyText style={styles1.buttonText}>Login</MyText>
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles1.BottomRowContainer}>
            <View style={styles1.bottomLinks}>
              <MyText style={{ fontSize: 10, color: '#808080', marginTop: 9 }}>
                v 1.0
              </MyText>
              <TouchableOpacity
                onPress={toggleM}
                style={{ flexDirection: 'row' }}>
                <Icon
                  name={'info-outline'}
                  size={13}
                  color={'#808080'}
                  style={{ marginTop: 8.5, marginRight: 3 }}></Icon>
                <MyText
                  style={[
                    {
                      color: '#808080',
                      fontSize: 12,
                      marginTop: 7,
                    },
                  ]}>
                  Get Help
                </MyText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <Modal
          isOpen={isBoxVisible}
          style={{ backgroundColor: '#f3f5f9' }}
          keyboardTopOffset={Platform.OS == 'ios' ? 22 : 0}
          swipeToClose={false}
          onClosed={closeM}
          backdropOpacity={1}
          backdropColor="white"
          position="top">
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: '#fff',
            }}
            edges={['left', 'right', 'top']}>
            <StatusBar
              translucent
              barStyle="dark-content"
              backgroundColor="#fff"
            />
            <View style={styles2.header}>
              <TouchableOpacity onPress={() => closeM()}>
                <Icon
                  name={'arrow-back-ios'}
                  size={20}
                  color={'#808080'}
                  style={{ marginVertical: 20 }}></Icon>
              </TouchableOpacity>

              <MyText
                style={{
                  fontSize: 20,
                  fontFamily: 'Nunito-Bold',
                  fontWeight: '600',
                  marginBottom: 15,
                  color: '#343434',
                }}>
                Contact Us
              </MyText>
            </View>

            <ScrollView
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                width: '100%',
                height: '100%',
                backgroundColor: '#f3f5f9',
              }}>
              <MyText
                style={{ fontSize: 13, marginVertical: 15, color: '#343434' }}>
                Have an inquiry or some feeedback for us? Fill out the form
                below
              </MyText>
              <View style={styles2.drop}>
                <TextInput
                  style={styles2.text}
                  underlineColorAndroid="transparent"
                  textAlign={'left'}
                  placeholder="Full Name"
                  onChangeText={text => setNameSupport(text)}
                />
                <Icon
                  name={'face'}
                  size={20}
                  color={'#808080'}
                  style={{ marginTop: 12 }}></Icon>
              </View>

              <View style={styles2.drop}>
                <TextInput
                  style={styles2.text}
                  underlineColorAndroid="transparent"
                  textAlign={'left'}
                  placeholder="Email"
                  onChangeText={text => setEmailSupport(text)}
                />
                <Icon
                  name={'contact-mail'}
                  size={20}
                  color={'#808080'}
                  style={{ marginTop: 12 }}></Icon>
              </View>

              <View style={styles2.drop}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TextInput
                    style={styles2.textarea}
                    underlineColorAndroid="transparent"
                    placeholder="Your Message..."
                    placeholderTextColor={'#808080'}
                    textAlign={'left'}
                    numberOfLines={7}
                    textAlignVertical="top"
                    multiline={true}
                    onChangeText={text => setMsgSupport(text)}
                  />
                </View>
              </View>

              {supportFormLoading ? (
                <ActivityIndicator />
              ) : (
                <TouchableOpacity
                  // onPress={() => navigation.navigate('AdminWithdrawalHome')}
                  disabled={supportFormLoading}
                  onPressIn={sendEmail}
                  style={[
                    styles1.sendBtn,
                    { alignContent: 'center', marginTop: 10 },
                  ]}>
                  <MyText style={styles1.textbtn}>Send</MyText>
                </TouchableOpacity>
              )}
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>


      {isLoading ? (
        <View style={[styles1.loader,]}>
          <View style={[styles.b30, styles.p10, styles.alignCenter, styles.shadow, { opacity: 0.9, backgroundColor: theme.dark ? '#343434': '#fff' }]}>
            <ActivityIndicator color={theme.dark ? '#fff' : '#343434'} size={'small'} />
          </View>
        </View>
      ) : null}


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

const styles1 = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    width: RFValue(120),
    height: RFValue(60),
    marginTop: RFValue(35),
    marginBottom: RFValue(35),
  },
  whiteCardBg: {
    //flex: 75,
    //height: '75%',
    marginTop: '8%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    width: width,
    alignSelf: 'flex-end',
    justifyContent: 'space-evenly',
    padding: 30,
  },
  Heading: {
    fontSize: 14,
    textAlign: 'center',
    color: '#343434',
    fontFamily: 'Nunito-Bold',
    //   marginBottom: 5,
  },
  NewTextInputStyle: {
    backgroundColor: '#fff',
    // textAlignVertical: 'top',
    borderBottomWidth: 1,
    borderColor: '#F1F1F1',
    width: '100%',
    height: 46,
    color: '#343434',
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    // marginTop: 12,
  },
  TextInputStyle: {
    height: 46,
    backgroundColor: '#Fafafa',
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: 10,
    color: '#343434',
    //   marginTop: 5,
    borderColor: '#F1F1F1',
    fontSize: RFValue(13),
    fontFamily: 'Nunito-Regular',
  },
  GreenButton: {
    // alignSelf:'center',
    // backgroundColor:'#1CC88A',
    // width:'100%'
    height: RFValue(45),
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#1CC88A',
    alignSelf: 'center',
    marginTop: RFValue(16.5),
    width: '100%',
  },
  BottomRowContainer: {
    paddingHorizontal: 20,
    paddingBottom: RFValue(35),
    marginTop: 20,
  },

  bottomLinks: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lastViewStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  socialimage: {
    resizeMode: 'contain',
    width: RFValue(25),
    height: RFValue(25),
    margin: RFValue(5),
  },

  GreenButtonEmpty: {
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    borderColor: '#f27415',
    marginTop: RFValue(20),
    marginBottom: RFValue(10),
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    height: RFValue(45),
    width: '100%',
  },
  buttonText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Nunito-Regular',
    color: '#fff',
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtn: {
    alignSelf: 'center',
    backgroundColor: '#1cc88a',
    width: '100%',
    borderRadius: 7,
    borderColor: '#ddd',
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
    padding: 10,
  },
  textbtn: {
    fontSize: 13,
    textAlign: 'center',
    color: '#fff',
  },
});

const styles2 = StyleSheet.create({
  header: {
    width: width,
    height: 'auto',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  textarea: {
    padding: 15,
    height: 100,
    width: '100%',
    color: '#343434',
    fontSize: 13,
    marginRight: 0,
    fontFamily: 'Nunito-Regular',
  },

  hr2: {
    borderBottomWidth: 0,
    borderColor: '#f1f1f1',
    width: '100%',
  },
  text: {
    alignSelf: 'center',
    marginTop: 0,
    paddingLeft: 15,
    width: '90%',
    color: '#343434',
    fontSize: 13,
    marginRight: 0,
    height: 45,
    fontFamily: 'Nunito-Regular',
  },
  drop: {
    backgroundColor: '#fff',
    height: 'auto',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
  },

  accountBG: {
    width: '100%',
    height: 333,
    position: 'absolute',
    top: 0,
    zIndex: -2,
    left: 0,
    right: 0,
  },

  errorBg: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: 'auto',
    height: 'auto',
  },

  errorLabel: {
    textAlign: 'center',
    color: '#ff0000',
    fontSize: 12,
  },
});

export default SignInScreen;
