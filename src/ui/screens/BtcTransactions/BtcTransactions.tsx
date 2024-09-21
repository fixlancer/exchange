import { useToast } from 'native-base';
import React, { useState, useEffect } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
  ScrollView,
  StatusBar,
  FlatList,
  RefreshControl
} from 'react-native';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyText from '../../components/DefaultTextComponent/MyText';
import { ActivityIndicator } from 'react-native-paper';
import styles from './Styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icons from 'react-native-vector-icons/Ionicons';

import { getTransactionByID } from '../../../redux/redux/actions/transactionAction';
import { RootState } from '../../../redux/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { NAIRA } from '../../../utils/utils';
import { getTrade } from '../../../redux/redux/actions/tradeAction';
import moment from 'moment';
import { Row } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserbyId } from '../../../redux/redux/actions/userAction';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import CryptoModal from './CryptoModal';
const { width, height } = Dimensions.get('screen');

const Item = ({
  item,
  onPress,
  backgroundColor,
  textColor,
}) => (

  <View style={styles.mainBody}>
<TouchableOpacity activeOpacity={0.9} onPress={onPress}>
    <View style={styles.inlineCardPortion}>


      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

        <View>
          <View style={{ flexDirection: 'row', }}>
            <View style={styles.iStorage}>
              <Icon
                name={'bar-chart'}
                size={19}
                color={'#92b7cb'}
                style={{ alignSelf: 'center' }}></Icon>
            </View>

            <View>
              <MyText style={[{ color: '#808080', fontSize: 10 }]}>{moment(item.transaction_date).format('ll')}{", "}{item.transaction_time}</MyText>

              <MyText selectable={true}
                style={{
                  color: '#343434',
                  fontSize: 11,
                  marginVertical: 3,
                }}>
                1YFGDBche56GDJFo9FGS
              </MyText>
            </View>
          </View>
        </View>

        <View>

          {item.transaction_type === 'Pending' ? ( //Change here to Trasanction status
            <Icon
              name={'schedule'}
              size={18}
              color={'#f27415'}
              style={{ marginLeft: 10, marginTop: 3 }}></Icon>

          ) : null}
          {item.transaction_type === 'Completed' ? (
            <Icon
              name={'check-circle'}
              size={18}
              color={'#1cc88a'}
              style={{ marginLeft: 10, marginTop: 3 }}></Icon>
          ): null }
          {item.transaction_type === 'Declined' ? (
              <Icon
              name={'cancel'}
              size={18}
              color={'#1cc88a'}
              style={{ marginLeft: 10, marginTop: 3 }}></Icon>
          ): null }

        </View>
      </View>

      <View style={styles.amountPortion}>

        <View style={styles.Row}>
          <MyText style={styles.mdFontGreyColor}>
            Amount:
          </MyText>
          <MyText style={styles.mdFontBlackColor}>
            ${item.transaction_amount}
          </MyText>
        </View>

        <View style={styles.Row}>
          <MyText style={styles.mdFontGreyColor}>
            Value:
          </MyText>
          <MyText style={[styles.mdFontBlackColor, { color: '#343434' }]}>
            {NAIRA}{item.wallet_amount}
          </MyText>
        </View>


        <View style={[styles.Row, {}]}>
          <MyText style={{fontSize:12,color:'#808080'}}>View transaction</MyText>
        <Icon
              name={'arrow-forward-ios'}
              size={12}
              color={'#808080'}
              style={{ marginTop: 5, }}></Icon>
        </View>
      </View>

    </View>
    </TouchableOpacity>
  </View>

);


