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

import CurrencySwapList from '../Components/CurrencySwapList';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

interface Props {
  isOpen: any;
  setCurrency: any;
  selected: any;
  pair: any;
  cryptoSelected: any;
  tradeType: any;
  handleChange: any;
  navigation: any;
}


const Item = ({ item, index, setData, selected }) => {

  return (
    <CurrencySwapList
      title={item.title}
      subTitle={item.subTitle}
      selected={selected}
      setCurrency={(data) => setData(data)}

    />
  )
}

const CurrencySwapModal: React.FC<Props> = props => {
  const { isOpen, setCurrency, cryptoSelected, pair, tradeType, selected, handleChange, navigation } = props;

  const theme = useTheme()
  const styles = newStyles(theme);

  const [close, setClose] = useState(0);
  
  const handleData = (data) => {
    setCurrency(data);
    setClose(close + 1)
  }

  useEffect(() => {
    if (close) {
      handleChange();
    }
  }, [close])

  const data =
    [{
      id: 0,
      title: 'NGN',
      subTitle: 'Nigerian Naira',
    },
    {
      id: 1,
      title: 'USDT',
      subTitle: 'TetherUS',
    },
    {
      id: 2,
      title: 'BTC',
      subTitle: 'Bitcoin',
    }
    ]

  const renderItem = ({ item, index }) => {
    return (

      <Item item={item} index={index} selected={selected} setData={handleData} />

    )
  }

  const seperator = () => {

    return (
      <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: theme.dark ? '#535353' : '#f2f2f2' }} />
    )
  }


  const displayData = data.filter(item => pair.includes(item.title));


  return (

    <Modal isOpen={isOpen}
      style={{ height: Platform.OS == 'ios' ? moderateScale(370) : moderateScale(340), backgroundColor: 'transparent', }}
      keyboardTopOffset={Platform.OS == 'ios' ? 22 : 0}
      backdropPressToClose={true}
      swipeToClose={true}
      onClosed={handleChange}
      backdropOpacity={0.5}
      backdropColor="#000"
      position="bottom">

      <View style={[styles.container, styles.bgGrey, styles.roundBorder, ]}>

      <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

        <View style={[styles.modalLine, styles.mt15, styles.mb10, styles.alignCenter]} />

        <View style={[styles.newModalHeader, ]}>

          <MyText style={[styles.extraLabel, styles.textCenter, styles.pt5]}>{tradeType === 'Sell' ? 'Choose currency' : 'Choose currency'}</MyText>
          <MyText style={[styles.tinyLabel, styles.textCenter, styles.pt5]}>{tradeType === 'Sell' ? 'Select the currency you want to receive after selling' : 'Select the currency you want to pay with'}</MyText>

        </View>

        <View style={[styles.mt20]}>
          <FlatList
            data={displayData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
           // ItemSeparatorComponent={seperator}
          />


        </View>

      </View >

    </Modal>
  );
};


export default CurrencySwapModal;