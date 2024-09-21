import React, { useContext, useEffect, useRef, useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Animated,
  SafeAreaView,
  Button,
  TouchableHighlight,
  Keyboard,
  Platform
} from 'react-native';
import styles from './Style';
import SelectDropdown from 'react-native-select-dropdown';
import MyText from '../../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
const { width, height } = Dimensions.get('screen');
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { getOurRates, getStartingCodes } from '../../../../redux/redux/actions/cardAction';
import { RootState } from '../../../../redux/redux/store/store';
import CustomToast from '../../../components/CustomToast/CustomToast';
import { ActivityIndicator } from 'react-native-paper';
import RateModal from './RateModal';
import { checkCardRate } from '../../../../redux/redux/actions/tradeAction';



var admin_data = [];
var rateData = [];
var rateIds = [];
var rates = [];

const giftCards = ({ activeButton, bitcoin, giftCards, usdt }) => {
  const dispatch: any = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [cardvalue, setCardValue] = useState('');
  const [cardtype, setCardType] = useState(null);
  const [cardcountry, setCardCountry] = useState(null);
  const [cardname, setCardName] = useState(null);
  const [starting_code, setCardStarting] = useState(null);



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


  const [isLoading, setisLoading] = useState(false);
  const [nairavalue, setnairavalue] = useState(0);
  const startingCodesCards = ["VISA", "VANILLA", "AMERICAN EXPRESS", "WALMART"]
  const [codes,setCodes ] = useState([]);

  const [item, setItem] = useState('Select');
  const countryNames = [
    'US',
    'UK',
    'GERMANY',
    'CANADA',
    'NETHERLAND',
    'AUSTRALIA',
    'SINGAPORE',
    'Ireland',
    'Spain',
    'Belgium',
    'Italy',
    'France',
    'Greece',
    'Portugal',
  ];

  const cardNames = [
    'ITUNES',
    'STEAM',
    'GOOGLE PLAY',
    'SEPHORA',
    'AMERICAN EXPRESS',
    'VANILLA',
    'WALMART',
    'VISA',
    'EBAY',
    'AMAZON',
    'NORDSTROM',
    'NIKE',
    'FOOTLOCKER',
    'RAZER',
  ];

  const cardTypes = [
    'Physical',
    'Ecode',
    'Cash Receipt',
  ]

  useEffect(() => {
    setisLoading(false);
    if(startingCodesCards.includes(cardname)){
      getStartingCodes(cardname)
      .then(res=>{
         console.log("getStartingCodes", res);
         setCodes(res?.codes || []);
       } )
      .catch(err=>{
        console.log("get codes error", err);
      })
    }else{
      console.log("title is not one of cards", startingCodesCards);
    }

  }, [cardname])

  // const checkRate = () => {
  //   setisLoading(true);
  //   // dispatch(
  //   //   getOurRates({
  //   //     card_type: cardtype,
  //   //     country: cardcountry,
  //   //     card_value: cardvalue,
  //   //     title: cardname,
  //   //     starting_code: starting_code,

  //   //   })
  //   // )
  //   //   .then((res) => {
  //   //     setisLoading(false);
  //   //     // setnairavalue(res.rate * cardvalue);
  //   //     setnairavalue(0);

  //   //     openRate();
  //   //   })
  //   //   .catch((err) => {
  //   //     setisLoading(false);
  //   //     showToast('Warning', err.response.data.message)
  //   //   })

  //   setnairavalue(0);
  //   openRate();
  // };

  const checkRate = async () =>{
    setisLoading(true)
    const Body = {cardTitle:cardname, cardType:cardtype, cardValue:Number(cardvalue), cardCountry:cardcountry,startingCode:starting_code? String(starting_code) : ''};
    console.log("checkRate Body",Body);
    console.log("starting_code",starting_code);
   await checkCardRate(Body).then(res=>{
      console.log("response of checkRate", res);
      setisLoading(false);
      if(res.cardRate){
        setnairavalue(res.cardRate * Number(cardvalue));
        openRate()
      }else{
        showToast('Warning', "No Rate Found Against This Card")
      }
    },err=>{
      setisLoading(false);
      console.log("error of checkRate", err);
      showToast('Warning', err.response.data.message)
    })
  }
  const [isRateVisible, setisRateVisible] = useState(false);
  const openRate = () => {
    setisRateVisible(true);
  }

  const closeRate = () => {
    setisRateVisible(false);
  }

  return (
    <View style={styles.mainBodyPartOne}>
          <View style={[styles.partOneButtons]}>
        <MyText
          style={[styles.partOneButton, styles.JoinLeft, { ...giftCards }]}
          onPress={() => {
            activeButton('giftCards');
          }}>
          Giftcards
        </MyText>

        <MyText
          style={[styles.partOneButton, styles.JoinRight, { ...bitcoin }]}
          onPress={() => {
            activeButton('bitcoin');
          }}>
          Bitcoin
        </MyText>

                  <MyText
              style={[styles.partOneButton, styles.JoinRight, { ...usdt }]}
              onPress={() => {
                activeButton('usdt');
              }}>
              USDT
            </MyText>
        </View>
             
     

      <View style={styles.hr}></View>
     
     

      <ScrollView style={{ marginHorizontal: 15, marginTop: 10, }}>
        <View style={styles.dropDown}>
          <SelectDropdown
            // disabled={true}
            data={cardNames}
            onSelect={(selectedItem, index) => {
              setCardName(selectedItem);

            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            defaultButtonText={'Card Name'}
            renderDropdownIcon={isOpened => {
              return (
                <Icon
                  name={isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={18}
                  color={'#808080'}
                  style={{}}></Icon>
              );
            }}
            dropdownIconPosition={'right'}
            buttonTextStyle={styles.btnText}
            rowStyle={styles.rowStyle}
            rowTextStyle={{
              fontSize: 13,
              textAlign: 'center',
              width: '100%',
            }}
            buttonStyle={styles.dropDownBtn}
            dropdownStyle={{
              borderRadius: 8,
            }}
          />
        </View>

        <View style={styles.dropDown}>
          <SelectDropdown
            data={countryNames}
            onSelect={(selectedItem, index) => {
              setCardCountry(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            defaultButtonText={'Card Country'}
            renderDropdownIcon={isOpened => {
              return (
                <Icon
                  name={isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={18}
                  color={'#808080'}
                  style={{}}></Icon>
              );
            }}
            dropdownIconPosition={'right'}
            buttonTextStyle={styles.btnText}
            rowStyle={styles.rowStyle}
            rowTextStyle={{
              fontSize: 13,
              textAlign: 'center',
              width: '100%',
            }}
            buttonStyle={styles.dropDownBtn}
            dropdownStyle={{
              borderRadius: 8,
            }}
          />
        </View>


        <View style={styles.dropDown}>
          <SelectDropdown
            data={cardTypes}
            onSelect={(selectedItem, index) => {
              setCardType(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            defaultButtonText={'Card Type'}
            renderDropdownIcon={isOpened => {
              return (
                <Icon
                  name={isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={18}
                  color={'#808080'}
                  style={{}}></Icon>
              );
            }}
            dropdownIconPosition={'right'}
            buttonTextStyle={styles.btnText}
            rowStyle={styles.rowStyle}
            rowTextStyle={{
              fontSize: 13,
              textAlign: 'center',
              width: '100%',
            }}
            buttonStyle={styles.dropDownBtn}
            dropdownStyle={{
              borderRadius: 8,
            }}
          />
        </View>

        {codes && startingCodesCards.includes(cardname)  ? (

          <>
            <View style={styles.dropDown}>
              <SelectDropdown
                data={codes}
                onSelect={(selectedItem) => {
                  setCardStarting(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
                defaultButtonText={'Starting Code'}
                renderDropdownIcon={isOpened => {
                  return (
                    <Icon
                      name={isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                      size={18}
                      color={'#808080'}
                      style={{}}></Icon>
                  );
                }}
                dropdownIconPosition={'right'}
                buttonTextStyle={styles.btnText}
                rowStyle={styles.rowStyle}
                rowTextStyle={{
                  fontSize: 13,
                  textAlign: 'center',
                  width: '100%',
                }}
                buttonStyle={styles.dropDownBtn}
                dropdownStyle={{
                  borderRadius: 8,
                }}
              />
            </View>


          </>
        ) : null}

        <View style={styles.drop}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TextInput
              style={styles.text}
              underlineColorAndroid="transparent"
              onChangeText={text => setCardValue(text)}
              placeholder='Card Value e.g 100'
              placeholderTextColor="#808080"
              textAlign={'left'}
              editable={true}
              keyboardType="numeric"
            // multiline={true}
            />
          </View>
        </View>
        {isLoading ? (

          <View style={{ marginVertical: 5, }}>
            <ActivityIndicator size={'small'} color={'343434'} />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={checkRate}>
            <MyText style={{ fontSize: 13, color: '#fff', textAlign: 'center' }}>
              Check Rate
            </MyText>
          </TouchableOpacity>
        )}
      </ScrollView>


      <RateModal
        isOpen={isRateVisible}
        nairaValue={nairavalue}
        handleChange={closeRate}
      />

      {show !== 0 ? (

        <Animated.View
          style={{ transform: [{ translateY: slideAnim }], position: 'absolute', zIndex: 999, top: 0 }}>
          <CustomToast
            type={toastType}
            msg={toastMsg}
          />
        </Animated.View>
      ) : null}


    </View>
  );
};
export default giftCards;
