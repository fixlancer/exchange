import {StyleSheet, Dimensions, Platform} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    width: 'width',
  },
  header: {

    width: width,
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Platform.OS == 'ios' ? 0 : 10,
  },
  headerHeading: {
    textAlign: 'center',
    fontSize: 16,
    marginLeft: -18,
    marginTop: 14,
    color: '#343434',
  },
  whiteCardBg: {
    backgroundColor: '#f3f5f9',
    width: width,
    paddingVertical: 15,
    // paddingBottom: 40,
  },
  headerUpperArea: {
    display: 'flex',
    width: '70%',
    marginTop: 30,
    marginLeft: 20,

    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerHeadingContainer: {
    width: 45,
    height: 45,
    alignSelf: 'center',
    marginTop: -22,
    zIndex: 2,
    backgroundColor: '#062529',
    borderRadius: 80,
    justifyContent: 'center',
  },

  headerHeading2: {
    color: 'white',
    width: '100%',
    fontSize: 15,
    textAlign: 'center',
  },
  mainBody: {
    width: width,
    height: height,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: '70%',
  },
  mainBodyContent: {
    marginTop: '2%',
    paddingHorizontal: 30,
    // marginLeft:"10%",
  },
  updatePassword: {
    justifyContent: 'center',
    // paddingRight: 25,
    position: 'absolute',
    bottom: 0,
  },
  updatePasswordButton: {
    alignItems: 'center',
    backgroundColor: '#1CC88A',
    padding: 10,
    paddingBottom: RFValue(30),
    width: width,
  },
  udrop: {
    backgroundColor:'#f2f2f2',
    height: 56,
    width: '100%',paddingHorizontal:20,
    paddingVertical: 10,
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center', marginTop: 0,
    paddingLeft: 15, 
    width: '90%',color:'#343434',
    fontSize: 13, marginRight: 0,
    height: 45,
    fontFamily: 'Nunito-Regular',
  },
  drop: {
    backgroundColor: '#fff',
    height: 'auto',flexDirection:'row',
    width: '100%', paddingHorizontal: 0,
    paddingVertical: 0,borderRadius: 10,
    alignSelf: 'center',marginTop:10,
    borderWidth: StyleSheet.hairlineWidth, borderColor: '#ddd',
  },
  hr: {
    borderBottomWidth: 1, 
    borderColor: '#f1f1f1',
    width:'100%'
  },
  bottomContainerForIos: {
    height: 30,
    width: '100%',
    backgroundColor: 'transparent',
  },
  sendBtn: {
    alignSelf: 'center',
    backgroundColor: '#1cc88a',
    width: '100%',
    borderRadius: 7,borderColor:'#ddd',
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom:20,
    padding: 10,
  },
  textbtn: {
    fontSize: 13,
    textAlign: 'center',
    color: '#fff',
  }
});

export default styles;
