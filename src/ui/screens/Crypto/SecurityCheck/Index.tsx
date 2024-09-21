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
import MyText from '../../../components/DefaultTextComponent/MyText';
import newStyles from '../../Styles/Styles';
import Modal from 'react-native-modalbox';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

import HeaderModalClose from '../../../components/Header/HeaderModalClose';
import EmailConfirm from './EmailConfirm';
import PinConfirm from './PinConfirm';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

interface Props {
    isOpen: any;
    page: any;
    handleSubmit: any;
    handleChange: any;
    navigation: any;
}


const SecurityCheck: React.FC<Props> = props => {
    const { isOpen, page, handleSubmit, handleChange, navigation } = props;

    const theme = useTheme()
    const styles = newStyles(theme);
    const [verify, setVerify] = useState<string[]>([]);
    const [done, setDone] = useState(0);
    const [isEmail, setIsEmail] = useState(false);
    const [isPIN, setIsPIN] = useState(false);

    const [pinDone, setPinDone] = useState(false);
    const [emailDone, setEmailDone] = useState(false);

    const closePIN = () => {
        setIsPIN(false);
    }

    const closeEmail = () => {
        setIsEmail(false);
    }

    const click = (data) => {
        switch (data) {
            case 'Email':
                if (emailDone === false) {
                    handleClick(data)
                }
                break;
            case 'PIN':
                if (pinDone === false) {
                    handleClick(data)
                }
                break;
            default:
                return null;
        }
    }

    const handleClick = (data) => {
        switch (data) {
            case 'Email':
                setIsEmail(true);
                break;
            case 'PIN':
                setIsPIN(true);
                break;
            default:
                return null;
        }
    }


    const handleData = (data) => {
        switch (data) {
            case 'Email':
                setEmailDone(true);
                setIsEmail(false);
                setDone(done + 1);
                break;
            case 'PIN':
                setPinDone(true);
                setIsPIN(false);
                setDone(done + 1);
                break;
            default:
                return null;
        }
    }


    const data = ['Email', 'PIN']; //This data will be fetched from the server and contents will be determined by the page 
    const newVerify = data.map(item => ({ title: item }));


    useEffect(() => {
        setVerify(newVerify)
    }, [])


    useEffect(() => {
        if (done == newVerify.length) {
            setTimeout(() => {
                handleSubmit();
                handleChange();
            }, 500);

        }
    }, [done])


    const RenderItem = ({ item, index }) => {
        return (
            <View style={[styles.mb15, styles.ph15,]}>


                <TouchableOpacity
                    onPress={() => click(item.title)}
                    style={[styles.b15, styles.bgWhite, styles.shadow, styles.RowB, styles.pv15, styles.ph15,]}>

                    <View>
                        <MyText style={[styles.largeLabel, styles.pb15, styles.pt10,]}>{item.title}</MyText>

                    </View>

                    {item.title === 'Email' && emailDone === true ? (

                        <View>
                            <IconM
                                name={'checkmark-circle'}
                                size={moderateScale(20)}
                                color={'#1cc88a'}
                                style={{ marginTop: moderateScale(10) }}></IconM>
                        </View>
                    ) : item.title === 'PIN' && pinDone === true ? (

                        <View>
                            <IconM
                                name={'checkmark-circle'}
                                size={moderateScale(20)}
                                color={'#1cc88a'}
                                style={{ marginTop: moderateScale(10) }}></IconM>
                        </View>
                    ) : null}

                </TouchableOpacity>
            </View>
        )
    }


    return (

        <Modal isOpen={isOpen}
            style={{ backgroundColor: '#fff' }}
            keyboardTopOffset={Platform.OS == 'ios' ? 22 : 0}
            swipeToClose={false}
            onClosed={handleChange}
            backdropOpacity={1}
            backdropColor="transparent"
            position="top">


            <View style={[styles.container, styles.midBgGrey]}>

                {isEmail ? (
                    <>

                        <EmailConfirm submit={handleData} close={closeEmail} />

                    </>

                ) : isPIN ? (
                    <>

                        <PinConfirm submit={handleData} close={closePIN} />

                    </>
                ) : (
                    <>

                        <SafeAreaView
                            style={{
                                height: height,
                                width: width,
                                flex: 1,
                                backgroundColor: 'transparent',
                            }}
                            edges={['left', 'right', 'top']}>
                            <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

                            <HeaderModalClose headerTitle={'Security requirements'} handleChange={handleChange} />

                            <View style={[styles.ph15]}>
                                <Text style={[styles.largeLabel, styles.fontSize20]}>{done}/{verify.length}</Text>
                                <MyText style={[styles.userLabel, styles.pt10, styles.mb20]}>You need to complete the following verifications to proceed</MyText>
                            </View>

                            {verify.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <RenderItem item={item} index={index} />
                                    </View>

                                )
                            })}


                        </SafeAreaView>
                    </>
                )}


            </View >

        </Modal>
    );
};


export default SecurityCheck;