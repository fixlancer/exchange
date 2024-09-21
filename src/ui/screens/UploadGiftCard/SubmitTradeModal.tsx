import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  TouchableNativeFeedback,
  StatusBar,
  ActivityIndicator,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyText from '../../components/DefaultTextComponent/MyText';
import { useSelector } from 'react-redux';
// import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import CloseIcon from 'react-native-vector-icons/Ionicons';
// import { getToken, NAIRA } from '../../../utils/utils';
import CancelModal from '../UploadGiftCard/CancelModal';
import Modal from 'react-native-modalbox';
import ImagePreviewModal from '../../components/ImagePreviewModal';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// import { CREATE_TRADE, GET_USER_ID } from '../../../services/api';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ActionTypes } from '../../../redux/redux/constants';
// import { Toast } from 'native-base';
// import { editUserStats, getUserStats } from '../../../redux/redux/actions/statsAction';
import { RootState } from '../../../redux/redux/store/store';
// import { getGiftcardById } from '../../../redux/redux/actions/cardAction';
import { useAddTradeStore } from '../../../stores/store';
import { uploadImage } from '../../../redux/redux/actions/cardAction';
// import { getTrade } from '../../../redux/redux/actions/tradeAction';
import CustomToast from '../../components/CustomToast/CustomToast';
import { AddTrade } from '../../../redux/redux/actions/tradeAction';
import CircularProgress from './progressbar';
import HeaderModalBack from '../../components/Header/HeaderModalBack';
import newStyles from '../Styles/Styles';
import { moderateScale } from 'react-native-size-matters';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

interface Props {
  isOpen: boolean;
  handleChange: any;
  navigation: any;
}

