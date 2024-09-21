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
import { RFValue } from 'react-native-responsive-fontsize';
import styles from '../../Styles/Styles';
import Modal from 'react-native-modalbox';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

import CryptoSwapModal from './Modal/CryptoSwapModal';
import CurrencySwapModal from './Modal/CurrencySwapModal';
import ConfirmModal from './Modal/ConfirmModal';

const { width, height } = Dimensions.get('screen');


const SwapoldCrypto = ({ navigation, route }) => {

    const { tradeType, crypto, currency } = route.params;

    const nairaSign = '\u20A6';

    // These DATA will gotten from admin settings

    const ratewhenSelling = 1450;
    const ratewhenBuying = 1500;

    const swapFee = 0.5;
    const cryptoPrice = 42980;

    const btcWalletAmt = 0.356776;
    const usdtWalletAmt = 5760;
    const ngnWalletAmt = 1600000;

    //END DATA

    const inputRef = useRef(null);


    const [swapCrypto, setSwapCrypto] = useState(crypto);
    const [swapCurrency, setSwapCurrency] = useState(currency);

    const [fee, setFee] = useState(0);

    const [cryptoWallet, setCryptoWallet] = useState(0);
    const [currencyWallet, setCurrencyWallet] = useState(0);


    const [cryptoAmt, setCryptoAmt] = useState(0);
    const [currencyAmt, setCurrencyAmt] = useState(0);


    const [isCurrency, setIsCurrency] = useState(false);
    const [isCrypto, setIsCrypto] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    

    useEffect(() => {
        if (swapCrypto === 'BTC') {
            setCryptoWallet(btcWalletAmt);
        } else {
            setCryptoWallet(usdtWalletAmt);
        }

    }, [swapCrypto])

    useEffect(() => {
        if (swapCurrency === 'BTC') {
            setCurrencyWallet(btcWalletAmt);
        } else if (swapCurrency === 'USDT') {
            setCurrencyWallet(usdtWalletAmt);
        } else {
            setCurrencyWallet(ngnWalletAmt);
        }

    }, [swapCurrency])

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
        if (data === 'BTC' && swapCurrency === 'BTC') {
            setCryptoAmt(0);
            setSwapCrypto(data);
            setSwapCurrency('NGN')
        } else if (data === 'USDT' && swapCurrency === 'USDT') {
            setCryptoAmt(0);
            setSwapCrypto(data);
            setSwapCurrency('NGN')
        } else {
            setSwapCrypto(data);
        }
    }

    const handleSetCurrency = (data) => {
        if (data === 'BTC' && swapCrypto === 'BTC') {
            setSwapCurrency(data);
            setSwapCrypto('NGN')
        } else if (data === 'USDT' && swapCrypto === 'USDT') {
            setSwapCurrency(data);
            setSwapCrypto('NGN')
        } else {
            setSwapCurrency(data);
        }
    }




    /*** SELLING/BUYING CRYPTO USING NGN & CRYPTO  */

    const handleInput = (text) => {
        setCryptoAmt(text);
        handleSwapCrypto(text)
    }

    const handleSwapCrypto = (data) => {

        if (swapCurrency === 'NGN') {
            if (tradeType === 'Sell') {

                if (swapCrypto === 'BTC') {
                    const usdValue = cryptoPrice * data;
                    const amt = usdValue * ratewhenSelling;
                    const finalAmt = Number.parseInt(amt).toFixed(2)

                    setCurrencyAmt(parseFloat(finalAmt))
                } else {
                    const amt = data * ratewhenSelling;
                    const finalAmt = Number.parseInt(amt).toFixed(2)

                    setCurrencyAmt(parseFloat(finalAmt))
                }
            } else {
                if (swapCrypto == 'BTC') {

                    const usdValue = cryptoPrice * data;
                    const amt = usdValue * ratewhenBuying;
                    const finalAmt = Number.parseInt(amt).toFixed(2)

                    setCurrencyAmt(parseFloat(finalAmt))
                } else {

                    const amt = data * ratewhenBuying;
                    const finalAmt = Number.parseInt(amt).toFixed(2)

                    setCurrencyAmt(parseFloat(finalAmt))
                }
            }

        } else {
            if (swapCrypto === 'BTC') {

                const feeCalc = data * swapFee;
                const feee = feeCalc / 100;
                const feeUsd = feee * cryptoPrice;
                const finalFee = feeUsd.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 }).replace(/,/g, '');
                const cryptoValue = tradeType === 'Sell' ? data + feee : data - feee;
                const amt = cryptoValue * cryptoPrice;
                const finalAmt = Number.parseInt(amt).toFixed(2)

                setCurrencyAmt(parseInt(finalAmt));
                console.log(finalFee);
                setFee(parseFloat(finalFee));
            } else {
                if (cryptoPrice <= data) {
                    const cryptoValue = data / cryptoPrice;
                    const feeCalc = cryptoValue * swapFee;
                    const feee = feeCalc / 100;
                    const finalFee = feee.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 8 }).replace(/,/g, '')
                    const amt = tradeType === 'Sell' ? cryptoValue + feee : cryptoValue - feee;
                    const finalAmt = amt.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 8 }).replace(/,/g, '')

                    setCurrencyAmt(parseFloat(finalAmt));
                    setFee(parseFloat(finalFee));
                } else {

                    const cryptoValue = data / cryptoPrice;
                    const feeCalc = cryptoValue * swapFee;
                    const feee = feeCalc / 100;
                    const finalFee = feee.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 8 }).replace(/,/g, '')
                    const amt = tradeType === 'Sell' ? cryptoValue + feee : cryptoValue - feee;
                    const finalAmt = amt.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 8 }).replace(/,/g, '')

                    setCurrencyAmt(parseFloat(finalAmt));
                    setFee(parseFloat(finalFee));
                }
            }

        }
    }

    /* ENDS HERE */



    const btcColor = '#eda710';
    const usdtColor = '#1783a2';
    const ngnColor = '#1cc88a';


    return (


        <TouchableWithoutFeedback onPress={() => inputRef.current.blur()}>
            <View style={[styles.container, styles.bgGrey]}>

                <SafeAreaView
                    style={{
                        height: height,
                        width: width,
                        flex: 1,
                        backgroundColor: 'transparent',
                    }}
                    edges={['left', 'right', 'top']}>
                    <StatusBar translucent barStyle={'dark-content'} backgroundColor="transparent" />


                    <View style={[styles.newModalHeader, styles.RowB]}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}>
                            <IconM
                                name={'close-circle-outline'}
                                size={moderateScale(25)}
                                color={'#343434'}
                                style={{ marginTop: 20, }} />

                        </TouchableOpacity>
                        <MyText style={[styles.largeLabel, styles.mt20]}>{tradeType} crypto</MyText>
                        <MyText style={styles.pl10}></MyText>

                    </View>


                    <View style={[styles.midBgGrey, styles.ph15]}>

                        <View style={[styles.formWhite, styles.b30, styles.bgWhite, styles.ph5, styles.pt10, styles.mb5]}>
                            <View style={styles.mr15}>

                                <View style={[styles.RowB, styles.mb15,]}>


                                    <TextInput
                                        style={[styles.shortDrop, styles.fontSize15, styles.fontRegular, styles.mb10,]}
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
                                        style={[styles.RowB, {}]}>
                                        <View style={styles.Row}>
                                            <View style={[styles.roundSmall, styles.mt8, { backgroundColor: swapCrypto === 'BTC' ? btcColor : usdtColor }]}>
                                                <Icons
                                                    size={moderateScale(15)}
                                                    name={swapCrypto === 'BTC' ? 'bitcoin' : 'currency-usd'}
                                                    color={'#fff'}
                                                />
                                            </View>
                                            <MyText style={[styles.userLabel, styles.fontSize15, styles.pl5, styles.pt10]}>{swapCrypto}</MyText>

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
                            </View>


                            <View style={[styles.formWhite, styles.ph15, styles.roundBorderBottom, styles.bgLightGrey, styles.pb5, styles.mb5,]}>
                                <View style={styles.RowB}>
                                    <MyText style={[styles.tinyLabel, styles.pt10]}>{tradeType === 'Sell' ? "You'll receive" : "You'll pay"}</MyText>
                                    <MyText></MyText>
                                </View>

                                <View style={[styles.RowB, styles.mb10,]}>

                                    <View>
                                        <MyText style={[styles.largeLabel, styles.pt5]}>{swapCurrency === 'BTC' ? '' : swapCurrency === 'USDT' ? '$' : nairaSign}
                                            {currencyAmt}</MyText>
                                    </View>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={openCurrency}
                                        style={[styles.RowB]}>
                                        <View style={styles.Row}>
                                            <View style={[styles.roundSmall, styles.mt8, { backgroundColor: swapCurrency === 'BTC' ? btcColor : swapCurrency === 'USDT' ? usdtColor : swapCurrency === 'NGN' ? ngnColor : '' }]}>
                                                <Icons
                                                    size={moderateScale(15)}
                                                    name={swapCurrency === 'BTC' ? 'bitcoin' : swapCurrency === 'USDT' ? 'currency-usd' : swapCurrency === 'NGN' ? 'currency-ngn' : null}
                                                    color={'#fff'}
                                                />
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

                            </View>

                            {/*    <MyText style={[styles.tinyLabel, styles.pt10]}>Wallet: {swapCurrency === 'BTC' ? '' : swapCurrency === 'USDT' ? '$' : nairaSign}{currencyWallet}</MyText> */}

                        </View>



                        <View style={[styles.RowB, styles.mb10,]}>
                            <MyText></MyText>
                            <View style={[styles.Row,]}>
                                <View style={[styles.b30, styles.borderWidthLight, styles.mr5, styles.pv10, styles.bgWhite, styles.ph15, { width: 'auto' }]}>
                                    {swapCrypto === 'BTC' ? (
                                        <View style={styles.Row}>
                                            <Icons
                                                size={moderateScale(15)}
                                                name={'bitcoin'}
                                                color={'#eda710'}
                                            />
                                            <MyText style={[styles.tinyLabel, styles.pl5]}>{btcWalletAmt}</MyText>
                                        </View>
                                    ) : (
                                        <View style={styles.Row}>
                                            <Icons
                                                size={moderateScale(15)}
                                                name={'currency-usd'}
                                                color={'#1783a2'}
                                            />
                                            <MyText style={[styles.tinyLabel]}>{usdtWalletAmt}</MyText>
                                        </View>
                                    )}
                                </View>
                                <View style={[styles.b30, styles.borderWidthLight, styles.pv10, , styles.bgWhite, styles.ph15, { width: 'auto' }]}>
                                    {swapCurrency === 'BTC' ? (
                                        <View style={styles.Row}>
                                            <Icons
                                                size={moderateScale(15)}
                                                name={'bitcoin'}
                                                color={'#eda710'}
                                            />
                                            <MyText style={[styles.tinyLabel, styles.pl5]}>{btcWalletAmt}</MyText>
                                        </View>
                                    ) : swapCurrency === 'USDT' ? (
                                        <View style={styles.Row}>
                                            <Icons
                                                size={moderateScale(15)}
                                                name={'currency-usd'}
                                                color={'#1783a2'}
                                            />
                                            <MyText style={[styles.tinyLabel]}>{usdtWalletAmt}</MyText>
                                        </View>
                                    ) : (
                                        <View style={styles.Row}>
                                            <Icons
                                                size={moderateScale(14)}
                                                name={'currency-ngn'}
                                                color={'#1cc88a'}
                                            />
                                            <MyText style={[styles.tinyLabel,]}>{ngnWalletAmt}</MyText>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>

                        <View style={[styles.lineBottomDark]} />

                        <View style={[styles.ph5, styles.mb30]}>
                            {swapCurrency === 'BTC' && cryptoAmt > 0 ? (
                                <View style={[styles.RowB, styles.mb5, styles.ph10]}>
                                    <View style={styles.Row}>
                                        <Icon
                                            name={'swap-horiz'}
                                            size={moderateScale(15)}
                                            color={'#1cc88a'}
                                            style={{ marginTop: 12, marginRight: 5 }}></Icon>
                                        <MyText style={[styles.tinyLabel, styles.fontSize13, styles.pt10]}>Exchange fee: </MyText>
                                    </View>
                                    <MyText style={[styles.tinyLabel, styles.fontSize13, styles.pt10]}>{fee} BTC</MyText>

                                </View>
                            ) : swapCurrency === 'USDT' && cryptoAmt > 0 ? (
                                <View style={[styles.RowB, styles.mb5, styles.ph10]}>
                                    <View style={styles.Row}>
                                        <Icon
                                            name={'swap-horiz'}
                                            size={moderateScale(15)}
                                            color={'#1cc88a'}
                                            style={{ marginTop: 12, marginRight: 5 }}></Icon>
                                        <MyText style={[styles.tinyLabel, styles.fontSize13, styles.pt10]}>Exchange fee: </MyText>
                                    </View>
                                    <MyText style={[styles.tinyLabel, styles.fontSize13, styles.pt10]}>{fee} USDT</MyText>

                                </View>
                            ) : null}


                            {swapCurrency === 'NGN' ? (
                                <View style={[styles.RowB, styles.mb5, styles.ph10]}>
                                    <View style={styles.Row}>
                                        <Icon
                                            name={'tag'}
                                            size={moderateScale(15)}
                                            color={'#1cc88a'}
                                            style={{ marginTop: 12, marginRight: 5 }}></Icon>
                                        <MyText style={[styles.tinyLabel, styles.fontSize13, styles.pt10]}>Transaction rate: </MyText>
                                    </View>
                                    <MyText style={[styles.tinyLabel, styles.fontSize13, styles.pt10]}>$1 = {nairaSign}{tradeType === 'Sell' ? ratewhenSelling : ratewhenBuying}</MyText>

                                </View>

                            ) : null}


                            <View style={[styles.RowB, styles.ph10]}>
                                <View style={styles.Row}>
                                    <Icons
                                        name={'lightning-bolt-outline'}
                                        size={moderateScale(15)}
                                        color={'#1cc88a'}
                                        style={{ marginTop: 12, marginRight: 5 }}></Icons>
                                    <MyText style={[styles.tinyLabel, styles.fontSize13, styles.pt10]}>Instant {tradeType.toLowerCase()}</MyText>
                                </View>
                            </View>
                        </View>



                        <View style={[styles.formWhite, styles.b20, styles.bgWhite, styles.ph15, styles.pb5, styles.pt10, styles.mb5]}>
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


                    </View>

                </SafeAreaView >



                <View style={[styles.ph15, styles.pt15, styles.bottomBar]}>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        disabled={!cryptoAmt || currencyAmt === 0 ? true : false}
                        onPress={openConfirm}
                    style={[styles.submitButton, styles.bgGreen, {opacity: !cryptoAmt || currencyAmt === 0 ? 0.6 : 1}]}>
                    <MyText style={[styles.buttonLabel,]}>Proceed</MyText>
                </TouchableOpacity>

            </View>


            <CryptoSwapModal
                isOpen={isCrypto}
                selected={swapCrypto}
                tradeType={tradeType}
                setCrypto={(item) => handleSetCrypto(item)}
                handleChange={closeCrypto}
                navigation={navigation}
            />

            <CurrencySwapModal
                isOpen={isCurrency}
                selected={swapCurrency}
                cryptoSelected={swapCrypto}
                tradeType={tradeType}
                setCurrency={(item) => handleSetCurrency(item)}
                handleChange={closeCurrency}
                navigation={navigation}

            />

            <ConfirmModal
                isOpen={isConfirm}
                tradeType={tradeType}
                crypto={swapCrypto}
                currency={swapCurrency}
                currencyAmt={currencyAmt}
                cryptoAmt={cryptoAmt}
                fee={fee}
                rate={tradeType === 'Sell' ? ratewhenSelling : ratewhenBuying}
                handleChange={closeConfirm}
                navigation={navigation}
            />

        </View >
        </TouchableWithoutFeedback >
    );
};


export default SwapoldCrypto;