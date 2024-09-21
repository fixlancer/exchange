import React, { useState, useEffect, useRef, Fragment, useCallback, Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  Platform,
  ScrollView,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyText from '../../components/DefaultTextComponent/MyText';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modalbox';
//import CardView from './CardModal';
import axios from 'axios';
import CustomToast from '../../components/CustomToast/CustomToast';
import { useAddTradeStore } from '../../../stores/store';
import newStyles from '../Styles/Styles';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import HeaderBack from '../../components/Header/HeaderBack';
import { useTheme } from 'react-native-paper';
const { width, height } = Dimensions.get('window');

const textList = ['Upload in progress']

const UploadGiftCard = ({ route, navigation }) => {
  const [headerTitle, setheaderTitle] = useState(route?.params?.headerTitle);
  const { setGiftCards, setTradeTitle, setActiveGiftCard } = useAddTradeStore()
  const imgPath = Image.resolveAssetSource(require('../../../Assets/CARDS/ecode.jpg')).uri;
  const [newText, setnewText] = useState('');

  
  const theme = useTheme()
  const styles2 = newStyles(theme);

  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * textList.length);
    setnewText(textList[index]);
  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffle, 500);
    return () => clearInterval(intervalID);

  }, [shuffle]);

  const [icon, setIcon] = useState(
    route?.params?.icon == 'ITUNES' ?
      require('../../../Assets/CARDS/itunes.png')
      : route?.params?.icon == 'STEAM' ?
        require('../../../Assets/CARDS/steam.png')
        : route?.params?.icon == 'GOOGLE PLAY' ?
          require('../../../Assets/CARDS/Googleplay.png')
          : route?.params?.icon == 'SEPHORA' ?
            require('../../../Assets/CARDS/sephora.png')
            : route?.params?.icon == 'AMERICAN EXPRESS' ?
              require('../../../Assets/CARDS/americanexpress.png')
              : route?.params?.icon == 'VANILLA' ?
                require('../../../Assets/CARDS/vanilla.png')
                : route?.params?.icon == 'WALMART' ?
                  require('../../../Assets/CARDS/walmart.png')
                  : route?.params?.icon == 'VISA' ?
                    require('../../../Assets/CARDS/visa.png')
                    : route?.params?.icon == 'EBAY' ?
                      require('../../../Assets/CARDS/ebay.png')
                      : route?.params?.icon == 'AMAZON' ?
                        require('../../../Assets/CARDS/amazon.png')
                        : route?.params?.icon == 'NORDSTROM' ?
                          require('../../../Assets/CARDS/nordstrom.png')
                          : route?.params?.icon == 'NIKE' ?
                            require('../../../Assets/CARDS/nike.png')
                            : route?.params?.icon == 'FOOTLOCKER' ?
                              require('../../../Assets/CARDS/footlocker.png')
                              : null
  );

  const [isLoading, setisLoading] = useState(false);
  const [isonProgress, setisonProgress] = useState(false);
  const [images, setImages] = useState([]);
  const [Myimages, setMyImages] = useState('');

  const [localimages, setlocalimages] = useState([])
  const [iscardVisible, setisCardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgUploaded, setImgUploaded] = useState([]);
  const [card_type, setCardType] = useState('');
  const [ecodeVal, setEcodeVal] = useState([]);
  const [eVal, setEVal] = useState(0);


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

    if (headerTitle != 'AMAZON') {
      setisCardVisible(true);
    } else {
      openPicker();
    }
  }, []);


  const toggle = () => {
    setisCardVisible(true);
  }

  const CloseToggle = () => {
    setisCardVisible(false);
    if (!card_type)
      navigation.goBack();
  }

  const SubmitPhysical = () => {
    setisCardVisible(false);
    setCardType('Physical');
    openPicker();
  }

  const SubmitEcode = () => {
    setCardType('Ecode');
  }

  //ECODE STARTS HERE /////////////////////////

  const SelectData = [
    {
      id: 1,
      label: '1'
    },
    {
      id: 2,
      label: '2'
    },
    {
      id: 3,
      label: '3'
    },
    {
      id: 4,
      label: '4'
    },
    {
      id: 5,
      label: '5'
    },
    {
      id: 6,
      label: '6'
    },
    {
      id: 7,
      label: '7'
    },
  ]


  const saveEcodeData = () => {

    const UpdatedGiftCardArray = ecodeVal.map((i, index) => ({
      imageUri: imgPath,
      imgType: `ecode/jpg`,
      imgName: `ecode.jpg`,
      cardTitle: headerTitle,
      cardCountry: '',
      cardValue: null,
      cardCode: '',
      cardType: 'Ecode',
      startingCode: '',
      cardRate: null,
      isChecked: false
    }));
    setGiftCards(UpdatedGiftCardArray);
    setTradeTitle(headerTitle);
    setActiveGiftCard(0);

    if (UpdatedGiftCardArray?.length) {
      navigation.navigate('EditGiftCard')
    }

  }

  useEffect(() => {

    if (ecodeVal.length != 0) {
      saveEcodeData();
    }

  }, [ecodeVal])

  //ECODE ENDS HERE /////////////////////////


  const openPicker = async () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'asc',
      includeExif: true,
      forceJpg: true,
      compressImageMaxWidth: 500,
      compressImageQuality: 0.6,
      maxFiles: 7,
      mediaType: 'photo',
    })
      .then(response => {
        const UpdatedGiftCardArray = response.map((i, index) => ({
          imageUri: i.path,
          imgType: `test/${i.mime.split('/')[1]}`,
          imgName: `test.${i.mime.split('/')[1]}`,
          cardTitle: headerTitle,
          cardCountry: '',
          cardValue: null,
          cardCode: '',
          cardType: headerTitle === 'AMAZON' ? '' : 'Physical',
          startingCode: '',
          cardRate: null,
          isChecked: false
        }));
        setGiftCards(UpdatedGiftCardArray.slice(0, 7));
        setTradeTitle(headerTitle);
        setActiveGiftCard(0);

        if (UpdatedGiftCardArray?.length) {
          navigation.navigate('EditGiftCard')
        }
        // setlocalimages(imageList);
        //  handleUpload(imageList);
      })
    // .catch((e) => alert(e));
  }



  /*
    const handleUpload = (imageList) => { //uploading image on cloudinary
  
      setisLoading(true);
      const data = new FormData();
      imageList.map(async (item, i) => {
  
        data.append('file', item);
        data.append('upload_preset', 'fejoraApp');
        data.append('cloud_name', 'fejora');
  
        await axios({
          method: 'post',
          url: 'https://api.cloudinary.com/v1_1/fejora/image/upload',
          data: data,
          headers: { "Content-Type": "multipart/form-data", },
          onUploadProgress: function (event) {
            var percent = Math.round((event.loaded * 100) / event.total)
            //setPercentage(percent)
  
            let newItem = item;
            newItem.progress = percent;
            let itemsCopy = [...imageList];
            setImgUploaded([...itemsCopy]);
            item.progress = percent;
          },
  
        })
  
          .then(data => {
            setisonProgress(true);
            setImages(old => [...old, data.data.secure_url]);
            setisLoading(false);
          })
  
          .catch((err) => {
            setisLoading(false);
          showToast('Warning', 'Unable to process your upload. Please try again')
          })
      })
    }
  
  */


  // useEffect(() => { //Physical navigation
  //   if (localimages.length != 0) {
  //     // toggle();
  //     navigation.navigate('EditGiftCard', { headerTitle: headerTitle, localimages: localimages, snapID: 0, lisT: [], isAllowed: false })
  //   }

  // }, [localimages])


  const RenderItem = () => {
    return (
      <>
        <View style={styles.cont}>

          {localimages.map((item, i) => (
            <View key={i}>
              <Image
                source={{ uri: item.uri }}
                style={{
                  borderRadius: 8, backgroundColor: '#f2f2f2',
                  width: 100,
                  height: 100,
                  marginHorizontal: 5,
                  justifyContent: 'flex-start',
                  marginBottom: 10,
                }}

              />
            </View>
          ))
          }
        </View>

      </>
    )
  }

  return (

    <>

      <View style={[styles2.container]}>

        <SafeAreaView
          style={{
            height: height,
            width: width,
            flex: 1,
            backgroundColor: 'transparent',
          }}
          edges={['left', 'right', 'top']}>
        <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />


          <HeaderBack navigation={navigation} headerTitle={'Upload ' + headerTitle} />


          {card_type === 'Ecode' ? (
            <></>
          ) : (

            <View style={[styles.whiteCardBg, { backgroundColor: isLoading ? '#000' : '#fff', height: '100%', paddingHorizontal: 15, }]}>

              <Image
                source={icon}
                style={styles.image}
              />

              <MyText
                style={{
                  marginTop: 10,
                  fontSize: 13,
                  textAlign: 'center',
                  color: isLoading ? '#fff' : '#343434',
                }}>
                You can select upto 5 {'\n'} {headerTitle} giftcards per trade
              </MyText>

              {!isLoading ? (

                <TouchableOpacity
                  onPress={openPicker}
                  style={styles.imgUpload}>
                  <Icon
                    name={'camera-alt'}
                    size={18}
                    color={'#808080'}
                    style={{
                      alignSelf: 'center', marginRight: 5,
                    }}></Icon>
                  <MyText
                    style={{
                      textAlign: 'center', alignSelf: 'center',
                      color: '#343434',
                      fontSize: 12,
                    }}>
                    Attach Images
                  </MyText>
                </TouchableOpacity>

              ) : (
                <>
                  <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center', paddingBottom: 15 }}>
                    <ActivityIndicator color={'#fff'} size={'small'} />
                    <MyText style={{ fontSize: 13, color: '#fff', marginLeft: 5, }}>{newText}</MyText>
                  </View>

                  <RenderItem />
                </>
              )}
            </View>

          )}


        </SafeAreaView>

        {isLoading ? (
          <>
          </>
        ) : (
          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center', paddingBottom: Platform.OS === 'ios' ? 60 : 30 }}>
            <Icon
              name={'info'}
              size={15}
              color={'#808080'}
              style={{ marginRight: 5, }}

            />
            <MyText style={{ fontSize: 13, marginTop: 0, color: '#343434' }}>Maximum of 5 images per upload</MyText>
          </View>
        )}


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


      <Modal isOpen={iscardVisible}
        style={{ height: Platform.OS == 'ios' ? moderateScale(260) : moderateScale(230), backgroundColor: 'transparent', }}
        keyboardTopOffset={Platform.OS == 'ios' ? 22 : 0}
        backdropPressToClose={true}
        swipeToClose={true}
        onClosed={CloseToggle}
        backdropOpacity={0.5}
        backdropColor="#000"
        position="bottom">

        <View style={[styles2.container, styles2.roundBorder, styles2.bgGrey, {}]}>

          <StatusBar translucent barStyle={'dark-content'} backgroundColor="transparent" />

          <View style={[styles2.modalLine, styles2.mt15, styles2.mb10, styles2.alignCenter]} />

          <View style={[styles2.newModalHeader, styles2.mb10]}>
            {card_type !== 'Ecode' ? (
              <MyText style={[styles2.userLabel, styles2.textCenter, styles2.fontSize15, styles2.mb10,]}>Select Card Type</MyText>
            ) : (
              <>
                <MyText style={[styles2.tinyLabel, styles2.textCenter, styles2.mb10,]}>How many {headerTitle} Ecodes do you have?</MyText>
              </>
            )}
          </View>

          <View style={[styles2.midBg, styles2.ph15, styles2.pt5, styles2.bgGrey,]}>

            {card_type !== 'Ecode' ? (
              <>
                <TouchableOpacity onPress={() => SubmitPhysical()}
                  style={[styles2.b20, styles2.shadow, styles2.RowB, styles2.mb10, styles2.bgWhite, styles2.pv15, styles2.ph15,]}>

                  <View style={[, { flexDirection: 'row' }]}>
                    <View style={[styles.roundClose2, styles2.mr10, { backgroundColor: '#17a258' }]}>
                      <Icons
                        name={'cards'}
                        size={20}
                        color={'#fff'}
                        style={{ alignSelf: 'center' }} />
                    </View>

                    <MyText style={[styles2.largeLabel3]}>Physical</MyText>
                  </View>

                  <View>
                    <Icon
                      name={'arrow-forward-ios'}
                      size={moderateScale(15)}
                      color={'#808080'}
                      style={{ marginTop: 6 }}></Icon>
                  </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => SubmitEcode()}
                  style={[styles2.b20, styles2.shadow, styles2.RowB, styles2.bgWhite, styles2.pv15, styles2.ph15,]}>

                  <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.roundClose2, styles2.mr10, { backgroundColor: '#1783a2' }]}>
                      <Icons
                        name={'credit-card-off'}
                        size={20}
                        color={'#fff'}
                        style={{ alignSelf: 'center' }} />
                    </View>

                    <MyText style={[styles2.largeLabel3]}>Ecode</MyText>
                  </View>

                  <View>
                    <Icon
                      name={'arrow-forward-ios'}
                      size={moderateScale(15)}
                      color={'#808080'}
                      style={{ marginTop: 6 }}></Icon>
                  </View>

                </TouchableOpacity>


              </>
            ) : (
              <>

                <View style={[styles2.Row]}>

                  {SelectData.map((i, index) => {

                    return (

                      <View key={i.id} style={[styles2.Row, styles2.mr5]}>

                        <TouchableOpacity
                          onPress={() => {
                            setEcodeVal([...Array(i.id)].map((_, i) => i));
                            setEVal(i.id);
                          }}>

                          <View style={[styles2.ph15, styles2.pv10, styles2.b5, styles2.borderWidthDark, styles2.shadow, {
                            backgroundColor: i.id === eVal ? '#1cc88a' : '#fff',
                          }]}>
                            <MyText style={[styles2.userLabel, styles2.fontSize15, { color: i.id === eVal ? '#fff' : '#343434', }]}>{i.label}</MyText>
                          </View>

                        </TouchableOpacity>
                      </View>

                    )

                  })}

                </View>


              </>
            )}

          </View>

        </View>

      </Modal>


    </>
  );
}

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
  whiteCardBg: {
    backgroundColor: '#f3f5f9',
    width: width,
    height: height,
    marginTop: 0,
    paddingVertical: 15,
    // paddingBottom: 40,
  },
  cont: {
    marginTop: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  image: {
    width: 30, marginBottom: 5,
    height: 30, borderRadius: 15,
    alignSelf: 'center'
  },
  img_container: {
    backgroundColor: '#000',
    height: 250,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
  },
  imageAttach: {
    marginTop: 0,
    alignSelf: 'center', flexDirection: 'row', justifyContent: 'center',
    backgroundColor: '#f9f9f9', height: 40,
    width: '100%', marginHorizontal: 15,
    borderRadius: 10, marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd', borderStyle: 'dashed',
  },
  imgUpload: {
    marginTop: 20,
    alignSelf: 'center', flexDirection: 'row', justifyContent: 'center',
    backgroundColor: '#f9f9f9', height: 70,
    width: '100%', marginHorizontal: 15,
    borderRadius: 15, marginBottom: 0, borderWidth: StyleSheet.hairlineWidth, borderColor: '#ddd', borderStyle: 'dashed',
  },

  header2: {
    width: width, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#ddd',
    height: 'auto', flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingBottom: 0,
    backgroundColor: '#fff',
  },
  roundClose: {
    backgroundColor: '#5f8692', width: 25, height: 24, marginTop: 20, borderRadius: 30, justifyContent: 'center', alignItems: 'center',
  },

  roundClose2: {
    backgroundColor: '#5f8692', width: 30, height: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center',
  },

  text: {
    alignSelf: 'center', marginTop: 0,
    paddingLeft: 0,
    width: '90%',
    fontSize: 13, marginRight: 0,
    height: 45,
    fontFamily: 'Nunito-Regular',
  },
  drop: {
    backgroundColor: '#fff',
    height: 'auto', borderRadius: 10,
    width: '100%', paddingHorizontal: 0, marginBottom: 10,
    paddingVertical: 0, borderWidth: StyleSheet.hairlineWidth, borderColor: '#ddd',
    alignSelf: 'center',
  },
  physicalBtn: {
    flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, width: '100%', height: 'auto',
    borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#f2f2f2'
  },
  submitBtn: {
    alignSelf: 'center',
    backgroundColor: '#1CC88A',
    width: '100%',
    borderRadius: 4,
    marginBottom: Platform.OS === 'ios' ? 40 : 10,
    padding: 10,
  },
  title: {
    color: '#343434', textAlign: 'left',
    fontSize: 16, fontFamily: 'Nunito-Bold', fontWeight: '600',
    marginVertical: 20,
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default UploadGiftCard;