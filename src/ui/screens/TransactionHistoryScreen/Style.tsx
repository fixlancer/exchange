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
    height: 50,
    alignItems:'center',
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 0.5,
    borderColor: '#f1f1f1',
    borderTopRightRadius:15,
    borderTopLeftRadius:15,
  },
  headerHeading: {
    color: 'white',
    textAlign: 'center',
    marginTop: '6.5%',
    fontSize: 16,
  },
  mainBody: {
    alignSelf: 'center',
    width: width,
    height: height,
    backgroundColor: '#ffffff',
    zIndex: 1,  paddingTop:20,
  },
  bg: {
    backgroundColor: '#f8fafa', height: height, width: width, flex: 1
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
  headerButtons: {
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '7%',
    width: '86%',
    backgroundColor: 'white',
    borderRadius: 30,
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 50},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  headerButtom: {
    fontSize: 13,
    textAlign: 'center',
    width: '39%',
    borderRadius: 30,
    color: '#1CC88A',
    padding: '3%',
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

  item: {
    marginVertical: 10,
  },
  title: {
    fontSize: 13,marginBottom:3,
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
    color: '#1CC88A',marginTop:3,
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
  drop: {
    backgroundColor: '#fff',
    height: 56,
    width: '100%', paddingHorizontal: 0,
    paddingVertical: 0,
    alignSelf: 'center',
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
    marginTop: 10,
    width:'100%',height:'100%',
backgroundColor: '#fff',
marginBottom: Platform.OS == 'ios' ? 30 : 0,
  },
  loader: {
    backgroundColor:'#000', height:50, justifyContent:'center', alignItems:'center',width:50,padding:5,borderRadius:10, elevation:2,
  }, 

  mainTopCard: {
    flexDirection:'row',justifyContent:'space-between',
    backgroundColor:'transparent',paddingBottom:15,paddingHorizontal:15,borderColor:'#f2f2f2', borderBottomWidth:StyleSheet.hairlineWidth,
      },
      topCard: {
        borderRadius:8, padding:10, borderColor:'#F2F2F2', borderWidth:StyleSheet.hairlineWidth, height:60, width:'47%',
      },
stat: {
  backgroundColor:'#f3f5f9', width:30,height:30, marginRight:10, marginTop:2,borderRadius:30,justifyContent:'center',alignItems:'center',
 
},
roundClose: {
  backgroundColor:'#f2f2f2', width:30, height:30,  borderRadius:30,justifyContent:'center',alignItems:'center',
},
header2: {
  width: width,
  height: 'auto',
  paddingHorizontal:15,
  paddingVertical:15,
  marginBottom:20,
  backgroundColor: '#fff',
  flexDirection:'row',justifyContent: 'space-between',
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
});

export default styles;
