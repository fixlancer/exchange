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
    FlatList,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import MyText from '../../../components/DefaultTextComponent/MyText';
import newStyles from '../../Styles/Styles';
import Modal from 'react-native-modalbox';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

import CryptoSwapModal from './Modal/CryptoSwapModal';
import CurrencySwapModal from './Modal/CurrencySwapModal';
import ConfirmModal from './Modal/ConfirmModal';

import HeaderSubClose from '../../../components/Header/HeaderSubClose';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');


const SwapCrypto = ({ navigation, route }) => {

    const { tradeType, crypto, currency } = route.params;


    const theme = useTheme()
    const styles = newStyles(theme);

    const nairaSign = '\u20A6';

    // These DATA will gotten from admin settings

    const ratewhenSelling = 1450;
    const ratewhenBuying = 1500;

    const swapFee = 0.5;
    const cryptoPrice = 42980;

    const cryptoWalletAmt = 0.356776;
    const currencyWalletAmt = 5760;

    //END DATA

    const inputRef = useRef(null);


    const [isPair, setIsPair] = useState(['NGN', 'USDT', 'BTC']);

    const [swapTradeType, setSwapTradeType] = useState(tradeType);
    const [swapCrypto, setSwapCrypto] = useState(crypto);
    const [swapCurrency, setSwapCurrency] = useState(currency);

    const [fee, setFee] = useState(0);


    const [isLoading, setIsLoading] = useState(false);


    const [cryptoAmt, setCryptoAmt] = useState(0);
    const [currencyAmt, setCurrencyAmt] = useState(0);


    const [isCurrency, setIsCurrency] = useState(false);
    const [isCrypto, setIsCrypto] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);


    const closeCurrency = () => {
        setIsCurrency(false);
    }

    const closeCrypto = () => {
        setIsCrypto(false);
    }

    const openCurrency = () => {
        setIsCurrency(true);
        setCryptoAmt(0)
        setCurrencyAmt(0);
        inputRef.current.blur();
    }

    const openCrypto = () => {
        setIsCrypto(true);
        setCryptoAmt(0)
        setCurrencyAmt(0)
        inputRef.current.blur();
    }


    const openConfirm = () => {
        inputRef.current.blur();
        setIsConfirm(true);
    }


    const closeConfirm = () => {
        setIsConfirm(false);
    }



    const handleSetCrypto = (data) => {
        switch (data) {
            case 'BTC':
                if (swapCurrency === 'BTC') {
                    setSwapCurrency('NGN');
                }
                setSwapCrypto(data);
                break;
            case 'USDT':
                if (swapCurrency === 'USDT') {
                    setCryptoAmt(0);
                    setSwapCurrency('NGN');
                }
                setSwapCrypto(data);
                break;
            default:
                setSwapCurrency('USDT');
                setSwapCrypto(data);
                break;
        }
    }

    const handleSetCurrency = (data) => {
        setSwapCurrency(data);
    }




    /*** SELLING/BUYING CRYPTO USING NGN & CRYPTO  */

    const handleInput = (text) => {
        setCryptoAmt(text);
        handleSwapCrypto(text)
    }


    const handleSwapCrypto = (data) => {
        switch (swapCurrency) {
            case 'NGN':
                handleNGNTrade(data);
                break;
            default:
                handleOtherCurrencyTrade(data);
                break;
        }
    }

    const handleNGNTrade = (data) => {
        switch (swapCrypto) {
            case 'BTC':
                if (swapTradeType === 'Sell') {
                    const usdValue = cryptoPrice * data;
                    const amt = usdValue * ratewhenSelling;
                    const finalAmt = Number.parseInt(amt).toFixed(2);
                    setCurrencyAmt(parseFloat(finalAmt));
                } else {
                    const usdValue = cryptoPrice * data;
                    const amt = usdValue * ratewhenBuying;
                    const finalAmt = Number.parseInt(amt).toFixed(2);
                    setCurrencyAmt(parseFloat(finalAmt));
                }
                break;
            case 'USDT':
                if (swapTradeType === 'Sell') {
                    const amt = data * ratewhenSelling;
                    const finalAmt = Number.parseInt(amt).toFixed(2);
                    setCurrencyAmt(parseFloat(finalAmt));
                } else {
                    const amt = data * ratewhenBuying;
                    const finalAmt = Number.parseInt(amt).toFixed(2);
                    setCurrencyAmt(parseFloat(finalAmt));
                }
                break;
            case 'ETH':
                break;
            case 'DOGE':
                break;
            case 'SHIB':
                break;
            case 'BNB':
                break;
            case 'XRP':
                break;
            case 'LTC':
                break;
            case 'XLM':
                break;
            case 'ADA':
                break;
            case 'ETC':
                break;
            // Add more cases here
            default:
                return null;
        }
    }

    const handleOtherCurrencyTrade = (data) => {
        switch (swapCrypto) {
            case 'BTC':
                const ifeeCalc = data * swapFee;
                const imyFee = ifeeCalc / 100;
                const ifeeUsd = imyFee * cryptoPrice;
                const ifinalFee = ifeeUsd.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 }).replace(/,/g, '');
                const icryptoValue = swapTradeType === 'Sell' ? parseFloat(data) - parseFloat(imyFee) : parseFloat(data) + parseFloat(imyFee);
                const iamt = icryptoValue * cryptoPrice;
                const ifinalAmt = Number.parseInt(iamt).toFixed(2);
                setCurrencyAmt(parseFloat(ifinalAmt));
                console.log(ifinalAmt);

                setFee(parseFloat(ifinalFee));
                break;
            case 'USDT':
                const cryptoValue = data / cryptoPrice;
                const feeCalc = cryptoValue * swapFee;
                const feee = feeCalc / 100;
                const finalFee = feee.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 8 }).replace(/,/g, '');
                const amt = swapTradeType === 'Sell' ? cryptoValue + feee : cryptoValue - feee;
                const finalAmt = amt.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 8 }).replace(/,/g, '');
                setCurrencyAmt(parseFloat(finalAmt));
                setFee(parseFloat(finalFee));

                break;

            case 'ETH':
                break;
            case 'DOGE':
                break;
            case 'SHIB':
                break;
            case 'BNB':
                break;
            case 'XRP':
                break;
            case 'LTC':
                break;
            case 'XLM':
                break;
            case 'ADA':
                break;
            case 'ETC':
                break;
            // Add more cases here
            default:
                return null;
        }
    }


    /* ENDS HERE */


    const getFeeView = () => {
        switch (swapCurrency) {
            case 'BTC':
                if (cryptoAmt > 0) {
                    return (
                        <View style={[styles.RowB, styles.mb5, styles.ph10]}>
                            <View style={styles.Row}>
                                <Icon
                                    name={'swap-horiz'}
                                    size={moderateScale(15)}
                                    color={'#1cc88a'}
                                    style={{ marginTop: 12, marginRight: 5 }}
                                />
                                <MyText style={[styles.tinyLabel, styles.fontSize13, styles.pt10]}>Estimated fee: </MyText>
                            </View>
                            <MyText style={[styles.tinyLabel, styles.fontSize13, styles.pt10]}>{fee} BTC</MyText>
                        </View>
                    );
                }
                break;
            case 'USDT':
                if (cryptoAmt > 0) {
                    return (
                        <View style={[styles.RowB, styles.mb5, styles.ph10]}>
                            <View style={styles.Row}>
                                <Icon
                                    name={'swap-horiz'}
                                    size={moderateScale(15)}
                                    color={'#1cc88a'}
                                    style={{ marginTop: 12, marginRight: 5 }}
                                />
                                <MyText style={[styles.tinyLabel, styles.fontSize13, styles.pt10]}>Estimated fee: </MyText>
                            </View>
                            <MyText style={[styles.tinyLabel, styles.fontSize13, styles.pt10]}>{fee} USDT</MyText>
                        </View>
                    );
                }
                break;
            default:
                return null;
        }
    }

    const getTransactionRateView = () => {
        if (swapCurrency === 'NGN') {
            if (cryptoAmt > 0) {
                return (
                    <View style={[styles.RowB, styles.mb5, styles.ph10]}>
                        <View style={styles.Row}>
                            <Icon
                                name={'tag'}
                                size={moderateScale(15)}
                                color={'#1cc88a'}
                                style={{ marginTop: 12, marginRight: 5 }}
                            />
                            <MyText style={[styles.tinyLabel, styles.fontSize13, styles.pt10]}>Transaction rate: </MyText>
                        </View>
                        <MyText style={[styles.tinyLabel, styles.fontSize13, styles.pt10]}>$1 = {nairaSign}{swapTradeType === 'Sell' ? ratewhenSelling : ratewhenBuying}</MyText>
                    </View>
                );
            }
        }
        return null;
    }


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
        NGN: require('../../../../Assets/ICONS/ngn.png'),
    }


    const handleSubmitTrade = () => {
        setTimeout(() => {
            setIsLoading(true);
        }, 500)

        setTimeout(() => (
            navigation.reset({
                index: 1,
                routes: [{ name: 'DashBoard' },
                {
                    name: 'Success',
                    params: { type: tradeType, amount: tradeType === 'Sell' ? currencyAmt : cryptoAmt, currency: tradeType === 'Sell' ? currency : crypto }
                }],
            })
        ), 1500)

    }

    return (


        <TouchableWithoutFeedback onPress={() => inputRef.current.blur()}>
            <View style={[styles.container, styles.midBgGrey]}>

                <SafeAreaView
                    style={{
                        height: height,
                        width: width,
                        flex: 1,
                        backgroundColor: 'transparent',
                    }}
                    edges={['left', 'right', 'top']}>
        <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />


                    <View style={[styles.newModalHeader, styles.RowB]}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.b30, styles.alignCenter, styles.bgWhite, styles.borderDark, styles.mt10, { width: moderateScale(30), height: moderateScale(30) }]}>
                            <IconM
                                name={'close'}
                                size={moderateScale(15)}
                                color={theme.dark ? '#fff' : '#343434'}
                                style={{}} />

                        </TouchableOpacity>

                        <View style={[styles.Row, styles.alignCenter, styles.mt10, styles.mb15, {}]}>
                            <TouchableOpacity
                                onPress={() => setSwapTradeType('Buy')}
                                style={[swapTradeType === 'Buy' ? styles.lineBottomCatDark : null, styles.ph10, styles.mr15, styles.pb2]}>
                                <Text style={[styles.textCenter, styles.fontSize15, styles.fontSemi, swapTradeType === 'Buy' ? styles.textDark : styles.textLightGrey, {}]}>Buy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setSwapTradeType('Sell')}
                                style={[swapTradeType === 'Sell' ? styles.lineBottomCatDark : null, styles.ph10, styles.pb2, ]}>
                                <Text style={[styles.textCenter, styles.fontSize15, styles.fontSemi, swapTradeType === 'Sell' ? styles.textDark : styles.textLightGrey,]}>Sell</Text>
                            </TouchableOpacity>

                        </View>

                        <MyText style={[styles.pl5]}></MyText>
                    </View>


                    <ScrollView style={[styles.midBgGrey, styles.mt10, styles.ph15]}>
                        <TouchableOpacity activeOpacity={1}>

                            <View style={[styles.formWhite, styles.shadow, styles.b30, styles.bgWhite, styles.ph5, styles.pt10, styles.mb5]}>
                                <View style={styles.mr15}>

                                    <View style={[styles.RowB,]}>


                                        <TextInput
                                            style={[styles.shortDrop, styles.fontSize15, styles.fontRegular,]}
                                            placeholder="Enter amount"
                                            placeholderTextColor={'#808080'}
                                            keyboardType='numeric'
                                            value={cryptoAmt === 0 ? '' : cryptoAmt.toString()}
                                            maxLength={9}
                                            ref={inputRef}
                                            onChangeText={(e) => handleInput(e)}

                                        />

                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={openCrypto}
                                            style={[styles.RowB, { width: moderateScale(85) }]}>
                                            <View style={[styles.Row, { justifyContent: 'flex-start', }]}>
                                                <View style={[styles.mt10, {}]}>

                                                    <Image source={img[swapCrypto]}
                                                        style={{ width: 20, height: 20 }} />
                                                </View>
                                                <MyText style={[styles.userLabel, styles.fontSize15, styles.pl5, styles.mt10]}>{swapCrypto}</MyText>

                                            </View>

                                            <View style={{}}>
                                                <IconM
                                                    name={'chevron-down'}
                                                    size={moderateScale(15)}
                                                    color={'#808080'}
                                                    style={{ marginTop: 12, marginLeft: 5 }}></IconM>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={[styles.RowB, styles.mb5, styles.ph15, { marginTop: -2 }]}>
                                    <MyText></MyText>
                                    <View style={[styles.Row,]}>
                                        <MyText style={[styles.tinyLabel, styles.fontSize8, styles.pl5]}>Bal: {cryptoWalletAmt} </MyText>
                                        <MyText style={[styles.tinyLabel, styles.fontSize8,]}>{swapCrypto}</MyText>
                                    </View>
                                </View>


                                <View style={[styles.formWhite, styles.ph15, styles.roundBorderBottom, styles.bgLightGrey, styles.pb5, styles.mb5,]}>
                                    <View style={styles.RowB}>
                                        <MyText style={[styles.tinyLabel, styles.pt10]}>{swapTradeType === 'Sell' ? "You'll receive" : "You'll pay"}</MyText>
                                        <MyText></MyText>
                                    </View>

                                    <View style={[styles.RowB, styles.mb10,]}>

                                        <View>
                                            <MyText style={[styles.largeLabel, styles.pt5]}>{swapCurrency === 'NGN' ? nairaSign : swapCurrency === 'USDT' ? '$' : ''}
                                                {currencyAmt}</MyText>
                                        </View>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={openCurrency}
                                            style={[styles.RowB, { width: moderateScale(85) }]}>
                                            <View style={[styles.Row, { justifyContent: 'flex-start', }]}>
                                                <View style={[styles.mt10, { paddingBottom: 1 }]}>

                                                    <Image source={img[swapCurrency]}
                                                        style={{ width: 20, height: 20 }} />
                                                </View>
                                                <MyText style={[styles.userLabel, styles.fontSize15, styles.pl5, styles.pt10]}>{swapCurrency}</MyText>

                                            </View>

                                            <View>
                                                <IconM
                                                    name={'chevron-down'}
                                                    size={moderateScale(15)}
                                                    color={'#808080'}
                                                    style={{ marginTop: 12, marginLeft: 5 }}></IconM>
                                            </View>
                                        </TouchableOpacity>

                                    </View>

                                    <View style={[styles.RowB,]}>
                                        <MyText></MyText>
                                        <View style={[styles.Row,]}>
                                            <MyText style={[styles.tinyLabel, styles.fontSize8, styles.pl5]}>Bal: {currencyWalletAmt} </MyText>
                                            <MyText style={[styles.tinyLabel, styles.fontSize8]}>{swapCurrency}</MyText>
                                        </View>
                                    </View>

                                </View>

                                {/*    <MyText style={[styles.tinyLabel, styles.pt10]}>Wallet: {swapCurrency === 'BTC' ? '' : swapCurrency === 'USDT' ? '$' : nairaSign}{currencyWallet}</MyText> */}

                            </View>



                            <View style={[styles.ph5, styles.mb30]}>
                                {getFeeView()}
                                {getTransactionRateView()}


                                <View style={[styles.RowB, styles.ph10]}>
                                    <View style={styles.Row}>
                                        <Icons
                                            name={'lightning-bolt-outline'}
                                            size={moderateScale(15)}
                                            color={'#1cc88a'}
                                            style={{ marginTop: 12, marginRight: 5 }}></Icons>
                                        <MyText style={[styles.tinyLabel, styles.fontSize13, styles.pt10]}>Instant {swapTradeType.toLowerCase()}</MyText>
                                    </View>
                                </View>
                            </View>



                            <View style={[styles.formWhite, styles.shadow, styles.b20, styles.bgWhite, styles.ph15, styles.pb5, styles.pt10, styles.mb10]}>
                                <View style={styles.Row}>
                                    <Icons
                                        name={'alert-circle'}
                                        size={moderateScale(20)}
                                        color={'#f27415'}
                                        style={{ marginTop: 9, marginRight: 10 }}></Icons>
                                    <MyText style={[styles.userLabel, styles.pt10]}>Rate alert</MyText>
                                </View>

                                {swapCurrency === 'NGN' ? (
                                    <>
                                        <MyText style={[styles.titleLabel, styles.textGrey, styles.mb20, styles.pt10]}>Note that rates fluctuate and our buying and selling rates aren't the same.
                                            {"\n"}</MyText>
                                    </>
                                ) : (
                                    <>
                                        <MyText style={[styles.titleLabel, styles.textGrey, styles.mb20, styles.pt10]}>Note that crypto prices are very volatile. Your order will be completed with the best market price.</MyText>
                                    </>

                                )}
                            </View>

                        </TouchableOpacity>
                    </ScrollView>

                </SafeAreaView >



                <View style={[styles.ph15, styles.pt15, styles.bottomBar]}>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        disabled={cryptoAmt === 0 || currencyAmt === 0 ? true : false}
                        onPress={openConfirm}
                        style={[styles.submitButton, styles.bgGreen, { opacity: cryptoAmt === 0 || currencyAmt === 0 ? 0.6 : 1 }]}>
                        <MyText style={[styles.buttonLabel,]}>Proceed</MyText>
                    </TouchableOpacity>

                </View>

                {isLoading ? (
                    <View style={[styles.loader, styles.alignCenter]}>
                        <ActivityIndicator color={'white'} size={'large'} />
                    </View>
                ) : null}


                <CryptoSwapModal
                    isOpen={isCrypto}
                    selected={swapCrypto}
                    tradeType={swapTradeType}
                    setCrypto={(item) => handleSetCrypto(item)}
                    setPair={data => setIsPair(data)}
                    handleChange={closeCrypto}
                    navigation={navigation}
                />

                <CurrencySwapModal
                    isOpen={isCurrency}
                    selected={swapCurrency}
                    pair={isPair}
                    cryptoSelected={swapCrypto}
                    tradeType={swapTradeType}
                    setCurrency={(item) => handleSetCurrency(item)}
                    handleChange={closeCurrency}
                    navigation={navigation}

                />

                <ConfirmModal
                    isOpen={isConfirm}
                    tradeType={swapTradeType}
                    crypto={swapCrypto}
                    currency={swapCurrency}
                    currencyAmt={currencyAmt}
                    cryptoAmt={cryptoAmt}
                    handleSubmit={handleSubmitTrade}
                    handleChange={closeConfirm}
                    navigation={navigation}
                />

            </View >
        </TouchableWithoutFeedback >
    );
};


export default SwapCrypto;