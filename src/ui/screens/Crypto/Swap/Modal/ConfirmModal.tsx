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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import MyText from '../../../../components/DefaultTextComponent/MyText';
import newStyles from '../../../Styles/Styles';
import Modal from 'react-native-modalbox';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { useTheme } from 'react-native-paper';


const { width, height } = Dimensions.get('screen');

interface Props {
    isOpen: any;
    crypto: any;
    currency: any;
    cryptoAmt: any;
    currencyAmt: any;
    tradeType: any;
    handleChange: any;
    handleSubmit: any;
    navigation: any;
}


const ConfirmModal: React.FC<Props> = props => {
    const { isOpen, tradeType, crypto, currency, cryptoAmt, currencyAmt, handleSubmit, handleChange, navigation } = props;

    const theme = useTheme()
    const styles = newStyles(theme);

    const btcColor = '#eda710';
    const usdtColor = '#1783a2';
    const ngnColor = '#1cc88a';

    return (

        <Modal isOpen={isOpen}
            style={{ height: Platform.OS == 'ios' ? moderateScale(360) : moderateScale(330), backgroundColor: 'transparent', }}
            keyboardTopOffset={Platform.OS == 'ios' ? 22 : 0}
            backdropPressToClose={true}
            swipeToClose={true}
            onClosed={handleChange}
            backdropOpacity={0.5}
            backdropColor="#000"
            position="bottom">

            <View style={[styles.container, styles.roundBorder, styles.bgGrey, {}]}>
            <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

                <View style={[styles.modalLine, styles.mt15, styles.mb10, styles.alignCenter]} />

                <View style={[styles.newModalHeader,]}>
                    <MyText style={[styles.extraLabel, styles.textCenter, styles.mb20,]}>Confirm</MyText>
                </View>

                <View style={[styles.midBg, styles.bgGrey,]}>

                        <View style={styles.ph20}>
                            <View style={[styles.RowB, styles.b20, styles.ph5, styles.pv5, styles.bgWhite, styles.borderWidthLight, { width: '100%', height: 'auto' }]}>
                                <View style={[styles.b20, styles.alignCenter, styles.pb5, styles.bgWhite, styles.ph5, styles.pt10, { width: '44%', height: 'auto' }]}>

                                    <MyText style={[styles.tinyLabel, styles.pt10]}>{tradeType === 'Sell' ? 'You sell' : 'You buy'}</MyText>
                                    <View style={[styles.round, styles.mt8, { backgroundColor: crypto === 'BTC' ? btcColor : usdtColor }]}>
                                        <Icons
                                            size={moderateScale(20)}
                                            name={crypto === 'BTC' ? 'bitcoin' : 'currency-usd'}
                                            color={'#fff'}
                                        />
                                    </View>
                                    <MyText style={[styles.userLabel, styles.fontSize13, styles.pt10, styles.mb15]}>{cryptoAmt} {crypto}</MyText>
                                </View>

                                <View style={[styles.b20, styles.bgLightGrey, styles.alignCenter, styles.pb5, styles.ph5, styles.pt10, { width: '47%', height: 'auto' }]}>
                                    <MyText style={[styles.tinyLabel, styles.pt10]}>{tradeType === 'Sell' ? 'You get' : 'You pay'}</MyText>
                                    <View style={[styles.round, styles.mt8, { backgroundColor: currency === 'BTC' ? btcColor : currency === 'USDT' ? usdtColor : ngnColor }]}>
                                        <Icons
                                            size={moderateScale(20)}
                                            name={currency === 'BTC' ? 'bitcoin' : currency === 'USDT' ? 'currency-usd' : 'currency-ngn'}
                                            color={'#fff'}
                                        />
                                    </View>
                                    <MyText style={[styles.userLabel, styles.fontSize13, styles.pt10, styles.mb15]}>{currencyAmt} {currency}</MyText>

                                </View>
                            </View>
                        </View>

                </View>

            </View >


            <View style={[styles.ph15, styles.pt15, styles.bottomBar]}>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                    handleChange();
                    handleSubmit()
                    
                    }}
                    style={[styles.submitButton, styles.bgGreen,]}>
                    <MyText style={[styles.buttonLabel,]}>{tradeType} {crypto}</MyText>
                </TouchableOpacity>
            
            </View>

        </Modal>
    );
};


export default ConfirmModal;