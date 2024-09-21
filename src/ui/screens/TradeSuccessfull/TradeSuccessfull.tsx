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
import Navbar from '../../components/Navbars/Navbar';
import AlertIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';
const {width, height} = Dimensions.get('screen');

const TradeSuccessfull = ({navigation}) => {
  return (
    <View style={{height: height, width: width, flex: 1}}>
      {/* <StatusBar hidden /> */}
      <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
        
        <SafeAreaView
          style={{
            flex: 1,
            height: height + StatusBar.currentHeight,
            width: width,
            backgroundColor: '#fff',
          }}>
          
            <View style={[styles.whiteCardBg]}>
              

              <View style={{justifyContent: 'space-between'}}>
                
            <View
          style={{
            paddingHorizontal: 15,
            marginBottom: 0,
            marginTop:'30%',
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
                      color: '#343434',marginTop:5
                    }}>
                    Sumitted Successfully
                  </MyText>
              <View>
                <View style={styles.textContainer}>
                  <MyText
                    style={{
                      textAlign: 'center',
                      fontSize: 12,
                      color: '#808080',
                    }}>
                    Your trade has been submitted and its being processed. It may take approximately 10-30mins to complete
                    </MyText>
                  </View>
                </View>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('TransactionHistory', {tab: 'Giftcard'});
                    }}
                    activeOpacity={0.9}       
          style={{
            alignSelf: 'center',
            backgroundColor: '#1CC88A',
            width: '95%',
            borderRadius: 7,borderWidth:0,borderColor:'#ddd',
          }}>
                    <MyText
                      style={{
                        textAlign: 'center',
                        padding: 7,
                        color:'#fff',
                        fontSize: 13,
                      }}>
                      View Details
                    </MyText>
                  </TouchableOpacity>
                </View>
                </View>
                <View
                  style={{
                    borderBottomWidth: 0,
                    borderColor: '#F1F1F1',
                    marginHorizontal: 0,
                    marginTop: '15%',
                  }}></View>
                
              </View>
            </View>
          
          <View
                  style={[
                    {
                      marginTop: 0,
                      marginHorizontal: 30,
                      marginBottom: 40,
                      alignSelf: 'center',
                      flexDirection: 'row',
                    },
                  ]}>
              <Icon
                name={'info'}
                size={20}
                color={'#808080'}
                style={{marginTop: 2, marginRight: 10}}></Icon>
              <MyText style={{fontSize: 11, color: '#808080'}}>
  Giftcards uploaded on the wrong channel will be switched to the right channel and calculated with the rate of the new channel {' '}
              </MyText>
  
                </View>
        </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    width: 100,
    height: 44,
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
    // height: height,
    padding: 5,
    marginTop: 20,
    // flexWrap: 'wrap',
    // flexDirection: 'row',
    // justifyContent: 'space-between'
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
export default TradeSuccessfull;
