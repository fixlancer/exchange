import {StyleSheet, Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Style = StyleSheet.create({
  header: {
    width: width,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:Platform.OS=='ios'?0:10,
    // alignItems:'center',
    // paddingTop: 12,
  },
  headerHeading: {
    textAlign: 'center',
    //marginTop: '3.5%',
    fontSize: 14,
    marginLeft: -18,
    marginTop: 10,
    color: '#343434',
  },
    mainBody: {
      width: '100%',
      height:'auto',
      backgroundColor: 'white',
      marginVertical: 3, 
      marginHorizontal: 0,
      borderRadius: 8,
      padding: 5,
      flex:1,
  },
  headerButtons: {
    height: hp(5),
    width: 100,
    backgroundColor: 'white',
    borderRadius: 30,
    flexDirection: 'row',
    marginTop: 5,
  },
  headerButtom: {
    fontSize: 10,
    textAlign: 'center',
    marginTop:10,
    color: '#343434',
    alignSelf: 'center',
  },
  number: {
    backgroundColor:'#f3f5f9', width:30,height:30, marginRight:5, marginTop:10,borderRadius:30,justifyContent:'center',alignItems:'center',
  },
  headerButtom2: {
    fontSize: 10,
    textAlign: 'center',
    color: 'black',
    width:100,
    marginTop:0,

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
    height: 15,
    width: 25,
    marginLeft: 12,
    marginTop: 5,
    // marginTop: '5%',
    // marginLeft: '5%',
  },
  titleImage: {
    width: 25,
    height: 25,
    marginTop:3
  },
  hr: {
    borderTopWidth: 1,
    borderColor: '#F1F1F1',
    marginTop: 10,
    marginBottom: 10,
  },
  lowerPortion: {
    borderTopColor:'#f1f1f1',
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 15,
    paddingTop:10,
    paddingBottom:5,
    justifyContent:'center',
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smFontSize: {
    fontSize: 9,
    marginBottom: 2,
  },

  mdFontGreyColor: {
    color: '#808080',
    fontSize:12,marginVertical:2,
    textAlign: 'left',  
},
inlineCardPortion: {
paddingHorizontal:5,
},
  mdFontBlackColor: {
    color: '#343434',
    fontSize: 13,
  },

  btnShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 50},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  emptyCont: {
    height: 'auto',
    width:'100%',
    backgroundColor:'#fff',
    borderRadius:8,
    marginVertical:3,
    paddingHorizontal:9,
    paddingVertical:10,
    elevation:0,
},
  cont: {
    width:'100%',
    paddingBottom:10,
    paddingHorizontal:7,
    flex:1,
  },
});

export default Style;
