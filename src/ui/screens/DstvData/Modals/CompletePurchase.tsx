import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  TextInput,
  Platform,
  StatusBar,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modalbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyText from '../../../components/DefaultTextComponent/MyText';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import newStyles from '../../Styles/Styles';
import HeaderModalSubClose from '../../../components/Header/HeaderModalSubClose';
const { width, height } = Dimensions.get('screen');

interface Props {
  selectPlan: any;
  amount: any;
  isOpen: boolean;
  navigation: any;
  selectDecoder: any;
  handleSubmit: any;
  handleChange: () => void;
  fee: any;
}

const CompletePurchase: React.FC<Props> = props => {
  const theme = useTheme()
  const styles = newStyles(theme);


  const nairaSign = '\u20A6';

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

          <HeaderModalSubClose headerTitle={'Confirm purchase'} handleChange={props.handleChange} />

          <ScrollView>
            <View style={[styles.mt20, styles.ph15]}>

              <View style={[styles.formWhite, styles.shadow, styles.b30, styles.pb15, styles.bgWhite, styles.ph5, styles.pt10, styles.mb5]}>
                <View style={[styles.ph10]}>

                  <MyText style={[styles.textGrey, styles.fontRegular, styles.fontSize11, styles.mt15]}>You'll pay</MyText>
                  <Text style={[styles.lineBottomLight, styles.textDark, styles.fontSize14, styles.mt5, styles.pb15, styles.fontRegular,]}>{nairaSign}{props.amount + props.fee}</Text>

                  <MyText style={[styles.tinyLabel, styles.fontSize11, styles.mt15]}>Fee taken</MyText>
                  <Text style={[styles.lineBottomLight, styles.textDark, styles.fontSize14, styles.mt5, styles.pb15, styles.fontRegular,]}>{nairaSign}{props.fee}</Text>


                  <MyText style={[styles.textGrey, styles.fontRegular, styles.fontSize11, styles.mt15]}>Decoder number</MyText>
                  <Text style={[styles.lineBottomLight, styles.textDark, styles.fontSize14, styles.mt5, styles.pb15, styles.fontRegular,]}>{props.selectDecoder}</Text>

                  <MyText style={[styles.tinyLabel, styles.fontSize11, styles.mt15]}>Plan</MyText>
                  <Text style={[styles.userLabel, styles.fontSize14, styles.mt5, styles.mb10]}>{props.selectPlan}</Text>

                </View>

              </View>

            </View>

          </ScrollView>

          <View style={[styles.ph15, styles.pt15, styles.bottomBar]}>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={props.handleSubmit}
              style={[styles.submitButton, styles.bgGreen,]}>
              <MyText style={[styles.buttonLabel,]}>Confirm</MyText>
            </TouchableOpacity>

          </View>
        </SafeAreaView>

      </View>
    </Modal>

  )
};


export default CompletePurchase;
