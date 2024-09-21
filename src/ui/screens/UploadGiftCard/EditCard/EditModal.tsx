import React, { useState, useEffect, useRef, Fragment, useCallback, Component } from 'react';
import {
  View, Text, ActivityIndicator, TextInput, Dimensions, Image,
  TouchableOpacity, ScrollView, StyleSheet, Platform, Animated, StatusBar, TouchableWithoutFeedback
} from 'react-native';
import MyText from '../../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomToast from '../../../components/CustomToast/CustomToast';
import FormValue from '../FormValue';
import { useAddTradeStore, useCardStore } from '../../../../stores/store';
import { checkCardRate } from '../../../../redux/redux/actions/tradeAction';
import newStyles from '../../Styles/Styles';
import { useTheme } from 'react-native-paper';

// let counter = 0;
const { width, height } = Dimensions.get('screen');

const EditModal = ({ route, navigation }) => {
  const CloudinaryBaseUrl = process.env.REACT_APP_CLOUDINARY_BASEURL;
  const { giftCards, tradeTitle, setGiftCards, activeGiftCard, codes } = useAddTradeStore();

  const GiftCard: any = giftCards[activeGiftCard];

  const theme = useTheme()
  const styles = newStyles(theme);

  const inputRef = useRef(null);

  const [card_value, setCardValue] = useState(GiftCard.cardValue);
  const [card_type, setCardType] = useState(GiftCard.cardType);
  const [country, setCardCountry] = useState(GiftCard.cardCountry);
  const [card_code, setCardCode] = useState(GiftCard.cardCode);
  const [starting_code, setCardStarting] = useState(GiftCard.startingCode);
  const [isLoading, setisLoading] = useState(false);


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

  const [Ctype, setCType] = useState(null);
  const [isvalueModal, setisValueModal] = useState(false);

  const openFormValue = (item: any) => {
    setCType(item);
    setisValueModal(true);
  }

  const closeFormValue = () => {
    setCType(null);
    setisValueModal(false);
  }



  // useEffect(() => { //Stores initial list to List states (runs only once)

  //   setList(list_ids);

  // }, [value]);

  const checkRate = async () => {
    setisLoading(true)
    const Body = { cardTitle: tradeTitle, cardType: GiftCard.cardType, cardValue: card_value, cardCountry: country, cardCode: card_code, startingCode: String(starting_code) };


    await checkCardRate(Body).then(res => {
      setisLoading(false);
      const UpdatedGiftCard = { ...GiftCard, cardValue: card_value, cardCountry: country, cardCode: card_code, startingCode: String(starting_code), cardRate: res?.cardRate, isChecked: true };

      const GiftCards = giftCards;
      GiftCards[activeGiftCard] = UpdatedGiftCard;
      setGiftCards(GiftCards);
      close()
    }, err => {
      setisLoading(false);

    })
  }


  // const handleRate = () => {

  //   setisLoading(true);


  // };



  const finalSubmit = async () => {
    inputRef.current.blur()
    if (!country || !card_value || !card_type) {
      <>

      </>
    } else {

      await checkRate()

    }
  }

  const close = () => {
    navigation.reset({
      index: activeGiftCard,
      routes: [{ name: 'EditGiftCard' }],
    });
  }


  return (
    
    <TouchableWithoutFeedback onPress={() => inputRef.current.blur()}>
    <View style={[styles.container, styles.midBgGrey]}
      pointerEvents={isLoading ? "none" : "auto"}>

<StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

      <SafeAreaView
        style={{
          flex: 1,
          height: '100%',
          width: width,
          backgroundColor: 'transparent',
        }}>

        <View style={[styles.RowB, styles.newModalHeader, styles.pb10]}>
          <TouchableOpacity
            onPress={() => isLoading ? null : close()}
            style={[styles.b30, styles.alignCenter, styles.bgWhite, styles.borderDark, styles.mt10, { width: moderateScale(30), height: moderateScale(30) }]}>
            <IconM
              name={'chevron-back'}
              size={moderateScale(15)}
              color={theme.dark ? '#fff' : '#343434'}
              style={{}} />

          </TouchableOpacity>

          <MyText style={[styles.userLabel, styles.fontSize15, styles.textDark, styles.mt15]}>
            Card #{activeGiftCard + 1}
          </MyText>

          {country === '' || !card_value || card_type === '' ? (

            <MyText style={[styles.userLabel, styles.b20, styles.borderWidthDark, styles.pv5, styles.ph15, styles.mt10, styles.fontSize13, styles.textCenter, styles.textGrey,]}>DONE</MyText>

          ) : (

            card_type === 'Ecode' ? (

              card_code === '' ? ( //card code check starts here
                <MyText style={[styles.userLabel, styles.b20, styles.borderWidthDark, styles.pv5, styles.ph15, styles.mt10, styles.fontSize13, styles.textCenter, styles.textGrey,]}>DONE</MyText>

              ) : (

                <>

                  <TouchableOpacity
                    disabled={isLoading}
                    onPressIn={() => finalSubmit()}
                    style={[styles.bgGreen, styles.mt10, styles.pv5, styles.ph15, styles.b20, {}]}>
                    <MyText style={[styles.userLabel, styles.fontSize13, styles.textCenter, styles.textWhite]}>DONE</MyText>

                  </TouchableOpacity>

                </>

              ) //card code check ends here

            ) : (
              <>

                <TouchableOpacity
                    onPressIn={() => finalSubmit()}
                    style={[styles.bgGreen, styles.mt10, styles.pv5, styles.ph15, styles.b20, {}]}>
                    <MyText style={[styles.userLabel, styles.fontSize13, styles.textCenter, styles.textWhite]}>DONE</MyText>

                </TouchableOpacity>

              </>
            )

          )}

        </View>


        <ScrollView style={[styles.iosBar, { flex: 1, }]}>

          <View style={[styles.alignCenter]}>
            <TouchableOpacity
              activeOpacity={0.9}>

              {card_type === 'Ecode' ? (
                <View style={[styles.alignCenter, { backgroundColor: '#daf4eb' }]}>
                  <Text style={[styles.userLabel, styles.fontSize20, styles.textDark, styles.textCenter]}>{tradeTitle} ECODE</Text>
                  {card_code ? (
                    <>
                      <MyText style={[styles.userLabel, styles.fontSize17, styles.textCenter]}>{card_code}{'\n'}</MyText>
                      <MyText style={[styles.userLabel, styles.fontSize17, styles.textCenter]}>{country} | {card_value}</MyText>
                    </>
                  ) : (
                    <MyText style={{ fontSize: 80 }}>{activeGiftCard + 1}</MyText>
                  )}
                </View>
              ) : (
                <Image
                  style={{
                    width: width,
                    height: moderateScale(300),
                    alignSelf: 'center',
                  }}
                  resizeMode={'contain'}
                  source={{ uri: GiftCard.imageUri || CloudinaryBaseUrl + GiftCard?.cardImage }}
                />
              )}

            </TouchableOpacity>

          </View>


          <View style={[styles.ph10, styles.mt5]}>

            <View style={[styles.formWhite, styles.shadow, styles.b30, styles.bgWhite, styles.ph5, styles.pb10, styles.mb5]}>

              <View style={[styles.formWhite, styles.bgWhite, styles.roundBorderTop, styles.pb10, styles.pt10, styles.mt5]}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => openFormValue('Country')}
                  style={[styles.ph15, styles.mb15]}>

                  <MyText style={[styles.tinyLabel, styles.fontSize11, styles.mt10]}>Card country</MyText>

                  <View style={[styles.RowB, {}]}>
                    <MyText style={[styles.userLabel, styles.fontSize14, styles.mt10]}>{country ? country : 'Please select a country'}</MyText>

                    <IconM
                      name={'chevron-down'}
                      size={moderateScale(20)}
                      color={'#808080'}
                      style={{ marginTop: 5, }} />

                  </View>

                </TouchableOpacity>

                {tradeTitle === 'AMAZON' ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => openFormValue('Type')}
                    style={[styles.ph15, styles.mb15]}>

                    <MyText style={[styles.tinyLabel, styles.fontSize11, styles.mt10]}>Card type</MyText>

                    <View style={[styles.RowB, {}]}>
                      <MyText style={[styles.userLabel, styles.fontSize14, styles.mt10]}>{card_type ? card_type : 'Please select card type'}</MyText>

                      <IconM
                        name={'chevron-down'}
                        size={moderateScale(20)}
                        color={'#808080'}
                        style={{ marginTop: 5, }} />

                    </View>

                  </TouchableOpacity>
                ) : null}


                {codes && tradeTitle === 'VISA' || tradeTitle === 'VANILLA' || tradeTitle === 'AMERICAN EXPRESS' ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => openFormValue('Starting')}
                    style={[styles.ph15, styles.mb15]}>

                    <MyText style={[styles.tinyLabel, styles.fontSize11, styles.mt10]}>Starting code</MyText>

                    <View style={[styles.RowB, {}]}>
                      <MyText style={[styles.userLabel, styles.fontSize14, styles.mt10]}>{starting_code ? starting_code : 'Please choose starting code'}</MyText>

                      <IconM
                        name={'chevron-down'}
                        size={moderateScale(20)}
                        color={'#808080'}
                        style={{ marginTop: 5, }} />

                    </View>

                  </TouchableOpacity>
                ) : null}

              </View>

              <View style={[styles.ph10]}>

                <MyText style={[styles.textDark, styles.pl5, styles.fontRegular, styles.fontSize11, styles.mt10]}>Card Value</MyText>
                <TextInput
                  style={[styles.drop, styles.lineBottomDark, styles.textDark, styles.fontSize14, styles.fontRegular,]}

                  onChangeText={(text) => {
                    //    handleSaveValue(index, text);
                    setCardValue(Number(text))
                  }}
                  value={String(card_value || '')}
                  underlineColorAndroid="transparent"
                  placeholder='e.g 100'
                  placeholderTextColor="#808080"
                  textAlign={'left'}
                  numberOfLines={1}
                  ref={inputRef}
                  keyboardType="numeric"
                />


                <MyText style={[styles.tinyDark, styles.pl5, styles.fontSize11, styles.mt10]}>Card code {card_type === 'Ecode' ? '' : '(Optional)'}</MyText>
                <TextInput
                  style={[styles.drop, styles.fontSize14, styles.textDark, styles.mb10, styles.fontRegular,]}
                  onChangeText={text => {
                    //     handleSaveCode(index, text);
                    setCardCode(text)
                  }}
                  value={card_code}
                  underlineColorAndroid="transparent"
                  placeholder={'e.g XGH7CHF75GSJCBFJG'}
                  placeholderTextColor="#808080"
                  textAlign={'left'}
                  ref={inputRef}
                  autoCapitalize="characters"
                  numberOfLines={1}

                />
              </View>

            </View>

          </View>


        </ScrollView>


        <FormValue
          isOpen={isvalueModal}
          handleChange={closeFormValue}
          type={Ctype}
          data={codes}
          cardC={(item) => setCardCountry(item)}
          cardT={(item) => setCardType(item)}
          cardS={(item) => setCardStarting(item)}
        />
      </SafeAreaView>

      {isLoading ? (
          <View style={[styles.loader, styles.alignCenter]}>
            <ActivityIndicator color={'white'} size={'large'} />
          </View>
        ) : null}


      {
        show !== 0 ? (

          <Animated.View
            style={{ transform: [{ translateY: slideAnim }], position: 'absolute', zIndex: 999, bottom: 0 }}>
            <CustomToast
              type={toastType}
              msg={toastMsg}
            />
          </Animated.View>
        ) : null
      }

    </View >

    </TouchableWithoutFeedback>
  );
};


