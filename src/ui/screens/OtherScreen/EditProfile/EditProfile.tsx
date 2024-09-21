import React, { Fragment, useContext, useEffect, useRef, useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Button,
  KeyboardAvoidingView,
  StatusBar,
  Keyboard,
  Animated,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyText from '../../../components/DefaultTextComponent/MyText';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Style';
// import {
//   editUserDetails,
//   updateBankDetails,
// } from '../../../../redux/redux/actions/authAction';
// import { getBanks } from '../../../../redux/redux/actions/transactionAction';
// import { ResolveAccountNumber } from '../../../../redux/redux/actions/userAction';

import CustomToast from '../../../components/CustomToast/CustomToast';
import BankModal from './BankModal';
import { getProfile,getBankNames, editBankDetails } from '../../../../redux/redux/actions/userAction';

const { width, height } = Dimensions.get('screen');

const EditProfile = ({ navigation, route }) => {

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bankName, setBankName] = useState('');         //name of the bank
  const [accountName, setAccountName] = useState('');       //name of acccount
  const [bankAccount, setBankAccount] = useState('');    //account number
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [bank_names_loading, setbankNamesLoading] = useState(false);
  const [bankCode, setBankCode] = useState('');
  const [resolve, setResolve] = useState(false);
  const [isbankModal, setisBankModal] = useState(false);
  const [bank_names, setBankNames] = useState([]);
  const [nextPageCode, setNextPageCode] = useState('');
  const [currentPageCode, setCurrentPageCode] = useState('');
  const [noMoreData, setNoMoreData] = useState(false);
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


  const openBank = () => {
    setisBankModal(true);
  }

  const closeBank = () => {
    setisBankModal(false);
  }

  useEffect(() => {
    getProfile().then((res) => {
        setName(res?.user?.username);
        setEmail(res?.user?.email);
        setPhone(res?.user?.phone);
        setFullName(res?.user?.fullName);
        setBankName(res?.bankName);
        setAccountName(res?.accountTitle);
        setBankAccount(res?.accountNumber);
        setBankCode(res?.bankCode);
    }, (error) => {
      console.log('error', error);
    })
  }, []);

  useEffect(() => {
    setbankNamesLoading(true);
    console.log('currentPageCode', currentPageCode);
    getBankNames(currentPageCode).then((res) => {
        if(res?.meta.previous==null){
          console.log('no previous data');
          setBankNames(res?.response);
        }else{
          console.log('previous data');
          setBankNames([...bank_names, ...res?.response]);
        }
        if(res?.meta.next==null){
          console.log('no more data');
          setNoMoreData(true);
          setNextPageCode('');
        }
        setNextPageCode(res?.meta.next);
    }, (error) => {
      console.log('error getBankNames', error);
      setNoMoreData(false);
    }).finally(() => {
      setbankNamesLoading(false);
    })


  }, [currentPageCode]);




  // useEffect(() => {
  //   if (route?.params.bank !== undefined) {
  //     setAccountName(route?.params.bank.accountName);
  //     setBankAccount(route?.params.bank.accountNumber);
  //   }
  // }, []);

  // useEffect(() => {

    
  //   // dispatch(getBanks())
  //   //   .then((res) => {
  //   //     setbankNamesLoading(false);
  //   //   })
  //   //   .catch((err) => {
  //   //     showToast('Warning', 'An error occured fetchng banks. Check your connection or ty again later')
  //   //   })
  // }, [])


  // useEffect(() => {
  //   if (bankAccount?.length == 10) {
  //     setResolve(true);

  //     // dispatch(
  //     //   ResolveAccountNumber({
  //     //     accno: bankAccount,
  //     //     bankcode: bankCode
  //     //   })
  //     // )
  //     //   .then((res) => {
  //     //     setResolve(false);
  //     //     setAccountName(res.data.account_name);
  //     //  /*   //   toast.show({
  //     //     //     title: res.message
  //     //     //   })
  //     //     */
  //     //   })
  //     //   .catch((err) => {
  //     //     setAccountName('')
  //     //     setResolve(false);
  //     //     showToast('Warning', 'Account number does not exist')

  //     //   })
  //   }

  // }, [bankAccount])

  const updateBankDetails = async () => {
   await editBankDetails({bankName,bankCode,accountNumber:bankAccount}).then((res) => {
      showToast('Success', 'Bank details updated successfully');
      setIsLoading(false);
      
    }, (error) => {
      console.log('error', error);
      const {data} = error.response;
      showToast( "Error",data?.message);
      setIsLoading(false);
    })
  }

  const handleUpdate = async () => {

    try {
      setIsLoading(true);
     await updateBankDetails();
    } catch (error) {
      setIsLoading(false);

    }

  };

  return (
    <View style={{ width: width, flex: 1 }}
      pointerEvents={isLoading ? "none" : "auto"}>
      <SafeAreaView
        style={{
          flex: 1,
          height: '100%',
          width: width,
          backgroundColor: '#fff',
        }}
        edges={['left', 'right', 'top']}>
        <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />

        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ marginLeft: 15, marginTop: 5 }}
            onPress={() => navigation.goBack(null)}>
            <Icons
              name={'arrow-back-ios'}
              size={20}
              color={'#343434'}
              style={{ marginTop: 10 }}></Icons>
          </TouchableOpacity>
          <MyText style={styles.headerHeading}>Edit Profile</MyText>
          <MyText></MyText>
        </View>


        <ScrollView>
          <View style={[styles.whiteCardBg, { height: '100%', paddingHorizontal: 15 }]}>

            <MyText
              style={{
                fontSize: 10,
                color: '#8e8c8d',
                marginTop: RFValue(20),
                marginBottom: 10,
                marginHorizontal: 20,
              }}>
              PROFILE
            </MyText>
            <View style={[styles.drop, { backgroundColor: '#f2f2f2' }]}>
              <TextInput
                style={styles.text}
                underlineColorAndroid="transparent"
                textAlign={'left'}
                value={name}
                editable={false}
              />
              <Icon
                name={'account-child'}
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
                underlineColorAndroid="transparent"
                textAlign={'left'}
                placeholder={'Full Name'}
                numberOfLines={1}
                value={fullName}
                onChangeText={text => setFullName(text)}
              />

              <Icon
                name={'account-box-outline'}
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
                underlineColorAndroid="transparent"
                textAlign={'left'}
                keyboardType="numeric"
                placeholder={'Phone Number'}
                numberOfLines={1}
                value={phone}
                onChangeText={text => setPhone(text)}
              />

              <Icon
                name={'phone-outline'}
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
                underlineColorAndroid="transparent"
                textAlign={'left'}
                placeholder={'Email Address'}
                numberOfLines={1}
                value={email}
                onChangeText={text => setEmail(text)}
              />

              <Icon
                name={'at'}
                size={20}
                color={'#808080'}
                style={{
                  marginRight: 10,
                  marginTop: 12,
                }}></Icon>
            </View>



            <MyText style={{
              marginHorizontal: 20,
              marginTop: RFValue(30),
              marginBottom: 20, fontSize: 10, color: '#8e8c8d'
            }}>
              BANK DETAILS
            </MyText>


            <View style={styles.dropDown}>

              {bank_names_loading ? (
                <View style={{ height: 45, justifyContent: 'center' }}>
                  <ActivityIndicator size={"small"} color={"#343434"} />
                </View>
              ) : (

                <>

                  <TouchableOpacity
                    onPress={() => openBank()}
                    style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <MyText style={[styles.text, { height: 45, paddingTop: 12 }]}>
                      {bankName ? (
                        <>
                          {bankName}
                        </>
                      ) : (
                        <>
                          Select Bank
                        </>
                      )}
                    </MyText>

                    <Icon
                      name={'chevron-down'}
                      size={18}
                      color={'#808080'}
                      style={{ marginRight: 15, paddingTop: 12 }} />

                  </TouchableOpacity>

                  {/*    <SelectDropdown
                  data={bank_names?.data}
                  onSelect={(selectedItem, index) => {
                    setBankName(selectedItem.name);
                    setBankAccount(null);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    setBankCode(selectedItem.code);
                    return selectedItem.name;
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item?.name;
                  }}
                  defaultValue={
                    route?.params.bank !== undefined
                      ? route?.params.bank.bankName
                      : bankName
                  }
                  defaultButtonText={bankName}
                  renderDropdownIcon={isOpened => {
                    return (
                      <Icon
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
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

                */}

                </>
              )}

            </View>


            <View style={styles.drop}>
              <TextInput
                style={styles.text}
                underlineColorAndroid="transparent"
                keyboardType='numeric'
                placeholder={'Account Number'}
                textAlign={'left'}
                numberOfLines={1}
                value={bankAccount && bankAccount.toString()}
                onChangeText={text => setBankAccount(text)}
                maxLength={10}
              />

              <Icon
                name={'dialpad'}
                size={20}
                color={'#808080'}
                style={{
                  marginRight: 10,
                  marginTop: 12,
                }}></Icon>
            </View>


            {resolve ? (
              <View style={[styles.dropDown, { marginTop: 10 }]}>
                <View style={{ height: 45, justifyContent: 'center' }}>
                  <ActivityIndicator size={'small'} color={'#343434'} />
                </View>
              </View>
            ) : (
              <View style={styles.drop}>
                <TextInput
                  style={styles.text}
                  underlineColorAndroid="transparent"
                  textAlign={'left'}
                  placeholder={'Name on Account (Not Required)'}
                  numberOfLines={1}
                  value={accountName}
                  editable={false}
                />

                <Icon
                  name={'badge-account-horizontal-outline'}
                  size={20}
                  color={'#808080'}
                  style={{
                    marginRight: 10,
                    marginTop: 12,
                  }}></Icon>

              </View>
            )}


            <View style={{}}>
              {isLoading ? (
                <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 20 }}>
                  <ActivityIndicator color={'#343434'} size={'small'} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleUpdate}
                  disabled={
                    !bankAccount ||
                    !bankName
                  }
                  // onPress={() => navigation.navigate('AdminWithdrawalHome')}
                  style={styles.submitBtn}>
                  <MyText
                    style={{
                      textAlign: 'center',
                      color: '#fff',
                      fontSize: 13,
                      padding: 10,
                    }}>
                    UPDATE
                  </MyText>

                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>

        <BankModal
          isOpen={isbankModal}
          nextPage={(page) => {
            !noMoreData ? setCurrentPageCode(nextPageCode) 
            : console.log('no more data')
          }}
          isLoading={bank_names_loading}
          handleChange={closeBank}
          data={bank_names}
          bankName={(item) => {
            setBankName(item);
            setBankAccount('');
          }}
          bankCode={(item) => setBankCode(item)}
        />

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
    </View>
  );
};

export default EditProfile;
