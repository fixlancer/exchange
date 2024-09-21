import React, { useState } from 'react';
import {
    View,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Platform,
    ScrollView,
} from 'react-native';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyText from '../../components/DefaultTextComponent/MyText';
import { ActivityIndicator } from 'react-native-paper';
import styles from './Style';

const { width, height } = Dimensions.get('screen');

interface Props {
    isOpen: boolean;
    handleChange: () => void;
    username: any;
    acc_name: any;
    acc_no: any;
    bank_name: any;
    createdAt: any;
    id: any;
    amount: any;
    fees_deducted: any;

}

const WithdrawalModal: React.FC<Props> = props => {
    const formattedDateTime = (createdAt) => {
        const dateObj = new Date(createdAt);
        const date = dateObj.toLocaleDateString();
        const time = dateObj.toLocaleTimeString();
        return `${date}, ${time}`;
      }
//    console.log("KEY =>", props.id);
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

         
<View style={styles.header2}>
<MyText
          style={{
            color:'#343434',marginTop:2,
            fontSize: 18,fontFamily: 'Nunito-Bold', fontWeight: '400',}}>Withdrawals</MyText>

        <TouchableOpacity onPress={() => props.handleChange()} style={styles.roundClose}>
        <Icon
          name={'close'}
          size={20}
          color={'#808080'}
          style={{ alignSelf:'center' }}></Icon>
          </TouchableOpacity>
          </View>

          <StatusBar translucent barStyle='dark-content' backgroundColor={'#fff'} />


            <ScrollView>
  <TouchableOpacity activeOpacity={0.9}>

  <View style={[styles.midCont]}>

<MyText style={{ color: '#343434', textAlign:'center', paddingVertical:10, fontSize: 22,}}>
{'\u20A6'}{props?.amount - props?.fees_deducted || 'N/A'}</MyText>

<MyText style={{ color: '#1cc88a', textAlign:'center', paddingVertical:10, fontSize: 12,}}> 
Transaction Completed
</MyText>


<View style={styles.seprator} />
<View style={styles.OrderCard}>


<View style={styles.CardText}>
    <MyText style={{ color: '#343434',fontSize: 13,}}> Account Number</MyText>
    <MyText selectable={true} style={{ color: '#343434',fontSize: 13,}}> {props?.acc_no}</MyText>
</View>


<View style={styles.CardText}>
    <MyText style={{ color: '#343434',fontSize: 13,}}> Account Name</MyText>
    <MyText style={{ color: '#343434',fontSize: 13,}}> {props?.acc_name} </MyText>
</View>

<View style={styles.CardText}>
<MyText style={{ color: '#343434',fontSize: 13,}}> Bank Name</MyText>
<MyText style={{ color: '#343434',fontSize: 13,}}> {props?.bank_name}</MyText>
</View>

<View style={styles.CardText}>
    <MyText style={{ color: '#343434',fontSize: 13,}}> Amount Received</MyText>
    <MyText style={{ color: '#343434',fontSize: 13,}}> {'\u20A6'}{props?.amount - props?.fees_deducted}</MyText>
</View>

<View style={styles.CardText}>
<MyText style={{ color: '#343434',fontSize: 13,}}> Amount Withdrawn</MyText>
<MyText style={{ color: '#343434',fontSize: 13,}}> {'\u20A6'}{props?.amount || 'N/A'}</MyText>
</View>

<View style={styles.CardText}>
<MyText style={{ color: '#343434',fontSize: 13,}}> Date Processed</MyText>
<MyText style={{ color: '#343434',fontSize: 13,}}>{formattedDateTime(props?.createdAt)}</MyText>
</View>

<View style={styles.CardText}>
<MyText style={{ color: '#343434',fontSize: 13,}}> ID</MyText>
<MyText style={{ color: '#343434',fontSize: 13,}}> #{props.id}</MyText>
</View>

</View>


</View>

                </TouchableOpacity>
            </ScrollView>
        </Modal>
    );
};

export default WithdrawalModal;
