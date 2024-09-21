import React, { useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
} from 'react-native';
import Modal from 'react-native-modalbox';
import MyText from '../DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { moderateScale } from 'react-native-size-matters';
import IconM from 'react-native-vector-icons/Ionicons';
import newStyles from '../../screens/Styles/Styles';
import { useTheme } from 'react-native-paper';
const { width, height } = Dimensions.get('screen');


interface Props {
  isOpen: boolean;
  iconName: any;
  text: any;
  subText: any;
  handleChange: any;
}

const PopupTutorial: React.FC<Props> = props => {

  const { iconName, text, subText, handleChange } = props;

  const theme = useTheme()
  const styles = newStyles(theme);

  const bgImg = require('../../../Assets/premiumBG.png');

  return (
    <Modal isOpen={props.isOpen}
      style={[, styles.ph40, { height: Platform.OS == 'ios' ? moderateScale(280) : moderateScale(250), backgroundColor: 'transparent', }]}
      keyboardTopOffset={Platform.OS == 'ios' ? 22 : 0}
      backdropPressToClose={false}
      swipeToClose={false}
      onClosed={props.handleChange}
      backdropOpacity={0.5}
      backdropColor="#000"
      position="center">

      <View style={[styles.container, styles.b30, styles.bgWhite, {}]}>

        <StatusBar translucent barStyle={'dark-content'} backgroundColor="transparent" />

        {theme.dark ? null :
        <Image
          source={bgImg}
          style={{
            width: '100%',
            height: Platform.OS == 'ios' ? moderateScale(280) : moderateScale(250),
            position:'absolute',
            borderRadius:30,
            top:0,
            zIndex:-2,}}
        />
          }

        <View style={[styles.alignCenter, styles.ph15, styles.mt20]}>
          <IconM
            name={iconName}
            size={moderateScale(55)}
            color={'#1cc88a'}
            style={{}} />

          <Text style={[styles.tinyDark, styles.textCenter, styles.mt15, styles.fontSize20]}>{text}</Text>
          <MyText style={[styles.tinyLabel, styles.textCenter, styles.mt15, styles.fontSize12]}>{subText}</MyText>
        </View>

        <View style={[styles.ph15, styles.mt10, styles.lineTopDark, styles.pt10, { width: '100%', position: 'absolute', bottom: moderateScale(15) }]}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleChange}
            style={[styles.alignCenter,]}>
            <Text style={[styles.userLabel, styles.fontSize15, styles.textGreen]}>OK</Text>
          </TouchableOpacity>
        </View>

      </View>

    </Modal>
  );
};


export default PopupTutorial;