const SubmitTradeModal: React.FC<Props> = props => {

  const CloudinaryBaseUrl = process.env.REACT_APP_CLOUDINARY_BASEURL;
  // console.log("CloudinaryBaseUrl", CloudinaryBaseUrl);
  const { giftCards, tradeTitle, setActiveGiftCard, activeGiftCard, setGiftCards, setCodes, setTradeTitle } = useAddTradeStore();
  // console.log("giftCardsss", giftCards);

  const theme = useTheme()
  const styles2 = newStyles(theme);

  // const { get_user_stats } = useSelector((state: RootState) => state.statsReducer);
  // const [images, setImages] = useState([]);
  const [previewImgPath, setpreviewImgPath] = useState(0);
  const [isPreviewImage, setisPreviewImage] = useState(false);
  // const [username, SetUsername] = useState(null);
  // const [stats, setStats] = useState(null);
  // const toast = useToast();

  const { navigation, handleChange } = props;

  // var { giftcard_ids } = props;
  // const { list } = useSelector((state: RootState) => state.cardReducer);
  const [isLoading, setisLoading] = useState(false);
  // const [isUnable, setisUnable] = useState(true);
  const [isLoadingSubmit, setisLoadingSubmit] = useState(false);
  // const [isMount, setisMount] = useState('1');
  const [isAllow, setisAllow] = useState(true);
  const [toastType, setToastType] = useState('success');
  const [toastMsg, setToastMsg] = useState('');
  const [show, setShow] = useState(50);
  const [currentTask, setCurrentTask] = useState("")

  const [totalImagesToBeUploaded, setTotalImagesToBeUploaded] = useState(0);
  const [imagesUploaded, setImagesUploaded] = useState(0);


  // const [userid, setUid] = useState(null);
  // const [newGift, setNewGift] = useState(giftcard_ids); //to trigger refresh to check cards that can be loaded
  // const [percent, setPercent] = useState(0);

  // var arr = [];
  // var cardvsum = 0;
  // var cardtsum = 0;

  // const currencyFormat = (value) => {
  //   <Numeral
  //     value={value}
  //     format={'0,0'}
  //   />
  // }


  // useEffect(() => {

  //   setisLoading(true);
  //   dispatch(
  //     getGiftcardById({
  //       giftcard_id: giftcard_ids
  //     })
  //   )
  //     .then(res => {

  //       setisMount(null);
  //       setisAllow(res.isLoaded);

  //       setTimeout(() => {
  //         setisLoading(false);
  //       }, 500);

  //       setNewGift(giftcard_ids);
  //     })
  //     .catch((err) => {
  //       setisLoading(false);
  //     })


  // }, [])

  const previewImage = (image) => {
    setpreviewImgPath(image);
    togglePreviewImgModal();
  };

  const togglePreviewImgModal = () => {

    setisPreviewImage(!isPreviewImage);
  };


  const [isModalVisible, setisModalVisible] = useState(false);

  const openModal = () => {
    setisModalVisible(true);
  }

  const closeModal = () => {
    setisModalVisible(false);
  }

  const Close = () => {
    handleChange();
  }

  const ActionModal = () => {
    navigation.navigate('SelectGiftCard');
    closeModal();
    handleChange();
  }

  const totalCardValue = () => {
    let totalValue = 0;
    for (var i = 0; i < giftCards.length; i++) {
      if (giftCards[i].cardRate !== null) {
        totalValue += giftCards[i].cardValue;
      }
    }
    return totalValue;
  }

  const showToast = (type, msg) => {
    setToastType(type);
    setToastMsg(msg);
    setShow(1);
    animateToast();
  };
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



  const handleAddTrade = async () => {
    setisLoading(true);

    try {
      let EcodeImage = Image.resolveAssetSource(require('../../../Assets/CARDS/ecode.jpg')).uri;
      const total: number = giftCards.length || 0;
      setTotalImagesToBeUploaded(total);

      const updatedArray = await Promise.all(
        giftCards.map(async (giftcard: any, index) => {

          if (giftcard.cardImage) return giftcard;
          if (giftcard.cardType == "Ecode" && giftcard.cardRate) {
            delete giftcard.imageUri;
            delete giftcard.imgName;
            delete giftcard.imgType;
            delete giftcard.isChecked;
            return {
              ...giftcard,
              transactionValue: giftcard.cardValue * giftcard.cardRate,
              cardImage: EcodeImage,
            };
          }
          else if (giftcard.cardType == "Physical" && giftcard.cardRate) {
            try {
              setCurrentTask("Uploading Images");
              const uploadResult: any = await uploadImage(giftcard);
              console.log(uploadResult);
              if (uploadResult.url) {
                setImagesUploaded(index + 1);

                delete giftcard.imageUri;
                delete giftcard.imgName;
                delete giftcard.imgType;
                delete giftcard.isChecked;
                return {
                  ...giftcard,
                  transactionValue: giftcard.cardValue * giftcard.cardRate,
                  cardImage: `${uploadResult.public_id}.${uploadResult.format}`,
                };
              }
            } catch (uploadError) {
              console.log(uploadError);
              setisLoading(false);
              showToast('error', 'Error! Adding Trade, Please try again');
              return null; // Or handle the error appropriately
            }
          }
          return null;
        })
      );

      console.log(updatedArray.filter(Boolean), 'updatedArray');
      if (updatedArray.filter(Boolean).length == 0) {
        setisLoading(false);
        showToast('error', 'At least one of the card details should be correct');
        return;
      }
      setCurrentTask("Submitting Trade")
      setGiftCards(updatedArray.filter(Boolean));
      const FinalAddTrade = { totalTransactionValue: totalTransacValue(), giftCards: updatedArray.filter(Boolean), tradeTitle: tradeTitle, totalCardValue: totalCardValue(), tradeIcon: '' };
      console.log(FinalAddTrade, 'FinalAddTrade');
      await AddTrade(FinalAddTrade).then((res) => {
        showToast('success', 'Trade submitted');
        setisLoading(false);
        closeModal();
        handleChange();
        ResetTradeStore()
        navigation.reset({
          index: 0,
          routes: [{ name: 'DashBoard' }, { name: 'Success', params: { type: 'Giftcard', amount: totalTransacValue(), currency: '' } }],
        });
      }, (error) => {
        setisLoading(false)
        console.log(error);
        showToast('error', 'Error Adding Trade, Please try again');
      })
      // Handle the updatedArray as needed (e.g., update state, etc.)
    } catch (error) {
      setisLoading(false)
      console.error('Error during handleAddTrade:', error);
      showToast('error', 'Error Adding Trade, Please try again');
      // Handle the error appropriately
    }
  };




  // }

  const ResetTradeStore = () => {
    setActiveGiftCard(null);
    setGiftCards([]);
    setCodes([]);
    setTradeTitle("");
  }

  const totalTransacValue = () => {

    var a = [];
    var b = [];
    var sum = 0;


    for (var i = 0; i < giftCards.length; i++) {
      if (giftCards[i].cardRate !== null) {
        a[i] = giftCards[i].cardValue;
        b[i] = giftCards[i].cardRate;
      }
      else { a[i] = 0; b[i] = 0; }
    }
    // console.log(a);
    // console.log(b);
    for (i = 0; i < a.length; i++)
      sum = sum + (a[i] * b[i]);
    // console.log(sum);
    return sum;
  }

  return (

    <Modal isOpen={props.isOpen}
      style={{ backgroundColor: '#fff' }}
      keyboardTopOffset={Platform.OS == 'ios' ? 22 : 0}
      swipeToClose={false}
      onClosed={Close}
      backdropOpacity={1}
      backdropColor="transparent"
      position="top">


      <View style={[styles2.container]} pointerEvents={isLoading ? "none" : "auto"}>

        <SafeAreaView
          style={{
            height: height,
            width: width,
            flex: 1,
            backgroundColor: '#fff',
          }}
          edges={['left', 'right', 'top']}>

<StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />


          <HeaderModalBack headerTitle={tradeTitle} handleChange={props.handleChange} />

          <ScrollView style={{ backgroundColor: '#f3f5f9', }} showsVerticalScrollIndicator={false}>


            <View style={[styles.whiteCardBg, { height: '100%' }]}>

              <View
                style={{
                  paddingTop: 5, backgroundColor: '#f3f5f9',
                }}>


                {giftCards && giftCards.length ? (
                  giftCards.map((i: any, index) => {


                    return (
                      <View key={index + 1}>
                        <View style={{ backgroundColor: '#fff', marginHorizontal: 7, marginBottom: 7, borderRadius: 4, }}>

                          <View style={i.cardRate === null || !i.cardRate ? [styles.cardContainer,
                          { borderColor: '#ff0000', borderRadius: 4, borderWidth: 0.5, opacity: 0.7 }] : [styles.cardContainer, {}]}>
                            <View style={styles.imageAndTextContainer}>


                              <TouchableOpacity
                                activeOpacity={0.9}
                                // onPress={() => previewImage(1)}>
                                onPress={() => previewImage({ uri: i.imageUri || CloudinaryBaseUrl + i?.cardImage })}>

                                <Image
                                  source={{ uri: i.imageUri || CloudinaryBaseUrl + i?.cardImage }}
                                  style={styles.cardImage}
                                />
                              </TouchableOpacity>


                              <View
                                style={{
                                  marginLeft: 10,
                                  marginTop: 0,
                                }}>


                                <View>

                                  {i.cardRate === null ? (
                                    <>
                                      <View style={{ backgroundColor: '#ff0000', borderRadius: 4, marginBottom: 3, padding: 2, }}>
                                        <MyText style={{ fontSize: 12, textAlign: 'center', color: '#fff', }}>
                                          Cannot load this card</MyText>
                                      </View>
                                      {/* ${i.card_value} */}
                                    </>
                                  ) : (
                                    <>
                                      {i.cardTitle !== '' ? (
                                        <>

                                          <MyText style={{ color: '#343434', marginBottom: 2, fontSize: 14 }}>
                                            {'\u20A6'}{i.cardValue * i.cardRate}

                                          </MyText>
                                          <MyText style={{ color: '#808080', marginBottom: 2, fontSize: 13 }}>

                                            {i.cardCountry === 'US' ? '$' : i.cardCountry === 'UK' ? <>{'\u00A3'}</> : i.cardCountry === 'CANADA' ? 'CAD' : i.cardCountry === 'AUSTRALIA'
                                              ? 'AUD' : i.cardCountry === 'SINGAPORE' ? 'SGD' : <>{'\u20AC'}</>}{i.cardValue}

                                          </MyText>
                                        </>
                                      ) : (
                                        <>
                                          <View style={{ backgroundColor: '#f27415', borderRadius: 4, marginBottom: 3, padding: 2, }}>
                                            <MyText style={{ fontSize: 12, textAlign: 'center', color: '#fff', }}>
                                              Card Not Filled</MyText>
                                          </View>
                                          <View style={{ borderRadius: 4, marginBottom: 3, padding: 2, }}>
                                            <MyText style={{ fontSize: 11, textAlign: 'left', color: '#343434', }}>
                                              Card details needs to be {'\n'}filled. Go back to edit</MyText>
                                          </View>
                                        </>
                                      )}

                                    </>

                                  )}

                                  <MyText style={{ color: '#808080', marginBottom: 2, fontSize: 10 }}>
                                    {i.cardCountry}
                                  </MyText>
                                  <MyText
                                    style={{
                                      color: '#808080',
                                      fontSize: 10,
                                      marginBottom: 2,
                                    }}>
                                    {i.cardType}
                                  </MyText>

                                </View>


                                {/* })
): null}    */}

                                <View>
                                  <MyText style={{ color: '#808080', marginBottom: 2, fontSize: 10 }}>
                                    {i.cardCode}
                                  </MyText>

                                  <MyText
                                    style={{
                                      color: '#808080',
                                      fontSize: 10,
                                      marginBottom: 2,
                                    }}>
                                    {i.startingCode}
                                  </MyText>
                                </View>
                              </View>
                            </View>

                            <TouchableOpacity activeOpacity={0.5}>
                              <View
                                style={{
                                  width: 22,
                                  height: 22,
                                  borderRadius: 20,
                                  backgroundColor: '#343434',
                                  justifyContent: 'center',
                                  alignItems: 'center', marginTop: 15
                                }}>
                                <MyText style={{ textAlign: 'center', fontSize: 12, color: '#fff' }}>{index + 1}</MyText>
                              </View>
                            </TouchableOpacity>

                          </View></View>

                      </View>
                    )


                  })

                ) : null}

              </View>


            </View>


          </ScrollView>


          {isLoading ? (
            <></>
          ) : (
            <>
              {!isLoading ? (

                <View style={{ backgroundColor: '#fff', paddingHorizontal: 15, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#f2f2f2', paddingBottom: Platform.OS === 'ios' ? 40 : 15 }}>

                  {isAllow ? (

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View>
                        <MyText style={{ fontSize: 10, marginTop: 20, color: '#808080' }}>Transaction Value</MyText>

                        <MyText style={{ fontSize: 16, marginVertical: 3, color: '#343434' }}>
                          {'\u20A6'}{totalTransacValue()}</MyText>

                        {/*   <MyText style={{ fontSize: 10, color: '#808080' }}>
                        Card Value: {totalCardValue()}
                      </MyText>
                */}
                      </View>

                      <View>


                        {isLoadingSubmit ? (
                          <View
                            style={[styles.submitBtn, {
                              opacity: 0.7,
                              alignItems: 'center',
                              marginTop: 25,
                            }]}>
                            <ActivityIndicator size={'small'} color={'#808080'} />

                          </View>
                        ) : (
                          <TouchableOpacity
                            activeOpacity={0.8}

                            disabled={isLoadingSubmit}
                            onPressIn={() => {
                              handleAddTrade();


                            }}>


                            <View
                              style={[styles.submitBtn, {
                                alignItems: 'center',
                                marginTop: 25,
                              }]}>
                              <MyText style={{ fontSize: 13, textAlign: 'center', color: '#fff' }}>Submit Trade
                              </MyText>
                            </View>

                          </TouchableOpacity>
                        )}
                      </View>


                    </View>

                  ) : (

                    <MyText
                      style={{
                        width: '100%',
                        textAlign: 'center',
                        marginTop: 15,
                        color: '#808080',
                        borderRadius: 0,
                        fontSize: 13,
                      }}>
                      We are unable to load these cards
                    </MyText>

                  )}
                </View>
              ) : null}
            </>
          )
          }

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

        {isLoading ?
          currentTask == "Uploading Images" ?
            <View style={[styles2.loader, styles2.alignCenter]}>
              <CircularProgress
                size={moderateScale(150)}
                strokeWidth={5}
                progress={(imagesUploaded / totalImagesToBeUploaded) * 100 || 0}
              />
              <MyText style={[styles2.userLabel, styles2.textCenter, styles2.pt10]}>
                {`${imagesUploaded}/${totalImagesToBeUploaded}`}
                {'\n'}
                Uploading Images
              </MyText>
            </View>
            :
            (
              <View style={[styles2.loader, styles2.alignCenter]}>
                <ActivityIndicator size={'small'} color={'#fff'} />
                <MyText style={[styles2.userLabel, styles2.textCenter, styles2.pt10]}>{currentTask}</MyText>
              </View>
            ) : null}

        <ImagePreviewModal
          image={previewImgPath}
          isPreviewImgVisible={isPreviewImage}
          togglePreviewImgModal={togglePreviewImgModal}
        />

        <CancelModal
          isVisible={isModalVisible}
          handleChange={closeModal}
          onPressAction={ActionModal}
          setisAllow={setisAllow}
        />


      </View>
    </Modal >

  );
};

const styles = StyleSheet.create({

  header: {
    width: width,
    height: 'auto',
    backgroundColor: '#fff',
    marginBottom: 0,
    paddingBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  headerHeading: {
    textAlign: 'center',
    fontSize: 16,
    marginLeft: -18,
    marginTop: 10,
    color: '#343434',
  },
  image: {
    width: 30,
    height: 30,
  },
  whiteCardBg: {
    backgroundColor: '#fff',
    width: width,
    // paddingBottom: 40,
  },
  bodyHeader: {
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 0,
    borderColor: '#f1f1f1',
    paddingBottom: 10,
  },
  uploadButtonContainer: {
    width: '100%',
    height: 35,
  },
  valuesContainer: {
    marginTop: 5,
    marginHorizontal: 15,
  },
  borderLine2: {
    marginTop: 10,
  },
  borderLine: {
    marginTop: 0,
    paddingTop: 5,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#F2F2F2',
  },
  cardContainer: {
    display: 'flex',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  imageAndTextContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardImage: {
    width: 120, marginRight: 5,
    height: 80,
    marginTop: 0,
    borderRadius: 10,
    backgroundColor: '#dfe2f5',
  },
  GreenButton: {
    // alignSelf:'center',
    // backgroundColor:'#1CC88A',
    // width:'100%'
    borderWidth: 1,
    borderColor: '#16a974',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 15,
    fontWeight: '700',
    color: '#fafafa',
    backgroundColor: '#16a974',
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 50 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    //marginTop: 20,
    //marginBottom: 10
  },
  bottomContainerForIos: {
    height: 30,
    width: '100%',
    backgroundColor: '#1CC88A',
  },
  submitBtn: {
    alignSelf: 'center',
    backgroundColor: '#1CC88A',
    width: 100,
    borderRadius: 8,
    marginBottom: 10,
    padding: 8,
  },
  loader: {
    backgroundColor: '#f3f5f9', height: 50, justifyContent: 'center', alignItems: 'center', width: 100, padding: 10, borderRadius: 5, elevation: 2,
  },
});
export default SubmitTradeModal;