const stylesf = StyleSheet.create({
  header: {
    width: width,
    height: 'auto',
    backgroundColor: '#000',
    marginBottom: 0,
    paddingBottom: 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  headerHeading: {
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 0,
    marginTop: 14,
    color: '#343434',
  },
  whiteCardBg: {
    backgroundColor: '#fff',
    width: width,
    marginTop: 0,
    paddingVertical: 15,
    // paddingBottom: 40,
  },
  image: {
    width: 30,
    height: 30,
  },
  bodyHeader: {
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 0,
    borderColor: 'rgba(0,0,0,0.2)',
    paddingBottom: 15,
  },
  bottomContainerForIos: {
    height: 40,
    width: '100%',
    backgroundColor: 'transparent',
  },
  img: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#f2f2f2',
    marginHorizontal: 0
  },

  text: {
    alignSelf: 'center', marginTop: 0,
    paddingLeft: 0,
    width: '90%', color: '#343434',
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
  textcard: {
    backgroundColor: '#fff',
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#f2f2f2',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textfill: {
    fontSize: 13,
    marginVertical: 10,
    textAlign: 'center',
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
  hr: {
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
    width: '100%'
  },
  img_container: {
    backgroundColor: '#000',
    height: 300,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
  },

  dropDown: {
    backgroundColor: '#fff',
    height: 'auto',
    width: '100%',
    paddingHorizontal: 0,
    marginBottom: 10,
    paddingVertical: 0,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: StyleSheet.hairlineWidth,
    alignSelf: 'center',
  },
  dropDownBtn: {
    width: '100%',
    height: 45, backgroundColor: 'transparent',
  },
  rowStyle: {
    backgroundColor: '#f9f9f9', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#ddd', width: '100%'
  },
  btnText: {
    textAlign: 'left',
    fontSize: 13,
    color: '#343434',
    fontFamily: 'Nunito-Regular',
  },
  submitBtn: {
    alignSelf: 'center',
    backgroundColor: '#1CC88A',
    width: '100%',
    borderRadius: 4,
    marginBottom: 10,
    padding: 10,
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

export default EditModal;
