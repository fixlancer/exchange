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

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from '../../../utils/utils';
import messaging from '@react-native-firebase/messaging';
import { ContactSupport, removeFcm, userLogout } from '../../../redux/redux/actions/userAction';
import DeviceInfo from 'react-native-device-info';
import { useAuthStore } from '../../../stores/store';
import HeaderBack from '../../components/Header/HeaderBack';
import CustomToast from '../../components/CustomToast/CustomToast';
import LogoutModal from './LogoutModal';
import HeaderSubBack from '../../components/Header/HeaderSubBack';
import Navbar from '../../components/Navbars/Navbar';
import { useTheme } from 'react-native-paper';
const { width, height } = Dimensions.get('window');


const Settings = ({ navigation, route }) => {

    const theme = useTheme()
    const styles = newStyles(theme);
    const { user } = useAuthStore();

    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);

    const [isLoading, setisLoading] = useState(false);
    const [isLogout, setIsLogout] = useState(false);


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


    useEffect(() => {
        getToken(setToken, setId);
    }, []);


    const openLogout = () => {
        setIsLogout(true);
    }

    const closeLogout = () => {
        setIsLogout(false)
    }

    const handleLogout = async () => {
        setisLoading(true);
        closeLogout();
        const device_id = DeviceInfo.getDeviceId();

        userLogout({
            deviceId: device_id
        })
            .then(async (res) => {
                if (res?.status) {
                    await AsyncStorage.removeItem('token');
                    await AsyncStorage.clear();
                    await messaging().deleteToken();
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'SignInScreen' }]
                    })
                    setisLoading(false);
                }
            })
            .catch((err) => {
                setisLoading(false);
                showToast('Warning', 'An error occured with your request. Please try again')

            });
    };

    const data =
        [
            {
                id: 0,
                title: 'KYC',
                subtext: 'Personal details',
            },
            {
                id: 1,
                title: 'Security',
                subtext: 'Password, PIN, email',
            },
            {
                id: 4,
                title: 'Help center',
                subtext: '24/7 support',
            },
            {
                id: 5,
                title: 'Logout',
                subtext: 'See you again',
            },
        ]

    const iconName = (data) => {
        switch (data) {
            case 'KYC':
                return 'person-pin';
                break;
            case 'Security':
                return 'security';
                break;
            case 'Help center':
                return 'support';
                break;
            case 'Logout':
                return 'logout';
                break;
            default:
                return null;

        }
    }

    const handleClick = (data) => {
        switch (data) {
            case 'KYC':
                return null;
                break;
            case 'Security':
                return navigation.navigate('Security');
                break;
            case 'Help center':
                return navigation.navigate('HelpCenter');
                break;
            case 'Logout':
                return openLogout();
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

                {isLoading ? (
                    <View style={[styles.alignCenter, { flex: 1, marginTop: '-10%', }]}>
                        <ActivityIndicator size={"small"} color={'#343434'} />
                        <MyText style={[styles.userLabel, styles.textCenter, styles.textDark, styles.mt10, {}]}>Signing out... {'\n'} We can't wait to see you again soon</MyText>
                    </View>
                ) : (
                    <>

                        <View style={[styles.alignCenter, styles.mt15]}>
                            <IconM
                                name={'settings-outline'}
                                size={moderateScale(30)}
                                color={theme.dark ? '#fff' : '#343434'}
                                style={{}} />

                            <Text style={[styles.largeLabel, styles.fontSize22, styles.mt10, styles.mb20]}>Settings</Text>
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

                    </>
                )}

            </SafeAreaView>

            <Navbar
                navigation={navigation}
                activePage={'settings'}
                backgroundColor={undefined}
            />


            <LogoutModal
                isOpen={isLogout}
                handleChange={closeLogout}
                handleSubmit={handleLogout}
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

        </View>

    )
}

export default Settings;