const BtcModal = ({ navigation, route }) => {

  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch: any = useDispatch();
  const { transaction_user } = useSelector((state: RootState) => state.getTransaction);
  const [username, setUsername] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isRefreshing, setisRefreshing] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const toast = useToast();
  const [url, setURL] = useState('');
  const [cryptoindex, setCryptoindex] = useState(0);
  const [isCryptoVisible, setCryptoVisible] = useState(false);
  // const [usd_sum, setusdsum] = useState(0);


  console.log("TRANSACTIonnsss", transaction_user);

  useEffect(() => {

    async function update() {
      setisLoading(true);
      const id = await AsyncStorage.getItem('id');
      dispatch(
        getTrade(id)
      )
    }
      update();
  }, [])


  useEffect(() => {

    async function update() {
      const id = await AsyncStorage.getItem('id');

      setisLoading(true);
      dispatch(
        getTransactionByID(id)
      )
        .then(res => {
          setisLoading(false);
        })

      dispatch(getUserbyId(id)).then(res => { if (res) setUsername(res.username) })
        .catch(err => {
          setisLoading(false);
          toast.show({
            title: 'Unable to fetch data. Check your Internet connection',
            duration: 3500
          });
        });

    }


      update();



  }, [])


  const handleRefresh = () => {

    async function handle() {
      const id = await AsyncStorage.getItem('id');

      setisLoading(true);
      dispatch(
        getTransactionByID(id)
      )
        .then(res => {
          setisLoading(false);
        })

      dispatch(getUserbyId(id)).then(res => { if (res) setUsername(res.username) })
        .catch(err => {
          setisLoading(false);
          toast.show({
            title: 'Unable to fetch data. Check your Internet connection',
            duration: 3500
          });
        });

    }

      handle();

  };


  const emptyMessage = ({ item }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MyText style={{ fontSize: 13, textAlign: 'center', marginVertical: 20, color: '#808080' }}>
          No transactions yet
        </MyText>
      </View>
    )
  }

  const renderItem = ({ item, index }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#ffffff';
    const color = item.id === selectedId ? 'white' : '#343434';
    // console.log("INDEX", index);
    return (
      <Item
        item={item}
        onPress={() => toggleCrypto(index)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
      
    );
  };


  const toggleCrypto = (index) => {

    setCryptoindex(index);
    setCryptoVisible(true);
  };

  const handleCrypto = () => {
    setCryptoVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
    setStartDate('');
    setEndDate('');
  };


  const toggleModal = () => {

    setModalVisible(false);
    setStartDate('');
    setEndDate('');
  };


  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleConfirmStartDate = date => {
    // console.warn('A date has been picked: ', date);
    const d = moment(date).format('DD/MM/YYYY');
    setStartDate(d);
    hideStartDatePicker();
  };

  const handleConfirmEndDate = date => {
    // console.warn('A date has been picked: ', date);
    const d = moment(date).format('DD/MM/YYYY');
    setEndDate(d);
    hideEndDatePicker();
  };

//---------------------PDF processing---------------------------------------
  const formatstartDate = () => {
    const [startday, startmonth, startyear] = startDate.split('/');
    let d = new Date(startyear, startmonth - 1, startday);
    return (moment(d).format('ll'));
  }

  const formatendDate = () => {
    const [endday, endmonth, endyear] = endDate.split('/');
    let d = new Date(endyear, endmonth - 1, endday);
    return (moment(d).format('ll'));
  }

  const printDate = () => {
    let today_date = new Date();
    const dateOptions = {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
      timeZone: 'Africa/Lagos',
    }
    const t_date = today_date.toLocaleString('en-PK', dateOptions);
    return (moment(t_date).format('ll'));

  }

  const filterRecords = () => {
    const [startday, startmonth, startyear] = startDate.split('/');
    let s = new Date(startyear, startmonth - 1, startday);
    const s_date = moment(s).format('ll');

    const [endday, endmonth, endyear] = endDate.split('/');
    let e = new Date(endyear, endmonth - 1, endday);
    const e_date = moment(e).format('ll');

    const filtered = transaction_user.filter(item => {

      return (moment(item.transaction_date).format('ll') >= s_date && moment(item.transaction_date).format('ll') <= e_date);
    })

    createPDF(filtered);

  }



  const pdfHTML = (usd_sum, naira_value, debit_naira, filtered) => {
    // const array = new Array(10).fill('Row');

    var table = '';

    for (let i in filtered) {

      filtered[i].transaction_type == 'Credit' ?

        table = table + `
      
        <tr>
        <td>${filtered[i].transaction_date} </td>
        <td>${filtered[i].trade_name} </td>
        <td>+ $${filtered[i].transaction_amount}(₦${filtered[i].wallet_amount}) </td>
        </tr>
        `
        :
        table = table + `
      
        <tr>
        <td>${filtered[i].transaction_date} </td>
        <td>${filtered[i].trade_name} </td>
        <td>- ₦${filtered[i].wallet_amount}</td>
        </tr>
        `
    }

    const html =
      ` 
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            table {
              border-collapse: collapse;
            }
      
            th {}
      
            th,
            td {
              width: 150px;
              text-align: center;
              border: 1px solid black;
              padding: 5px
            }
      
            .tab {
              display: inline-block;
              margin-left: 250px;
            }
      
            .tab1 {
              display: inline-block;
              margin-left: 295px;
            }
      
            .tab2 {
              display: inline-block;
              margin-left: 240px;
            }
      
            .tab3 {
              display: inline-block;
              margin-left: 260px;
            }
      
            .tab4 {
              display: inline-block;
              margin-left: 265px;
            }
          </style>
          <center>
            <img src="https://res.cloudinary.com/fejora/image/upload/v1665938983/fejoraLogo_oasld1.png" height=60>
          </center>
        </head>
        <body>
          <br>
          <p>Statement Period <span class="tab"></span>${formatstartDate()} - ${formatendDate()} </p>
          <h3>----------------------------------------------------------</h3>
          <p>Print Date <span class="tab1"></span>${printDate()} </p>
          <h3>----------------------------------------------------------</h3>
          <p>Total Credit (USD) <span class="tab2"></span>$${usd_sum} </p>
          <h3>----------------------------------------------------------</h3>
          <p>Total Credit (₦) <span class="tab3"></span>₦${naira_value} </p>
          <h3>----------------------------------------------------------</h3>
          <p>Total Debit (₦) <span class="tab4"></span>₦${debit_naira} </p>
          <br>
          <center>
            <table>
              <tr>
                <td><b> Trans.Date </b> </td>
                <td><b> Trade Type </b> </td>
                <td><b>  Amount  </b> </td>
              </tr> 
              ${table}
            </table>
          </center>
        </body>
      </html>
`
    return html;
  }

  async function createPDF(filtered) { //transaction PDF  (above html is used for the pdf design)
    if (startDate == '' || endDate == '') {
      toast.show({
        title: 'Please enter the dates!',
        duration: 2000,
      });
    }
    else if (filtered.length == 0) {
      toast.show({
        title: 'No records found!',
        duration: 2000,
      });
    }

    else {
      var credit_usdsum = 0;
      var credit_naira = 0;
      var debit_naira = 0;

      filtered.forEach(rec => {

        rec.transaction_type == 'Credit' ? (
          credit_usdsum = credit_usdsum + rec.transaction_amount,
          credit_naira = credit_naira + rec.wallet_amount) : null;

        rec.transaction_type == 'Debit' ? (debit_naira = debit_naira + rec.wallet_amount) : null;

      });

      let options = {
        html: pdfHTML(credit_usdsum, credit_naira, debit_naira, filtered),
        fileName: 'test',
        directory: 'Documents',
        height: 800,
      };
      let file = await RNHTMLtoPDF.convert(options)
      FileViewer.open(file.filePath, { showOpenWithDialog: true })
        .then((res) => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });

      console.log("FILTEREDD", filtered);


    }
  }

