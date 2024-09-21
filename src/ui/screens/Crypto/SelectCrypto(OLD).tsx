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
import styles from '../Styles/Styles';
import Modal from 'react-native-modalbox';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

import CryptoList from './Components/CryptoList';
import SelectCurrency from './Components/SelectCurrency';

const { width, height } = Dimensions.get('screen');

interface Props {
    isOpen: any;
    tradeType: any;
    handleChange: any;
    navigation: any;
}


const Item = ({ item, index, setData, setPair, tradeType, navigation }) => {

    return (

        <CryptoList
            title={item.title}
            subTitle={item.subTitle}
            pair={item.pair}
            setPair={(data) => setPair(data)}
            setCrypto={(data) => setData(data)}

        />
    )
}

const SelectCrypto: React.FC<Props> = props => {
    const { isOpen, tradeType, handleChange, navigation } = props;

    const [crypto, setCrypto] = useState('');
    const [isCurrency, setIsCurrency] = useState(false);
    const [isPair, setIsPair] = useState([]);

    const handlePair = (data) => {
        setIsPair(data);
        setIsCurrency(true);
    }

    const handleData = (data) => {
        setCrypto(data);
    }

    const close = () => {
        setCrypto('')
        setIsCurrency(false);
        handleChange()
    }

    const closeCurrency = () => {
        setCrypto('')
        setIsCurrency(false);
    }

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

            <Item item={item} index={index} tradeType={tradeType} setData={handleData} setPair={handlePair} navigation={navigation} />

        )
    }

    const seperator = () => {

        return (
            <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: '#f2f2f2' }} />
        )
    }

    return (

        <Modal isOpen={isOpen}
            style={{ backgroundColor: '#fff' }}
            keyboardTopOffset={Platform.OS == 'ios' ? 22 : 0}
            swipeToClose={false}
            onClosed={close}
            backdropOpacity={1}
            backdropColor="white"
            position="top">


            <View style={styles.container}>

                <SafeAreaView
                    style={{
                        height: height,
                        width: width,
                        flex: 1,
                        backgroundColor: '#fff',
                    }}
                    edges={['left', 'right', 'top']}>
                    <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />


                    <View style={[styles.newModalHeader, { backgroundColor: '#fff' }]}>
                        <TouchableOpacity
                            onPress={isCurrency ? closeCurrency : close}
                            style={[styles.b30, styles.alignCenter, styles.bgWhite, styles.borderDark, styles.mt10, {height: moderateScale(30), width: moderateScale(30)}]}>
                            <IconM
                                name={isCurrency ? 'chevron-back' : 'close'}
                                size={moderateScale(15)}
                                color={'#343434'}
                                style={{}} />

                        </TouchableOpacity>

                    <View>
                        {isCurrency ? (
                            <>
                           <Text style={[styles.largeLabel, styles.fontSize22, styles.mt15, ]}>{tradeType === 'Sell' ? 'You receive' : 'You pay with'}</Text>
                            </>

                        ) : (
                            <>
                                <Text style={[styles.largeLabel, styles.fontSize22, styles.mt15,]}>Select crypto</Text>
                            </>)}
                    </View>

                    <MyText></MyText>

            </View>


                {!isCurrency ? (
                    <FlatList
                        data={cryptoList}
                        contentContainerStyle={[styles.iosBar, { flexGrow: 1 }]}
                        renderItem={renderCrypto}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={seperator}
                    />
                ) : (
                    <>

                        <View style={[styles.alignCenter, { width: '100%', height: moderateScale(125) }]}>
                            <SelectCurrency
                                crypto={crypto}
                                pair={isPair}
                                tradeType={tradeType}
                                handleChange={close}
                                navigation={navigation}
                            />
                        </View>
                    </>
                )}


        </SafeAreaView>


            </View >

        </Modal >
    );
};


export default SelectCrypto;