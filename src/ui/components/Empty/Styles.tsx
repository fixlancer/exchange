import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
const styles = StyleSheet.create({


    Row: {
        flexDirection:'row',
      },
      
      RowB: {
        flexDirection:'row',
        justifyContent:'space-between',
      }, 
  
      alignCenter: {
        justifyContent:'center', alignItems:'center'
      },

      textLeft: {
        textAlign:'left',
      },   
      
  textCenter: {
    textAlign: 'center',
  },

  textWhite: {
    color: '#fff',
  },

  textDark: {
    color: '#343434'
  },

  textPurple: {
    color: '#7E178E'
  },

  textGrey: {
    color: '#808080',
  },


/*** TEXT LABEL */

tinyLabel: {
  fontSize: moderateScale(12),
  textAlign:'center',
  color:'#808080',
  fontFamily: 'Nunito-Regular',
},

largeLabel:  {
  fontSize: moderateScale(15),
  textAlign:'center',
  color:'#343434',
  fontFamily: 'Nunito-Medium',
}, 

tinyDark: {
  fontSize: moderateScale(12),
  textAlign:'center',
  color:'#343434',
  fontFamily: 'Nunito-Regular',
},


/** END OF TEXT LABEL */


/*PADDING & MARGN **/

  mb40: {
    marginBottom:40,
},

mb30: {
  marginBottom:30,
},

mb20: {
  marginBottom:20,
},

mb10: {
    marginBottom:10,
},
  pt15: {
    paddingTop:15,
  },

  newPH: {
    width:width - 68
  },

  pt30: {
paddingTop:30,
  },

  pt20: {
paddingTop:20
  },
  pb5: {
    paddingBottom:5,
  },
  ph15: {
    paddingHorizontal:15
},

ph25: {
paddingHorizontal:25,
},

pt10: {
  paddingTop:10,
},

pl15: {
  paddingLeft:15,
},

pl10: {
  paddingLeft: 10,
},

/* END OF PADDING **/

circleBg: {
  width: moderateScale(60),
  height: moderateScale(60),
  padding: 0,
  marginHorizontal: 1,
  justifyContent: 'center',   
  alignItems:'center',
  borderRadius: 100,
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: '#343434',
},


btn : {
  backgroundColor:'#f9f9f9', borderRadius:10, padding:8,
  borderWidth: StyleSheet.hairlineWidth,
  width:'auto',
  justifyContent:'center',
  alignItems:'center',
  borderColor:'#ddd',
}

});

export default styles;
