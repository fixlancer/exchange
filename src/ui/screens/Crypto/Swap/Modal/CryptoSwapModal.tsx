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
import MyText from '../../../../components/DefaultTextComponent/MyText';
import newStyles from '../../../Styles/Styles';
import Modal from 'react-native-modalbox';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

import CryptoSwapList from '../Components/CryptoSwapList';
import HeaderModalClose from '../../../../components/Header/HeaderModalClose';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

interface Props {
    isOpen: any;
    setCrypto: any;
    selected: any;
    tradeType: any;
    setPair: any;
    handleChange: any;
    navigation: any;
}


const Item = ({ item, index, setPair, setData, selected }) => {

    return (
        <CryptoSwapList
            title={item.title}
            subTitle={item.subTitle}
            selected={selected}
            setPair={() => setPair(item.pair)}
            setCrypto={(data) => setData(data)}

        />
    )
}

const CryptoSwapModal: React.FC<Props> = props => {
    const { isOpen, setCrypto, tradeType, setPair, selected, handleChange, navigation } = props;

    const theme = useTheme()
    const styles = newStyles(theme);

    const [close, setClose] = useState(0);

    const handlePair = (data) => {
        setPair(data);
    }

    const handleData = (data) => {
        setCrypto(data);
        setClose(close + 1)
    }

    useEffect(() => {
        if (close) {
            handleChange();
        }
    }, [close])

    const cryptoList =
        [
            {
                id: 0,
                title: 'BTC',
                subTitle: 'Bitcoin',
                pair: ['USDT', 'NGN'],
                tradingStatus: true,
            },
            {
                id: 1,
                title: 'USDT',
                subTitle: 'TetherUS',
                pair: ['NGN', 'BTC'],
                tradingStatus: true,
            },
            {
                id: 2,
                title: 'ETH',
                subTitle: 'Ethereum',
                pair: ['USDT', 'NGN', 'BTC'],
                tradingStatus: true,
            },
            {
                id: 3,
                title: 'DOGE',
                subTitle: 'Dogecoin',
                pair: ['USDT', 'NGN', 'BTC'],
                tradingStatus: true,
            },
            {
                id: 4,
                title: 'SHIB',
                subTitle: 'SHIBA INU',
                pair: ['USDT', 'NGN'],
                tradingStatus: true,
            },
            {
                id: 5,
                title: 'BNB',
                subTitle: 'BNB',
                pair: ['USDT', 'NGN', 'BTC'],
                tradingStatus: true,
            },
            {
                id: 6,
                title: 'ETC',
                subTitle: 'Ethereum Classic',
                pair: ['USDT', 'NGN', 'BTC'],
                tradingStatus: true,
            },
            {
                id: 7,
                title: 'XRP',
                subTitle: 'Ripple',
                pair: ['USDT', 'NGN', 'BTC'],
                tradingStatus: true,
            },
            {
                id: 8,
                title: 'LTC',
                subTitle: 'Litecoin',
                pair: ['USDT', 'NGN', 'BTC'],
                tradingStatus: true,
            },
            {
                id: 9,
                title: 'XLM',
                subTitle: 'Stellar Lumens',
                pair: ['USDT', 'NGN'],
                tradingStatus: true,
            },
            {
                id: 10,
                title: 'ADA',
                subTitle: 'Cardano',
                pair: ['USDT', 'NGN'],
                tradingStatus: true,
            },
        ]

    const renderCrypto = ({ item, index }) => {
        return (

            <Item item={item} index={index} selected={selected} setPair={handlePair} setData={handleData} />

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

                    <HeaderModalClose headerTitle={'Select crypto'} handleChange={handleChange} />


                    <FlatList
                        data={cryptoList}
                        contentContainerStyle={[styles.iosBar, { flexGrow: 1 }]}
                        renderItem={renderCrypto}
                        keyExtractor={(item) => item.id.toString()}
                   //     ItemSeparatorComponent={seperator}
                    />

                </SafeAreaView>

            </View >

        </Modal>
    );
};


export default CryptoSwapModal;