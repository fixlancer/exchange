import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    mainBody: {
        height: 'auto',
        width: '100%',
        backgroundColor: 'white',
        marginVertical: 3, 
        marginHorizontal: 0,
        borderRadius: 8,
        padding: 5,
    },
    titleImage: {
        width: 35,
        height: 35,
        marginTop:7,borderRadius:20,marginRight:5,
    },
    inlineCardPortion: {
      paddingHorizontal:10,  
      paddingBottom:5,
    },
    smBlueText: {
        fontSize: 12, 
        color: 'blue'
    },
    viewItems: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'center',
    },
    hr: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor:'#f1f1f1',
        marginTop: 10,
        marginBottom: 8,
    },
    amountPortion: {
        // flexDirection: 'row',
        borderTopColor:'#f1f1f1',
        borderTopWidth: StyleSheet.hairlineWidth,
        marginTop: 15,
        paddingTop:10,
        justifyContent:'center',
    },
    smFontSize: {
        fontSize:9,
        marginBottom: 0,
    },
    mdFontBlackColor: {
        color: '#343434',
        fontSize:13,
        textAlign: 'right',
    },
    Row: {
flexDirection:'row',
justifyContent:'space-between',
    },
    mdFontGreyColor: {
        color: '#808080',
        fontSize:12,marginVertical:2,
        textAlign: 'left',  
    },
});

  export default styles