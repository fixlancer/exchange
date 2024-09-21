import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import MyText from '../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import newStyles from '../Styles/Styles';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { useTheme } from 'react-native-paper';

interface Props {
    cardName: any;
    cardValue: any;
    rate: any;
    subCat: any;
    btcPrice: any;
    ngnBuyRate: any;
    navigation: any;
}

const RateList: React.FC<Props> = props => {
    const { cardName, cardValue, btcPrice, ngnBuyRate, subCat, rate, navigation } = props;


    const theme = useTheme()
    const styles = newStyles(theme);

    const nairaSign = '\u20A6';

    const img = () => {
        switch (cardName) {
            case 'ITUNES':
                return require('../../../Assets/CARDS/itunes.png')
                break;
            case 'STEAM':
                return require('../../../Assets/CARDS/steam.png')
                break;
            case 'GOOGLE PLAY':
                return require('../../../Assets/CARDS/Googleplay.png')
                break;
            case 'SEPHORA':
                return require('../../../Assets/CARDS/sephora.png')
                break;
            case 'AMERICAN EXPRESS':
                return require('../../../Assets/CARDS/americanexpress.png')
                break;
            case 'VANILLA':
                return require('../../../Assets/CARDS/vanilla.png')
                break;
            case 'WALMART':
                return require('../../../Assets/CARDS/walmart.png')
                break;
            case 'VISA':
                return require('../../../Assets/CARDS/visa.png')
                break;
            case 'EBAY':
                return require('../../../Assets/CARDS/ebay.png')
                break;
            case 'AMAZON':
                return require('../../../Assets/CARDS/amazon.png')
                break;
            case 'NORDSTROM':
                return require('../../../Assets/CARDS/nordstrom.png')
                break;
            case 'NIKE':
                return require('../../../Assets/CARDS/nike.png')
                break;
            case 'FOOTLOCKER':
                return require('../../../Assets/CARDS/footlocker.png');
                break;
            case 'RAZER':
                return require('../../../Assets/CARDS/footlocker.png');
            default:
                return null;

        }
    }


    const handleClick = () => {
        navigation.navigate('UploadGiftCard', {
            headerTitle: cardName
        })
    }

    const giftValue = cardValue * rate;
    const btcSubValue = giftValue / ngnBuyRate; 
    const btcValue = btcSubValue / btcPrice;


    return (
        <View style={[styles.pb15, styles.pt10, styles.ph15]}>


            <TouchableOpacity onPress={() => handleClick()}
                style={[styles.RowB]}>

                <View style={styles.Row}>

                    <View style={[styles.bgWhite, styles.alignCenter, styles.mt5, { width: moderateScale(40), height: moderateScale(40) }]}>
                        <Image
                            source={img()}
                            style={[{ width: moderateScale(30), height: moderateScale(30) }]}
                        />
                    </View>


                    <MyText style={[styles.pl15, styles.mt15, styles.largeLabel3]}>{cardName} <MyText style={[styles.textGrey]}>/ {subCat}</MyText></MyText>


                </View>

                <View style={[styles.mt10,]}>
                    
                <MyText style={[styles.largeLabel3, styles.textRight]}>{subCat === 'NGN' ? nairaSign + cardValue * rate : btcValue.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 8 }).replace(/,/g, '')}</MyText>  
                <MyText style={[styles.tinyLabel, styles.textRight]}>= ${cardValue}</MyText>

                </View>

            </TouchableOpacity>
        </View>
    )
}


export default RateList;