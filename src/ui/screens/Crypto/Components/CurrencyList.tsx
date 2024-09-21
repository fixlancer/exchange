import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import MyText from '../../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import newStyles from '../../Styles/Styles';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { useTheme } from 'react-native-paper';

interface Props {
    title: any;
    subTitle: any;
    crypto: any;
    handleChange: any;
    tradeType: any;
    navigation: any;
}

const CurrencyList: React.FC<Props> = props => {
    const { title, subTitle, crypto, handleChange, tradeType, navigation } = props;

    const theme = useTheme()
    const styles = newStyles(theme);
    const process = () => {
        navigation.navigate('SwapCrypto', { tradeType: tradeType, crypto: crypto, currency: title });
        handleChange();
    }
    const img = {
        BTC: require('../../../../Assets/ICONS/btc.png'),
        USDT: require('../../../../Assets/ICONS/usdt.png'),
        NGN: require('../../../../Assets/ICONS/ngn.png'),
    }

    return (        
    <View style={[styles.mb15, styles.pt10, styles.ph15]}>


            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => process()}
                style={[styles.RowB]}>

                <View style={styles.Row}>
                    <Image source={img[title]} style={[styles.icon, styles.mt5 ]} />

                    <View>
                        <MyText style={[styles.pl15, styles.largeLabel3]}>{title}</MyText>
                        <MyText style={[styles.tinyLabel, styles.pl15, styles.pt5]}>{subTitle}</MyText>

                    </View>
                </View>

                <View>
                    <IconM
                        name={'chevron-forward'}
                        size={moderateScale(20)}
                        color={'#808080'}
                        style={{ marginTop: moderateScale(8) }}></IconM>
                </View>

            </TouchableOpacity>
        </View>
    )
}


export default CurrencyList;