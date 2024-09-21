import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableNativeFeedback,
  Keyboard,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyText from '../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import Header from '../../components/ModeratePageCard/Header';
import { useDispatch } from 'react-redux';
import { useToast } from 'native-base';
import { setNewpass } from '../../../redux/redux/actions/userAction';

const { width, height } = Dimensions.get('screen');

const ResetPassword = ({ route, navigation }) => {
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { email } = route?.params

  const dispatch = useDispatch();
  const toast = useToast();


  const handleSubmit = () => {

    setIsLoading(true);
    dispatch(setNewpass({
      email: email,
      pass: pass1,
      repeatpass: pass2,
    }))
      .then((res) => {
        setIsLoading(false);
        toast.show({
          title: res.message
        })
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignInScreen' }]
        })
      })

      .catch((err) => {
        setIsLoading(false);
        toast.show({
          title: err.response.data.message
        })
      });
  }

  return (
    <View
      style={{
        flex: 1,
        height: height,
        width: width,
        backgroundColor: '#f3f5f9',
      }}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#f3f5f9',
        }}>

        <ScrollView>
          <View style={[styles.Bg, { flex: 1 }]}>
            <View
              style={{
                alignSelf: 'center', marginBottom: 10,
              }}>
              <Image
                source={require('../../../Assets/fejoraLogo.png')}
                style={styles.image}
              />
            </View>

            <View>
              <Text style={[styles.Heading]}>Create New Password</Text>

              <MyText style={[styles.subHeading]}>
                Enter you new password below
              </MyText>
            </View>

            <View style={styles.drop}>
              <TextInput
                style={[styles.text, {}]}
                placeholder={'New Password'}
                secureTextEntry
                onChangeText={text => setPass1(text)}
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
                style={[styles.text, {}]}
                placeholder={'Repeat New Password'}
                secureTextEntry
                onChangeText={text => setPass2(text)}
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
            {isLoading ? (
              <View style={{justifyContent:'center',alignSelf:'center', marginTop:20}}>
                  <ActivityIndicator color={'#343434'} size={'small'} />
                  </View>
                ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPressIn={() => handleSubmit()}
                style={[styles.GreenButton, { alignItems: 'center' }]}>
                  <MyText style={styles.buttonText}>Change Password</MyText>
                
              </TouchableOpacity>
                )}
            </View>


            <View style={styles.BottomRowContainer1}>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('SignInScreen');
                }}
                style={{
                  flexDirection: 'row', backgroundColor: '#f9f9f9', marginTop: 30,
                  paddingVertical: 10, borderRadius: 20, elevation: 1, paddingHorizontal: 40
                }}>
                <Icon
                  name={'lock-open'}
                  size={18}
                  color={'#808080'}
                  style={{
                    marginRight: 5,
                    marginTop: 0,
                  }}></Icon>
                <MyText
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: '#343434',
                    marginVertical: 0
                  }}>Login
                </MyText>

              </TouchableOpacity>
            </View>
            {Platform.OS == 'ios' ? (
              <View style={styles.bottomContainerForIos} />
            ) : null}

          </View>

        </ScrollView>


      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    width: RFValue(150),
    height: RFValue(50),
    marginTop: 0,
  },
  Bg: {
    //flex: 75,
    //height: '75%',
    backgroundColor: '#f3f5f9',
    width: width,
    alignSelf: 'flex-end',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  Heading: {
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 10,
    fontFamily: 'Nunito-Bold',
    color: '#343434',
  },
  subHeading: {
    fontWeight: '400',
    alignSelf: 'center',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 20,
    color: '#808080',
  },
  GreenButton: {
    borderRadius: 8,
    paddingHorizontal: RFValue(10),
    paddingVertical: Platform.OS === 'android' ? RFValue(9) : RFValue(12),
    marginTop: RFValue(22),
    textAlignVertical: 'center',
    justifyContent:'center',
    height: RFValue(40),
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

  BottomRowContainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
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
    height: 45,
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
});

export default ResetPassword;
