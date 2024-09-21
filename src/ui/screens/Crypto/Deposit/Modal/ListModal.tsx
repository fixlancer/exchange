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

import List from '../Component/List';
import HeaderModalSubClose from '../../../../components/Header/HeaderModalSubClose';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

interface Props {
    isOpen: any;
    type: any;
    handleChange: any;
    navigation: any;
}


const Item = ({ item, index, type, navigation }) => {

    return (

        <List
            title={item.title}
            type={type}
            subTitle={item.subTitle}
            navigation={navigation}

        />
    )
}

const ListModal: React.FC<Props> = props => {
    const { isOpen, handleChange, type, navigation } = props;

    const theme = useTheme()
    const styles = newStyles(theme);

    const cryptoList =
        [
            {
                status: 'Fiat',
                data: [
                    {
                        id: 0,
                        title: 'NGN',
                        subTitle: 'Nigerian Naira',
                    },
                    {
                        id: 2,
                        title: 'USDT',
                        subTitle: 'TetherUS',
                    },
                ]
            },
            {
                status: 'Crypto',
                data: [
                    {
                        id: 1,
                        title: 'BTC',
                        subTitle: 'Bitcoin',
                    },
                    {
                        id: 3,
                        title: 'ETH',
                        subTitle: 'Ethereum',
                    },
                    {
                        id: 4,
                        title: 'DOGE',
                        subTitle: 'Dogecoin',
                    },
                    {
                        id: 5,
                        title: 'SHIB',
                        subTitle: 'SHIBA INU',
                    },
                    {
                        id: 6,
                        title: 'BNB',
                        subTitle: 'BNB',
                    },
                    {
                        id: 7,
                        title: 'ETC',
                        subTitle: 'Ethereum Classic',
                    },
                    {
                        id: 8,
                        title: 'XRP',
                        subTitle: 'Ripple',
                    },
                    {
                        id: 9,
                        title: 'LTC',
                        subTitle: 'Litecoin'
                    },
                    {
                        id: 10,
                        title: 'XLM',
                        subTitle: 'Stellar Lumens',
                    },
                    {
                        id: 11,
                        title: 'ADA',
                        subTitle: 'Cardano',
                    },
                ]
            }]

    const renderCrypto = ({ item, index }) => {
        return (

            <Item item={item} index={index} type={type} navigation={navigation} />

        )
    }

    const header = (section) => {
        return (
            section.status === 'Fiat' ? (
                <View style={[styles.pt15, styles.pl15, styles.pb10]}>
                    <Text style={[styles.largeLabel, styles.textDark]}>Fiat</Text>
                </View>
            ) : section.status === 'Crypto' ? (
                <View style={[styles.pt15, styles.pl15, styles.pb10]}>
                    <Text style={[styles.largeLabel, styles.textDark]}>Crypto</Text>
                </View>
            ) : null
        )
    }

    const seperator = () => {

        return (
            <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: theme.dark ? '#535353' : '#f2f2f2' }} />
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


            <View style={[styles.container, styles.bgGrey]}>

                <SafeAreaView
                    style={{
                        height: height,
                        width: width,
                        flex: 1,
                        backgroundColor: 'transparent',
                    }}
                    edges={['left', 'right', 'top']}>
        <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

                    <HeaderModalSubClose headerTitle={type} handleChange={handleChange} />



                        <SectionList
                            sections={cryptoList}
                            renderSectionHeader={({ section }) => header(section)}
                            contentContainerStyle={[styles.iosBar, { flexGrow: 1 }]}
                            renderItem={renderCrypto}
                            keyExtractor={(item) => item.id.toString()}
                        //    ItemSeparatorComponent={seperator}
                        />

                </SafeAreaView>

            </View >

        </Modal>
    );
};


export default ListModal;