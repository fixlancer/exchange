import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Style from './Style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CloseIcon from 'react-native-vector-icons/Ionicons';
import MyText from '../../components/DefaultTextComponent/MyText';
import {useToast} from 'native-base';

const {width, height} = Dimensions.get('window');

const SellBitcoin = ({navigation, route}) => {
  const [isProcessModalVisible, setProcessModalVisible] = useState(false);
  const [isDelineModalVisible, setdelineModalVisible] = useState(false);
  const [copiedText, setCopiedText] = useState('');
  const toast = useToast();

  const { amount,  rate, tradeName } = route.params;
const [wallet, setWallet] = useState('');
const [barcode, setBarcode] = useState(require('../../../Assets/ICONS/barCode.png'));

//THIS IS WHERE YOU GET THE WALLET AND BARCODE
useEffect(() => {

  if(tradeName === 'Bitcoin'){ // You check if the user has it stored, if no you get it from the API then store it
    setWallet('1GR54YDVDHG9bd78GDBfg53TS5F89X');
    setBarcode(require('../../../Assets/ICONS/barCode.png'));

} else if(tradeName === 'USDT') { //You get these data from admin setttingd
  setWallet('xtr940bgHSbxk9bd78GDBfgB194Ng7bVF89cvsbX');
  setBarcode(require('../../../Assets/ICONS/barCode.png'));

}

},  []);



  const copyToClipboard = () => {
    Clipboard.setString(wallet);
    toast.show({
      title: 'Wallet address copied',
      duration: 2000,
    });
  };

  const toggleDeclineModal = () => {
    setdelineModalVisible(!isDelineModalVisible);
  };

  const toggleProcessModal = () => {
    setProcessModalVisible(!isProcessModalVisible);
  };

  return (
    <View style={{height: height, width: width, backgroundColor:'#F0F3FB', flex: 1}}>
      <SafeAreaView
        style={{
          flex: 1,
          height: '100%',
          width: width,
          backgroundColor: '#F0F3FB',
        }}>
      <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
      
      <View style={Style.header}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={{marginLeft: 15, marginTop: 5}}
          onPress={() => navigation.goBack(null)}>
          <Icon
            name={'arrow-back-ios'}
            size={20}
            color={'#343434'}
            style={{marginTop: 10}}></Icon>
        </TouchableOpacity>
        <MyText style={{color:'#343434',marginRight:15,marginTop:15,fontSize:13,}}>Estimated Value: {'\u20A6'}{amount * rate}</MyText>
      </View>

      <ScrollView>
        <View
          style={{
            width: width,marginTop:10,
            backgroundColor: '#F0F3FB',
          }}>


<MyText style={{ color: '#343434', textAlign:'center', paddingTop:10, fontSize: 12,}}> 
Send
</MyText>          
<MyText style={{ color: '#000', fontWeight:'bold', textAlign:'center', paddingVertical:2, fontSize: 25,}}>${amount}</MyText>

<MyText style={{ color: '#343434', textAlign:'center', paddingBottom:20, fontSize: 12,}}> 
to the wallet address below
</MyText>
          <View
            style={[
              {
                marginBottom: 6,
                marginTop: 10,
                width:'90%',
                alignSelf: 'center',
                marginHorizontal:15,
                paddingVertical:20,
                backgroundColor: '#fff',
                paddingHorizontal: 14,
                borderRadius:15,
                elevation: 1,
              },
            ]}>
              <MyText style={[{color: '#808080', alignSelf: 'center',fontSize: 9, marginBottom: 10}]}>
                SCAN BARCODE
              </MyText>
            <Image
              source={barcode}
              style={{
                width: 110,
                height: 110,
                alignSelf: 'center',
              }}
            />
            <View style={{marginTop: 20,marginHorizontal:3, backgroundColor:'#f9f9f9', justifyContent:'center', borderRadius:6, padding:10, }}>
            <View style={{justifyContent:'center', paddingHorizontal:10, width:'100%'}}>
            
            <TouchableOpacity
            activeOpacity={0.7}
                onPress={() => {
                //  copyToClipboard();
                }}
                style={{}}>

              <MyText style={[{color: '#808080', alignSelf: 'center',fontSize: 10, marginBottom: 5}]}>
                {tradeName} Address
              </MyText>

              <View style={{flexDirection:'row', justifyContent:'center'}}>
              <MyText style={[{color: '#343434', textAlign: 'center',fontSize: 13, marginBottom:6}]}>
                {wallet}
              </MyText>

                  <Icon
                    name={'content-copy'}
                    size={15}
                    color={'#808080'}
                    style={{marginLeft:15}}/>
              </View>
              </TouchableOpacity>
            
</View>
</View>

<View style={{marginTop: 20}}>


<View style={Style.infoRow}>
              <Icon
                name={'adjust'}
                size={15}
                color={'#f27415'}
                style={{marginRight: 5}}></Icon>
                {tradeName === 'Bitcoin' ? (
              <MyText style={{fontSize: 12, marginTop:0, color: '#808080'}}>
 1 Network confirmation required
              </MyText>
  ) : (
    <MyText style={{fontSize: 12, marginTop:0, color: '#808080'}}>
    Tron (TRC20) Network
                 </MyText>   
  )}
                </View>

              <View style={Style.infoRow}>
            <Icon
                    name={'adjust'}
                    size={15}
                    color={'#f27415'}
                    style={{
                      marginRight: 5,
                    }}></Icon>
            
            <MyText style={{fontSize: 12, marginTop:0,color:'#808080'}}>
              Send only {tradeName} to the address above {tradeName === 'Bitcoin' ? ( 'with priority fee' ) : null }
            </MyText>
          </View>

          <View style={Style.infoRow}>
            <Icon
                    name={'adjust'}
                    size={15}
                    color={'#f27415'}
                    style={{
                      marginRight: 5,
                    }}></Icon>
            
            <MyText style={{fontSize: 12, marginTop:0,color:'#808080'}}>
            This wallet address is only valid for this transaction
            </MyText>
          </View>

            </View>
          </View>
      
      
          <View style={{marginHorizontal:20,}}>
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.reset({
            index: 1,
            routes: [{name: 'BtcTransactions'}, {name: 'TradeSuccesfullScreen2'}],
          });
        }}
          style={[Style.sendBtn, {alignContent:'center', marginTop:10, }]}>
          <MyText
            style={Style.textbtn}>
            I've sent the {tradeName}
          </MyText>
        </TouchableOpacity>
      </View>

        </View>

      </ScrollView>
      <Image
        style={{
          alignSelf: 'center',
          marginTop: 0,
          width: 80,
          height:30,
        }}
        source={require('../../../Assets/fejoraLogoNew.png')}
      />
      </SafeAreaView>
      
    </View>
  );
};

export default SellBitcoin;
