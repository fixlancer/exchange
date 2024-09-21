import React, {useContext, useEffect, useMemo, useState} from 'react';
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
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyText from '../../components/DefaultTextComponent/MyText';
import Header from '../../components/ModeratePageCard/Header';
import AlertIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import Navbar from '../../components/Navbars/Navbar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');

const TradeSuccesfullScreen2 = ({navigation}) => {
  return (
    <View style={{height: height, width: width, flex: 1}}>
    {/* <StatusBar hidden /> */}
    <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
      
      <SafeAreaView
        style={{
          flex: 1,
          height: height,
          width: width,
          backgroundColor: '#fff',
        }}>
          
          <View style={[styles.whiteCardBg]}>
            
            <View style={{justifyContent: 'center'}}>
              
          <View
        style={{
          paddingHorizontal: 12,
          marginBottom: 0,
          width:'90%',
          alignSelf: 'center',
          marginHorizontal:20,
          paddingVertical:8,
        }}>
          <Image
              source={require('../../../Assets/suc.png')}
              style={styles.tickImage}
            />
            <MyText
                    style={{
                      textAlign: 'center',
                      fontSize: 18,
                      color: '#343434',marginTop:5,
                    }}>
                    Trade Successful
                  </MyText>
              <View>
                <View style={styles.textContainer}>
                  <MyText
                    style={{
                      textAlign: 'center',
                      fontSize: 13,
                      color: '#808080',
                    }}>
                    Your Bitcoin trade has been submitted and {'\n'}its being proccessed
                    
                  </MyText>
                </View>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.reset({
                      index: 1,
                      routes: [{name: 'DashBoardScreen'}, {name: 'BtcTransactions'}],
                    });
                  }}
                  activeOpacity={0.9}       
        style={{
          alignSelf: 'center',
          backgroundColor: '#1CC88A',
          width: '95%',
          borderRadius: 7,borderWidth:0,borderColor:'#1CC88A',
        }}>
                  <MyText
                    style={{
                      textAlign: 'center',
                      padding: 7,
                      color:'#fff',
                      fontSize: 13,
                    }}>
                    View Transaction
                  </MyText>
                </TouchableOpacity>
              </View>
              </View>
            </View>
          </View>
          
        <View
                  style={
                    {
                      marginBottom: 10,
                      marginHorizontal: 40,
                      alignSelf: 'center',
                      flexDirection: 'row',
                    }}>
              <Icon
                name={'info'}
                size={20}
                color={'#808080'}
                style={{marginTop: 2, marginRight: 10}}></Icon>
              <MyText style={{fontSize: 12, color: '#808080'}}>
  Please note that your final value in naira may change based on the BTC value we receive and/or other market conditions.{' '}
              </MyText>
  
                </View>
                
      </SafeAreaView>
  </View>
);
};

const styles = StyleSheet.create({
image: {
  resizeMode: 'contain',
  width: 80,
  height:83,
  alignSelf: 'center',
  marginTop: 10,
},
tickImage: {
  alignSelf: 'center',
  marginTop: 20,
  marginBottom: 5,
  width: 35,
  height: 35,
},
whiteCardBg: {
  backgroundColor: '#fff',
  width: width,
  height: height,
  flex:1,
  justifyContent:'center',
},
textContainer: {
  marginTop: 30,
},
btnContainer: {
  marginTop: 40,
  marginBottom: 40,
},
alertIconContainer: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
},
});
export default TradeSuccesfullScreen2;
