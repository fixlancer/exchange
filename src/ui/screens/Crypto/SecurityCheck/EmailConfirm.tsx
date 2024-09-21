import { View, Text, Dimensions, Platform, StyleSheet, TouchableOpacity, FlatList, ScrollView, StatusBar, TextInput, TouchableWithoutFeedback, ActivityIndicator, } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MyText from '../../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import newStyles from '../../Styles/Styles';
import Modal from 'react-native-modalbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import HeaderModalBack from '../../../components/Header/HeaderModalBack';
import { useTheme } from 'react-native-paper';


const { width, height } = Dimensions.get('window');

interface Props {
    submit: any;
    close: any;
}


const EmailConfirm: React.FC<Props> = props => {
    const { submit, close } = props;

    const theme = useTheme()
    const styles = newStyles(theme);
    const inputRef = useRef(null);

    const [error, setError] = useState('');
    const [emailInput, setEmailInput] = useState(0);
    const [code, setCode] = useState(123456);
    const [timer, setTimer] = useState(false);
    const [timerCount, setTimerCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false);

    const maxLength = 6;

    const handleInput = (data) => {
        setEmailInput(data);
        setError('');
    }

    const sendEmail = () => {

    }
    const resendEmail = () => {
        setTimer(true);
        setTimerCount(59);
        sendEmail();
    }


    useEffect(() => {
        sendEmail();
        setCode(123456);
    }, [])

    const handleConfirm = () => {
        
        inputRef.current.blur();
        setIsLoading(true);
        
        setTimeout(() => {
        if (emailInput == code) {
            
            setIsLoading(false);
            submit('Email');
        } else {
            setError('Invalid code');
            setIsLoading(false);
        }
    }, 500)
    }



    return (

        <View style={[styles.container]}>
    
            <SafeAreaView
                style={{
                    height: height,
                    width: width,
                    flex: 1,
                    backgroundColor: 'transparent',
                }}
                edges={['left', 'right', 'top']}>
        <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

                <HeaderModalBack headerTitle={'Confirm Email'} handleChange={close} />


                <ScrollView style={[styles.midBg, styles.ph15]}>

                    <MyText style={[styles.tinyLabel, styles.fontSize12, styles.mb20]}>We have sent a verification code to your email address. Check your email and enter the code below.</MyText>

                    <View style={[styles.ph15, styles.mt10, styles.mb15, styles.alignCenter]}>
                        <TextInput
                            style={[styles.alignCenter, styles.textCenter, styles.textDark, styles.b20, error === '' ? styles.borderWidthDark : styles.borderWidthRed, styles.ph15, styles.pv15, styles.fontRegular, styles.fontSize20, {width: width - 100}]}
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#808080"
                            keyboardType='numeric'
                            placeholder="Enter code"
                            maxLength={6}
                            ref={inputRef}
                            value={emailInput === 0 ? '' : emailInput.toString()}
                            textAlign={'center'}
                            onChangeText={e => handleInput(e)} />

                        <MyText style={[styles.tinyDark, styles.textRed, styles.pt5]}>{error}</MyText>

                    </View>

                    <MyText style={[styles.userLabel, styles.fontSize12, styles.textCenter, styles.mb5]}>Didn't receive email?</MyText>

                    {timer ? (
                        <MyText style={[styles.tinyDark, styles.fontSize12, styles.textCenter, styles.mt5, styles.mb5]}>You can resend code in {timerCount}s</MyText>
                    ) : (
                        <View style={[styles.alignCenter,]}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={resendEmail}
                                style={[styles.ph5, styles.pv5, { width: 'auto' }]}>
                                <MyText style={[styles.buttonLabel, styles.fontSize12, styles.textGreen,]}>Send email</MyText>
                            </TouchableOpacity>
                        </View>
                    )}

                </ScrollView>

            </SafeAreaView>

            <View style={[styles.ph15, styles.pt15, styles.bottomBar]}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={emailInput === 0 ? true : false}
                    onPress={() => handleConfirm()}
                    style={[styles.submitButton, styles.bgGreen, { opacity: emailInput === 0  ? 0.6 : 1 }]}>
                    <MyText style={[styles.buttonLabel,]}>Confirm</MyText>
                </TouchableOpacity>

            </View>

            {isLoading ? (
                <View style={[styles.loader, styles.alignCenter]}>
                    <View style={[styles.b30, styles.p10, styles.alignCenter, styles.shadow, { opacity: 0.9, backgroundColor: theme.dark ? '#343434' : '#fff' }]}>
                        <ActivityIndicator color={theme.dark ? '#fff' : '#343434'} size={'small'} />
                    </View>
                </View>
            ) : null}

            </View>

    )
}

export default EmailConfirm;