import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TouchableNativeFeedback,
  TextInput,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyText from '../../components/DefaultTextComponent/MyText';
import {RFValue} from 'react-native-responsive-fontsize';

const {width, height} = Dimensions.get('screen');

const LandingScreen = ({navigation}) => {
  return (
    <View
      style={{
        height: height,
        width: width,
        flex: 1,
        backgroundColor: '#000',
      }}>
    <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
      <SafeAreaView
        style={{
          height: height,
          width: width,
          flex: 1,
          backgroundColor:'transparent'
        }}
        edges={['left', 'right', 'top']}>
        <View style={styles.LogoNTextContainer}>
          <Image
            source={require('../../../Assets/fejo_white_icon.png')}
            style={styles.image}
          />
        </View>

        <Image
          source={require('../../../Assets/splashimage.png')}
          style={{
            marginTop: RFValue(0),
            marginBottom: RFValue(10),
            height: RFValue(280),
            width: RFValue(265),
            alignSelf: 'center',
          }}
          resizeMode={'contain'}
        />


<View style={{ flex: 1, height: height, backgroundColor:'#0e0e1c', borderTopLeftRadius:30, borderTopRightRadius:30, }}>
        <MyText style={[styles.Heading]}>We Reward</MyText>

        <MyText style={[styles.Heading1]}>You For Every Trade</MyText>

        <MyText style={[styles.subHeading]}>
          From Giftcards to Crypto, you get cash bonus for {"\n"}every trade you do weekly & monthly
        </MyText>

        <View
          style={styles.partOneButtons}>
          <TouchableOpacity
          activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('CreateAccountScreen'); // TestScreenContaing all screens
            }}>
              <View style={[styles.partOneButton, {backgroundColor:'#1cc88a'}]}>
            <MyText style={styles.partOneSelected}>Create Account</MyText>
            </View>

          </TouchableOpacity>

          <TouchableOpacity
          activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('SignInScreen'); // TestScreenContaing all screens
            }}>
              <View style={styles.partOneButton}>
            <MyText style={[styles.partOneSelected, {color:'#343434', textAlign:'center', paddingRight:'15%'}]}>Login</MyText>
            </View>

          </TouchableOpacity>
        </View>

  
        {Platform.OS == 'ios' ? (
        <View style={styles.bottomContainerForIos} />
      ) : null}
      </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    width: RFValue(120),
    height: RFValue(60),
    marginBottom: 0,
  },
  GreenButton: {
    // alignSelf:'center',
    // backgroundColor:'#1CC88A',
    // width:'100%'
    borderWidth: 1,
    borderColor: '#1CC88A',
    borderRadius: 30,
    borderBottomEndRadius: 50,
    paddingHorizontal: RFValue(10),
    paddingVertical: Platform.OS === 'android' ? RFValue(9) : RFValue(15),
    fontSize: 16,
    marginTop: RFValue(22),
    textAlignVertical: 'center',
    height: Platform.OS === 'android' ? RFValue(63) : RFValue(60),
    fontWeight: '600',
    // fontWeight: '700',
    color: '#fafafa',
    backgroundColor: '#1CC88A',
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
  },
  LogoNTextContainer: {
    marginTop: RFValue(25),
    alignSelf: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 5,
  },
  Heading: {
    fontSize: RFValue(26),
    lineHeight: RFValue(38.19),
    alignSelf: 'center',
    textAlign: 'center',
    color:'#fff',
    marginTop: RFValue(40),
  },
  Heading1: {
    fontSize: RFValue(26),
    lineHeight: RFValue(38.19),
    alignSelf: 'center',
    textAlign: 'center',
    color:'#fff',
    marginTop: RFValue(0),
  },
  subHeading: {
    color: '#ddd',
    fontSize: RFValue(13),
    lineHeight: RFValue(17),
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: RFValue(18),
    marginLeft: RFValue(36),
    marginRight: RFValue(36),
  },
  BottomRowContainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: RFValue(15),
  },
  bottomContainerForIos: {
    height: 30,
    width: '100%',
    backgroundColor: 'transparent',
    //backgroundColor: '#1CC88A',
  },

  
  partOneButtons: {
    marginHorizontal: 'auto',
    height: 'auto',
    width: '75%',
    backgroundColor: '#f0fdf6',
    borderRadius: 20,
    padding:2,
    flexDirection: 'row',
    alignSelf:'center',
    marginTop: 20,
   // paddingVertical:0,
 //   paddingLeft:0,
    justifyContent: 'space-between',
    marginVertical: 15,
borderWidth:StyleSheet.hairlineWidth,
borderColor:'#16191e',
//elevation:1,
shadowColor:'#000'
  },
  partOneButton: {
    width: '100%',
    borderRadius: 18,
    padding: 15,
    backgroundColor: 'transparent',
  },
  partOneSelected: {
    color: '#fff',
    zIndex: 0,
    textAlign:'center',
    fontFamily: 'Nunito-Regular',
    borderRadius:4,
    fontSize:13,
  },
});
export default LandingScreen;