//---------------------PDF processing---------------------------------------


  return (

    <View style={{ height: height, width: width, flex: 1 }}>
      <SafeAreaView
        style={{
          height: height,
          width: width,
          flex: 1,
          backgroundColor: '#fff',
        }}
        edges={['left', 'right', 'top']}>
        <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
        <View
          style={{
            width: width,
            height: 70,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              display: 'flex',
              width: '95%',
              marginTop: Platform.OS == 'ios' ? 15 : 20,
              flexDirection: 'row',
              marginLeft: 'auto',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
              <Icon
                name={'arrow-back-ios'}
                size={20}
                color={'#343434'}
                style={{ marginRight: 15, marginTop: 3, }}></Icon>
            </TouchableOpacity>
            <MyText
              style={{
                fontSize: 16,
                fontWeight: '400', marginLeft: -18,
                color: '#343434',
                marginBottom: 5,
              }}>
              Crypto Transactions
            </MyText>
            <TouchableOpacity onPress={openModal}>
              <Icon
                name={'filter-alt'}
                size={20}
                color={'#343434'}
                style={{ marginRight: 15, marginTop: 2, }}></Icon>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mainTopCard}>
          <View style={styles.topCard}>
            <MyText style={{ fontSize: 9, color: '#808080' }}>Pending</MyText>
            <MyText style={{ fontSize: 16, marginTop: 5, color: '#343434' }}>$105000</MyText>
          </View>

          <View style={styles.topCard}>
            <MyText style={{ fontSize: 9, color: '#808080' }}>Completed</MyText>
            <MyText style={{ fontSize: 16, marginTop: 5, color: '#1cc88a' }}>$105000</MyText>
          </View>
        </View>


  {/*}      {isLoading && transaction_user === null ? (
          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#f3f5f9', alignItems: 'center', }}>
            <View style={styles.loader}>
              <ActivityIndicator color={'#fff'} />
            </View>
          </View>
        ) : (
        */}

          <View style={styles.cont}>
            <FlatList
              refreshControl={
                <RefreshControl
                  tintColor={'#1CC88A'}
                  refreshing={isRefreshing}
                  onRefresh={handleRefresh}
                />
              }
              style={{ paddingBottom: Platform.OS === 'ios' ? 30 : 0, paddingHorizontal: 7 }}
              data={transaction_user}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              extraData={selectedId}
              ListEmptyComponent={emptyMessage}

            />
          </View>
      {/*}  )} */}


{transaction_user && transaction_user.length > 0 ? (
        <CryptoModal
          isOpen={isCryptoVisible}
          handleChange={handleCrypto}
          key={transaction_user[cryptoindex].tradeid}
          id={transaction_user[cryptoindex].tradeid}
          trade_name={transaction_user[cryptoindex].trade_name}
          username={username}
          amount={transaction_user[cryptoindex].transaction_amount}
          wallet={'1YFGDBche56GDJFo9FGS'}
          value={transaction_user[cryptoindex].wallet_amount}
          images={'images'}
          date={transaction_user[cryptoindex].transaction_date}
          time={transaction_user[cryptoindex].transaction_time}

        />

        ) : null }


        <Modal isOpen={isModalVisible}
          style={{ height: '50%' }}
          swipeArea={400}
          onClosed={toggleModal}
          position="bottom">

          <View style={styles.header}>
            <Icon
              name={'maximize'}
              size={20}
              color={'#808080'}
              style={{ marginTop: 5 }}></Icon>
            <MyText
              style={{
                fontSize: 15, color: '#343434',
                textAlign: 'center',
              }}>
              Generate Statement
            </MyText>
          </View>

          <View
            style={{
              paddingTop: 25,
              paddingHorizontal: 20, width: '100%', height: '100%',
              backgroundColor: '#ffffff',
            }}>

            <View style={styles.drop}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.textDrop}
                onPress={showStartDatePicker}>
                <TextInput
                  style={styles.text}
                  underlineColorAndroid="transparent"
                  textAlign={'left'}
                  placeholder="Start Date"
                  numberOfLines={1}
                  multiline={true}
                  editable={false}
                  value={startDate}

                />

                <Icons
                  style={{ marginTop: 10, marginRight: 10 }}
                  name={'ios-calendar-sharp'}
                  size={20}
                  color={'#808080'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.drop}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.textDrop}
                onPress={showEndDatePicker}>
                <TextInput
                  style={styles.text}
                  underlineColorAndroid="transparent"
                  textAlign={'left'}
                  placeholder="End Date"
                  numberOfLines={1}
                  multiline={true}
                  editable={false}
                  value={endDate}
                />
                <Icons
                  style={{ marginTop: 10, marginRight: 10 }}
                  name={'ios-calendar-sharp'}
                  size={20}
                  color={'#808080'}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                toggleModal();
                filterRecords();
              }
              }
              style={[styles.sendBtn, {alignContent:'center', marginTop:10, }]}>
          <MyText
            style={styles.textbtn}>Generate</MyText>
            </TouchableOpacity>

          </View>

          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmStartDate}
            onCancel={hideStartDatePicker}
          />
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmEndDate}
            onCancel={hideEndDatePicker}
          />



        </Modal>

      </SafeAreaView>
    </View>
  )
}

export default BtcModal;
