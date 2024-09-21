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
    Animated,
    TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Clipboard from '@react-native-community/clipboard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import MyText from '../../../components/DefaultTextComponent/MyText';
import newStyles from '../../Styles/Styles';
import Modal from 'react-native-modalbox';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import HeaderClose from '../../../components/Header/HeaderClose';
import Network from './Modal/Network';
import CustomToast from '../../../components/CustomToast/CustomToast';
import HeaderBack from '../../../components/Header/HeaderBack';
import SecurityCheck from '../SecurityCheck/Index';
import ConfirmWithdraw from './Modal/Confirm';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');


const WithdrawCrypto = ({ navigation, route }) => {

    const { crypto } = route.params;


    const theme = useTheme()
    const styles = newStyles(theme);

    const inputRef = useRef(null);

    /* CUSTOM TOAST ========== */

    const [toastType, setToastType] = useState('success');
    const [toastMsg, setToastMsg] = useState('');
    const [show, setShow] = useState(0);

    const slideAnim = useRef(new Animated.Value(120)).current;

    const animateToast = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            Animated.timing(slideAnim, {
                toValue: 120,
                duration: 200,
                useNativeDriver: true,
            }).start();
            setShow(0);
        }, 3500);
    };

    const showToast = (type, msg) => {
        setToastType(type);
        setToastMsg(msg);
        setShow(1);
        animateToast();
    };

    /* CUSTOM TOAST ENDS ============= */


    const [network, setNetwork] = useState(true);
    const [selectedNet, setSelectedNet] = useState('');
    const [wallet, setWallet] = useState('');
    const [amount, setAmount] = useState(0);


    const [isVerified, setIsVerified] = useState(0);
    const [isSecure, setIsSecure] = useState(false);
    const [networkFee, setNetworkFee] = useState(0);
    const [isConfirm, setIsConfirm] = useState(false);


    const [isLoading, setIsLoading] = useState(false);

    const amt = amount - networkFee;
    const finalAmount = amt.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 8 }).replace(/,/g, '');
    const walletAmt = 1050;

    useEffect(() => {
        setNetworkFee(0.1);
    }, [])


    const closeSecure = () => {
        setIsSecure(false);
    }

    const openSecure = () => {
        setIsSecure(true);
    }

    const closeConfirm = () => {
        setIsConfirm(false);
    }

    const handleSubmit = () => {
        closeConfirm();

        if (isVerified === 0) {
            openSecure();
        } else {
            handleFinalSubmit();
        }
    }

    const handleFinalSubmit = () => {
        //Process withdrawal
        closeSecure()
        setIsVerified(1)
        setIsLoading(true);

        setTimeout(() => (
            navigation.reset({
                index: 0,
                routes: [{ name: 'DashBoard' }, { name: 'Success', params: { type: 'Withdraw', amount: finalAmount, currency: crypto } }],
            })
        ), 1500)
    }

    const openConfirm = () => {
        inputRef.current.blur();
        setIsConfirm(true);
    }

    const openNetwork = () => {
        inputRef.current.blur();
        setNetwork(true);
    }

    const closeNetwork = () => {
        setNetwork(false);
    }

    const handleAmount = (data) => {
        setAmount(data);
    }

    const bgImg = require('../../../../Assets/premiumBG.png');


    return (


        <TouchableWithoutFeedback onPress={() => inputRef.current.blur()}>
            <View style={[styles.container, styles.midBgGrey]}>


                {/*   <Image
                source={bgImg}
                style={styles.accountBG}
            />
    */}


                <SafeAreaView
                    style={{
                        height: height,
                        width: width,
                        flex: 1,
                        backgroundColor: 'transparent',
                    }}
                    edges={['left', 'right', 'top']}>
                    <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

                    <HeaderBack navigation={navigation} headerTitle={'Withdraw ' + crypto} />

                    <ScrollView>
                        <View style={[styles.mt20, styles.ph15]}>

                            <View style={[styles.formWhite, styles.shadow, styles.b30, styles.bgWhite, styles.ph5, styles.pt10, styles.mb10]}>
                                <View style={[styles.ph10]}>
                                    <View style={[styles.RowB]}>
                                        <MyText style={[styles.textGrey, styles.pl5, styles.fontRegular, styles.fontSize11, styles.mt10]}>Amount</MyText>
                                        <MyText style={[styles.textGrey, styles.pl5, styles.fontRegular, styles.fontSize11, styles.mt10]}>Available {walletAmt} {crypto}</MyText>
                                    </View>

                                    <TextInput
                                        style={[styles.drop, styles.lineBottomLight, styles.textDark, styles.fontSize14, styles.fontRegular,]}
                                        placeholder="0.00"
                                        placeholderTextColor={'#808080'}
                                        textAlign={'left'}
                                        keyboardType='numeric'
                                        ref={inputRef}
                                        value={amount === 0 ? '' : amount.toString()}
                                        onChangeText={(e) => handleAmount(e)}

                                    />


                                    <MyText style={[styles.tinyLabel, styles.pl5, styles.fontSize11, styles.mt10]}>Address</MyText>
                                    <TextInput
                                        style={[styles.fontSize14, styles.textDark, styles.mb10, styles.fontRegular, {}]}
                                        placeholder="Paste wallet here"
                                        placeholderTextColor={'#808080'}
                                        textAlign={'left'}
                                        multiline
                                        value={wallet}
                                        ref={inputRef}
                                        onChangeText={(e) => setWallet(e)}

                                    />
                                </View>

                                <View style={[styles.formWhite, styles.bgGrey, styles.roundBorderBottom, styles.pt10, styles.mb5]}>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={openNetwork}
                                        style={[styles.ph15, styles.mb15]}>

                                        <MyText style={[styles.tinyLabel, styles.fontSize11, styles.mt10]}>Network</MyText>

                                        <View style={[styles.RowB, {}]}>
                                            <MyText style={[styles.userLabel, styles.fontSize14, styles.mt5]}>{selectedNet === '' ? 'Please select a network' : selectedNet}</MyText>

                                            <IconM
                                                name={'chevron-down'}
                                                size={moderateScale(20)}
                                                color={'#808080'}
                                                style={{ marginTop: 0, }} />

                                        </View>

                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>

                    </ScrollView>


                </SafeAreaView >

                <View style={[styles.ph15, styles.RowB, styles.pt15, styles.bottomBar]}>

                    <View>
                        <MyText style={[styles.tinyLabel, styles.fontSize12,]}>Receive amount</MyText>
                        {amount > 0 ?
                            <MyText style={[styles.userLabel, styles.fontSize15, styles.mt5]}>{finalAmount} {crypto}</MyText>
                            :
                            <MyText style={[styles.userLabel, styles.fontSize15, styles.mt5]}>0 {crypto}</MyText>
                        }
                        <MyText style={[styles.tinyDark, styles.fontSize11, styles.mt5]}>Network fee: {networkFee} {crypto}</MyText>
                    </View>


                    <TouchableOpacity
                        activeOpacity={0.7}
                        disabled={amt > 0 && wallet != '' && selectedNet != '' ? false : true}
                        onPress={() => openConfirm()}
                        style={[styles.submitButton, styles.mt10, styles.bgGreen, { opacity: amt > 0 && wallet != '' && selectedNet != '' ? 1 : 0.6, height: moderateScale(40) }]}>
                        <MyText style={[styles.buttonLabel,]}>Withdraw</MyText>
                    </TouchableOpacity>

                </View>


                {isLoading ? (
                    <View style={[styles.loader, styles.alignCenter]}>
                        <View style={[styles.b30, styles.p10, styles.alignCenter, styles.shadow, { opacity: 0.9, backgroundColor: theme.dark ? '#343434' : '#fff' }]}>
                            <ActivityIndicator color={theme.dark ? '#fff' : '#343434'} size={'small'} />
                        </View>
                    </View>
                ) : null}

                <Network
                    isOpen={network}
                    type={'Withdrawal'}
                    crypto={crypto}
                    selectedNet={selectedNet}
                    setNetwork={(data) => setSelectedNet(data)}
                    handleChange={closeNetwork}
                    navigation={navigation}
                />

                <SecurityCheck
                    isOpen={isSecure}
                    page={'Withdrawal'}
                    handleSubmit={handleFinalSubmit}
                    handleChange={closeSecure}
                    navigation={navigation}
                />

                <ConfirmWithdraw
                    isOpen={isConfirm}
                    amount={finalAmount}
                    fee={networkFee}
                    network={selectedNet}
                    address={wallet}
                    crypto={crypto}
                    handleChange={closeConfirm}
                    handleSubmit={handleSubmit}
                />

                {show !== 0 ? (

                    <Animated.View
                        style={{ transform: [{ translateY: slideAnim }], position: 'absolute', zIndex: 999, bottom: 0 }}>
                        <CustomToast
                            type={toastType}
                            msg={toastMsg}
                        />
                    </Animated.View>
                ) : null}

            </View >
        </TouchableWithoutFeedback>
    );
};


export default WithdrawCrypto;