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
import Network from './Modal/Network';
import CustomToast from '../../../components/CustomToast/CustomToast';
import HeaderBack from '../../../components/Header/HeaderBack';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');


const Deposit = ({ navigation, route }) => {

    const { crypto } = route.params;

    const theme = useTheme()
    const styles = newStyles(theme);


    const [network, setNetwork] = useState(true);
    const [selectedNet, setSelectedNet] = useState('');

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


    const openNetwork = () => {
        setNetwork(true);
    }

    const closeNetwork = () => {
        setNetwork(false);
    }


    const wallet = 'TUb6xDDjfhruthg78PbjfifUmcdbdgdVHFKFDBhfgddbdndmvcnbB'
    const bgImg = require('../../../../Assets/premiumBG.png');


    return (
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

                <HeaderBack navigation={navigation} headerTitle={'Deposit ' + crypto} />


                <ScrollView>
                    <View style={[styles.mt10, styles.ph15]}>

                        {selectedNet != '' ? (
                            <></>
                        ) : (
                            <View style={[styles.alignCenter, styles.mb20, styles.mt20]}>
                                <IconM
                                    name={'warning-outline'}
                                    size={moderateScale(100)}
                                    color={'#808080'}
                                    style={{ marginTop: 0, }} />
                            </View>
                        )}

                        <View style={[styles.formWhite, styles.shadow, styles.b30, styles.bgWhite, styles.ph5, styles.pt10, styles.mb5]}>
                            <View style={{}}>

                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={openNetwork}
                                    style={[styles.ph15, styles.mb15]}>

                                    <MyText style={[styles.tinyLabel, styles.fontSize11, styles.mt10]}>Network</MyText>

                                    <View style={[styles.RowB, {}]}>
                                        <MyText style={[styles.userLabel, styles.fontSize15, styles.mt5]}>{selectedNet === '' ? 'Please select a network' : selectedNet}</MyText>

                                        <IconM
                                            name={'chevron-down'}
                                            size={moderateScale(20)}
                                            color={'#808080'}
                                            style={{ marginTop: 5, }} />

                                    </View>

                                </TouchableOpacity>
                            </View>

                            {selectedNet != '' ? (
                                <>
                                    <View style={[styles.formWhite, styles.roundBorderBottom, styles.bgLightGrey, styles.pb15, styles.mb5,]}>

                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => {
                                                Clipboard.setString(wallet)
                                                showToast('Success', 'Wallet copied');
                                            }}
                                            style={[styles.ph15,]}>

                                            <MyText style={[styles.tinyLabel, styles.fontSize11, styles.mt10]}>Deposit address</MyText>

                                            <View style={[styles.RowB, {}]}>
                                                <Text style={[styles.userLabel, styles.fontSize15, styles.mt5, styles.mr10, { width: width - 120 }]}>{wallet}</Text>
                                                <IconM
                                                    name={'copy-outline'}
                                                    size={moderateScale(20)}
                                                    color={'#808080'}
                                                    style={{ marginTop: 10, }} />

                                            </View>

                                        </TouchableOpacity>
                                    </View>

                                </>

                            ) : (
                                <View style={[styles.pb10, styles.mb5,]}>
                                </View>
                            )}

                        </View>

                        {selectedNet != '' ? (
                            <View style={[styles.formWhite, styles.shadow, styles.b20, styles.bgWhite, styles.mt10, styles.pb5, styles.pt5, styles.mb10]}>
                                <View style={[styles.Row, styles.ph15, { width: width - 80 }]}>
                                    <IconM
                                        name={'warning-outline'}
                                        size={moderateScale(25)}
                                        color={'#f27415'}
                                        style={[styles.mt10, styles.mr10, {}]} />

                                    <MyText style={[styles.fontSize11, styles.textGrey, styles.mb10, styles.mt10]}>Send only {crypto} to this address, or you might lose your asset.</MyText>
                                </View >

                            </View>
                        ) : null}

                    </View>

                </ScrollView>

            </SafeAreaView >

            <Network
                isOpen={network}
                type={'Deposit'}
                crypto={crypto}
                selectedNet={selectedNet}
                setNetwork={(data) => setSelectedNet(data)}
                handleChange={closeNetwork}
                navigation={navigation}
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
    );
};


export default Deposit;