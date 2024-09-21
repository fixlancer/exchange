import React, { useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import Modal from 'react-native-modalbox';
import MyText from '../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { onCancelDeleteCard } from '../../../redux/redux/actions/cardAction';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
import newStyles from '../Styles/Styles';
import { useTheme } from 'react-native-paper';
const { width, height } = Dimensions.get('screen');


interface Props {
  isVisible: boolean;
  onPressAction: any;
  handleChange: any;
  setisAllow: any;



}
var selec = [];
const CancelModal: React.FC<Props> = props => {

  const theme = useTheme()
  const styles = newStyles(theme);

  // var { giftcard_id } = props;

  const dispatch: any = useDispatch();


  const toggle = () => {

    props.setisAllow(false);
    // dispatch(
    //   onCancelDeleteCard({
    //     selected: giftcard_id
    //   })
    // )


    // props.setgiftcardid([]);
    props.handleChange();
    props.onPressAction();
  }


  return (
    <Modal isOpen={props.isVisible}
      style={{ height: Platform.OS == 'ios' ? moderateScale(230) : moderateScale(200), backgroundColor: 'transparent', }}
      keyboardTopOffset={Platform.OS == 'ios' ? 22 : 0}
      backdropPressToClose={true}
      swipeToClose={true}
      onClosed={props.handleChange}
      backdropOpacity={0.5}
      backdropColor="#000"
      position="bottom">

      <View style={[styles.container, styles.roundBorder, styles.ph15, styles.bgGrey, {}]}>

      <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

        <View style={[styles.modalLine, styles.mt15, styles.mb10, styles.alignCenter]} />

        <MyText style={[styles.tinyDark, styles.textCenter, styles.mt15, styles.fontSize13]}>All cards will be discarded if you cancel</MyText>


        <View style={[styles.ph15, styles.mt15, styles.pt15]}>
          <View style={[styles.RowB, styles.alignCenter]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => toggle()}
              style={[styles.submitButton, styles.borderWidthLight, styles.mr10, styles.bgWhite, { width: '45%' }]}>
              <MyText style={[styles.buttonLabel, styles.textDark,]}>Discard</MyText>

            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={props.handleChange}
              style={[styles.submitButton, styles.bgGreen, { width: '45%' }]}>
              <MyText style={[styles.buttonLabel,]}>Stay</MyText>
            </TouchableOpacity>
          </View>

        </View>

      </View>

    </Modal>
  );
};


export default CancelModal;
