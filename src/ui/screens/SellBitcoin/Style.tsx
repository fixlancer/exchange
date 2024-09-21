import {StyleSheet, Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const Style = StyleSheet.create({
  header: {
    width: width,
    height: 60,
    backgroundColor: '#F0F3FB',
    borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#ddd', 
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingTop: Platform.OS == 'ios' ? 0 : 10,
  },
  headerHeading: {
    textAlign: 'center',
    fontSize: 16,
    marginLeft: -18,
    marginTop: 13,
    color:  '#343434',
  },
  mainBody: {
    alignSelf: 'center',
    width: width,
    height: height - 100,
    paddingLeft: '7%',
    paddingRight: '7%',
    backgroundColor: '#0a2032',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    position: 'absolute',
    zIndex: 1,
    top: '10%',
  },
  completeionLineContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  singleContainer: {
    width: '37%',
  },
  IconAndLineContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  CircleIcon: {
    marginLeft: 12,
    width: 10,
    height: 10,
  },
  SendLine: {
    height: 1,
    width: '92%',
    backgroundColor: '#f2f2f2',
    marginTop: 5,
  },
  SubmitLine: {
    height: 1,
    width: '95%',
    backgroundColor: '#f2f2f2',
    marginTop: 5,
  },
  headerButtons: {
    height: '4.5%',
    width: '35%',
    backgroundColor: 'white',
    borderRadius: 30,
    flexDirection: 'row',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 50},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    paddingBottom: 1.5,
  },
  headerButtom: {
    fontSize: 9,
    textAlign: 'center',
    width: '100%',
    borderRadius: 30,
    color: 'black',
    alignSelf: 'center',
  },
  JoinLeft: {
    position: 'relative',
    left: 25,
  },
  JoinRight: {
    position: 'relative',
    right: 25,
  },
  backArrow: {
    height: 12,
    width: 18,
    marginLeft: 12,
    marginTop: 5,
    // marginTop: '5%',
    // marginLeft: '5%',
  },
  titleImage: {
    width: 32,
    height: 32,
  },
  hr: {
    borderTopWidth: 1,
    borderColor: '#F1F1F1',
    marginTop: 10,
    marginBottom: 10,
  },
  lowerPortion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  smFontSize: {
    fontSize: 11,
    marginBottom: 2,
  },
  mdFontBlackColor: {
    color: 'black',
  },
  btnShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 50},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  bottomContainerForIos: {
    height: 30,
    width: '100%',
    backgroundColor: 'transparent',
    //backgroundColor: '#1CC88A',
    marginTop: Platform.OS == 'ios' ? 0 : 0,
  },
  infoRow: {
    flexDirection: 'row',
    marginVertical: 10,justifyContent:'flex-start',
    marginHorizontal: 15,
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

export default Style;
