import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import MyText from '../../../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import newStyles from '../../../Styles/Styles';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { useTheme } from 'react-native-paper';

interface Props {
    title: any;
    subTitle: any;
    setCurrency: any;
    selected: any;
}

const CurrencySwapList: React.FC<Props> = props => {
    const { title, subTitle, selected, setCurrency } = props;

    const theme = useTheme()
    const styles = newStyles(theme);

    const img = {
        BTC: require('../../../../../Assets/ICONS/btc.png'),
        USDT: require('../../../../../Assets/ICONS/usdt.png'),
        NGN: require('../../../../../Assets/ICONS/ngn.png'),
    }

    return (
        <View style={[styles.pv15, styles.ph15]}>


            <TouchableOpacity onPress={() => setCurrency(title)}
                style={[styles.RowB]}>

                <View style={styles.Row}> 
                    <Image source={img[title]} style={[styles.icon, styles.mt5]} /> 

                    <View>
                        <MyText style={[styles.pl15, styles.largeLabel3]}>{title}</MyText>
                        <MyText style={[styles.tinyLabel, styles.pl15, styles.pt5]}>{subTitle}</MyText>

                    </View>
                </View>

                {title == selected ? (

                    <View>
                        <IconM
                            name={'checkmark-circle'}
                            size={moderateScale(20)}
                            color={'#1cc88a'}
                            style={{ marginTop: moderateScale(8) }}></IconM>
                    </View>
                ) : null}
            </TouchableOpacity>
        </View>
    )
}


export default CurrencySwapList;