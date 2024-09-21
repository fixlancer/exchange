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



const HelpCenter = ({ navigation, route }) => {

    const theme = useTheme()
    const styles = newStyles(theme);
    const data =
        [
            {
                id: 0,
                title: 'Articles',
                subtext: 'Find answers you seek',
            },
            {
                id: 1,
                title: 'Email',
                subtext: 'Get help via email',
            },
            {
                id: 2,
                title: 'Instagram',
                subtext: '@myfejora',
            },
            {
                id: 3,
                title: 'X (Twitter)',
                subtext: '@myfejora',
            },
        ]

    const iconName = (data) => {
        switch (data) {
            case 'Articles':
                return 'article';
                break;
            case 'Email':
                return 'alternate-email';
                break;
            case 'Instagram':
                return 'link';
                break;
            case 'X (Twitter)':
                return 'link';
                break;
            default:
                return null;

        }
    }

    const handleClick = (data) => {
        switch (data) {
            case 'Articles':
                return null;
                break;
            case 'Email':
                return null;
                break;
            case 'Instagram':
                return null;
                break;
            case 'X (Twitter)':
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
                style={[styles.b20, styles.pv10, styles.mb15, styles.shadow, styles.bgWhite, { width: (width - 60) / 2, height: moderateScale(110), }]}>
                <Icon
                    name={iconName(title)}
                    size={moderateScale(22)}
                    color={'#808080'}
                    style={[styles.ph15, { marginTop: 5, }]} />

                <Text style={[styles.tinyDark, styles.pl15, styles.fontSize16, styles.mt10]}>{title}</Text>
                <MyText style={[styles.tinyLabel, styles.pl15, styles.fontSize11, styles.mt5]}>{subtext}</MyText>

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
                        name={'support'}
                        size={moderateScale(30)}
                        color={'#343434'}
                        style={{}} />

                    <Text style={[styles.largeLabel, styles.fontSize22, styles.mt10, styles.mb20]}>Help center</Text>
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

export default HelpCenter;