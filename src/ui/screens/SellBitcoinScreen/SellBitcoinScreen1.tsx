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
import {SafeAreaView} from 'react-native-safe-area-context';
import MyText from '../../components/DefaultTextComponent/MyText';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('screen');

const SellBitcoinScreen1 = ({route, navigation}) => {

  const { tradeName } = route?.params;

  const [amount, setAmount] = useState(0);
const [rate, setRate] = useState(0);
const [min_amount, setMinAmount] = useState(0);


// THIS IS WHERE YOU GET THE RATES AND MIN TRADE AMOUNT FROM SETTINGS
useEffect(() => {

  if(tradeName === 'Bitcoin'){
setRate(700);
setMinAmount(250);

} else if(tradeName === 'USDT') {

  setRate(800);
  setMinAmount(250);

}

},  []);


return (
    <View style={{height: height, width: width, flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
        <SafeAreaView
          style={{
            height: height,
            width: width,
            flex: 1,
            backgroundColor: '#fff',
          }}
          edges={['left', 'right', 'top']}>
  
          <View style={styles.header}>
            <View style={styles.headerUpperArea}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon
                  name={'arrow-back-ios'}
                  size={20}
                  color={'#808080'}
                  style={{ marginTop: 10, marginLeft:10 }}
                />
              </TouchableOpacity>
              <MyText
                style={{
                  fontSize: 16,marginTop:7,
                  color: '#343434',
                  marginLeft: wp(20),
                }}>
                Sell {tradeName}
              </MyText>
              <MyText></MyText>
            </View>
          </View>
          

<View style={styles.mainBody}>
  <View style={styles.floatValueContainer}>
    <TextInput
      style={styles.headerHeading2}
      underlineColorAndroid="transparent"
      placeholderTextColor="gray"
      keyboardType='numeric'
      placeholder="0.0"
      textAlign={'center'}
      onChangeText={e => setAmount(e)}></TextInput>
  </View>

  <View
    style={{
              flexDirection: 'row',
              marginTop: 15,
              alignSelf: 'center',
              marginHorizontal: 0,
            }}>
            <Icon
                    name={'info'}
                    size={17}
                    color={'#808080'}
                    style={{
                      marginRight: 5,
                    }}></Icon>
            <View>
            <MyText style={{fontSize: 12, marginTop:1,color:'#808080'}}>
            Minimum Amount: ${min_amount}
            </MyText>
          </View>
          </View>
  
</View>

   
     {amount > 0 ? (
        
        <View style={{backgroundColor:'#fff',paddingHorizontal:15,borderTopWidth:StyleSheet.hairlineWidth,borderTopColor:'#f2f2f2', paddingBottom:Platform.OS === 'ios' ? 40 : 20}}>
        
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <View>
              <MyText style={{fontSize:10, marginTop:10, color:'#808080'}}>Amount</MyText>
              
              <MyText style={{fontSize:16, marginVertical:3, color:'#343434'}}>
                ${amount}</MyText>
            
                <MyText style={{ fontSize: 10, color:'#808080' }}>Estimated Value: {'\u20A6'}{amount * rate}  
              </MyText>
              </View>

<View>
<TouchableOpacity
                    activeOpacity={0.9}
                    style={{
                      alignItems: 'center',
                      marginTop: 5,
                    }}
                    onPress={() => {
                      navigation.navigate('SellBitcoin', {amount: amount, rate: rate, tradeName: tradeName});
                    }}>
<View
      style={[styles.submitBtn, {
                    alignItems: 'center',
                    marginTop: 15,
                  }]}>
                  <MyText style={{fontSize:13,textAlign:'center', color:'#fff'}}>Continue
          </MyText>
                </View>
</TouchableOpacity>
</View>
              </View>
              </View>
                ) : null }

      </SafeAreaView>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: width,
    height:60,
    backgroundColor:'#fff',
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderColor:'#ddd'
  },
  headerUpperArea: {
    display: 'flex',
    width: '70%',
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  
  headerHeading2: {
    alignSelf: 'center',
    color: '#343434',
    width: '80%',
    backgroundColor: 'white',
    fontSize: 30,justifyContent:'center',flexDirection:'row',
    textAlign: 'center',
    borderColor: '#F1F1F1',
    fontFamily: 'Nunito-Regular',
  },
  mainBody: {
    backgroundColor: '#f3f5f9',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  
  floatValueContainer: {
    height: 80,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    borderRadius: 15,
    backgroundColor:'#fff',
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    alignSelf: 'center',
    backgroundColor: '#1CC88A',
    width: 100,
    borderRadius: 8,
    marginBottom: 10,
    padding: 8,
  },
});
export default SellBitcoinScreen1;
