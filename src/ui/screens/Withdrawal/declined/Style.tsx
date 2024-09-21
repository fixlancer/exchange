import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';

const styles = StyleSheet.create({
    contentRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    statusAndDateContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    borderLine: {
        marginTop: 20,
        marginBottom:20,
        paddingTop: 5,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#F2F2F2',
    },
    mainBody: {
        width: '100%',
        height:'auto',
        backgroundColor: 'white',
        marginVertical: 3, 
        marginHorizontal: 0,
        borderRadius: 8,
        padding: 5,
        marginBottom:5,
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
  cont: {
    width:'100%',
    paddingHorizontal:0,
    flex:1,
  },
    loader: {
        backgroundColor:'#000', height:50, justifyContent:'center', alignItems:'center',width:50,padding:10,borderRadius:5, elevation:2,
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


export default styles