import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import MyText from '../../../components/DefaultTextComponent/MyText';
const {width, height} = Dimensions.get('screen');

interface Props {
  isOpen: boolean;
  nairaValue: any;
  handleChange: any;
}

const RateModal: React.FC<Props> = props => {
  return (
    <Modal
      //style={{ backgroundColor:'#fafafa' , height:height/2}}
      isVisible={props.isOpen}>
       
      <View
        style={{
          width: '90%',
          height: 'auto',
          borderRadius: 10,
          alignSelf: 'center',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            marginVertical: 15,
            marginHorizontal:15,
            borderRadius: 40,
            alignSelf: 'center',
            backgroundColor: 'white',
            justifyContent: 'space-between',
          }}>
          <View>
            <MyText
              style={{
                textAlign: 'center',
                fontSize: 10,
                margin: 5,
                color: '#808080',
              }}>
              Estimated Rate
            </MyText>

            {/* hr */}
          </View>

          <View>
            <MyText
              style={{
                color: '#343434',
                fontSize: 18,
                marginTop:0,
                fontWeight: '400',
                marginBottom:10,
                alignSelf: 'center',
                textAlign: 'center',
              }}>{'\u20A6'}{props.nairaValue}
            </MyText>
          </View>
          
        
        </View>

  <View style={{flexDirection:'row',paddingHorizontal:0, width:'100%', paddingVertical:10,borderTopWidth: StyleSheet.hairlineWidth, borderColor:'#ddd', justifyContent:'center', alignItems:'center'}}>
     
     <TouchableOpacity
       activeOpacity={0.9}
       style={{width:'100%'}}
       onPress={() => props.handleChange()}>
       <MyText
         style={{
           textAlign: 'center',
           fontSize: 12,
           color: '#343434',
         }}>CLOSE</MyText>

     </TouchableOpacity>
     
 
   </View>
      </View>
    </Modal>
  );
};

export default RateModal;