import React, { useState, useEffect, Fragment, useCallback, Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyText from '../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Pending from './pending/Pending';
import Declined from './declined/Declined';


const { width, height } = Dimensions.get('window');
const btnSetected: any = {
  backgroundColor: '#1cc88a',
  color: '#fff',
  zIndex: 0,
  fontFamily: 'Nunito-Regular',
  //padding: '3%',
  borderRadius: 4,
  fontSize: 13,
  elevation: 0,
};

const WithdrawStatus = ({ route, navigation }) => {

  const [pending, setPending] = useState(btnSetected);
  const [declined, setDeclined] = useState({});
  const [screen, setScreen] = useState(0);

  const activeButton = (buttonType: string) => {
    if (buttonType === 'pendingButton') {
      setPending(btnSetected);
      setScreen(0);
      setDeclined({});
    }
    if (buttonType === 'declinedButton') {
      setPending({});
      setDeclined(btnSetected);
      setScreen(1);
    }
  };

  return (

<View style={{width: width, height:'100%', flex: 1, backgroundColor:'#fff'}}>

<SafeAreaView style={{height:'100%', width:'100%', flex:1, backgroundColor:'transparent'}}
edges={['left', 'right', 'top']}>

<StatusBar translucent backgroundColor="transparent" />

<View style={styles.header}>
          <View style={styles.headerUpperArea}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon
                name={'arrow-back-ios'}
                size={20}
                color={'#808080'}
                style={{ marginTop: 10, marginLeft: 15 }}
              />
            </TouchableOpacity>
            <MyText
              style={{
                fontSize: 16, marginTop: 7,
                color: '#343434',
                marginLeft: wp(20),
              }}>
              Withdrawal
            </MyText>
            <MyText></MyText>
          </View>
        </View>

<View style={styles.mainBodyPartOne}>
  <View style={[styles.partOneButtons]}>
    <MyText
      style={[
        styles.partOneButton,
        styles.JoinLeft,
        { ...pending },
        // { marginRight: 20 },
      ]}
      onPress={() => {
        activeButton('pendingButton');
      }}>
      Pending
    </MyText>

    <MyText
      style={[
        styles.partOneButton,
        styles.JoinRight,
        { ...declined },
      ]}
      onPress={() => {
        activeButton('declinedButton');
      }}>
      Declined
    </MyText>
  </View>

  <View style={{ backgroundColor: '#f3f5f9', flex: 1, height: '100%', width:'100%',  }}>

    {screen === 0 ? <Pending /> : <Declined />}

  </View>
</View>

  
</SafeAreaView>
</View>

  )
    }

export default WithdrawStatus;