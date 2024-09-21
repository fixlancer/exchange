import { View, Text, Dimensions, Platform, StyleSheet, TouchableOpacity, Animated, FlatList, ScrollView, StatusBar, TextInput, ActivityIndicator, } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import MyText from '../../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import newStyles from '../../Styles/Styles';
import Modal from 'react-native-modalbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import HeaderModalBack from '../../../components/Header/HeaderModalBack';
import PinEntry from './PinEntry';
import CustomToast from '../../../components/CustomToast/CustomToast';
import { useTheme } from 'react-native-paper';


const { width, height } = Dimensions.get('window');

interface Props {
    submit: any;
    close: any;
}


const PinConfirm: React.FC<Props> = props => {
    const { submit, close } = props;
    const [isLoading, setIsLoading] = useState(false);

    const theme = useTheme()
    const styles = newStyles(theme);

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

    const code = 1234;

    const maxEntry = 4;

    const handleConfirm = (data) => {
        setIsLoading(true);
        let pinDone = data.join('');

        setTimeout(() => {
            if (pinDone == code) {
                setIsLoading(false);
                submit('PIN');
            } else {
                setIsLoading(false);
                showToast('Warning', 'Incorrect pin')
            }
        }, 500)

    }

    return (
        <View style={[styles.midBg]}>

            <SafeAreaView
                style={{
                    height: height,
                    width: width,
                    flex: 1,
                    backgroundColor: 'transparent',
                }}
                edges={['left', 'right', 'top']}>
                <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

                <HeaderModalBack headerTitle={'Confirm PIN'} handleChange={close} />


                <View style={[styles.midBg, styles.iosBar, styles.ph15]}>

                    <MyText style={[styles.tinyLabel, styles.fontSize12, styles.mb20]}>Enter your 4 digit security PIN.</MyText>

                    <View style={[styles.ph15, styles.mt10, styles.mb15,]}>

                        <PinEntry
                            handleSubmit={handleConfirm}
                            maxEntry={maxEntry}
                            secureEntry={true}
                        />
                    </View>

                </View>

            </SafeAreaView>

            {isLoading ? (
                <View style={[styles.loader, styles.alignCenter]}>
                    <View style={[styles.b30, styles.p10, styles.alignCenter, styles.shadow, { opacity: 0.9, backgroundColor: theme.dark ? '#343434' : '#fff' }]}>
                        <ActivityIndicator color={theme.dark ? '#fff' : '#343434'} size={'small'} />
                    </View>
                </View>
            ) : null}

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

export default PinConfirm;