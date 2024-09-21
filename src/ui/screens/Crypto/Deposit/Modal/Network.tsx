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
    type: any;
    crypto: any;
    selectedNet: any;
    setNetwork: any;
    handleChange: any;
    navigation: any;
}


const Item = ({ item, index, type, selectedNet, setData, navigation }) => {

    if (type === 'Deposit') {
        return (
            <NetworkList
                name={item.name}
                type={type}
                setData={(data) => setData(data)}
                minConfirmation={item.minConfirmation}
                arrival={item.arrival}
                minAmt={item.minDeposit}
                selectedNet={selectedNet}
                fee={{}}
                navigation={navigation}

            />
        )
    } else {
        return (

            <NetworkList
                name={item.name}
                type={type}
                setData={(data) => setData(data)}
                minConfirmation={item.minConfirmation}
                arrival={item.arrival}
                minAmt={item.minWithdrawal}
                selectedNet={selectedNet}
                fee={item.fee}
                navigation={navigation}

            />
        )
    }
}

const Network: React.FC<Props> = props => {
    const { isOpen, handleChange, type, selectedNet, setNetwork, crypto, navigation } = props;

    const theme = useTheme()
    const styles = newStyles(theme);

    const handleData = (data) => {
        setNetwork(data);
        handleChange();
    }

    const depList =
        [
            {
                id: 1,
                name: 'Tron (TRC20)',
                minDeposit: 0.01,
                minConfirmation: 1,
                arrival: 2,
            },
            {
                id: 2,
                name: 'BNB Smart Chain (BEP20)',
                minDeposit: 0.01,
                minConfirmation: 15,
                arrival: 3,
            },
            {
                id: 3,
                name: 'Ethereum (ERC20)',
                minDeposit: 0.00000001,
                minConfirmation: 6,
                arrival: 4,
            },
            {
                id: 4,
                name: 'Polygon',
                minDeposit: 0.00000001,
                minConfirmation: 1,
                arrival: 2,
            },
        ]


    const withList = [
        {

            id: 1,
            name: 'Tron (TRC20)',
            minWithdrawal: 0.01,
            minConfirmation: 1,
            arrival: 2,
            fee: 1,
        },
        {
            id: 2,
            name: 'BNB Smart Chain (BEP20)',
            minWithdrawal: 0.01,
            minConfirmation: 15,
            arrival: 3,
            fee: 0.3
        },
        {
            id: 3,
            name: 'Ethereum (ERC20)',
            minWithdrawal: 0.00000001,
            minConfirmation: 6,
            arrival: 4,
            fee: 0.001
        },
        {
            id: 4,
            name: 'Polygon',
            minWithdrawal: 0.00000001,
            minConfirmation: 1,
            arrival: 2,
            fee: 0.5
        },
    ]

    const handleList = () => {
        switch (type) {
            case 'Deposit':
                return depList;
            case 'Withdrawal':
                return withList;
            default:
                return depList;
        }
    }


    const renderCrypto = ({ item, index }) => {
        return (

            <Item item={item} index={index} type={type} setData={handleData} selectedNet={selectedNet} navigation={navigation} />

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

                    <HeaderModalSubClose headerTitle={'Choose network'} handleChange={handleChange} />


                        <FlatList
                            data={handleList()}
                            contentContainerStyle={[styles.iosBar, styles.mt10, { flexGrow: 1 }]}
                            renderItem={renderCrypto}
                            keyExtractor={(item) => item.id.toString()}
                        />

                </SafeAreaView>

            </View >

        </Modal>
    );
};


export default Network;