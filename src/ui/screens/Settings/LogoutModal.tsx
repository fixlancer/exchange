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
import MyText from '../../components/DefaultTextComponent/MyText';
import newStyles from '../Styles/Styles';
import Modal from 'react-native-modalbox';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { useTheme } from 'react-native-paper';


const { width, height } = Dimensions.get('screen');

interface Props {
    isOpen: any;
    handleSubmit: any;
    handleChange: any;
}


const LogoutModal: React.FC<Props> = props => {
    const { isOpen, handleSubmit, handleChange } = props;

    const theme = useTheme()
    const styles = newStyles(theme);

    return (

        <Modal isOpen={isOpen}
            style={{ height: Platform.OS == 'ios' ? moderateScale(250) : moderateScale(220), backgroundColor: 'transparent', }}
            keyboardTopOffset={Platform.OS == 'ios' ? 22 : 0}
            backdropPressToClose={true}
            swipeToClose={true}
            onClosed={handleChange}
            backdropOpacity={0.5}
            backdropColor="#000"
            position="bottom">

            <View style={[styles.container, styles.roundBorder, styles.iosBar, styles.bgGrey, {}]}>

                <StatusBar translucent barStyle={'dark-content'} backgroundColor="transparent" />

                <View style={[styles.modalLine, styles.mt15, styles.mb10, styles.alignCenter]} />

                <View style={[styles.newModalHeader,]}>
                    <MyText style={[styles.extraLabel, styles.textRed, styles.textCenter, styles.mb20,]}>Logout</MyText>
                </View>

                <MyText style={[styles.tinyDark, styles.textCenter, styles.fontSize13]}>Are you sure you want to logout?</MyText>

            <View style={[styles.ph15, styles.mt15, styles.pt15]}>
                <View style={[styles.RowB, styles.alignCenter]}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => handleChange()}
                        style={[styles.submitButton, styles.borderWidthLight, styles.mr10, styles.bgWhite, { width: '45%' }]}>
                        <MyText style={[styles.buttonLabel, styles.textDark,]}>Cancel</MyText>

                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => handleSubmit()}
                        style={[styles.submitButton, styles.bgGreen, { width: '45%' }]}>
                        <MyText style={[styles.buttonLabel,]}>Yes, Logout</MyText>
                    </TouchableOpacity>
                </View>

            </View>
            </View>

        </Modal>
    );
};


export default LogoutModal;