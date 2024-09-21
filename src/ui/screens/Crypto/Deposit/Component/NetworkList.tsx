import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import MyText from '../../../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import newStyles from '../../../Styles/Styles';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { useTheme } from 'react-native-paper';

interface Props {
    name: any;
    type: any;
    setData: any;
    minConfirmation: any;
    arrival: any;
    minAmt: any;
    fee: any;
    selectedNet: any;
    navigation: any;
}

const NetworkList: React.FC<Props> = props => {
    const { name, minConfirmation, selectedNet, arrival, setData, minAmt, fee, type, navigation } = props;

    const theme = useTheme()
    const styles = newStyles(theme);

    const handleClick = () => {
        setData(name);
    }

    return (
        <View style={[styles.mb15, styles.ph15,]}>


            <TouchableOpacity onPress={() => handleClick()}
                style={[styles.b20, styles.shadow, styles.RowB, styles.bgWhite, styles.pv15, styles.ph15, ]}>

                <View>
                    <MyText style={[styles.largeLabel3]}>{name}</MyText>
                    <MyText style={[styles.tinyLabel, styles.pt5]}>{minConfirmation} block confirmation</MyText>
                    <MyText style={[styles.tinyLabel]}>{type === 'Deposit' ? 'Min. deposit' : 'Min withdrawal'} {minAmt} USDT</MyText>
                    <MyText style={[styles.tinyLabel,]}>Est. arrival = {arrival} mins</MyText>
                    {type === 'Deposit' ? null : (
                        <MyText style={[styles.tinyLabel,]}>Fee: {fee} USDT</MyText>
                    )}

                </View>

                {name == selectedNet ? (

                    <View>
                        <IconM
                            name={'checkmark-circle'}
                            size={moderateScale(20)}
                            color={'#1cc88a'}
                            style={{ marginTop: moderateScale(15) }}></IconM>
                    </View>
                ) : null}

            </TouchableOpacity>
        </View>
    )
}


export default NetworkList;