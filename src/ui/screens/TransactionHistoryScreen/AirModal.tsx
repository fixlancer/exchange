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
import styles from './Style';

const { width, height } = Dimensions.get('screen');

interface Props {
    isOpen: boolean;
    handleChange: () => void;
    username: any;
    date: any;
    time: any;
    id: any;
    amount: any;
    fees_deducted: any;

}

const AirModal: React.FC<Props> = props => {

 //   console.log("KEY =>", props.id);
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

            <View style={styles.header}>
                <Icon
                    name={'maximize'}
                    size={20}
                    color={'#ccc'}
                    style={{ marginTop: 5 }}></Icon>
                <MyText
                    style={{
                        fontSize: 15, color: '#343434',
                        textAlign: 'center',
                    }}>
                    Purchases
                </MyText>
            </View>


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
    <MyText style={{ color: '#343434',fontSize: 13,}}> Amount Received</MyText>
    <MyText style={{ color: '#343434',fontSize: 13,}}> {'\u20A6'}{props.amount - props.fees_deducted}</MyText>
</View>

<View style={styles.CardText}>
<MyText style={{ color: '#343434',fontSize: 13,}}> Amount Withdrawn</MyText>
<MyText style={{ color: '#343434',fontSize: 13,}}> {'\u20A6'}{props.amount || 'N/A'}</MyText>
</View>

<View style={styles.CardText}>
<MyText style={{ color: '#343434',fontSize: 13,}}> Date Processed</MyText>
<MyText style={{ color: '#343434',fontSize: 13,}}> {props.date}, {props.time}</MyText>
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

export default AirModal;
