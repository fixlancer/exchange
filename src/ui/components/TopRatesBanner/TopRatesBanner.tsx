//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native';
import MyText from '../DefaultTextComponent/MyText';
import Rates from './Rates';

const { width, height } = Dimensions.get('screen');

const TopRatesBanner = ({ navigation, toprates }) => {
  console.log("toprates",toprates);
  
  return (
    <View style={styles.container}>

      {toprates && toprates.length? (
        toprates.map((item:any, i:any) => {
          return (
            <View
              style={styles.ratesCont} key={i+1000} >

              <Rates
                key={i + 1}
                card_name={item.cardName}
                card_value={item.cardValue}
                rate={item.cardRate}
                navigation={navigation}
              />
            </View>
          )
        })
      ) : (

        <View style={{ flex: 1, width: '100%', paddingHorizontal: 0, }} key={111}>
          <View style={styles.emptyCont}>
            <MyText style={{ fontSize: 13, color: '#343434', textAlign: 'center', marginVertical: 0 }}>
              No Rates available</MyText>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 1,
    paddingHorizontal: 7,
    height: 'auto',
    borderTopColor: '#f2f2f2',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#f3f5f9',
  },
  ratesCont: {
    height: 40,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 2,
    paddingHorizontal: 9,
    paddingVertical: 5,
    elevation: 0,
  },
  emptyCont: {
    height: 'auto',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 2,
    paddingHorizontal: 9,
    paddingVertical: 10,
    elevation: 0,
  },
});


export default TopRatesBanner;
