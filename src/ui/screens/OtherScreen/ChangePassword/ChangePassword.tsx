import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './Style';
import MyText from '../../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import CustomToast from '../../../components/CustomToast/CustomToast';
import { useAuthStore } from '../../../../stores/store';
import { changePassword } from '../../../../redux/redux/actions/userAction';
const { width, height } = Dimensions.get('window');

const ChangePassword = ({ navigation }:any) => {
//  console.log('ChangePassword');
  // const dispatch = useDispatch();
  // const { userByID } = useSelector((state: any) => state.userReducer);
  const {user} = useAuthStore();
  const [id, setID] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [newpassword, setnewpassword] = useState('');
  const [repeatpassword, setrepeatpassword] = useState('');
  const [currentpassword, setcurrentpassword] = useState('');


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
   
    const showToast = (type:any, msg:any) => {
      setToastType(type);
      setToastMsg(msg);
      setShow(1);
      animateToast();
    };
  
      /* CUSTOM TOAST ENDS ============= */

  useEffect(() => {
    // async function getDetails() {
    //   const id = await AsyncStorage.getItem('id');
    //   // setID(id);
    //   // dispatch(getUserbyId(id));

    // }
    // getDetails();
  }, [])


  const handleChangePassword = () => {
    if(currentpassword == ''){
      showToast('Warning', 'Current password is required');
    }
  else if (newpassword == '') {
    showToast('Warning', 'New Password is required');
  } else if (repeatpassword == '') {
    showToast('Warning', 'Repeat Password is required');
  } else if (repeatpassword != newpassword) {      
    showToast('Warning', 'Password and Repeat Password needs to be thesame');
  } else {

    setisLoading(true);
    changePassword({currentPassword:currentpassword, newPassword:newpassword})
      .then((res) => {
        setisLoading(false);
        if(res.status){
        showToast('Success', 'Password changed successfully');
        setnewpassword('');
        setcurrentpassword('');
        setrepeatpassword('');
        } else {
        showToast('Warning', res.message);
        }
      })
      .catch((err) => {
        setisLoading(false);
        console.log("err", err.response.data.message);
        showToast('Warning',  err.response.data.message);
      })
    }
  }
  return (
    <View style={{ width: width, flex: 1, }}
    pointerEvents={isLoading ? "none" : "auto"}>

<SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}
        edges={['left', 'right', 'top']}>

<StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
 
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ marginLeft: 15, marginTop: 5 }}
            onPress={() => navigation.goBack(null)}>
            <Icon
              name={'arrow-back-ios'}
              size={20}
              color={'#343434'}
              style={{ marginTop: 10 }}></Icon>
          </TouchableOpacity>
          <MyText style={styles.headerHeading}>Change Password</MyText>
          <MyText></MyText>
        </View>

        <ScrollView style={[styles.whiteCardBg, { height: '100%',  paddingHorizontal: 15 }]}>

            <View style={styles.drop}>
                <TextInput
                  style={styles.text}
                  underlineColorAndroid="transparent"
                  textAlign={'left'}
                  placeholder={"Current Password"}
                  secureTextEntry={true}
                  onChangeText={(text) => setcurrentpassword(text)}
                />
              </View>

            <View style={styles.drop}>
              
                <TextInput
                  style={styles.text}
                  underlineColorAndroid="transparent"
                  textAlign={'left'}
                  placeholder={"New Password"}
                  secureTextEntry={true}
                  onChangeText={(text) => setnewpassword(text)}
                />
              </View>
              

            <View style={styles.drop}>
                <TextInput
                  style={styles.text}
                  underlineColorAndroid="transparent"
                  textAlign={'left'}
                  placeholder={"Repeat New Password"}
                  secureTextEntry={true}
                  onChangeText={(text) => setrepeatpassword(text)}
                />
            </View>

            {isLoading ? (
              <View style={{marginTop:25}}>
             <ActivityIndicator color={'#343434'} size={'small'} />
             </View>
            ) : (
              <TouchableOpacity
                onPress={handleChangePassword}
                style={[styles.sendBtn, {alignContent:'center', marginTop:10, }]}>
                <MyText style={styles.textbtn}>UPDATE</MyText>
              </TouchableOpacity>
            )}
            
        </ScrollView>
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

export default ChangePassword;
