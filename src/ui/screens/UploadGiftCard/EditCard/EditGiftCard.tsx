import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyText from '../../../components/DefaultTextComponent/MyText';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import CancelModal from '../CancelModal';
import { getStartingCodes } from '../../../../redux/redux/actions/cardAction';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SubmitTradeModal from '../SubmitTradeModal';
import { useAddTradeStore } from '../../../../stores/store';
import newStyles from '../../Styles/Styles';
import { moderateScale } from 'react-native-size-matters';
import PopupTutorial from '../../../components/PopupTutorial/PopupTutorial';
import { useTheme } from 'react-native-paper';


const { width, height } = Dimensions.get('screen');


const CardModal = ({ route, navigation }) => {
  const CloudinaryBaseUrl = process.env.REACT_APP_CLOUDINARY_BASEURL;
  const { giftCards, tradeTitle, setActiveGiftCard, activeGiftCard, setCodes } = useAddTradeStore();

  const [popup, setPopup] = useState(false);

  const theme = useTheme()
  const styles = newStyles(theme);

  const isAllowed = true;
  const title = tradeTitle.toUpperCase();
  const [swipeIndex, setSwipeIndex] = React.useState(activeGiftCard);

  const [canSubmit, setCanSubmit] = useState(true);
  const [isAllow, setisAllow] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isSubmitModal, setisSubmitModal] = useState(false);


  const startingCodesCards = ["VISA", "VANILLA", "AMERICAN EXPRESS", "WALMART"]

  useEffect(() => {
    setisLoading(false);
    if (startingCodesCards.includes(title)) {
      getStartingCodes(title)
        .then(res => {
          setCodes(res?.codes || []);
        })
        .catch(err => {
        })
    } else {
    }

    // setCanSubmit(true)
    giftCards.forEach(giftcard => {
      if (!giftcard.isChecked) {
        setCanSubmit(false);
        return;
      }
    })

       AsyncStorage.getItem('tutorialGift')
       .then(value => {
         if(!value){
           setPopup(true)
         }
       })
   

  }, [])


  const closePopup = () => {
    setPopup(false);
    AsyncStorage.setItem('tutorialGift', 'true')
  }

  // useEffect(() => {
  //   setDataFinal(giftCards);
  //   // setList(lisT);

  //   setTimeout(() => {
  //     setisLoading(false);
  //   }, 500);


  //   let isDone = false;
  //   dataFinal.forEach((item) => {
  //     if (item.done == '1')
  //       isDone = true;

  //     else
  //       isDone = false;
  //   })

  //   if (isDone)
  //     setCanSubmit(true);

  // }, [list]);


  const [isModalVisible, setisModalVisible] = useState(false);

  const openModal = () => { // cancel modal open
    setisModalVisible(true);
  }

  const closeModal = () => { // cancel modal close
    setisModalVisible(false);
  }

  const ActionModal = () => { // cancel modal action

    navigation.reset({
      index: 0,
      routes: [{ name: 'DashBoard' }, { name: 'SelectGiftCard' }],
    });

  }


  const openSubmitModal = () => {
    setisSubmitModal(true);
  }

  const closeSubmitModal = () => {
    setisSubmitModal(false);
  }


  const openEditCard = () => { // This opens the editModal navigation

    setActiveGiftCard(swipeIndex);
    navigation.navigate('EditModal');

  };


  const finalSubmit = () => {

    //   setTimeout(() => {
    openSubmitModal();
    //  }, 500);

  }




  const carouselRender = ({ item, index }) => {
    // console.log("items",{ item, index });

    return (
      <View key={index}>
        <ScrollView>
          <View style={[styles.alignCenter, styles.mt20, { flex: 1, height: 'auto' }]}>

            <View style={[styles.b20]}>
              <TouchableOpacity
                activeOpacity={0.8}

                onPress={() => openEditCard()}>

                {item.cardType === 'Ecode' ? (

                  <View style={[styles.alignCenter, { backgroundColor: '#daf4eb' }]}>
                    <Text style={[styles.userLabel, styles.fontSize20, styles.textDark, styles.textCenter]}>{tradeTitle} ECODE</Text>
                    {item.cardCode !== '' ? (
                      <>
                        <MyText style={[styles.userLabel, styles.fontSize17, styles.textCenter]}>{item.cardCode}{'\n'}</MyText>
                        <MyText style={[styles.userLabel, styles.fontSize17, styles.textCenter]}>{item.cardCountry} | {item.cardValue}</MyText>
                      </>
                    ) : (
                      <MyText style={{ fontSize: 80 }}>{index + 1}</MyText>
                    )}
                  </View>

                ) : (
                  <Image
                    style={[styles.b20, styles.alignCenter, {
                      width: width - 80,
                      height: moderateScale(200),
                    }]}
                    resizeMode={'cover'}
                    source={{ uri: item.imageUri || CloudinaryBaseUrl + item?.cardImage }} />
                )}

              </TouchableOpacity>
            </View>

            {item.isChecked ? (
              <IconM
                name={"checkmark-circle"}
                color={'#1cc88a'}
                size={moderateScale(40)}
                style={[styles.alignCenter, styles.mt20]}
              />
            ) : (

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => openEditCard()}>
                <View style={[styles.b30, styles.Row, styles.mt20, styles.bgWhite, styles.p10, styles.alignCenter, styles.borderWidthDark]}>
                  <Icon
                    name={"edit"}
                    color={theme.dark ? '#fff' : '#343434'}
                    size={moderateScale(15)}
                    style={{ alignSelf: 'center', marginRight: 4, }}
                  />
                  <MyText style={[styles.userLabel, styles.fontSize13, styles.textDark]}>Fill in card details</MyText>
                </View>
              </TouchableOpacity>

            )}

          </View>
        </ScrollView>
      </View>

    )
  }



  return (


    <View style={[styles.container, styles.midBgGrey, {}]}>

<StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

      <SafeAreaView
        style={{
          flex: 1,
          height: '100%',
          width: width,
          backgroundColor: 'transparent',
        }}>

        <View style={[styles.RowB, styles.newModalHeader]}>
          <TouchableOpacity
            onPress={openModal}
            style={[styles.b30, styles.alignCenter, styles.bgWhite, styles.borderDark, styles.mt10, { width: moderateScale(30), height: moderateScale(30) }]}>
            <IconM
              name={'close'}
              size={moderateScale(15)}
              color={theme.dark ? '#fff' : '#343434'}
              style={{}} />

          </TouchableOpacity>
          <MyText>
          </MyText>

          {canSubmit ? (
            <>
              {isAllowed ? (
                <TouchableOpacity
                  style={[styles.bgGreen, styles.mt10, styles.pv5, styles.ph15, styles.b20, {}]}
                  onPress={finalSubmit}>
                  <MyText style={[styles.userLabel, styles.fontSize13, styles.textCenter, styles.textWhite]}>SUBMIT</MyText>
                </TouchableOpacity>
              ) : (
                <MyText style={[styles.userLabel, styles.b20, styles.borderWidthDark, styles.pv5, styles.ph15, styles.mt10, styles.fontSize13, styles.textCenter, styles.textGrey,]}>SUBMIT</MyText>
              )}
            </>
          ) : (<MyText style={[styles.userLabel, styles.b20, styles.borderWidthDark, styles.pv5, styles.ph15, styles.mt10, styles.fontSize13, styles.textCenter, styles.textGrey,]}>SUBMIT</MyText>
          )}

        </View>

        <View style={[styles.alignCenter, styles.mt20, { flex: 1 }]}>
          <Carousel
            data={giftCards}
            renderItem={carouselRender}
            sliderWidth={width}
            itemWidth={width - 80}
            layout={'default'}
            firstItem={activeGiftCard || 0}
            onSnapToItem={index => {
              setSwipeIndex(index);
            }}

          />
          {/*}
          <MyText style={[styles.userLabel, styles.textCenter]}>Click on each card image to fill in card details {'\n'}
          </MyText>
            */}
        </View>

      </SafeAreaView>


      <Pagination
        dotsLength={giftCards.length}
        activeDotIndex={swipeIndex}
        containerStyle={[styles.alignCenter, styles.bgLightGrey, { height: moderateScale(70), }]}
        dotStyle={[styles.b5, styles.bgDark, { width: moderateScale(25), height: moderateScale(5),  }]}
        inactiveDotStyle={{ backgroundColor: '#808080' }}
      />

      <PopupTutorial
        isOpen={popup}
        iconName={'bulb'}
        text={'How to trade'}
        subText={"Select each card image to input its details, then click 'Submit' when finished"}
        handleChange={closePopup}
      />


      {isAllowed ? (
        <SubmitTradeModal
          isOpen={isSubmitModal}
          handleChange={closeSubmitModal}
          navigation={navigation}
        //   userid={userID}
        />
      ) : null}

      <CancelModal
        isVisible={isModalVisible}
        handleChange={closeModal}
        onPressAction={ActionModal}
        setisAllow={setisAllow}
      />

    </View>
  );
};


export default CardModal;