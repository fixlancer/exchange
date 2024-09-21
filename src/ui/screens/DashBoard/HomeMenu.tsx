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
    handleChange: any;
    openModal: any;
    navigation: any;
}


const HomeMenu: React.FC<Props> = props => {
    const { isOpen, openModal, handleChange, navigation } = props;


    const theme = useTheme()
    const styles = newStyles(theme);

    const data =
        [
            {
                id: 0,
                title: 'Buy',
                subtext: 'Buy crypto with naira or cryptocurrency'
            },
            {
                id: 2,
                title: 'Sell',
                subtext: 'Sell crypto to get naira or cryptocurrency'
            },
            {
                id: 5,
                title: 'Trade giftcard',
                subtext: 'Sell your unused giftcards for cash'
            },
            {
                id: 3,
                title: 'Deposit',
                subtext: 'Deposit naira or crypto'
            },
            {
                id: 4,
                title: 'Withdraw',
                subtext: 'Withdraw naira or crypto'
            },
        ]


    const handleClick = (data) => {
        switch (data) {
            case 'Buy':
                openModal('Buy');
                break;
            case 'Sell':
                openModal('Sell')
                break;
            case 'Deposit':
                openModal('Deposit')
                break;
            case 'Withdraw':
                openModal('Withdraw')
                break;
            case 'Trade giftcard':
                return navigation.navigate('SelectGiftCard');
                break;
            default:
                return null;
        }
    }

    const iconName = (data) => {
        switch (data) {
            case 'Buy':
                return 'add-circle';
                break;
            case 'Sell':
                return 'remove-circle';
                break;
            case 'Deposit':
                return 'arrow-down-circle';
                break;
            case 'Withdraw':
                return 'arrow-forward-circle';
                break;
            case 'Trade giftcard':
                return 'card';
                break;
            default:
                return null;
        }
    }

    const renderItem = ({ item, index }) => {
        return (

            <View style={[styles.pb15, styles.mb5, styles.pt15, styles.ph15]}>


                <TouchableOpacity onPress={() => handleClick(item.title)}
                    style={[styles.RowB, styles.ph10]}>

                    <View style={styles.Row}>
                        <IconM
                            name={iconName(item.title)}
                            size={moderateScale(35)}
                            color={'#1cc88a'}
                            style={[ styles.mt5, { }]} />
                        <View>
                            <Text style={[styles.largeLabel, styles.pl15, styles.textDark, styles.fontSize17]}>{item.title}</Text>
                            <MyText style={[styles.tinyLabel, styles.pl15, styles.pt5]}>{item.subtext}</MyText>

                        </View>
                    </View>

                </TouchableOpacity>
            </View>
        )
    }

    const seperator = () => {

        return (
            <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: theme.dark ? '#454545' : '#ddd' }} />
        )
    }

    return (

        <Modal isOpen={isOpen}
            style={{ height: Platform.OS == 'ios' ? moderateScale(460) : moderateScale(430), backgroundColor: 'transparent', }}
            keyboardTopOffset={Platform.OS == 'ios' ? 22 : 0}
            backdropPressToClose={true}
            swipeToClose={true}
            onClosed={handleChange}
            backdropOpacity={0.5}
            backdropColor="#000"
            position="bottom">

            <View style={[styles.container, styles.roundBorder, styles.bgGrey, {}]}>

                <StatusBar translucent barStyle={'dark-content'} backgroundColor="transparent" />

                <FlatList
                    data={data}
                    contentContainerStyle={[styles.iosBar, styles.mt15, { flexGrow: 1 }]}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={seperator}
                />
            </View>

        </Modal>
    );
};


export default HomeMenu;