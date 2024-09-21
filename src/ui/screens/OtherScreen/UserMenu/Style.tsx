import {StyleSheet, Dimensions, Platform} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  header: {
    width: width,
    paddingTop:10,
    paddingBottom:10,
    marginBottom: 0,
    borderBottomWidth:4,paddingHorizontal:15,
    borderColor: '#0f201e',
    backgroundColor: '#21433d',flexDirection:'row',
    alignItems: 'center',justifyContent:'space-between',
  },
  headerHeading: {
    backgroundColor: '#1CC88A',
    height:25,justifyContent:'center',
    width:25,paddingHorizontal:6,
    marginTop: 16,marginLeft:8,
    alignItems:'center',
    borderRadius: 20,
  },
  headerText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 19,
    fontSize:14,
  },
  header1: {
    width: width,
    height: 'auto',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
    hr: {
    borderTopWidth: 0,
    borderColor: '#f1f1f1',
  },
  hr2: {
    borderBottomWidth: 1, 
    borderColor: '#f1f1f1',
    width:'100%'
  },
  mainBody: {
    width: width,
    //height:'70%',
    marginBottom:20,
    backgroundColor: '#142927',
    paddingHorizontal: 0,
    justifyContent: 'space-between',
    //position: 'absolute',
    //top:"30%",
  },
  mainBodyContent: {
    marginTop: 20,
    marginLeft: '10%',
    height: '20%',
  },
  mainBodyCards: {
    width: '95%',
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 0,

    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  iconStyle: {
    width: 10,
    height: 20,
  },
 mainBodyCardContent: {
 display: 'flex',
 flexDirection: 'row',
 justifyContent: 'space-between',
 marginHorizontal: 30,
 //borderBottomWidth: 1,
 //borderBottomColor: '#F1F1F1',
 paddingTop: 10,
 //borderColor: '#F1F1F1',
  },
  mainBodyBottomItems: {
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 45 : 15,
    marginTop: RFValue(20),
    //backgroundColor:"pink"
  },
  lastViewStyle: {
    alignItems: 'center',
    marginTop: RFValue(40),
    alignSelf: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
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
  socialimage: {
    resizeMode: 'contain',
    width: RFValue(25),
    height: RFValue(25),
    margin: RFValue(5),
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
    height: 'auto', flexDirection: 'row',
    width: '100%', paddingHorizontal: 0,
    paddingVertical: 0, borderRadius: 10,
    alignSelf: 'center', marginTop: 10,
    borderWidth: StyleSheet.hairlineWidth, borderColor: '#ddd',
  },
  textarea: {
    padding: 15,
    height: 100,
    width: '100%',color:'#343434',
    fontSize: 13, marginRight: 0,
    fontFamily: 'Nunito-Regular',
  },
  text_disabled: {
    backgroundColor: '#f2f2f2',
    alignSelf: 'center', marginTop: 0,
    paddingLeft: 15,
    width: '90%',color:'#343434',
    fontSize: 13, marginRight: 0,
    height: 45,
    fontFamily: 'Nunito-Regular',
  },  
  titleLabel: {
    fontSize:15, fontWeight:'600', color:'#fff'
  },
  RowB: {
    flexDirection:'row', justifyContent:'space-between',marginTop:10,
  },
  title: {
    fontSize:11, color:'#fff',
  },
  subtitle: {
fontSize:10, color:'#808080',marginVertical:5,
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
