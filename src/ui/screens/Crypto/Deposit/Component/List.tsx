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
    title: any;
    type: any;
    subTitle: any;
    navigation: any;
}

const List: React.FC<Props> = props => {
    const { title, subTitle, type, navigation } = props;

    const theme = useTheme()
    const styles = newStyles(theme);

    const img = {
        NGN: require('../../../../../Assets/ICONS/ngn.png'),
        BTC: require('../../../../../Assets/ICONS/btc.png'),
        USDT: require('../../../../../Assets/ICONS/usdt.png'),
        ETH: require('../../../../../Assets/ICONS/eth.png'),
        DOGE: require('../../../../../Assets/ICONS/doge.png'),
        BNB: require('../../../../../Assets/ICONS/bnb.png'),
        SHIB: require('../../../../../Assets/ICONS/shib.png'),
        ETC: require('../../../../../Assets/ICONS/etc.png'),
        ADA: require('../../../../../Assets/ICONS/ada.png'),
        LTC: require('../../../../../Assets/ICONS/ltc.png'),
        XRP: require('../../../../../Assets/ICONS/xrp.png'),
        XLM: require('../../../../../Assets/ICONS/xlm.png'),
    }

    const handleClick = () => {
        switch (type) {
            case 'Deposit':
                return navigation.navigate('Deposit', { crypto: title, });
            case 'Withdraw':
                return navigation.navigate('WithdrawCrypto', { crypto: title,});
            default:
                return null;
        }
    }
    return (
        <View style={[styles.pb15, styles.pt10, styles.ph15]}>


            <TouchableOpacity onPress={() => handleClick()}
                style={[styles.RowB]}>

                <View style={styles.Row}>
                    <Image source={img[title]} style={[styles.icon, styles.mt5]} />
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


export default List;