import React, { useContext, useEffect, useMemo, useState, useRef } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
  Linking,
  Animated,
  ActivityIndicator,
  Alert
} from 'react-native';
import styles from './Style';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import NavBar from '../../../components/Navbars/Navbar';
import MyText from '../../../components/DefaultTextComponent/MyText';
import { RFValue } from 'react-native-responsive-fontsize';
import { RootState } from '../../../../redux/redux/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from '../../../../utils/utils';
import { getUserDetails } from '../../../../redux/redux/actions/authAction';
//import Modal from 'react-native-modal';
import Modal from 'react-native-modalbox';
import CustomToast from '../../../components/CustomToast/CustomToast';
import { SafeAreaView } from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import { ContactSupport, removeFcm, userLogout } from '../../../../redux/redux/actions/userAction';
import DeviceInfo from 'react-native-device-info';
import { useAuthStore } from '../../../../stores/store';
const { width, height } = Dimensions.get('screen');

const UserMenu = ({ navigation }) => {
  // const { users } = useSelector((state: RootState) => state.authReducer);
  const {user} = useAuthStore();
  console.log(user, 'user');
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);

  const [isLoading, setisLoading] = useState(false);
  const [userLoader, setUserLoader] = useState(false);

  const [email_support, setEmailSupport] = useState(user?.email);
  const [msg_support, setMsgSupport] = useState('');
  const [supportFormLoading, setSupportformLoading] = useState(false);


  //  console.log(users);
  // const dispatch: any = useDispatch();

  
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
    getToken(setToken, setId);
  }, []);


  const handleLogout = async () => {
    setisLoading(true);
    const device_id = DeviceInfo.getDeviceId();
       console.log("IDDDDDDDDDDDDDDD", id);
    userLogout({
        deviceId: device_id
      })
      .then(async (res) => {
       if(res?.status){
        await AsyncStorage.removeItem('token');
        await AsyncStorage.clear();
        await messaging().deleteToken();
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignInScreen' }]
        })
        setisLoading(false);
       }
      })
      .catch((err) => {
        setisLoading(false);
        showToast('Warning', 'An error occured with your request. Please try again')

      });
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

  // useEffect(() => {
  //   if (token !== null && id !== null && users === null) {
  //     setUserLoader(true);
  //     try {
  //       dispatch(
  //         getUserDetails({
  //           token,
  //           userID: id,
  //         }),
  //       )
  //         .then(err => setUserLoader(false))

  //     } catch (error) {
  //      return;
  //     }
  //   }
  // }, [users, token, id]);

  const traderLevel = 'Top Trader';
  const evaluateDate = '15 Jan 2023';
  const levelAmount = 20000;
  const tradeAmount = 2550;
  const currentLevelAmount = 2000;
  const currenttradeAmount = 1500;

  // const sendEmail = () => {

  //   setSupportformLoading(true);
  //   dispatch(ContactSupport({
  //     name: users?.username || users?.user?.username,
  //     email: email_support,
  //     message: msg_support,
  //     isGuest: false,
  //   }))
  //     .then((res) => {
  //       setSupportformLoading(false);
  //       showToast('Success', 'Email sent')

  //     })
  //     .catch((err) => {
  //       setSupportformLoading(false);
  //       showToast('Warning', err.response.data.message)
  //     })

  // };

  // const userLevel = '3';
  // const img = require('../../../../Assets/badge1.png');
  // const img1 = require('../../../../Assets/badge1.png');
  // const img2 = require('../../../../Assets/badge2.png');
  // const img3 = require('../../../../Assets/badge3.png');



  const [showTarget, setShowTarget] = useState(false);

  const toggleShowTarget = () => {
    setShowTarget(!showTarget);
  }


  return (
    <>

    <SafeAreaView
      style={{
        height: height,
        width: width,
        flex: 1,
        backgroundColor: '#21433d',
      }}
      edges={['left', 'right', 'top']}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />

      <View style={styles.header}>

        {isLoading ? (
          <TouchableOpacity
            style={{ marginLeft: 0, marginTop: 5, opacity: 0.7 }}>
            <Icon
              name={'arrow-back-ios'}
              size={20}
              color={'#fff'}
              style={{ marginTop: 10 }}></Icon>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ marginLeft: 0, marginTop: 5 }}
            onPress={() => navigation.navigate('DashBoardScreen')}>
            <Icon
              name={'arrow-back-ios'}
              size={20}
              color={'#fff'}
              style={{ marginTop: 10 }}></Icon>
          </TouchableOpacity>

        )}

        {userLoader ? (
          <View style={[styles.headerHeading, { backgroundColor: 'transparent', }]}>
            <ActivityIndicator size={"small"} color={'#fff'} />
          </View>
        ) : (
          <>
            {user ? (
              <View style={{ flexDirection: 'row' }}>

                <MyText style={styles.headerText}>{user?.username}</MyText>
                <View style={styles.headerHeading}><MyText style={{
                  color: '#fff', alignSelf: 'center',
                  fontSize: 17, textTransform: 'uppercase',
                  textAlign: 'center',
                }}>{user?.username?.slice(0, 1) || user?.username?.slice(0, 1)}</MyText></View>
              </View>
            ) : null}
          </>
        )}

      </View>


      <View style={{ flex: 1, backgroundColor: '#142927' }}>

        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '-10%', }}>
            <ActivityIndicator size={"small"} color={'#fff'} />
            <MyText style={{ textAlign: 'center', fontSize: 13, color: '#fff', marginTop: 10, }}>Signing out... {'\n'} We can't wait to see you again soon</MyText>
          </View>
        ) : (

          <ScrollView contentContainerStyle={styles.mainBody}>
{/*
            <View style={{ borderBottomColor: '#0f201e', paddingHorizontal: 15, paddingBottom: 20, borderBottomWidth: 2, }}>
              <View style={styles.RowB}>
                <MyText style={styles.titleLabel}>Here's how you're doing</MyText>
                <TouchableOpacity
                // onPress={toggleModal}
                >
                  <Icon
                    name={'info'}
                    size={18}
                    color={'#f27415'}
                    style={{ marginTop: 0 }}></Icon>
                </TouchableOpacity>
              </View>

              <View style={styles.RowB}>
                <MyText style={styles.title}>Trader Level</MyText>
                <MyText style={styles.title}>{traderLevel}</MyText>
              </View>


              <View style={styles.RowB}>
                <MyText style={styles.title}>Badge</MyText>

                <View style={{ flexDirection: 'row' }}>

                  {userLevel === '3' ? (
                    <Image
                      style={{
                        alignSelf: 'center',
                        marginVertical: 0,
                        width: 43,
                        height: 60,
                      }}
                      source={img3}
                    />
                  ) : null}
                </View>
              </View>

              <MyText style={[styles.titleLabel, { marginTop: 20 }]}>Current Level Target</MyText>
              <View style={styles.RowB}>
                <View>
                  <MyText style={styles.title}>Giftcard Trades</MyText>
                  <MyText style={styles.subtitle}>Trade at least ${currentLevelAmount} worth of{'\n'}giftcards this month </MyText>
                </View>

                <View>
                  <MyText style={[styles.title, { color: '#808080' }]}>${currenttradeAmount} / ${currentLevelAmount}</MyText>
                </View>
              </View>

              <View style={styles.RowB}>
                <MyText style={styles.title}>Next Evaluation</MyText>
                <MyText style={[styles.title, { color: '#1cc88a' }]}>{evaluateDate}</MyText>
              </View>

            </View>

            <View style={{ paddingVertical: 15, paddingHorizontal: 15, borderBottomColor: '#0f201e', borderBottomWidth: 2, }}>
              <TouchableOpacity
                onPress={() => toggleShowTarget()}>
                <View style={[styles.RowB, { marginTop: 0, }]}>
                  <MyText style={[styles.titleLabel, { fontSize: 14, marginTop: 0 }]}>See Next Level Target</MyText>
                  <Icon
                    name={showTarget ? "expand-more" : "chevron-right"}
                    size={20}
                    color={'#fff'}
                  />
                </View>
              </TouchableOpacity>

              {showTarget ? (
                <View style={styles.RowB}>
                  <View>
                    <MyText style={styles.title}>Giftcard Trades</MyText>
                    <MyText style={styles.subtitle}>Trade at least ${levelAmount} worth of{'\n'}giftcards (all time)</MyText>
                  </View>

                  <View>
                    <MyText style={[styles.title, { color: '#808080' }]}>${tradeAmount} / ${levelAmount}</MyText>
                  </View>
                </View>
              ) : null}
            </View>

			*/ }
			
            <View
              style={[
                //styles.mainBodyContent,
                {
                  marginTop: 40,
                  //marginBottom: '30%'
                },
              ]}>
              <View style={{ marginLeft: 20, marginBottom: RFValue(10) }}>
                <MyText style={{ fontSize: 9, color: '#a4a2a3' }}>
                  BILL PAYMENT
                </MyText>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('AirtimeData');
                }}>
                <View style={styles.mainBodyCardContent}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Icon
                      name={'phone-iphone'}
                      size={18}
                      color={'#808080'}
                      style={{
                        marginRight: 10,
                        marginBottom: 0,
                        marginTop: 0,
                      }}></Icon>
                    <MyText
                      style={{
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: '600',
                        marginTop: 0,
                      }}>
                      Airtime / Data
                    </MyText>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.hr}></View>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  navigation.navigate('DstvData');
                }}>
                <View style={styles.mainBodyCardContent}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 12,
                    }}>
                    <Icon
                      name={'live-tv'}
                      size={18}
                      color={'#808080'}
                      style={{
                        marginRight: 10,
                        marginBottom: 0,
                        marginTop: 0,
                      }}></Icon>
                    <MyText
                      style={{
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: '600',
                        marginTop: 1,
                      }}>
                      DSTV / GOtv
                    </MyText>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.hr}></View>
            </View>


            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <MyText style={{ fontSize: 9, color: '#a4a2a3' }}>
                MANAGE ACCOUNT
              </MyText>
            </View>
            <View style={{ marginTop: RFValue(10) }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('EditProfile', {
                    id: id,
                    token: token,
                  });
                }}>
                <View style={styles.mainBodyCardContent}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>

                    <Icon
                      name={'drive-file-rename-outline'}
                      size={18}
                      color={'#808080'}
                      style={{
                        marginRight: 10,
                        marginBottom: 0,
                        marginTop: 0,
                      }}></Icon>
                    <MyText
                      style={{
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: '600',
                        textAlign: 'left',
                        marginTop: 0,
                      }}>
                      Edit Profile
                    </MyText>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.hr}></View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('ChangePassword');
                }}>
                <View style={styles.mainBodyCardContent}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                    }}>
                    <Icon
                      name={'lock-open'}
                      size={18}
                      color={'#808080'}
                      style={{
                        marginRight: 10,
                        marginBottom: 0,
                        marginTop: 0,
                      }}></Icon>
                    <MyText
                      style={{
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: '600',
                        marginTop: 0,
                      }}>
                      Change Password
                    </MyText>
                  </View>

                </View>
              </TouchableOpacity>
              <View style={styles.hr}></View>
            </View>

            <View
              style={[
                //styles.mainBodyContent,
                {
                  marginTop: 40,
                  //marginBottom: '30%'
                },
              ]}>
              <View style={{ marginLeft: 20, marginBottom: RFValue(10) }}>
                <MyText style={{ fontSize: 9, color: '#a4a2a3' }}>
                  MORE
                </MyText>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={toggleModal}>
                <View style={styles.mainBodyCardContent}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Icon
                      name={'privacy-tip'}
                      size={18}
                      color={'#808080'}
                      style={{
                        marginRight: 10,
                        marginBottom: 0,
                        marginTop: 0,
                      }}></Icon>
                    <MyText
                      style={{
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: '600',
                        marginTop: 0,
                      }}>
                      Terms of Service
                    </MyText>
                  </View>

                </View>
              </TouchableOpacity>
              <View style={styles.hr}></View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={toggleM}>
                <View style={styles.mainBodyCardContent}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                    }}>
                    <Icon
                      name={'support-agent'}
                      size={18}
                      color={'#808080'}
                      style={{
                        marginRight: 10,
                        marginBottom: 0,
                        marginTop: 0,
                      }}></Icon>
                    <MyText
                      style={{
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: '600',
                        marginTop: 0,
                      }}>
                      Contact Support
                    </MyText>
                  </View>

                </View>
              </TouchableOpacity>
              <View style={styles.hr}></View>
            </View>

            <View
              style={[
                //styles.mainBodyContent,
                {
                  marginTop: 40,
                  //marginBottom: '30%'
                },
              ]}>
              <View style={{ marginLeft: 20, marginBottom: RFValue(10) }}>
                <MyText style={{ fontSize: 9, color: '#a4a2a3' }}>
                  CONNECT WITH US
                </MyText>
              </View>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  Linking.openURL('https://www.instagram.com/myfejora');
                }}>
                <View style={styles.mainBodyCardContent}>
                  <MyText
                    style={{
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: '600',
                    }}>
                    Instagram
                  </MyText>
                </View>
              </TouchableOpacity>
              <View style={styles.hr}></View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  Linking.openURL('https://www.twitter.com/myfejora');
                }}>
                <View style={styles.mainBodyCardContent}>
                  <MyText
                    style={{
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: '600', marginTop: 5,
                    }}>
                    Twitter
                  </MyText>

                </View>
              </TouchableOpacity>
              <View style={styles.hr}></View>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  Linking.openURL('https://www.facebook.com/myfejora');
                }}>
                <View style={styles.mainBodyCardContent}>
                  <MyText
                    style={{
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: '600', marginTop: 5,
                    }}>
                    Facebook
                  </MyText>

                </View>
              </TouchableOpacity>
              <View style={styles.hr}></View>

              <TouchableOpacity onPress={handleLogout}>
                <View style={[styles.mainBodyCardContent, { marginTop: 20 }]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                    }}>
                    <Icon
                      name={'power-settings-new'}
                      size={18}
                      color={'#ff0000'}
                      style={{
                        marginRight: 5,
                        marginBottom: 5,
                        marginTop: 0,
                      }}></Icon>
                    <MyText
                      style={{
                        color: '#ff0000',
                        fontSize: 12,
                        fontWeight: '600',
                        marginTop: 1,
                      }}>
                      Logout
                    </MyText>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.hr}></View>
            </View>

            {/* </View> */}

            <View style={styles.mainBodyBottomItems}>
              <MyText style={{ textAlign: 'left', color: '#808080', fontSize: 10, marginTop: 5 }}>
                Version 1.0
              </MyText>

              <Image
                style={{
                  alignSelf: 'center',
                  marginVertical: 20,
                  width: 100,
                  height: 40,
                }}
                source={require('../../../../Assets/fejoraLogo-white.png')}
              />
            </View>

          </ScrollView>


        )}
      </View>



      <Modal isOpen={isModalVisible}
        style={{ backgroundColor: '#f9f9f9' }}
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

          <View style={styles.header1}>
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
              Term of Service
            </MyText>
          </View>

          <ScrollView
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20, width: '100%', height: '100%',
              backgroundColor: '#f9f9f9',
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


      <Modal isOpen={isBoxVisible}
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

          <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />

          <View style={styles.header1}>
            <TouchableOpacity onPress={() => closeM()}>
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
              Contact Us
            </MyText>
          </View>


          <ScrollView style={{
            paddingVertical: 10,
            paddingHorizontal: 20, width: '100%', height: '100%',
            backgroundColor: '#f3f5f9',
          }}>

            <MyText style={{ fontSize: 13, marginVertical: 15, color: '#343434' }}>
              Have an inquiry or some feeedback for us? Fill out the form below</MyText>

            <View style={styles.drop}>
              <TextInput
                style={styles.text}
                underlineColorAndroid="transparent"
                textAlign={'left'}
                editable={false}
                value={user?.username}
              />
              <Icon
                name={'face'}
                size={20}
                color={'#808080'}
                style={{ marginTop: 12 }}></Icon>
            </View>

            <View style={styles.drop}>
              <TextInput
                style={styles.text}
                underlineColorAndroid="transparent"
                textAlign={'left'}
                placeholder="Email"
                onChangeText={(text) => setEmailSupport(text)}
              />
              <Icon
                name={'contact-mail'}
                size={20}
                color={'#808080'}
                style={{ marginTop: 12 }}></Icon>
            </View>

            <View style={styles.drop}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <TextInput
                  style={styles.textarea}
                  underlineColorAndroid="transparent"
                  placeholder='Your Message...'
                  placeholderTextColor={'#808080'}
                  textAlign={'left'}
                  numberOfLines={7}
                  textAlignVertical='top'
                  multiline={true}
                  onChangeText={(text) => setMsgSupport(text)}
                />
              </View>
            </View>


            {supportFormLoading ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                // onPress={() => navigation.navigate('AdminWithdrawalHome')}
                disabled={supportFormLoading}
                // onPress={sendEmail}
                onPress={()=>{}}
                style={[styles.sendBtn, { alignContent: 'center', marginTop: 10, }]}>
                <MyText style={styles.textbtn}>Send</MyText>
              </TouchableOpacity>
            )}

          </ScrollView>
        </SafeAreaView>
      </Modal>

    </SafeAreaView>

{show !== 0 ? (

  <Animated.View
    style={{transform: [{translateY: slideAnim}], position:'absolute', zIndex:999, bottom:0}}>
    <CustomToast
      type={toastType}
      msg={toastMsg}
    />
  </Animated.View>
        ) : null }

</>
  );
};

export default UserMenu;
