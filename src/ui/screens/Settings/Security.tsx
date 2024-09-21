import { View, Text, Dimensions, Platform, StyleSheet, TouchableOpacity, Image, Animated, FlatList, ScrollView, StatusBar, } from 'react-native'
import React, { useState } from 'react'
import MyText from '../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import newStyles from '../Styles/Styles';
import Modal from 'react-native-modalbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import HeaderBack from '../../components/Header/HeaderBack';
import HeaderSubBack from '../../components/Header/HeaderSubBack';
import { useTheme } from 'react-native-paper';
const { width, height } = Dimensions.get('window');



const Security = ({ navigation, route }) => {

    const theme = useTheme()
    const styles = newStyles(theme);

    const data =
        [
            {
                id: 0,
                title: 'Email',
                subtext: 'Change email address',
            },
            {
                id: 1,
                title: 'Password',
                subtext: 'Edit password',
            },
            {
                id: 2,
                title: 'PIN',
                subtext: 'Change PIN',
            },
            {
                id: 3,
                title: 'Phone',
                subtext: 'Change your number',
            },
            {
                id: 4,
                title: 'Bank',
                subtext: 'Edit bank details',
            },
            {
                id: 5,
                title: 'Delete account',
                subtext: "We'll miss you",
            },
        ]

    const iconName = (data) => {
        switch (data) {
            case 'Email':
                return 'alternate-email';
                break;
            case 'Password':
                return 'lock';
                break;
            case 'PIN':
                return 'screen-lock-portrait';
                break;
            case 'Phone':
                return 'call';
                break;
            case 'Bank':
                return 'contact-page';
                break;
            case 'Delete account':
                return 'delete-forever';
                break;
            default:
                return null;

        }
    }

    const handleClick = (data) => {
        switch (data) {
            case 'Email':
                return null;
                break;
            case 'Password':
                return null
                break;
            case 'PIN':
                return null;
                break;
            case 'Phone':
                return null;
                break;
            case 'Bank':
                return null;
                break;
            case 'Delete account':
                return null;
                break;
            default:
                return null;

        }
    }

    const RenderItem = ({ title, subtext, index }) => {
        return (
            <TouchableOpacity
                onPress={() => handleClick(title)}
                style={[styles.b20, styles.pv10, styles.shadow, styles.mb20, styles.bgWhite, { width: (width - 60) / 2, height: moderateScale(110), }]}>
                <Icon
                    name={iconName(title)}
                    size={moderateScale(22)}
                    color={'#808080'}
                    style={[styles.ph15, { marginTop: 5, }]} />

                <Text style={[styles.tinyDark, styles.pl15, styles.fontSize15, styles.mt10]}>{title}</Text>
                <MyText style={[styles.tinyLabel,  styles.pl15, styles.fontSize11, styles.mt5]}>{subtext}</MyText>

            </TouchableOpacity>
        )
    }

    const bgImg = require('../../../Assets/premiumBG.png');


    return (
        <View style={[styles.container]}>


            <Image
                source={bgImg}
                style={styles.accountBG}
            />

            <SafeAreaView
                style={{
                    height: height,
                    width: width,
                    flex: 1,
                    backgroundColor: 'transparent',
                }}
                edges={['left', 'right', 'top']}>
                <StatusBar translucent barStyle={'dark-content'} backgroundColor="transparent" />

                <HeaderSubBack navigation={navigation} />

                <View style={[styles.alignCenter, styles.mt15]}>
                    <Icon
                        name={'security'}
                        size={moderateScale(30)}
                        color={'#343434'}
                        style={{}} />

                    <Text style={[styles.largeLabel, styles.fontSize22, styles.mt10, styles.mb20]}>Security</Text>
                </View>

                <ScrollView contentContainerStyle={[styles.iosBar, styles.mt20, styles.ph15, { flexGrow: 1 }]}>


                    <View style={[styles.RowB, { flexWrap: 'wrap' }]}>

                        {data && data.map((item, index) => {
                            return (
                                <View key={index}>
                                    <RenderItem title={item.title} subtext={item.subtext} index={index} />
                                </View>
                            )
                        })}

                    </View>

                </ScrollView>

            </SafeAreaView>

        </View>

    )
}

export default Security;