import React, {useContext, useEffect, useMemo, useState} from 'react';
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
  SafeAreaView,
  Button,
  Keyboard,
  StatusBar,
  Platform
} from 'react-native';
import MyText from '../../../components/DefaultTextComponent/MyText';
import styles from './Style';
import {RFValue} from 'react-native-responsive-fontsize';
import {getToken, NAIRA} from '../../../../utils/utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {width, height} = Dimensions.get('screen');

const Usdt = ({activeButton, bitcoin, giftCards, usdt}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [cardvalue, setCardValue] = useState(null);
  const rate = 590; 

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
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

<ScrollView style={{marginHorizontal:15,marginTop:10,}}>
        <View style={[styles.drop, {}]}>
            <TextInput
              style={styles.text}
              underlineColorAndroid="transparent"
              onChangeText={text => setCardValue(text)}
              placeholder='Amount e.g 5000'
              placeholderTextColor="#808080"
              textAlign={'left'}
              editable={true}
              keyboardType="numeric"
              // multiline={true}
            />
</View>     
</ScrollView>


{cardvalue !== null ? (
        <View style={{backgroundColor:'#f8fafa',paddingHorizontal:15,borderTopWidth:StyleSheet.hairlineWidth,borderTopColor:'#f2f2f2', paddingBottom:Platform.OS === 'ios' ? 40 : 15}}>
        
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <View>
              <MyText style={{fontSize:10, alignSelf:'center', marginTop:10, color:'#808080'}}>Estimated Value</MyText>
              
              <MyText style={{fontSize:16, alignSelf:'center', marginVertical:3, color:'#343434'}}>
              {NAIRA}{cardvalue}</MyText>
            
           {/*     <MyText style={{ fontSize: 10, alignSelf:'center', color:'#808080' }}>Rate: /$ </MyText> */}
              </View>
              </View>
              </View>
) : null }

</View>
  );
};
export default Usdt;
