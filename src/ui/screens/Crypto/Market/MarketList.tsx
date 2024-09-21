import React, { useEffect, useState } from 'react'
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
    subCat: any;
    lastPrice: any;
    ngnRate: any;
    subTitle: any;
    btcPrice: any;
    priceChangePercent: any;
    navigation: any;
}

const MarketList: React.FC<Props> = props => {
    const { title, lastPrice, priceChangePercent, subTitle, ngnRate, btcPrice, subCat, navigation } = props;

    const theme = useTheme()
    const styles = newStyles(theme);
    const [price, setPrice] = useState(lastPrice);
    const ngnPrice = lastPrice * ngnRate;
    const btcPP = lastPrice / btcPrice;

    useEffect(() => {
        switch (subCat) {
            case 'NGN':
                return setPrice(ngnPrice.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 }).replace(/,/g, ''));
                break;
            case 'BTC':
                return setPrice(btcPP.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 8 }).replace(/,/g, ''));
                break;
            default:
                return setPrice(lastPrice)
        }
    }, [subCat])

    const img = {
        BTC: require('../../../../Assets/ICONS/btc.png'),
        USDT: require('../../../../Assets/ICONS/usdt.png'),
        ETH: require('../../../../Assets/ICONS/eth.png'),
        DOGE: require('../../../../Assets/ICONS/doge.png'),
        BNB: require('../../../../Assets/ICONS/bnb.png'),
        SHIB: require('../../../../Assets/ICONS/shib.png'),
        ETC: require('../../../../Assets/ICONS/etc.png'),
        ADA: require('../../../../Assets/ICONS/ada.png'),
        LTC: require('../../../../Assets/ICONS/ltc.png'),
        XRP: require('../../../../Assets/ICONS/xrp.png'),
        XLM: require('../../../../Assets/ICONS/xlm.png'),
    }

    const priceType = {
        USDT: '$',
        NGN: '\u20A6',
        BTC: '',
    }

    const handleClick = () => {
        switch (subCat) {
            case 'USDT':
                return navigation.navigate('PairChart', { crypto: title, currency: 'USDT' });
                break;
            case 'NGN':
                return navigation.navigate('PairChart', { crypto: title, currency: 'NGN' });
                break;
            case 'BTC':
                return navigation.navigate('PairChart', { crypto: title, currency: 'BTC' });
                break;
            default:
                return navigation.navigate('PairChart', { crypto: title, currency: 'USDT' });
        }
    }

    return (
        <View style={[styles.pv15, styles.ph15]}>


            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleClick()}
                style={[styles.RowB]}>

                <View style={styles.Row}>

                    <Image source={img[title]} style={[styles.icon, styles.mt5, styles.mr15]} />

                    <View>
                        <MyText style={[styles.largeLabel3]}>{title} {subCat === '' ? null : <MyText style={[styles.textGrey]}>/ {subCat}</MyText>}</MyText>
                        <MyText style={[styles.tinyLabel,styles.pt5]}>{subTitle}</MyText>
                    </View>
                </View>


                <View>
                    <MyText style={[styles.largeLabel3, { textAlign: 'right' }]}>{subCat != '' ? priceType[subCat] : '$'}{price.toLocaleString()}</MyText>
                    <View style={[styles.Row, { justifyContent: 'flex-end' }]}>
                        <IconM
                            name={parseFloat(priceChangePercent) < 0 ? 'arrow-down' : 'arrow-up'}
                            size={moderateScale(12)}
                            color={parseFloat(priceChangePercent) < 0 ? '#ff0000' : '#1cc88a'}
                            style={[styles.mr5, styles.mt5]}></IconM>
                        <MyText style={[styles.tinyLabel, parseFloat(priceChangePercent) < 0 ? styles.textRed : styles.textGreen, styles.pt5]}>{priceChangePercent}</MyText>
                    </View>

                </View>

            </TouchableOpacity>
        </View>
    )
}


export default MarketList;