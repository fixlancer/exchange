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
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableNativeFeedback,
  Keyboard,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyText from '../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootState } from '../../../redux/redux/store/store';
import { getSetting } from '../../../redux/redux/actions/settingAction';
import Modal from 'react-native-modalbox';
import { RFValue } from 'react-native-responsive-fontsize';
import { registerUser } from '../../../redux/redux/actions/authAction';
import messaging, { firebase } from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import CustomToast from '../../components/CustomToast/CustomToast';
import HeaderBack from '../../components/Header/HeaderBack';
import newStyles from '../Styles/Styles';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

const CreateAccountScreen = ({ navigation }) => {

  const theme = useTheme()
  const styles2 = newStyles(theme);

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rPassword, setRPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fcm_token, setfcmToken] = useState('');
  const [deviceId, setdeviceid] = useState('');
  // const { setting } = useSelector((state: RootState) => state.settingReducer);

  const [isAllowed, setisAllowed] = useState(true);

  useEffect(() => {
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'FirstTimer', params: {username: "Shahid"}}],
    // })
    getToken();
  }, []);

  async function getToken() {

    const firebaseToken = await messaging().getToken();
    const device_id = DeviceInfo.getDeviceId();
    setdeviceid(device_id);
    setfcmToken(firebaseToken);
    //  console.log("FIREBASE TOKEN => ", firebaseToken);
  }


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


  // const dispatch: any = useDispatch();


  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const handleRegister = async () => {
    // navigation.reset({
    //   index: 1,
    //   routes: [{name: 'SignInScreen'},{ name: 'FirstTimer', params: {
    //     username: "Shahid",
    //     _id: "65d642e880dde83db5bcf091",
    //     phone: "11221122",
    //     fullName: "",
    //     email: "mypc28576@gmail.com",
    //     role: "user",
    //     isVerified: false,
    //     status: "active"
    //   }}],
    // })
    // return;
    if (username === '') {
      showToast('Warning', 'Username is required');

    } else if (email === '') {
      showToast('Warning', 'Email address can not be empty');

    } else if (reg.test(email) === false) {
      showToast('Warning', 'Please enter a valid Email address');
    } else if (phone === '') {
      showToast('Warning', 'Phone number cannot be empty');
    } else if (password === '') {
      showToast('Warning', 'Password is required');
    } else if (rPassword === '') {
      showToast('Warning', 'Repeat Password cannot be empty');
    } else if (rPassword !== password) {
      showToast('Warning', 'Password and Repeat Password needs to be thesame');

    } else if (isAllowed !== true) {
      showToast('Warning', 'We are currently not accepting new users');

    }
    else {
      setIsLoading(true);
      try {
        await registerUser({
          username,
          email,
          phone,
          password,
          deviceToken: fcm_token,
          deviceId: deviceId,
          deviceType: Platform.OS === 'ios' ? 'IOS' : 'Android'
        }).then(res => {
          setIsLoading(false);
          console.log("response", res);
          navigation.reset({
            index: 0,
            routes: [{ name: 'FirstTimer', params: { username, phone, ...res?.data?.user } }],
          })
        })
          .catch(err => {
            const { data } = err.response;
            setIsLoading(false);
            console.log(data);
            showToast('Warning', data?.message);
          });
      } catch (error) {
        console.log(error);

        setIsLoading(false);
        showToast('Warning', error?.message);
      }
    }
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // useEffect(() => {

  //   dispatch(getSetting())
  //   .then(res => {
  //     setisAllowed(setting && setting[0].registration_status);
  //   })

  // }, [isAllowed])


  const bgImg = require('../../../Assets/premiumBG.png');


  return (
    <View style={[styles2.container]}
      pointerEvents={isLoading ? "none" : "auto"}>


      {theme.dark ? null :
        <Image
          source={bgImg}
          style={styles2.accountBG}
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

        <HeaderBack navigation={navigation} headerTitle={'Create account'} />

        <ScrollView contentContainerStyle={[styles2.iosBar, styles2.mt20, styles2.ph15, { flexGrow: 1 }]}>
          <View style={[styles2.ph15]}>

            <View style={styles.drop}>
              <TextInput
                style={[styles.text, {}]}
                placeholder={'Username'}
                value={username}
                onChangeText={text => setUserName(text.trim())}
                placeholderTextColor={'#333333'}></TextInput>
              <Icon
                name={'face'}
                size={20}
                color={'#808080'}
                style={{
                  marginRight: 10,
                  marginTop: 12,
                }}></Icon>
            </View>

            <View style={styles.drop}>
              <TextInput
                style={styles.text}
                placeholder={'Email Address'}
                value={email}
                onChangeText={text => setEmail(text.trim())}
                placeholderTextColor={'#333333'}></TextInput>
              <Icon
                name={'contact-mail'}
                size={20}
                color={'#808080'}
                style={{
                  marginRight: 10,
                  marginTop: 12,
                }}></Icon>
            </View>

            <View style={styles.drop}>
              <TextInput
                style={styles.text}
                placeholder={'Phone Number'}
                value={phone}
                onChangeText={text => setPhone(text)}
                keyboardType="numeric"
                placeholderTextColor={'#333333'}></TextInput>
              <Icon
                name={'call'}
                size={20}
                color={'#808080'}
                style={{
                  marginRight: 10,
                  marginTop: 12,
                }}></Icon>
            </View>

            <View style={styles.drop}>
              <TextInput
                style={styles.text}
                placeholder={'Password'}
                value={password}
                secureTextEntry
                onChangeText={text => setPassword(text)}
                placeholderTextColor={'#333333'}></TextInput>
              <Icon
                name={'lock-outline'}
                size={20}
                color={'#808080'}
                style={{
                  marginRight: 10,
                  marginTop: 12,
                }}></Icon>
            </View>

            <View style={styles.drop}>
              <TextInput
                style={styles.text}
                placeholder={'Repeat Password'}
                value={rPassword}
                secureTextEntry
                onChangeText={text => setRPassword(text)}
                placeholderTextColor={'#333333'}></TextInput>
              <Icon
                name={'lock-outline'}
                size={20}
                color={'#808080'}
                style={{
                  marginRight: 10,
                  marginTop: 12,
                }}></Icon>
            </View>

            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={isLoading}
                onPressIn={handleRegister}
                style={[styles.GreenButton, { alignItems: 'center' }]}>

                <MyText style={styles.buttonText}>Create Account</MyText>

              </TouchableOpacity>
            </View>

            <View style={styles.BottomRowContainer}>

              <TouchableOpacity
                onPress={toggleModal}
                activeOpacity={0.8}>
                <MyText
                  style={{
                    fontSize: 12,
                    color: '#343434',
                    textAlign: 'center',
                    lineHeight: RFValue(20),
                    marginVertical: 10
                  }}>
                  By Clicking the ‘Create Account’ button you agree to Fejora’s

                  <Text style={{ color: '#66b486', fontFamily: 'Nunito-Regular' }}>
                    {'  '}
                    Terms of Service
                  </Text>
                </MyText>

              </TouchableOpacity>
            </View>

            {/* 
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 20,
                }}>
                <Text
                  style={{
                    fontSize: 12, textAlign: 'center',
                    fontFamily: 'Nunito-Regular',
                  }}>We are currently not accepting new users. Please check back later.
                </Text>
              </View>
            */}


            {/* <View style={styles.lastViewStyle}>
                                <MyText style={{ fontSize: 12, }}>Having any troubles?
                                    <TouchableNativeFeedback>
                                        <MyText style={{ color: '#d5431c' }}>contact us</MyText>
                                    </TouchableNativeFeedback>
                                </MyText>
                            </View> */}



          </View>
        </ScrollView>



        <Modal isOpen={isModalVisible}
          style={{ backgroundColor: '#f3f5f9' }}
          keyboardTopOffset={Platform.OS == 'ios' ? 22 : 0}
          swipeToClose={false}
          onClosed={closeModal}
          backdropOpacity={1}
          backdropColor="white"
          position="top">

          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: '#fff',
            }}
            edges={['left', 'right', 'top']}>

            <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />

            <View style={styles.head1}>
              <TouchableOpacity onPress={() => closeModal()}>
                <Icon
                  name={'arrow-back-ios'}
                  size={20}
                  color={'#808080'}
                  style={{ marginVertical: 20 }}></Icon>
              </TouchableOpacity>

              <MyText
                style={{
                  fontSize: 20, fontFamily: 'Nunito-Bold', fontWeight: '600',
                  marginBottom: 15, color: '#343434'
                }}>
                Terms of Service
              </MyText>
            </View>

            <ScrollView style={{
              paddingVertical: 10,
              paddingHorizontal: 20, width: '100%', height: '100%',
              backgroundColor: '#f3f5f9',
            }}>

              <MyText style={{ fontSize: 13, color: '#343434', fontFamily: 'Nunito-Regular', marginBottom: 10 }}>
                This terms of service was last modified on Feb, 2023.
                {'\n'}{'\n'}
                The following terms and conditions (these “Terms of Service”), govern your access to and use of the Fejora platform, including any content, functionality and services offered on or through the platform, by Fejora (collectively, “Fejora” “we” or “us”).
                {'\n'}{'\n'}
                Please read the Terms of Service carefully before you start to use the Fejora platform.
                {'\n'}{'\n'}
                By using the Fejora platform, opening an account or by clicking to accept or agree to the Terms of Service when this option is made available to you, you accept and agree to be bound and abide by these Terms of Service. If you do not want to agree to these Terms of Service, you must not access or use the platform.
                {'\n'}{'\n'}
                This platform is offered and available to users who are 18 years of age or older.
                {'\n'}{'\n'}By using the platform;{'\n'}
                * You represent and warrant that you are of legal age to form a binding contract and meet all of the foregoing eligibility requirements.
                {'\n'}* You agree not to violate any applicable laws and regulations applicable to you, including but not limited to regulations on anti-money laundering, anti-corruption, and counter-terrorist financing.
                {'\n'}* You acknowledge that giftcards or bictoin/usdt trades submitted by you are subject to verification/confirmation and estimated payout may change if there is any variance in the details you provided.
                {'\n'}{'\n'}* You agree not to;{'\n'}
                a) Breach this Terms of Use, or any applicable laws and regulations;{'\n'}
                b) Engage in or facilitate fraudulent activities including but not limited to taking any actions that defraud Fejora or its users;{'\n'}
                c) Threaten, harass our employees, agents or Defame Fejora;{'\n'}
                d) Engage in potentially fraudulent or suspicious activity and/or transactions;{'\n'}
                e) Abuse or engage in activities that will undermine our bonus system{'\n'}
                f) Receive or attempt to receive chargeback from both Fejora and its payment partners for the same transaction during the course of a dispute;{'\n'}
                g) Provide false, inaccurate or misleading Personal Information;{'\n'}
                h) Facilitate any viruses, trojan horses, worms or other computer programming routines that may damage, detrimentally interfere with, surreptitiously intercept or expropriate any system, data or Personal Information;
                {'\n'}{'\n'}
                You hereby acknowledge that Fejora reserves the right to restrict access to your account upon the reasonable suspicion that you have contravened any of the terms and conditions contained in this Terms of Use.{'\n'}
                Fejora, in its sole discretion, reserves the right to terminate this Agreement and/or restrict access to its Services and Platform for any reason and at any time upon notice and payment to you of any unrestricted funds held in your wallet.
                {'\n'}
                If we limit access to your Fejora account, we will provide you with notice of our actions via email.
                {'\n'}{'\n'}


                <MyText style={{ fontSize: 16, color: '#343434', fontFamily: 'Nunito-Bold', fontWeight: '600', marginBottom: 20 }}>Disclaimer</MyText>
                {'\n'}{'\n'}
                YOUR USE OF THE PLATFORM, ITS CONTENT AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                {'\n'}THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
                {'\n'}{'\n'}

                <MyText style={{ fontSize: 16, color: '#343434', fontFamily: 'Nunito-Bold', fontWeight: '600', marginBottom: 20 }}>Limitation on Liability</MyText>
                {'\n'}{'\n'}
                IN NO EVENT WILL FEJORA, ITS AFFILIATES OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE PLATFORM, ANY CONTENT ON THE PLATFORM OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE PLATFORM, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT OR OTHERWISE, EVEN IF FORESEEABLE.
                {'\n'}{'\n'}
                THE FOREGOING DOES NOT AFFECT ANY LIABILITY WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.

              </MyText>

            </ScrollView>
          </SafeAreaView>
        </Modal>

      </SafeAreaView>

      {isLoading ? (
        <View style={styles.loader}>
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


    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    width: RFValue(150),
    height: RFValue(50),
    marginTop: 30,
  },
  Bg: {
    //flex: 75,
    //height: '75%',
    backgroundColor: '#f3f5f9',
    width: width,
    alignSelf: 'flex-end',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  Heading: {
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 5,
    fontFamily: 'Nunito-Bold',
    color: '#343434',
  },
  subHeading: {
    fontWeight: '400',
    alignSelf: 'center',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 25,
    color: '#808080',
  },
  TextInputStyle: {
    color: '#343434',
    textAlign: 'left',
    height: 46,
    marginBottom: 0,
    fontSize: 13,
    fontFamily: 'Nunito-Regular',
    borderBottomWidth: 1,
    borderColor: '#F1F1F1',
  },
  GreenButton: {
    borderRadius: 8,
    paddingHorizontal: RFValue(10),
    paddingVertical: Platform.OS === 'android' ? RFValue(9) : RFValue(12),
    marginTop: RFValue(22),
    textAlignVertical: 'center',
    justifyContent: 'center',
    height: RFValue(50),
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
  BottomRowContainer: {
    marginTop: 10,
  },
  BottomRowContainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  lastViewStyle: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  head1: {

    width: width,
    height: 'auto',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
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
    height: 45, color: '#343434',
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
  retry: {
    backgroundColor: '#f9f9f9', borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd', marginTop: 10, width: 80, alignItems: 'center', borderRadius: 4, height: 'auto',
    paddingHorizontal: 0, paddingVertical: 5
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default CreateAccountScreen;
