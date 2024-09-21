import {StyleSheet, Dimensions, Platform} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    header: {
      width: width,
      height: 60,
      alignItems:'center',
      backgroundColor: '#f9f9f9',
      borderBottomWidth: 0.5,
      borderColor: '#f1f1f1',
    },
    head: {
      width: width,
      height: 'auto',
      paddingHorizontal:15,
      marginTop:15,
      marginBottom:20,
      backgroundColor: '#fff',
      flexDirection:'row',justifyContent: 'space-between',
    },
    headerHeading: {
      color: 'white',
      textAlign: 'center',
      marginTop: '6.5%',
      fontSize: 16,
    },
    mainBody: {
      width: '100%',
      height:'auto',
      backgroundColor: 'white',
      marginVertical: 4, 
      marginHorizontal: 0,
      borderRadius: 8,
      padding: 5,
      flex:1,
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cont: {
    width:'100%',backgroundColor:'#f3f5f9',
    paddingBottom:0,
    paddingHorizontal:0,
    flex:1,
  },

  amountPortion: {
    // flexDirection: 'row',
    borderTopColor:'#f1f1f1',
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 15,
    paddingTop:10,
    justifyContent:'center',
  },
  mdFontGreyColor: {
    color: '#808080',
    fontSize:12,marginVertical:2,
    textAlign: 'left',  
  },
  inlineCardPortion: {
  paddingHorizontal:5,
paddingVertical:5,  
},
  mdFontBlackColor: {
    color: '#343434',
    fontSize: 12,
  },
  iStorage: {
    backgroundColor:'#f3f5f9', width:40,height:40, marginRight:10, borderRadius:30,justifyContent:'center',alignItems:'center',
  },
  item: {
    marginVertical: 10,
  },
  title: {
    fontSize: 12,marginBottom:3,
    color: '#343434',
  },
  date: {
    fontSize: 9,
    color: '#808080',
  },
  totalAmount: {
    fontSize: 10,
    textAlign: 'right',
    color: '#808080',
  },
  amount: {
    fontSize: 13,
    color: '#1CC88A',marginTop:0,
    textAlign: 'right',
  },
  hr: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#F1F1F1',
    marginVertical: 5,
    //marginBottom: 8,
  },
  hr2: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#F1F1F1',
    marginTop: 20,
  },
  textDrop: {
    flexDirection:'row', justifyContent:'space-between', height:43, borderRadius:6,
    width: '100%', borderWidth: StyleSheet.hairlineWidth, borderColor: '#ddd',
  },
  text: {
    paddingLeft: 15,color:'#343434',
    fontSize: 13, width:'70%',paddingTop:12,
    fontFamily: 'Nunito-Regular',
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
  },
  drop: {
    backgroundColor: '#fff',
    height: 56,
    width: '100%', paddingHorizontal: 0,
    paddingVertical: 0,
    alignSelf: 'center',
  },
  seprator: {
    width: '100%',
    height: 1,
    backgroundColor: '#C4C4C4',
    alignSelf: 'center',
    marginTop: 15,
    opacity: 0.2,
    marginBottom: 0,
  },
  OrderCard: {
      width: '100%',
      height: 'auto',
      backgroundColor: '#f8fafa',
      borderRadius: 0,
      marginBottom:0,
      elevation:0,
    },
    CardText: {
      textAlign:'center',
      alignContent:'center',
      fontFamily: 'Nunito-Bold',
      flexDirection:'row',       
      justifyContent: 'space-between',
      paddingHorizontal:10,
      borderBottomWidth: 0.5,
      borderBottomColor: '#f1f1f1',
      borderTopLeftRadius:15,
      borderTopRightRadius:15,
      paddingTop:12,
      paddingBottom:15,
      marginBottom:0,
    },
    
  midCont: {
    marginTop: 0,
    width:'100%',height:'100%',
backgroundColor: '#fff',
marginBottom: Platform.OS == 'ios' ? 30 : 0,
  },
  filterBtn: {
    alignSelf: 'center',
    backgroundColor: '#1CC88A',
    textAlign: 'center',
    color: '#fff',
    width: '100%',
    borderRadius: 7,
    fontSize: 13,
    marginBottom: 10,
    padding: 10,
  },
  loader: {
    backgroundColor:'#000', height:50, justifyContent:'center', alignItems:'center',width:50,padding:5,borderRadius:5, elevation:2,
  }, 
  modalheader: {
    width: width,
    height: 60,
    alignItems: 'center',
    backgroundColor: '#fff-',
    flexDirection: 'row',
    justifyContent: 'space-between',
},
mainTopCard: {
  flexDirection:'row',justifyContent:'space-between',
  backgroundColor:'transparent',paddingBottom:15,paddingHorizontal:15,borderColor:'#ddd', borderBottomWidth:StyleSheet.hairlineWidth,
    },
    topCard: {
      borderRadius:8, padding:10, borderColor:'#F2F2F2', borderWidth:StyleSheet.hairlineWidth, height:60, width:'47%',
    },
    roundClose: {
      backgroundColor:'#f3f5f9', width:30,height:30, borderRadius:30,justifyContent:'center',alignItems:'center',
    },
});

export default styles;
