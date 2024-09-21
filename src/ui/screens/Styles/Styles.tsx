import { StyleSheet, Dimensions, Platform } from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
const { width, height } = Dimensions.get('screen');

const newStyles = (theme) => {
  return StyleSheet.create({
  container: {
    backgroundColor: theme.dark ? '#000' : '#fff',
    width: '100%',
    height: height,
    flex: 1,
    //#7E178E
  },

  header: {
    height: 'auto',
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    // borderBottomColor:'#ddd',
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },


  accountBG: {
    width: '100%',
    height: 300,
    position:'absolute',
    top:0,
    zIndex:-2,
    left:0,right:0,
    },
    
  headerBG: {
    width: '100%',
    height: moderateScale(140),
    position:'absolute',
    top:0,
    zIndex:-1,
    left:0,right:0,
    },

    logoImg: {
      width: moderateScale(150),
      height: moderateScale(40),
    },
  
  newModalHeader: {
    width: '100%', height: 'auto', paddingTop: 10, paddingBottom: 0, marginBottom: 0, paddingHorizontal: 15,
  },

  modalHeader: {
    justifyContent: 'center', alignItems: 'center', width: '100%', height: 'auto', paddingBottom: 10, marginBottom: 10
  },

  modalHeader2: {
    paddingHorizontal: 15, paddingTop: 20, paddingBottom: 0,
  },


  modalLine: {
    height: 4, width: 30, borderRadius: 8, backgroundColor: theme.dark ? '#fff' : '#ddd', marginBottom: 15, alignSelf: 'center'
  },

  lineBottomLight: {
    borderBottomColor: theme.dark ? '#333333' : '#f2f2f2',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  lineBottomDark: {
    borderBottomColor: theme.dark ? '#333333' : '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  
  lineBottomCatDark: {
    borderBottomColor: theme.dark ? '#fff' : '#343434',
    borderBottomWidth: 1.5,
  },

  lineTopLight: {
    borderTopColor: theme.dark ? '#333333' : '#f2f2f2',
    borderTopWidth: StyleSheet.hairlineWidth,
  },

  lineTopDark: {
    borderTopColor: theme.dark ? '#333333' : '#ddd',
    borderTopWidth: StyleSheet.hairlineWidth,
  },


  tabLine: {
    minWidth: '50%',
    justifyContent: 'center', alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
  },

  tabLineAuto: {
    width: 'auto',
    justifyContent: 'center', alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
    height: moderateScale(30),
  },

  flexWrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },


  bgScroll: {
    width: '100%', height: '100%', backgroundColor: '#fff',
    //  borderTopLeftRadius:30, borderTopRightRadius: 30,

  },

  bgCurve: {
    width: '100%', height: 15, borderTopLeftRadius: 30, borderTopRightRadius: 30,
  },

  midBg: {
    width: '100%', height: '100%',
    backgroundColor: theme.dark ? '#000' : '#fff',
  },

  midBgGrey: {
   width: '100%', height: '100%',
    backgroundColor: theme.dark ? '#000' : '#F4F4F6',
  },

  bgGrey: {
    backgroundColor: theme.dark ? '#252525' : '#F4F4F6',
  },

  bgGreen: {
    backgroundColor: '#1cc88a',
  },

  bgLightGreen: {
    backgroundColor: '#d9e0df',
  },

  bgRed: {
    backgroundColor: '#ff0000',
  },

  bgWhite: {
    backgroundColor: theme.dark ? '#1c1c1c' : '#fff',
  },

  bgDark: {
    backgroundColor: theme.dark ? '#fff' : '#343434',
  },

  bgLightGrey: {

    backgroundColor: theme.dark ? '#353535' : '#fafafa',
  },

  formWhite: {
    backgroundColor: theme.dark ? '#1c1c1c' : '#fff',
    height: 'auto',
    borderRadius: 10,
    width: '100%'
  },

  box: {
    //  borderWidth: StyleSheet.hairlineWidth,
    // borderColor:'#ddd',
    paddingHorizontal: moderateScale(15),
    paddingVertical: 10,
    backgroundColor: '#f2f4f8',
    width: '98%',
    height: 'auto',
    marginRight: 10,
    borderRadius: 10,
  },

  bb: {
    marginBottom: 0,
    paddingVertical: 10,
    borderBottomColor: '#f5f4f3',
    borderBottomWidth: 5,
  },


  Row: {
    flexDirection: 'row',
  },

  RowB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },


  textCenter: {
    textAlign: 'center',
  },

  textRight: {
    textAlign: 'right',
  },

  textWhite: {
    color: '#fff',
  },

  textDark: {
    color: theme.dark ? '#fff' : '#343434', 
  },

  textGrey: {
    color: '#808080',
  },

  textLightGrey: {
    color: theme.dark ? '#808080' : '#ddd',
  },

  textRed: {
    color: '#ff0000',
  },

  textGreen: {
    color: '#1cc88a',
  },

  alignCenter: {
    justifyContent: 'center', alignItems: 'center'
  },

  icon: {
    width: moderateScale(32), height: moderateScale(32), borderRadius: 32, justifyContent: 'center', alignItems: 'center',
  },

  round: {
    width: moderateScale(35), height: moderateScale(35), borderRadius: 30, justifyContent: 'center', alignItems: 'center',
  },

  roundSmall: {
    width: moderateScale(25), height: moderateScale(25), borderRadius: 25, justifyContent: 'center', alignItems: 'center',
  },

  roundBorder: {
    borderTopLeftRadius: 30, borderTopRightRadius: 30
  },

  roundBorderBottom: {
    borderBottomLeftRadius: 30, borderBottomRightRadius: 30
  },

  roundBorderTop: {
    borderTopLeftRadius: 30, borderTopRightRadius: 30
  },

  borderWidthGreen: {
    borderWidth: 1,
    borderColor: '#1cc88a',
  },

  borderWidthLight: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.dark ? '#333333' : '#f2f2f2',
  },

  borderWidthDark: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor:  theme.dark ? '#333333' : '#ddd',
  },


  borderDark: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor:  theme.dark ? '#333333' : '#b0b0b0',
  },

  borderWidthRed: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ff0000',
  },

  shadow: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.12,
      shadowRadius: 1.41,
    },
    android: {
      elevation: 1,
      shadowColor: '#808080'
    }
  }),

  round10: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
    paddingVertical: 4,
  },

  /* BORDERS */

  b5: {
    borderRadius: 5,
  },
  b8: {
    borderRadius: 10,
  },

  b15: {
    borderRadius: 15,
  },

  b20: {
    borderRadius: 20,
  },
  b30: {
    borderRadius: 30,
  },




  /*PADDING & MARGN **/

  p20: {
    padding: 10
  },

  p15: {
    padding: 15
  },

  p10: {
    padding: 10
  },

  p5: {
    padding: 5
  },


  mb40: {
    marginBottom: 40,
  },

  mb30: {
    marginBottom: 30,
  },

  mb20: {
    marginBottom: 20,
  },

  mb15: {
    marginBottom: 15,
  },
  mb10: {
    marginBottom: 10,
  },
  mb5: {
    marginBottom: 5,
  },
  mt20: {
    marginTop: 20,
  },
  mt15: {
    marginTop: 15,
  },
  mt10: {
    marginTop: 10,
  },
  mt8: {
    marginTop: 8,
  },

  mt5: {
    marginTop: 5,
  },
  pt30: {
    paddingTop: 30,
  },
  pt20: {
    paddingTop: 20,
  },

  pt15: {
    paddingTop: 15,
  },

  pt10: {
    paddingTop: 10,
  },
  pt5: {
    paddingTop: 5,
  },
  pv15: {
    paddingVertical: 15,
  },
  pv10: {
    paddingVertical: 10,
  },
  pv5: {
    paddingVertical: 5,
  },


  newPH: {
    width: width - 68
  },

  pb15: {
    paddingBottom: 15,
  },

  pb10: {
    paddingBottom: 10,
  },

  pb5: {
    paddingBottom: 5,
  },

  pb2: {
    paddingBottom: 2,
  },

  ph40: {
    paddingHorizontal: 40
  },

  ph30: {
    paddingHorizontal: 30
  },

  ph20: {
    paddingHorizontal: 20
  },

  ph15: {
    paddingHorizontal: 15
  },

  ph10: {
    paddingHorizontal: 10
  },

  ph5: {
    paddingHorizontal: 5
  },

  pl15: {
    paddingLeft: 15,
  },

  pl10: {
    paddingLeft: 10,
  },

  pl5: {
    paddingLeft: 5,
  },

  mr5: {
    marginRight: 5
  },

  mr10: {
    marginRight: 10
  },

  mr15: {
    marginRight: 15,
  },

  mr20: {
    marginRight: 20
  },

  mr30: {
    marginRight: 30,
  },


  /* END OF PADDING **/



  /*** TEXT LABEL */

  extraLabel: {
    fontSize: moderateScale(19),
    textAlign: 'left',
    color: theme.dark ? '#fff' : '#343434',
    fontFamily: 'Nunito-SemiBold',
  },

  moreLabel: {
    fontSize: moderateScale(13),
    textAlign: 'left',
    color: '#7E178E',
    fontFamily: 'Nunito-SemiBold',
    textDecorationLine: 'underline',
  },

  noLabel: {
    fontSize: moderateScale(12),
    textAlign: 'left',
    color: theme.dark ? '#fff' : '#343434',
    fontFamily: 'Nunito-Regular',
    textDecorationLine: 'line-through'
  },

  mediumLabel: {
    fontSize: moderateScale(12),
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
    color: theme.dark ? '#fff' : '#343434',
  },


  largeLabel: {
    fontSize: moderateScale(17),
    textAlign: 'left',
    color: theme.dark ? '#fff' : '#343434',
    fontFamily: 'Nunito-SemiBold',
  },

  largeLabel2: {
    fontSize: moderateScale(15),
    textAlign: 'left',
    color: theme.dark ? '#fff' : '#343434',
    fontFamily: 'Nunito-SemiBold',
  },

  largeLabel3: {
    fontSize: moderateScale(14),
    textAlign: 'left',
    color: theme.dark ? '#fff' : '#343434',
    fontFamily: 'Nunito-SemiBold',
  },

  userLabel: {
    fontSize: moderateScale(13),
    textAlign: 'left',
    color: theme.dark ? '#fff' : '#343434',
    fontFamily: 'Nunito-SemiBold',
  },

  titleLabel: {
    fontSize: moderateScale(12),
    textAlign: 'left',
    color: theme.dark ? '#fff' : '#343434',
    fontFamily: 'Nunito-Regular'
  },

  subLabel: {
    fontSize: moderateScale(13),
    textAlign: 'left',
    color: theme.dark ? '#fff' : '#343434',
    fontFamily: 'Nunito-Regular'
  },

  thinLabel: {
    fontSize: moderateScale(8),
    textAlign: 'left',
    color: '#808080',
    fontFamily: 'Nunito-Regular',
  },

  tinyLabel: {
    fontSize: moderateScale(11),
    textAlign: 'left',
    color: '#808080',
    // marginTop:2,
    //  marginBottom:5,
    fontFamily: 'Nunito-Regular',
    // width: (width - 60) / 1,
  },


  tinyDark: {
    fontSize: moderateScale(11),
    textAlign: 'left',
    color: theme.dark ? '#fff' : '#343434',
    fontFamily: 'Nunito-Regular',
    // width: (width - 60) / 1,
  },



  /*** END OF MARGIN & PADDING */

  /* FONT WEIGHT */
  fontRegular: {
    fontFamily: 'Nunito-Regular',
  },

  fontSemi: {
    fontFamily: 'Nunito-SemiBold',
  },

  fontBold: {
    fontWeight: 'bold'
  },

  font100: {
    fontWeight: '100'
  },



  /** TEXT SIZE */


  fontSize8: {
    fontSize: moderateScale(8),
  },

  fontSize9: {
    fontSize: moderateScale(9),
  },

  fontSize10: {
    fontSize: moderateScale(10),
  },

  fontSize11: {
    fontSize: moderateScale(11),
  },

  fontSize12: {
    fontSize: moderateScale(12),
  },

  fontSize13: {
    fontSize: moderateScale(13),
  },

  fontSize14: {
    fontSize: moderateScale(14),
  },

  fontSize15: {
    fontSize: moderateScale(15),
  },

  fontSize16: {
    fontSize: moderateScale(16),
  },

  fontSize17: {
    fontSize: moderateScale(17),
  },
  fontSize20: {
    fontSize: moderateScale(20),
  },

  fontSize22: {
    fontSize: moderateScale(22),
  },

  fontSize23: {
    fontSize: moderateScale(23),
  },

  fontSize24: {
    fontSize: moderateScale(24),
  },

  fontSize25: {
    fontSize: moderateScale(25),
  },

  resultItem: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 33,
    flexDirection: 'row',
  },

  loader: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  },

  iosBar: {
    paddingBottom: Platform.OS === 'ios' ? 40 : 10,
  },

  bottomBar: {
    backgroundColor: theme.dark ? '#1c1c1c' : '#fff',
    paddingBottom: Platform.OS === 'ios' ? 40 : 10,
    borderTopColor: theme.dark ? '#535353' : '#ddd',
    borderTopWidth: StyleSheet.hairlineWidth,
  },

  button: {
    backgroundColor: '#7E178E',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    marginTop: 0,
    width: 'auto',
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 'auto',
    justifyContent: 'center', alignItems: 'center',
  },

  submitButton: {
    borderRadius: 15,
    marginTop: 0,
    width: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 'auto',
    justifyContent: 'center', alignItems: 'center',
  },

  buttonLabel: {
    fontSize: moderateScale(13),
    color: '#fff',
    fontFamily: 'Nunito-SemiBold',
    textAlign: 'center',
  },

  drop: {
    width: '100%',
    minHeight: moderateScale(40),
    fontFamily: 'Nunito-Regular',
  },

  text: {
    color: theme.dark ? '#fff' : '#343434',
    alignSelf: 'center',
    padding: 10,
    paddingLeft: 15,
    fontSize: moderateScale(12),
    fontFamily: 'Nunito-Regular',
    width: '100%'
  },
  shortDrop: {
    color: theme.dark ? '#fff' : '#343434',
    alignSelf: 'center',
    borderRadius: 10,
    height: moderateScale(45),
    paddingLeft: 15,
    width: moderateScale(170),
    fontFamily: 'Nunito-Regular',
  },
  mainText: {
    color: theme.dark ? '#fff' : '#343434',
    alignSelf: 'center',
    borderRadius: 10,
    height: moderateScale(45),
    paddingLeft: 15,
    fontSize: moderateScale(13),
    fontFamily: 'Nunito-Regular',
    width: '100%',
  },

  circleBg: {
    width: moderateScale(60),
    height: moderateScale(60),
    padding: 0,
    marginHorizontal: 1,
    justifyContent: 'center',   
    alignItems:'center',
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.dark ? '#535353' : '#343434',
  },

  
  emptyCont: {
    height: 'auto',
    width: '100%',
    backgroundColor: theme.dark ? '#000' : '#fff',
    borderRadius: 8,
    marginVertical: 3,
    paddingHorizontal: 9,
    paddingVertical: 10,
    elevation: 0,
  },
  cont: {
    height: 'auto',
    width: '100%',
    marginVertical: 1.5,
    paddingHorizontal: 6,
  },


});
}

export default newStyles;