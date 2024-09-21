import {
    View, Text, Dimensions, Platform, StyleSheet, TouchableOpacity, Image,
    ActivityIndicator, Animated, FlatList, ScrollView, StatusBar,
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import MyText from '../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import newStyles from '../Styles/Styles';
import Modal from 'react-native-modalbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('window');


const Success = ({ navigation, route }) => {

    const { type, amount, currency } = route.params;

    const [isLoading, setisLoading] = useState(false);

    const theme = useTheme()
    const styles = newStyles(theme);

    const nairaSign = '\u20A6';

    const bgImg = require('../../../Assets/premiumBG.png');

    const handleHome = () => {

        navigation.navigate('DashBoard');
    }

    const handleHistory = () => {
        switch (type) {
            case 'Withdraw':
                return navigation.reset({
                    index: 0,
                    routes: [{ name: 'DashBoard' }, { name: 'TransactionHistory', params: { tab: 'Withdrawals' } }]
                });
                break;
            case 'Giftcard':
                return navigation.reset({
                    index: 0,
                    routes: [{ name: 'DashBoard' }, { name: 'TransactionHistory', params: { tab: 'Giftcard' } }]
                });
                break;
            case 'Buy':
                return navigation.reset({
                    index: 0,
                    routes: [{ name: 'DashBoard' }, { name: 'TransactionHistory', params: { tab: 'Buy' } }]
                });
                break;
            case 'Sell':
                return navigation.reset({
                    index: 0,
                    routes: [{ name: 'DashBoard' }, { name: 'TransactionHistory', params: { tab: 'Sell' } }]
                });
                break;
            case 'Bills':
                return navigation.reset({
                    index: 0,
                    routes: [{ name: 'DashBoard' }, { name: 'TransactionHistory', params: { tab: 'Bills' } }]
                });
                break;
            default:
                return null;

        }
    }


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


                <View style={[styles.alignCenter, styles.mt20, { flex: 1 }]}>
                    <IconM
                        name={type === 'Withdraw' ? 'hourglass-outline' : 'checkmark-circle'}
                        size={moderateScale(60)}
                        color={'#1cc88a'}
                        style={{}} />

                    {type === 'Withdraw' ? (
                        <>
                            <Text style={[styles.largeLabel, styles.fontSize20, styles.mt10]}>Withdrawal processing</Text>
                            <Text style={[styles.largeLabel, styles.fontSize20, styles.mt10, styles.mb10]}>{amount}{currency}</Text>
                            <MyText style={[styles.tinyLabel, styles.fontSize12, styles.mt5]}>You will be notified as soon as it is completed</MyText>

                        </>
                    ) : type === 'Giftcard' ? (
                        <>
                            <Text style={[styles.largeLabel, styles.fontSize20, styles.mt10]}>Trade is being processed</Text>
                            <Text style={[styles.largeLabel, styles.fontSize20, styles.mt10, styles.mb10]}>{nairaSign}{amount}</Text>
                            <MyText style={[styles.tinyLabel, styles.fontSize12, styles.mt5]}>You will be notified as soon as it is completed</MyText>
                        </>
                    ) : type === 'Bills' ? (
                        <>
                            <Text style={[styles.largeLabel, styles.fontSize20, styles.mt10]}>Subscription was successful</Text>
                            <Text style={[styles.largeLabel, styles.fontSize20, styles.mt10, styles.mb10]}>{nairaSign}{amount}</Text>
                            <MyText style={[styles.tinyLabel, styles.fontSize12, styles.mt5]}>{currency}</MyText>
                        </>
                    )
                        :
                        <>

                            <Text style={[styles.largeLabel, styles.fontSize20, styles.mt10]}>Trade completed</Text>
                            <Text style={[styles.largeLabel, styles.fontSize20, styles.mt10, styles.mb10]}>+{amount} {currency}</Text>
                        </>
                    }
                </View>

                <View style={[styles.iosBar, styles.ph15, { flexGrow: 1 }]}>

                    <View style={[styles.alignCenter]}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={handleHistory}
                            style={[styles.submitButton, styles.b30, styles.borderWidthDark, styles.mb15, styles.bgWhite, { width: '45%' }]}>
                            <MyText style={[styles.buttonLabel, styles.textDark,]}>View History</MyText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={handleHome}
                            style={[styles.submitButton, styles.b30, styles.bgGreen, { width: '45%' }]}>
                            <MyText style={[styles.buttonLabel,]}>Home</MyText>
                        </TouchableOpacity>
                    </View>

                </View>


            </SafeAreaView>

        </View>

    )
}

export default Success;