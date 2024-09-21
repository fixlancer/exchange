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
  setPair: any;
  setCrypto: any;
  selected: any;
}

const CryptoSwapList: React.FC<Props> = props => {
  const { title, subTitle, setPair, selected, setCrypto } = props;

  const theme = useTheme()
  const styles = newStyles(theme);

  const img = {
    BTC: require('../../../../../Assets/ICONS/btc.png'),
    USDT: require('../../../../../Assets/ICONS/usdt.png'),
    ETH: require('../../../../../Assets/ICONS/eth.png'),
    DOGE: require('../../../../../Assets/ICONS/doge.png'),
    BNB: require('../../../../../Assets/ICONS/bnb.png'),
    SHIB: require('../../../../../Assets/ICONS/shib.png'),
    ETC: require('../../../../../Assets/ICONS/etc.png'),
    ADA: require('../../../../../Assets/ICONS/ada.png'),
    LTC: require('../../../../../Assets/ICONS/ltc.png'),
    XRP: require('../../../../../Assets/ICONS/xrp.png'),
    XLM: require('../../../../../Assets/ICONS/xlm.png'),
}

  return (
    <View style={[styles.pv15, styles.ph15]}>


      <TouchableOpacity onPress={() => {
        setCrypto(title)
        setPair()
      }}
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


export default CryptoSwapList;