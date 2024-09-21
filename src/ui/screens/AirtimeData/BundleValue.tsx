import React, { useState } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyText from '../../components/DefaultTextComponent/MyText';
import { useTheme } from 'react-native-paper';
import HeaderModalSubClose from '../../components/Header/HeaderModalSubClose';
import { moderateScale } from 'react-native-size-matters';
import newStyles from '../Styles/Styles';

const { width, height } = Dimensions.get('screen');

interface Props {
  isOpen: boolean;
  handleChange: () => void;
  data: any;
  bundle: any;
  amount: any;

}

const BundleV: React.FC<Props> = props => {

  const { data, bundle, amount } = props;

  const theme = useTheme()
  const styles = newStyles(theme);

  return (
    <Modal isOpen={props.isOpen}
      style={{}}
      onClosed={props.handleChange}
      swipeArea={400}
      keyboardTopOffset={Platform.OS == 'ios' ? 22 : 0}
      backdropOpacity={1}
      backdropColor="transparent"
      position="top">

      <View style={[styles.container, styles.bgGrey]}>

        <SafeAreaView
          style={{
            height: height,
            width: width,
            flex: 1,
            backgroundColor: 'transparent',
          }}
          edges={['left', 'right', 'top']}>
          <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

          <HeaderModalSubClose headerTitle={'Select plan'} handleChange={props.handleChange} />


          <ScrollView>
            <TouchableOpacity activeOpacity={1}>

              {data && data.map((item, index) => (
                <View key={index}>

                  <TouchableOpacity
                    style={[styles.ph20, styles.pv15, { width: '100%', height: 'auto', }]}
                    onPress={() => {
                      bundle(item.biller_name);
                      amount(item.amount);
                      props.handleChange()
                    }}>
                    <View style={[styles.RowB]}>
                      <MyText style={[styles.userLabel, styles.fontSize13]}>
                        {item.biller_name} - ( {'\u20A6'}{item.amount} )</MyText>
                      <Icon
                        name={'arrow-forward-ios'}
                        size={moderateScale(10)}
                        color={'#808080'}
                        style={{ marginTop: 3 }}></Icon>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}

            </TouchableOpacity>
          </ScrollView>

        </SafeAreaView>
        </View>

    </Modal>
  );
};

export default BundleV;
