//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { NAIRA } from '../../../utils/utils';
import MyText from '../DefaultTextComponent/MyText';
import styles1 from './Styles';

const { width, height } = Dimensions.get('screen');

// create a component
const Rates = (props) => {

  return (

    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('SelectGiftCard', {
      //    headerTitle: props.card_name,
        });
      }}
      style={{

      }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

        <View style={{ flexDirection: 'row', }}>
          <Image
            style={{ height: 25, width: 25, marginTop: 2, borderRadius: 30, }}
            source={
              props.card_name == 'Itunes' ?
                require('../../../Assets/CARDS/itunes.png')
                : props.card_name == 'Steam' ?
                  require('../../../Assets/CARDS/steam.png')
                  : props.card_name == 'Google Play' ?
                    require('../../../Assets/CARDS/Googleplay.png')
                    : props.card_name == 'Amazon' ?
                      require('../../../Assets/CARDS/amazon.png')
                      : null
            }
          />

          <MyText
            style={{
              color: '#343434',
              fontFamily: 'Nunito-Regular',
              fontSize: 13,
              marginTop: 5,
              marginLeft: 8,
            }}>
            {props.card_name}
          </MyText>
        </View>

        <View>
          <MyText
            style={{
              color: '#343434',
              fontFamily: 'Nunito-Regular',
              fontSize: 14, marginTop: 5,
              textAlign: 'right',
            }}>
            {NAIRA}{props.card_value * props.rate} <MyText style={{ fontSize: 10, color: '#808080' }}>/ ${props.card_value}</MyText>
          </MyText>
        </View>

      </View>
    </TouchableOpacity>

  )
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default Rates;
