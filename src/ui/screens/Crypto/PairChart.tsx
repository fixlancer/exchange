import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Dimensions,
    Image,
    TouchableOpacity,
    Platform,
    StatusBar,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import MyText from '../../components/DefaultTextComponent/MyText';
import newStyles from '../Styles/Styles';
import Modal from 'react-native-modalbox';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import HeaderBack from '../../components/Header/HeaderBack';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');


const PairChart = ({ navigation, route }) => {

    const { crypto, currency } = route.params;

    const theme = useTheme()
    const styles = newStyles(theme);

    const nairaSign = '\u20A6';
    const lastPrice = 42980;
    const [pricePercent, setPricePercent] = useState('-6.8');

    const walletAmt = 0.356776;
    const ngnRate = 1450;
    const btcLastPrice = 42980


    // Price conversion
    const ngnPrice = lastPrice * ngnRate;
    const btcPrice = lastPrice / btcLastPrice;

    const getPrice = () => {
        switch (currency) {
            case 'USDT':
                return lastPrice.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 }).replace(/,/g, '');
            case 'NGN':
                return ngnPrice.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 }).replace(/,/g, '');
            case 'BTC':
                return btcPrice.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 8 }).replace(/,/g, '');
            default:
                return lastPrice.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 }).replace(/,/g, '');
        }
    }



    // Wallet conversion
    const usdtWallet = lastPrice * walletAmt;
    const ngnWallet = usdtWallet * ngnRate;
    const btcWallet = usdtWallet / btcLastPrice;

    const getWalletAmt = () => {
        switch (currency) {
            case 'USDT':
                return usdtWallet.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 }).replace(/,/g, '');
            case 'NGN':
                return ngnWallet.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 }).replace(/,/g, '');
            case 'BTC':
                return btcWallet.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 8 }).replace(/,/g, '');
            default:
                return usdtWallet.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 }).replace(/,/g, '');
        }
    }

    const symbol = () => {
        switch (currency) {
            case 'USDT':
                return '$';
            case 'NGN':
                return nairaSign;
            case 'BTC':
                return null;
            default:
                return '$';
        }
    }



    const handleClick = (data) => {
        switch (data) {
            case 'Deposit':
                return navigation.navigate('Deposit', { crypto: crypto });
                break;
            case 'Exchange':
                return navigation.navigate('SwapCrypto', { tradeType: 'Sell', crypto: crypto, currency: currency });
                break;
            case 'Withdraw':
                return navigation.navigate('WithdrawCrypto', { crypto: crypto });
                break;
            default:
                return null;
        }
    }

    const cryptoIcon = {
        BTC: require('../../../Assets/ICONS/btc.png'),
        USDT: require('../../../Assets/ICONS/usdt.png'),
        ETH: require('../../../Assets/ICONS/eth.png'),
        DOGE: require('../../../Assets/ICONS/doge.png'),
        BNB: require('../../../Assets/ICONS/bnb.png'),
        SHIB: require('../../../Assets/ICONS/shib.png'),
        ETC: require('../../../Assets/ICONS/etc.png'),
        ADA: require('../../../Assets/ICONS/ada.png'),
        LTC: require('../../../Assets/ICONS/ltc.png'),
        XRP: require('../../../Assets/ICONS/xrp.png'),
        XLM: require('../../../Assets/ICONS/xlm.png'),
        NGN: require('../../../Assets/ICONS/ngn.png'),
    }


    const bgImg = require('../../../Assets/premiumBG.png');


    return (
        <View style={[styles.container]}>

            {theme.dark ? null :
                <Image
                    source={bgImg}
                    style={styles.accountBG}
                />
            }

            <SafeAreaView
                style={{
                    height: height,
                    width: width,
                    flex: 1,
                    backgroundColor: 'transparent',
                }}
                edges={['left', 'right', 'top']}>
                <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

                <HeaderBack navigation={navigation} headerTitle={crypto + '/' + currency} />


                <ScrollView>
                    <View style={[]}>

                        <View style={[styles.ph15, styles.mb10]}>

                            <View>
                                <MyText style={[styles.extraLabel,]}>{symbol()}{getPrice()}</MyText>
                                <View style={[styles.Row,]}>
                                    <MyText style={[styles.tinyLabel, styles.fontSize10]}>= ${lastPrice.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 }).replace(/,/g, '')}</MyText>
                                    <MyText style={[styles.tinyLabel, styles.fontSize10, parseFloat(pricePercent) < 0 ? styles.textRed : styles.textGreen, styles.pl5]}>{pricePercent}%</MyText>
                                </View>
                            </View>

                        </View>


                        <View style={[styles.mb20, { height: moderateScale(250) }]}>

                        </View>


                    </View>

                </ScrollView>

            </SafeAreaView >


            <View style={[styles.ph20, styles.mb20]}>

                <View style={[styles.ph15, styles.RowB]}>
                    <TouchableOpacity
                        onPress={() => handleClick('Deposit')}
                        style={[styles.alignCenter]}>
                        <View style={[styles.ph15, styles.bgLightGrey, styles.pv15, styles.b30]}>
                            <IconM
                                name={'add-circle-outline'}
                                size={moderateScale(25)}
                                color={'#808080'}
                                style={[]} />
                        </View>
                        <MyText style={[styles.userLabel, styles.pt10]}>Deposit</MyText>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => handleClick('Exchange')}
                        style={[styles.alignCenter]}>
                        <View style={[styles.ph15, styles.bgLightGrey, styles.pv15, styles.b30]}>
                            <Icon
                                name={'offline-bolt'}
                                size={moderateScale(25)}
                                color={'#808080'}
                                style={[]} />
                        </View>
                        <MyText style={[styles.userLabel, styles.pt10]}>Exchange</MyText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleClick('Withdraw')}
                        style={[styles.alignCenter]}>
                        <View style={[styles.ph15, styles.bgLightGrey, styles.pv15, styles.b30]}>
                            <IconM
                                name={'arrow-down-circle-outline'}
                                size={moderateScale(25)}
                                color={'#808080'}
                                style={[]} />
                        </View>
                        <MyText style={[styles.userLabel, styles.pt10]}>Withdraw</MyText>
                    </TouchableOpacity>
                </View>


            </View>

            <View style={[styles.lineBottomDark]} />

            <View style={[styles.iosBar]}>

                <View style={[styles.ph15, styles.pt10]}>

                    <MyText style={[styles.tinyLabel, styles.mb5]}>In wallet</MyText>

                    <View style={[styles.RowB,]}>
                        <MyText style={[styles.userLabel,]}>{walletAmt} {crypto}</MyText>
                        <View>
                            <MyText style={[styles.userLabel,]}>{symbol()}{getWalletAmt()}</MyText>
                            <MyText style={[styles.tinyLabel, styles.fontSize9, { textAlign: 'right' }]}>${usdtWallet.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 }).replace(/,/g, '')}</MyText>
                        </View>

                    </View>

                </View>
            </View>

        </View>
    );
};


export default PairChart;