import React, { useState } from 'react';
import {
    View,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Platform,
    ScrollView,
    FlatList,
    StatusBar,
} from 'react-native';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyText from '../../components/DefaultTextComponent/MyText';
import { useTheme } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';
import newStyles from '../Styles/Styles';

const { width, height } = Dimensions.get('screen');

interface Props {
    isOpen: boolean;
    handleChange: () => void;
    account: any;
    network: any;
    cat: any;
    type: any;

}

const FormValue: React.FC<Props> = props => {

    const { account, network, cat, type } = props;

    const theme = useTheme()
    const styles = newStyles(theme);

    const networkList = ['MTN', 'AIRTEL', 'GLO', '9MOBILE'];
    const catList = ['Airtime', 'Data'];


    const renderAcc = ({ item, index }) => {

        return (
            <View key={index} style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#ddd', }}>
                <TouchableOpacity
                    style={{ width: '100%', height: 'auto', paddingVertical: 15, paddingHorizontal: 20, }}
                    onPress={() => {
                        account(item);
                        props.handleChange();
                    }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <MyText style={{ color: '#343434', fontSize: 13, }}>{item}</MyText>
                        <Icon
                            name={'arrow-forward-ios'}
                            size={10}
                            color={'#f27417'}
                            style={{ marginTop: 3 }}></Icon>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    const renderNetwork = ({ item, index }) => {

        return (
            <View key={index}>
                <TouchableOpacity
                    style={[styles.ph20, styles.pv15, { width: '100%', height: 'auto', }]}
                    onPress={() => {
                        network(item);
                        props.handleChange()
                    }}>
                    <View style={[styles.RowB]}>
                        <MyText style={[styles.userLabel, styles.fontSize13]}>{item}</MyText>
                        <Icon
                            name={'arrow-forward-ios'}
                            size={moderateScale(10)}
                            color={'#808080'}
                            style={{ marginTop: 3 }}></Icon>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const renderCat = ({ item, index }) => {
        return (
            <View key={index}>
                <TouchableOpacity
                    style={[styles.ph20, styles.pv15, { width: '100%', height: 'auto', }]}
                    onPress={() => {
                        cat(item);
                        props.handleChange()
                    }}>
                    <View style={[styles.RowB]}>
                        <MyText style={[styles.userLabel, styles.fontSize13]}>{item}</MyText>
                        <Icon
                            name={'arrow-forward-ios'}
                            size={moderateScale(10)}
                            color={'#808080'}
                            style={{ marginTop: 3 }}></Icon>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        
        <Modal isOpen={props.isOpen}
            style={[styles.bgGrey, styles.roundBorder, { height: Platform.OS == 'ios' ? moderateScale(320) : moderateScale(290) }]}
            keyboardTopOffset={Platform.OS == 'ios' ? 22 : 0}
            swipeArea={400}
            onClosed={props.handleChange}
            backdropPressToClose={true}
            swipeToClose={true}
            backdropOpacity={0.5}
            backdropColor="#000"
            position="bottom">

                <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

                <View style={[styles.modalLine, styles.mt15, styles.mb10, styles.alignCenter]} />

                <View style={[styles.newModalHeader,]}>
                    <MyText style={[styles.extraLabel, styles.textCenter, styles.mb20,]}>Select {type}</MyText>
                </View>


                {type === 'Network' ? (

                    <FlatList
                        data={networkList}
                        style={[styles.iosBar, { flexGrow: 1 }]}
                        renderItem={renderNetwork}
                        keyExtractor={item => item}

                    />

                ) : null}


                {type === 'Category' ? (

                    <FlatList
                        data={catList}
                        style={[styles.iosBar, { flexGrow: 1 }]}
                        renderItem={renderCat}
                        keyExtractor={item => item}

                    />

                ) : null}

        </Modal >
    );
};

export default FormValue;
