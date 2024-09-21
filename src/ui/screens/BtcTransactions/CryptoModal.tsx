import React, { useState } from 'react';
import {
    View,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Platform,
    ScrollView,
} from 'react-native';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyText from '../../components/DefaultTextComponent/MyText';
import { ActivityIndicator } from 'react-native-paper';
import styles from './Styles';

const { width, height } = Dimensions.get('screen');

interface Props {
    isOpen: boolean;
    handleChange: () => void;
    username: any;
    value: any;
    wallet: any;
    images: any;
    date: any;
    time: any;
    id: any;
    amount: any;
    key: any;
    trade_name: any;

}

const CryptoModal: React.FC<Props> = props => {

    console.log("KEY =>", props.id);
    return (
        <Modal isOpen={props.isOpen}
            style={{ }}
            onClosed={props.handleChange}
            swipeArea={400}
            keyboardTopOffset={Platform.OS == 'ios' ? 22 : 0}
            coverScreen={true}
            backdropOpacity={1}
            backdropColor="white"
            position="top">

            <View style={styles.head}>
        <MyText
          style={{
            color:'#343434',marginTop:2,
            fontSize: 18,fontFamily: 'Nunito-Bold', fontWeight: '400',
          }}>
         {props.trade_name} Trade
        </MyText>
        <TouchableOpacity onPress={() => props.handleChange()} style={styles.roundClose}>
        <Icon
          name={'close'}
          size={20}
          color={'#808080'}
          style={{ alignSelf: 'center' }}></Icon>
          </TouchableOpacity>
          </View>

            <ScrollView>
  <TouchableOpacity activeOpacity={0.9}>

  <View style={[styles.midCont]}>

<MyText style={{ color: '#343434', textAlign:'center', paddingVertical:10, fontSize: 22,}}>
{'\u20A6'}{props?.value || 'N/A'}</MyText>

<MyText style={{ color: '#1cc88a', textAlign:'center', paddingVertical:10, fontSize: 12,}}> 
Completed
</MyText>


<View style={styles.seprator} />
<View style={styles.OrderCard}>


<View style={styles.CardText}>
    <MyText style={{ color: '#343434',fontSize: 13,}}> USD Received</MyText>
    <MyText style={{ color: '#343434',fontSize: 13,}}> ${props.amount}</MyText>
</View>

<View style={styles.CardText}>
    <MyText style={{ color: '#343434',fontSize: 13,}}> Transaction value (Naira)</MyText>
    <MyText style={{ color: '#343434',fontSize: 13,}}> {'\u20A6'}{props.value}</MyText>
</View>

<View style={styles.CardText}>
<MyText style={{ color: '#343434',fontSize: 13,}}> {props.trade_name} Address</MyText>
<MyText style={{ color: '#343434',fontSize: 13,}}> {props.wallet}</MyText>
</View>


<View style={styles.CardText}>
<MyText style={{ color: '#343434',fontSize: 13,}}> Date Processed</MyText>
<MyText style={{ color: '#343434',fontSize: 13,}}> {props.date}, {props.time}</MyText>
</View>

<View style={styles.CardText}>
<MyText style={{ color: '#343434',fontSize: 13,}}> ID</MyText>
<MyText style={{ color: '#343434',fontSize: 13,}}> #{props.id}</MyText>
</View>

<View style={styles.CardText}>
<MyText style={{fontSize:13,}}> Images will show here</MyText>
</View>

</View>


</View>

                </TouchableOpacity>
            </ScrollView>
        </Modal>
    );
};

export default CryptoModal;
