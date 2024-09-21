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
    SectionList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import MyText from '../../../../components/DefaultTextComponent/MyText';
import newStyles from '../../../Styles/Styles';
import Modal from 'react-native-modalbox';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

import NetworkList from '../Component/NetworkList';
import HeaderModalSubClose from '../../../../components/Header/HeaderModalSubClose';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

interface Props {
    isOpen: any;
    amount: any;
    crypto: any;
    fee: any;
    network: any;
    address: any;
    handleSubmit: any;
    handleChange: any;
}


const ConfirmWithdraw: React.FC<Props> = props => {
    const { isOpen, handleChange, handleSubmit, address, network, crypto, amount, fee, } = props;

    const theme = useTheme()
    const styles = newStyles(theme);

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

                <SafeAreaView
                    style={{
                        height: height,
                        width: width,
                        flex: 1,
                        backgroundColor: 'transparent',
                    }}
                    edges={['left', 'right', 'top']}>
                    <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

                    <HeaderModalSubClose headerTitle={'Confirm withdrawal'} handleChange={handleChange} />

                    <ScrollView>
                        <View style={[styles.mt20, styles.ph15]}>

                            <View style={[styles.formWhite, styles.shadow, styles.b30, styles.pb15, styles.bgWhite, styles.ph5, styles.pt10, styles.mb5]}>
                                <View style={[styles.ph10]}>

                                    <MyText style={[styles.textGrey, styles.fontRegular, styles.fontSize11, styles.mt15]}>You'll receive</MyText>
                                    <Text style={[styles.lineBottomLight, styles.textDark, styles.fontSize14, styles.mt5, styles.pb15, styles.fontRegular,]}>{amount} {crypto}</Text>

                                    <MyText style={[styles.tinyLabel, styles.fontSize11, styles.mt15]}>Fee taken</MyText>
                                    <Text style={[styles.lineBottomLight, styles.textDark, styles.fontSize14, styles.mt5, styles.pb15, styles.fontRegular,]}>{fee} {crypto}</Text>


                                    <MyText style={[styles.textGrey, styles.fontRegular, styles.fontSize11, styles.mt15]}>Address</MyText>
                                    <Text style={[styles.lineBottomLight, styles.textDark, styles.fontSize14, styles.mt5, styles.pb15, styles.fontRegular,]}>{address}</Text>

                                    <MyText style={[styles.tinyLabel, styles.fontSize11, styles.mt15]}>Network</MyText>
                                    <Text style={[styles.userLabel, styles.fontSize14, styles.mt5, styles.mb10]}>{network}</Text>

                                </View>

                            </View>

                            <View style={[styles.formWhite, styles.shadow, styles.b20, styles.bgWhite, styles.mt10, styles.pb5, styles.pt5, styles.mb10]}>
                                <View style={[styles.Row, styles.ph15, { width: width - 80 }]}>
                                    <IconM
                                        name={'warning-outline'}
                                        size={moderateScale(25)}
                                        color={'#f27415'}
                                        style={[styles.mt10, styles.mr10, {}]} />

                                    <MyText style={[styles.fontSize11, styles.textGrey, styles.mb10, styles.mt10]}>Ensure the {crypto} address is correct and its on thesame {network} network. Transactions are final and cannot be undone. </MyText>
                                </View >

                            </View>

                        </View>

                    </ScrollView>


                    <View style={[styles.ph15, styles.pt15, styles.bottomBar]}>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={handleSubmit}
                            style={[styles.submitButton, styles.bgGreen,]}>
                            <MyText style={[styles.buttonLabel,]}>Confirm</MyText>
                        </TouchableOpacity>

                    </View>
                </SafeAreaView>

            </View >

        </Modal>
    );
};


export default ConfirmWithdraw;