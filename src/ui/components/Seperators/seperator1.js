import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function Separator1() {
  return <View style={styles.separator}></View>;
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#F2F2F2',
    height: 1,
    width: '100%',
  },
});
