import { View, Text, Dimensions, Platform, StyleSheet, TouchableOpacity, FlatList, ScrollView, StatusBar, } from 'react-native'
import React from 'react'
import MyText from '../../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import newStyles from '../../Styles/Styles';
import Modal from 'react-native-modalbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import CurrencyList from './CurrencyList';
import { useTheme } from 'react-native-paper';
const { width, height } = Dimensions.get('window');

interface Props {
  crypto: any;
  pair: any;
  tradeType: any;
  handleChange: any;
  navigation: any;
}

const Item = ({ item, index, crypto, handleChange, tradeType, navigation }) => {

  return (
    
    <CurrencyList
      title={item.title}
      subTitle={item.subTitle}
      crypto={crypto}
      handleChange={handleChange}
      tradeType={tradeType}
      navigation={navigation}

    />
  )
}

const SelectCurrency: React.FC<Props> = props => {
  const { crypto, tradeType, pair, handleChange, navigation } = props;

  const theme = useTheme()
  const styles = newStyles(theme);

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

      <Item item={item} index={index} crypto={crypto} handleChange={handleChange} tradeType={tradeType} navigation={navigation} />

    )
  }

  const seperator = () => {

    return (
      <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: '#f2f2f2' }} />
    )
  }

  const displayData = data.filter(item => pair.includes(item.title));

  return (

    <View style={styles.midBg}>

      <TouchableOpacity activeOpacity={1}>


        <FlatList
          data={displayData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={seperator}
        />


      </TouchableOpacity>
    </View>

  )
}

export default SelectCurrency;