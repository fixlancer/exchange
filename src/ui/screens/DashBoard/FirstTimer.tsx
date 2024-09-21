import { View, Text, StatusBar, Image, TouchableOpacity, ImageBackground,
Dimensions, ScrollView, StyleSheet, Platform, ActivityIndicator } from 'react-native'
import React, { useEffect, useCallback, useState } from 'react'
import Modal from 'react-native-modalbox';
import MyText from '../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {RFValue} from 'react-native-responsive-fontsize';
const { width, height } = Dimensions.get('window');

  const FirstTimer = ({route, navigation}) => {

    const { username,isRetry } = route?.params;
    console.log(route?.params, 'route?.params');
const handleSubmit = () => {
  navigation.navigate('ResetCode', { ...route?.params })
}


    return (
  <View style={{flex:1, backgroundColor:'#16191e'}}>
  <SafeAreaView style={{
    height: height, 
    width: width, 
    flex: 1, backgroundColor:'transparent'}}
  edges={['left', 'right', 'top']}>
<StatusBar translucent barStyle="light-content" backgroundColor="transparent" />


      <View style={styles.body}>
              <View style={{backgroundColor:'#0e0e1c', height:'100%',marginBottom:12, padding:20, justifyContent:'center', alignItems:'center', borderRadius:20,}}>
  <Text style={[styles.openTitle, {marginTop:15,marginBottom:20}]}>
    {isRetry? `Welcome Back` : `Welcome ${"\n"}On Board!`}
     </Text>
       <Image
       source={require('../../../Assets/hand.png')}
       style={styles.img}
       resizeMode={'contain'}
       />       

<View style={{justifyContent:'center', alignItems:'center', marginTop:10, borderRadius:20,}}>
<Text style={[styles.text, {marginTop:20,marginBottom:10}]}>{username}{"\n"}Thank you for choosing Fejora{"\n"}{"\n"}
To complete the registration process and continue,{"\n"} please verify your email address, {"\n"} {"\n"} Thank You</Text>

  </View>
</View>



          </View>  
  
</SafeAreaView>

<TouchableOpacity
          style={styles.btnCont}
          onPress={() => handleSubmit()}>
          <View style={[styles.submitBtn, {alignItems: 'center',marginTop: 25,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20, }]}>
     <MyText style={{ fontSize: 13, textAlign: 'center', color: '#fff' }}>Verify Now</MyText>
     <Icon
                      name={'arrow-forward-ios'}
                      size={18}
                      color={'#fff'}
                      style={{ marginTop: 2 }}></Icon>
          </View>
        </TouchableOpacity>
</View>
  );
};

const styles = StyleSheet.create({
body:{
        paddingTop: 10,flex:1,
        paddingHorizontal: 10, width: '100%',height:'100%',
        backgroundColor: '#16191e',
    },
openTitle: {
    color: '#fff',
    fontFamily: 'Nunito-Bold',
    fontSize: RFValue(25),
    textAlign:'left',
},
header: {
  width: width,
  height: 'auto',
  paddingHorizontal: 20,
  backgroundColor: 'transparent',
},
text: {
  fontSize: RFValue(14),
  color:'#fff',
  textAlign:'center',
  fontFamily: 'Nunito-Regular',
},
btnCont: {
  backgroundColor: 'transparent', paddingHorizontal: 15,
},
bottomContainerForIos: {
  height: 30,
  width: '100%',
  backgroundColor: 'transparent',
},
submitBtn: {
  alignSelf: 'center',
  backgroundColor: '#1cc88a',
  width: '100%',
  borderRadius: 15,
  marginBottom: 20,
  padding: 15,
},
img: {
height: '50%', width: '100%',
marginTop:0,
},
});

export default FirstTimer;
