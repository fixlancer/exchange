import React, { Fragment, useState, Component, useRef, useEffect } from 'react';
import {
  View,
  Dimensions,
  TextInput,
  StatusBar,
  StyleSheet,
  Platform,
  Animated,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyText from '../../components/DefaultTextComponent/MyText';
import ImagePicker from 'react-native-image-crop-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import CustomToast from '../../components/CustomToast/CustomToast';
import { uploadImage } from '../../../redux/redux/actions/cardAction';
import { updateGiftCardDetails } from '../../../redux/redux/actions/userAction';
import HeaderBack from '../../components/Header/HeaderBack';
import styles2 from '../Styles/Styles';

const { width, height } = Dimensions.get('window');

const RetryGiftCard = ({ route, navigation }) => {
  const CloudinaryBaseUrl = process.env.REACT_APP_CLOUDINARY_BASEURL;

  const [image, setImage] = useState(null);
  const [cardcode, setCardCode] = useState('');
  const [isSubmitted, setSubmitted] = useState('');

  const { giftCardData } = route?.params;
  const [isLoading, setisLoading] = useState(false);
  const [isImgLoading, setisImgLoading] = useState(false);
  console.log('giftCardData', giftCardData);
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

  const [country_format, setCountryFormat] = useState('\u20AC');


  useEffect(() => {

    if (giftCardData?.cardCountry == 'US') {
      setCountryFormat('\u0024')
    } else if (giftCardData?.cardCountry == 'UK') {
      setCountryFormat('\u00A3');
    } else if (giftCardData?.cardCountry == 'CANADA') {
      setCountryFormat('CAD')
    } else if (giftCardData?.cardCountry == 'AUSTRALIA') {
      setCountryFormat('\u20B3')
    } else if (giftCardData?.cardCountry == 'SINGAPORE') {
      setCountryFormat('SGD')
    } else {
      setCountryFormat('\u20AC')
    }

  }, [country_format]);



  // const updateDetails = () => {         //update on retry

  //   var cardid = giftCardDataID.trades[0].cards[id - 1]._id;

  //   var img = image;
  //   var code = cardcode;
  //   setisLoading(true);
  //   dispatch(
  //     onRetryUpdate({

  //       cardID: cardid,
  //       image: img,
  //       cardCode: code,
  //       trade_id: trade_id,
  //       trade_title: trade_title

  //     })

  //   )
  //     .then((res) => {

  //       UpdateTrade();
  //       dispatch(getTradebyID(giftCardDataID.trades[0].tradeid));

  //       showToast('Success', 'Trade Submitted');

  //       setisLoading(false);
  //       setSubmitted('true');

  //     })

  //     .catch((err) => {
  //       setisLoading(false);
  //       showToast('Warning', err.response.data.message);
  //     })

  // }

  const UpdateTrade = () => {

    // var tradeid = giftCardDataID.trades[0]._id;

    // dispatch(
    //   updateTradeStatus({
    //     tradeID: tradeid,
    //     isModerator: true,
    //   })
    // )
    //   .then((res) => {
    //     dispatch(getTradebyID(giftCardDataID.trades[0].tradeid))        
    //     showToast('Success', res.message)
    //   })
  }

  const updateGiftCard = () => {
    setisLoading(true);
    updateGiftCardDetails({
      giftcardId: giftCardData?._id,
      cardCode: cardcode,
      cardImage: image,
    })
      .then((res) => {
        if (res.status) {
          showToast('Success', res?.message);
          setSubmitted('true');
        }
      })
      .catch((err) => {
        showToast('Warning', err.response.data.message);
      }).finally(() => {
        setisLoading(false);
      })
  }


  const openGallary = () => {
    ImagePicker.openPicker({
      width: 150,
      height: 90,
      compressImageMaxWidth: 500,
      compressImageQuality: 0.6,
    }).then(async image => {
      let newFile = {
        uri: image.path,
        type: `test/${image.mime.split('/')[1]}`,
        name: `test.${image.mime.split('/')[1]}`
      }
      setisImgLoading(true);
      await uploadImageToCloud(newFile);
    });
  };

  const uploadImageToCloud = async (newFile) => {
    try {
      const uploadResult = await uploadImage({ imageUri: newFile.uri, imgType: newFile.type, imgName: newFile.name });
      if (uploadResult.url) {
        setImage(`${uploadResult.public_id}.${uploadResult.format}`);
      }
    } catch (error) {
      console.log('error', error);
    }
    finally {
      setisImgLoading(false);
    }
  }

  const handleClearImage = () => {
    setImage(null);
  };

  const [isFieldDisabled, setisFieldDisabled] = useState(
    route?.params?.isRetry ? route?.params?.isRetry : false,
  );

  const renderLoader = () => {
    return (
      <ActivityIndicator size={"small"} color={"#343434"} />
    )
  }


  return (
    <View style={{ width: width, flex: 1 }}
      pointerEvents={isLoading ? "none" : "auto"}>
      <SafeAreaView
        style={{
          height: height,
          width: width,
          flex: 1,
          backgroundColor: 'transparent',
        }}
        edges={['left', 'right', 'top']}>
        <StatusBar translucent barStyle={'dark-content'} backgroundColor="transparent" />

        
          <HeaderBack navigation={navigation} headerTitle={'Retry giftcard'} />
 

        <ScrollView style={[styles2.iosBar, styles2.ph15, styles2.bgGrey]}>

          <View style={{}}>
            <View style={styles.drop}>
              <MyText
                style={styles.text2}>
                {giftCardData?.cardTitle}
              </MyText>
            </View>

            <View style={styles.drop}>
              <MyText style={styles.text2}>
                {giftCardData?.cardCountry}   {/*need to confirm the schema*/}
              </MyText>

            </View>

            <View style={styles.drop}>
              <MyText style={styles.text2}>
                {giftCardData?.cardType}
              </MyText>

            </View>

            <View style={styles.drop}>
              <MyText style={styles.text2}>
                {giftCardData?.cardValue}
              </MyText>

            </View>

            <View style={styles.drop2}>
              <TextInput
                style={styles.text}
                underlineColorAndroid="transparent"
                placeholder='Card Code e.g 13546-4658'
                placeholderTextColor="#808080"
                textAlign={'left'}
                onChangeText={text => setCardCode(text)}
              />
            </View>

          </View>


          {giftCardData?.cardType === 'Physical' ? (
            <>
              <View style={{ flexDirection: 'row', }}>
                <View style={[styles.drop2, { backgroundColor: 'transparent' }]}>
                  <View
                    style={{
                      marginTop: 10,
                      alignSelf: 'center', width: '100%',
                      marginHorizontal: 0,
                    }}>
                    <TouchableOpacity
                      onPress={() => openGallary()}
                      activeOpacity={0.9}
                      style={styles.imgUpload}>
                      <Icon
                        name={'camera-alt'}
                        size={18}
                        color={'#808080'}
                        style={{
                          alignSelf: 'center', marginRight: -5,
                        }}></Icon>
                      <MyText
                        style={{
                          textAlign: 'center',
                          padding: 10,
                          color: '#343434',
                          fontSize: 12,
                        }}>
                        Change Image
                      </MyText>
                    </TouchableOpacity>
                  </View>

                  <View style={{ marginTop: 10, marginHorizontal: 20, }}>
                    {isImgLoading ? (
                      <View style={{
                        width: 150, justifyContent: 'center',
                        height: 90, backgroundColor: '#f2f2f2',
                        borderRadius: 12,
                      }}>
                        <ActivityIndicator size={'small'} color={'#343434'} />
                      </View>
                    ) : (
                      <>
                        {image && (

                          <View style={{ flexDirection: 'row', marginBottom: 60, justifyContent: 'space-between' }}>
                            <Image
                              imageStyle={{ borderRadius: 12 }}
                              style={{
                                width: 150,
                                height: 90, backgroundColor: '#f2f2f2',
                                borderRadius: 12,
                              }}
                              indicator={Progress.Pie}
                              indicatorProps={{
                                size: 25,
                                color: '#808080',
                                unfilledColor: '#f2f2f2'
                              }}
                              source={{ uri: CloudinaryBaseUrl + image }} />

                            <TouchableOpacity onPress={handleClearImage}>
                              <View style={{
                                width: 22,
                                height: 22,
                                borderRadius: 20,
                                backgroundColor: '#F73C41',
                                justifyContent: 'center',
                                alignItems: 'center', marginTop: 20
                              }}>
                                <Icon
                                  name={'close'}
                                  size={18}
                                  color={'#fff'}
                                  style={{ marginTop: 0, alignSelf: 'center' }}></Icon>
                              </View>

                            </TouchableOpacity>
                          </View>

                        )}

                      </>
                    )}

                  </View>
                </View>
              </View>
              <View>
                {image === null ? (
                  <Image
                    imageStyle={{ borderRadius: 12 }}
                    style={{
                      width: 150,
                      height: 90, backgroundColor: '#f2f2f2',
                      borderRadius: 12, marginRight: 10,
                    }}
                    indicator={renderLoader}
                    source={{ uri: CloudinaryBaseUrl + giftCardData?.cardImage }} />
                ) : null}
              </View>

            </>
          ) : null}

        </ScrollView>

        {isLoading ? (
          <View style={{ marginVertical: 15, }}>
            <ActivityIndicator size={'small'} color={'343434'} />
          </View>
        ) : (
          <>
            {isSubmitted !== 'true' ? (
              <TouchableOpacity
                style={styles.btnCont}

                disabled={isLoading}
                onPressIn={() => {
                  updateGiftCard();
                }}>
                <View
                  style={[styles.submitBtn, {
                    alignItems: 'center',
                    marginTop: 15,
                  }]}>
                  <MyText style={{ fontSize: 13, textAlign: 'center', color: '#fff' }}>Submit
                  </MyText>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.btnCont}>
                <View
                  style={{
                    alignItems: 'center', marginBottom: 10,
                    padding: 10,
                    marginTop: 15, opacity: 0.7,
                  }}>
                  <MyText style={{ fontSize: 13, textAlign: 'center', color: '#1cc88a' }}>Submitted
                  </MyText>
                </View>
              </View>
            )}

          </>
        )}

      </SafeAreaView>

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
  header: {
    width: width,
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#DDDDDD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Platform.OS == 'ios' ? 0 : 10,
  },
  headerHeading: {
    textAlign: 'center',
    fontSize: 16,
    marginLeft: -18,
    marginTop: 14,
    color: '#343434',
  },
  cardImage: {
    // width: 140,
    // height: 110,
    width: wp(35),
    height: wp(26),
    marginRight: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  btnText: {
    textAlign: 'left',
    fontSize: 13,
    color: '#fff',
    fontFamily: 'Nunito-Regular',
  },
  submitBtn: {
    alignSelf: 'center',
    backgroundColor: '#1cc88a',
    width: '100%',
    borderRadius: 4,
    marginBottom: 10,
    padding: 10,
  },
  text2: {
    alignSelf: 'center', marginTop: 0, textAlign: 'left',
    paddingLeft: 15, paddingTop: 15, borderRadius: 5,
    width: '100%', borderWidth: StyleSheet.hairlineWidth, borderColor: '#ddd',
    fontSize: 13, marginRight: 0,
    height: 45, color: '#343434',
    fontFamily: 'Nunito-Regular',
  },
  text: {
    alignSelf: 'center', marginTop: 0, textAlign: 'left',
    paddingLeft: 15, borderRadius: 5,
    width: '100%', borderWidth: StyleSheet.hairlineWidth, borderColor: '#ddd',
    fontSize: 13, marginRight: 0,
    height: 45, color: '#343434',
    fontFamily: 'Nunito-Regular',
  },
  drop2: {
    backgroundColor: '#fff',
    height: 'auto', marginBottom: 15, marginTop: 10,
    width: '100%', paddingHorizontal: 0,
    paddingVertical: 0,
    alignSelf: 'center',
  },
  drop: {
    backgroundColor: '#f2f2f2',
    height: 'auto', marginBottom: 5,
    width: '100%', paddingHorizontal: 0,
    paddingVertical: 0, marginTop: 10,
    alignSelf: 'center',
  },
  hr: {
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
    width: '100%'
  },
  btnCont: {
    backgroundColor: '#FFFFFF', paddingHorizontal: 15,

  },
  bottomContainerForIos: {
    height: 30,
    width: '100%',
    backgroundColor: 'transparent',
  },
  imgUpload: {
    marginTop: 0,
    alignSelf: 'center', flexDirection: 'row', justifyContent: 'center',
    backgroundColor: '#f9f9f9', height: 40,
    width: '100%', marginHorizontal: 15,
    borderRadius: 10, marginBottom: 10, borderWidth: StyleSheet.hairlineWidth, borderColor: '#ddd', borderStyle: 'dashed',
  },
});

export default RetryGiftCard;
