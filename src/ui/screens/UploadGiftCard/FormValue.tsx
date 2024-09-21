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
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyText from '../../components/DefaultTextComponent/MyText';
import HeaderModalSubClose from '../../components/Header/HeaderModalSubClose';
import newStyles from '../Styles/Styles';

const { width, height } = Dimensions.get('screen');

interface Props {
  isOpen: boolean;
  handleChange: () => void;
  cardC: any;
  cardT: any;
  type: any;
  data: any;
  cardS: any;

}

const FormValue: React.FC<Props> = props => {

  const { cardC, cardT, type, data, cardS } = props;

  const theme = useTheme()
  const styles = newStyles(theme);

  const countryNames = [
    'US',
    'UK',
    'GERMANY',
    'CANADA',
    'NETHERLAND',
    'AUSTRALIA',
    'SINGAPORE',
    'Ireland',
    'Spain',
    'Belgium',
    'Italy',
    'France',
    'Greece',
    'Portugal',
  ];

  const cardTypes = [
    'Debit', 'Cash Receipt'
  ]

  const renderCountry = ({ item, index }) => {

    return (
      <RenderAll item={item} index={index} renderType={'Country'} />
    )
  }
  const renderType = ({ item, index }) => {

    return (
      <RenderAll item={item} index={index} renderType={'Type'} />
    )
  }

  const renderStarting = ({ item, index }) => {

    return (
      <RenderAll item={item} index={index} renderType={'Starting'} />
    )
  }

  const handleRender = (data, item) => {
    switch (data) {
      case 'Country':
        cardC(item)
        break;
      case 'Type':
        cardT(item)
        break;
      case 'Starting':
        cardS(item)
        break;
      default:
        return null;

    }
  }

  const RenderAll = ({ item, index, renderType }) => {

    return (
      <TouchableOpacity
        style={[styles.ph20, styles.pv15, { width: '100%', height: 'auto', }]}
        onPress={() => {
          handleRender(renderType, item)
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
    )
  }

  const seperator = () => {

    return (
      <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: '#f2f2f2' }} />
    )
  }

  return (
    <Modal isOpen={props.isOpen}
      style={{ backgroundColor: '#fff' }}
      keyboardTopOffset={Platform.OS == 'ios' ? 22 : 0}
      swipeToClose={false}
      onClosed={props.handleChange}
      backdropOpacity={1}
      backdropColor="transparent"
      position="top">


      <View style={[styles.container, styles.midBgGrey]}>

        <SafeAreaView
          style={{
            height: height,
            width: width,
            flex: 1,
            backgroundColor: 'transparent',
          }}
          edges={['left', 'right', 'top']}>
          <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

          <HeaderModalSubClose headerTitle={'Select' + type} handleChange={props.handleChange} />

          {type === 'Country' ? (

            <FlatList
              data={countryNames}
              style={[styles.iosBar, { flexGrow: 1 }]}
              renderItem={renderCountry}
              keyExtractor={item => item}
            //   ItemSeparatorComponent={seperator}

            />

          ) : type === 'Type' ? (

            <FlatList
              data={cardTypes}
              style={[styles.iosBar, { flexGrow: 1 }]}
              renderItem={renderType}
              keyExtractor={item => item}
            //  ItemSeparatorComponent={seperator}

            />

          ) : type === 'Starting' ? (

            <FlatList
              data={data}
              style={[styles.iosBar, { flexGrow: 1 }]}
              renderItem={renderStarting}
              keyExtractor={item => item}
            //   ItemSeparatorComponent={seperator}

            />

          ) : null}

        </SafeAreaView>
      </View>

    </Modal>
  );
};

export default FormValue;
