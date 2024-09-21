import React, { useContext, useEffect, useMemo, useState, useRef } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
  ScrollView,
  Button,
  Alert,
  FlatList,
  Platform,
  StatusBar,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './Style';
import newStyles from '../Styles/Styles';

import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import Modal from 'react-native-modal';
import Modal from 'react-native-modalbox';
import MyText from '../../components/DefaultTextComponent/MyText';
import NavBar from '../../components/Navbars/Navbar';
import { NAIRA } from '../../../utils/utils';
import WithModal from './WithModal';
import AirModal from './AirModal';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import moment from 'moment';
import CustomToast from '../../components/CustomToast/CustomToast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Empty from '../../components/Empty/Index';
import FetchError from '../../components/FetchError/Index';
import { getCompletedTransactionsHistory } from '../../../redux/redux/actions/userAction';
import HeaderBack from '../../components/Header/HeaderBack';
import { moderateScale } from 'react-native-size-matters';
import OngoingTrades from '../Trades/OngoingTrades';
import CompletedTrades from '../Trades/CompletedTrades';
import { useTheme } from 'react-native-paper';
const { width, height } = Dimensions.get('screen');

const Item = ({
  item,
  index,
  onPress,
  backgroundColor,
  textColor,
  route,
  navigation,
}) => {
  const formattedDateTime = (createdAt) => {
    const dateObj = new Date(createdAt);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return `${date}, ${time}`;
  }

  return (
    <View key={index} style={[styles.item]} >
      {/* <StatusBar hidden /> */}
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        <View
          style={{
            display: 'flex',
            marginHorizontal: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row' }}>
            {item?.transactionType === 'Debit' ? (
              <View style={styles.stat}>
                <Icon
                  name={'north-west'}
                  size={12}
                  color={'#ff0000'}
                  style={{ marginTop: 0, marginRight: 0 }}></Icon>
              </View>
            ) : (
              <View style={styles.stat}>

                <Icon
                  name={'south-east'}
                  size={12}
                  color={'#1cc88a'}
                  style={{ marginTop: 0, marginRight: 0 }}></Icon>
              </View>
            )}


            <View>
              {item?.transactionFor === 'DSTV' || item?.transactionFor === 'GOTV' ? (
                <MyText style={[styles.title, textColor]}>{item?.transactionFor} Subscription</MyText>
              ) : (
                <MyText style={[styles.title, textColor]}>{item?.transactionFor}</MyText>
              )}
              <MyText style={[styles.date, textColor]}>{formattedDateTime(item?.createdAt)}</MyText>
            </View>
          </View>

          <View>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <MyText
                  style={[
                    styles.amount,
                    item?.transactionType === 'Debit' && {
                      fontFamily: 'Nunito-Regular',
                      color: '#343434',
                      fontSize: 13,
                    },
                  ]}>

                  {item?.transactionType === 'Credit' ? (
                    <>
                      + ${item?.tradeDetails[0]?.totalCardValue}
                    </>
                  ) : (
                    <>
                      - {NAIRA}{item?.transactionAmount}
                    </>
                  )}
                </MyText>
                {/*}
              <MyText
                style={[
                  styles.totalAmount,
                  textColor,
                  { fontFamily: 'Nunito-Regular' },
                ]}>
                {item.transaction_type === 'Credit' && '' + NAIRA + item.wallet_amount}
              </MyText>
              */}
              </View>

              {item?.transactionFor === 'Withdrawal' || item?.transactionFor === 'Trade' || item?.transactionFor === 'Cash bonus won' || item?.transactionFor === 'Airtime bonus won' ? (
                <Icon
                  name={'arrow-forward-ios'}
                  size={15}
                  color={'#808080'}
                  style={{ marginTop: 5, marginLeft: 15 }}></Icon>
              ) : (

                <Icon
                  name={'arrow-forward-ios'}
                  size={15}
                  color={'transparent'}
                  style={{ marginTop: 5, marginLeft: 15 }}></Icon>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.hr2}></View>
    </View>
  );
}

const TransactionHistory = ({ navigation, route }) => {

  const { tab } = route.params;

  const theme = useTheme()
  const styles2 = newStyles(theme);

  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isBoxVisible, setBoxVisible] = useState(false);
  const [isAirVisible, setAirVisible] = useState(false);
  const [username, setUsername] = useState(null);
  const [withdrawindex, setwithDrawalindex] = useState(0);
  const [airindex, setAirindex] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isRefreshing, setisRefreshing] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isMiddleLoading, setisMiddleLoading] = useState(true);
  const [total_withdrawals, settotalwithdrawals] = useState(0);
  const [total_credits, settotalcredits] = useState(0);
  const [transactions, settransactions] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);



  const [mainCat, setMainCat] = useState(tab)
  const [subCat, setSubCat] = useState('Crypto');
  const [cat, setCat] = useState('Crypto');

  useEffect(() => {
    handleTabs();
  }, [])

  const handleTabs = () => {
    switch (mainCat) {
      case 'Deposit':
        setSubCat('Crypto');
        break;
      case 'Withdrawals':
        setSubCat('Pending');
        setCat('Crypto');
        break;
      case 'Giftcard':
        setSubCat('Pending');
      default:
        return null;
    }
  }


  /* CUSTOM TOAST ========== */

  const [toastType, setToastType] = useState('success');
  const [toastMsg, setToastMsg] = useState('');
  const [show, setShow] = useState(0);

  const slideAnim = useRef(new Animated.Value(120)).current;

  const animateToast = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: 120,
        duration: 200,
        useNativeDriver: true,
      }).start();
      setShow(0);
    }, 3500);
  };

  const showToast = (type, msg) => {
    setToastType(type);
    setToastMsg(msg);
    setShow(1);
    animateToast();
  };

  /* CUSTOM TOAST ENDS ============= */


  useEffect(() => {
    // if (transactions) {
    //   var withdrawal_sum = 0;
    //   var credit_sum = 0;

    //   transactions.forEach(element => {
    //     if (element.transaction_type == 'Credit')
    //       credit_sum += element.wallet_amount;

    //     if (element.transaction_type == 'Debit')
    //       withdrawal_sum += element.transaction_amount;

    //   });
    //   settotalwithdrawals(withdrawal_sum);
    //   settotalcredits(credit_sum);
    // }
  }, [transactions])


  useEffect(() => {
    // async function update() {
    //   setisLoading(true);
    //   const id = await AsyncStorage.getItem('id');
    //   dispatch(
    //     getTrade(id)
    //   ).then(res => {

    //     setTimeout(() => {
    //       setisLoading(false);
    //     }, 500);

    //   })
    //     .catch(err => {
    //       setisLoading(false);
    //       showToast('Warning', 'Unable to fetch transactions');
    //     });
    // }

    // update();


  }, [])

  //get user name
  useEffect(() => {
    // async function getUsername() {
    //   const id = await AsyncStorage.getItem('id');
    //   dispatch(getUserbyId(id)).then(res => { if (res) setUsername(res.username) })
    //     .catch(err => {
    //       setisLoading(false);
    //       showToast('Warning', 'An error occured with your request');

    //     });
    // }
    // getUsername();
  }, [transactions])



  const toggleAir = (index) => {

    setAirindex(index);
    setAirVisible(true);
  };

  const handleAir = () => {
    setAirVisible(false);
  };


  const toggleM = (index) => {

    setwithDrawalindex(index);
    setBoxVisible(true);
  };

  const handleM = () => {
    setBoxVisible(false);
  };



  const openModal = () => {
    setModalVisible2(true);
    setStartDate('');
    setEndDate('');
  };


  const toggleModal = () => {
    setModalVisible2(false);
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


  const emptyMessage = ({ item }) => {
    return (
      <View style={{ justifyContent: 'center', flexDirection: 'row', alignContent: 'center', }}>
        <MyText style={{ fontSize: 13, textAlign: 'center', marginVertical: 20, color: '#808080' }}>
          No transactions yet
        </MyText>
      </View>
    )
  }

  //---------------------PDF processing---------------------------------------
  const formatstartDate = () => {
    const [startday, startmonth, startyear]: any = startDate.split('/');
    let d = new Date(startyear, startmonth - 1, startday);
    return (moment(d).format('ll'));
  }

  const formatendDate = () => {
    const [endday, endmonth, endyear]: any = endDate.split('/');
    let d = new Date(endyear, endmonth - 1, endday);
    return (moment(d).format('ll'));
  }

  const printDate = () => {
    let today_date = new Date();
    const dateOptions: any = {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
      timeZone: 'Africa/Lagos',
    }
    const t_date = today_date.toLocaleString('en-US', dateOptions);
    return t_date;

  }

  const filterRecords = () => {
    const [startday, startmonth, startyear]: any = startDate.split('/');
    let s = new Date(startyear, startmonth - 1, startday);
    const s_date = s;
    let filtered = [];

    const [endday, endmonth, endyear]: any = endDate.split('/');
    let e = new Date(endyear, endmonth - 1, endday);
    const e_date = e;

    if (transactions && transactions.length > 0) {
      filtered = transactions.filter(item => {

        return (item?.createdAt.toString() >= s_date.toISOString() && item?.createdAt.toString() <= e_date.toISOString());
      })
    }
    createPDF(filtered);

  }

  // console.log('trasnsactionsss', transactions)

  const pdfHTML = (usd_sum, naira_value, debit_naira, filtered) => {
    // const array = new Array(10).fill('Row');

    var table = '';

    for (let i in filtered) {

      filtered[i].transaction_type == 'Credit' ?

        table = table + `
      
    <tr>
        <td>${filtered[i].transaction_date} </td>
        <td>${filtered[i].trade_name}</td>
        <td class="text-secondary-d2">+ $${filtered[i].transaction_amount}(₦${filtered[i].wallet_amount}</td>
    </tr> 
        `
        :
        table = table + `

    <tr>
        <td>${filtered[i].transaction_date} </td>
        <td>${filtered[i].trade_name}</td>
        <td class="text-secondary-d2">- ₦${filtered[i].wallet_amount}</td>
    </tr> 

  `
    }

    const html =
      ` 
      <!DOCTYPE html>
      <html>
      <head>

<style>
body{
    margin-top:20px;
    color: #484b51;
	font-family: 'Nunito';
}
.text-secondary-d1 {
    color: #728299!important;
}
.page-header {
    margin: 0 0 1rem;
    padding-bottom: 1rem;
    padding-top: .5rem;
    border-bottom: 1px dotted #e2e2e2;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
}
.page-title {
    padding: 0;
    margin: 0;
    font-size: 1.75rem;
    font-weight: 300;
}
.brc-default-l1 {
    border-color: #dce9f0!important;
}

.ml-n1, .mx-n1 {
    margin-left: -.25rem!important;
}
.mr-n1, .mx-n1 {
    margin-right: -.25rem!important;
}
.mb-4, .my-4 {
    margin-bottom: 1.5rem!important;
}


hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0,0,0,.1);
}

.text-grey-m2 {
    color: #888a8d!important;
}

.text-success-m2 {
    color: #86bd68!important;
}

.font-bolder, .text-600 {
    font-weight: 500!important;
}

.text-110 {
    font-size: 110%!important;
}
.text-blue {
    color: #478fcc!important;
}
.pb-25, .py-25 {
    padding-bottom: .75rem!important;
}

.pt-25, .py-25 {
    padding-top: .75rem!important;
}
.bgc-default-tp1 {
    background-color: rgba(121,169,197,.92)!important;
}
.bgc-default-l4, .bgc-h-default-l4:hover {
    background-color: #f3f8fa!important;
}
.page-header .page-tools {
    -ms-flex-item-align: end;
    align-self: flex-end;
}

.btn-light {
    color: #757984;
    background-color: #f5f6f9;
    border-color: #dddfe4;
}
.w-2 {
    width: 1rem;
}

.text-120 {
    font-size: 120%!important;
}
.text-primary-m1 {
    color: #4087d4!important;
}

.text-danger-m1 {
    color: #dd4949!important;
}
.text-blue-m2 {
    color: #68a3d5!important;
}
.text-150 {
    font-size: 150%!important;
}
.text-60 {
    font-size: 60%!important;
}
.text-grey-m1 {
    color: #7b7d81!important;
}
.align-bottom {
    vertical-align: bottom!important;
}
.text-white {
  color: #fff;
}
.table{width:100%;margin-bottom:1rem;color:#212529}.table td,.table th{padding:.75rem;vertical-align:top;border-top:1px solid #dee2e6}.table thead th{vertical-align:bottom;border-bottom:2px solid #dee2e6}.table tbody+tbody{border-top:2px solid #dee2e6}.table-sm td,.table-sm th{padding:.3rem}.table-bordered{border:1px solid #dee2e6}.table-bordered td,.table-bordered th{border:1px solid #dee2e6}.table-bordered thead td,.table-bordered thead th{border-bottom-width:2px}.table-borderless tbody+tbody,.table-borderless td,.table-borderless th,.table-borderless thead th{border:0}.table-striped tbody tr:nth-of-type(odd){background-color:rgba(0,0,0,.05)}.table-hover tbody tr:hover{color:#212529;background-color:rgba(0,0,0,.075)}.table-primary,.table-primary>td,.table-primary>th{background-color:#b8daff}.table-primary tbody+tbody,.table-primary td,.table-primary th,.table-primary thead th{border-color:#7abaff}.table-hover .table-primary:hover{background-color:#9fcdff}.table-hover .table-primary:hover>td,.table-hover .table-primary:hover>th{background-color:#9fcdff}.table-secondary,.table-secondary>td,.table-secondary>th{background-color:#d6d8db}.table-secondary tbody+tbody,.table-secondary td,.table-secondary th,.table-secondary thead th{border-color:#b3b7bb}.table-hover .table-secondary:hover{background-color:#c8cbcf}.table-hover .table-secondary:hover>td,.table-hover .table-secondary:hover>th{background-color:#c8cbcf}.table-success,.table-success>td,.table-success>th{background-color:#c3e6cb}.table-success tbody+tbody,.table-success td,.table-success th,.table-success thead th{border-color:#8fd19e}.table-hover .table-success:hover{background-color:#b1dfbb}.table-hover .table-success:hover>td,.table-hover .table-success:hover>th{background-color:#b1dfbb}.table-info,.table-info>td,.table-info>th{background-color:#bee5eb}.table-info tbody+tbody,.table-info td,.table-info th,.table-info thead th{border-color:#86cfda}.table-hover .table-info:hover{background-color:#abdde5}.table-hover .table-info:hover>td,.table-hover .table-info:hover>th{background-color:#abdde5}.table-warning,.table-warning>td,.table-warning>th{background-color:#ffeeba}.table-warning tbody+tbody,.table-warning td,.table-warning th,.table-warning thead th{border-color:#ffdf7e}.table-hover .table-warning:hover{background-color:#ffe8a1}.table-hover .table-warning:hover>td,.table-hover .table-warning:hover>th{background-color:#ffe8a1}.table-danger,.table-danger>td,.table-danger>th{background-color:#f5c6cb}.table-danger tbody+tbody,.table-danger td,.table-danger th,.table-danger thead th{border-color:#ed969e}.table-hover .table-danger:hover{background-color:#f1b0b7}.table-hover .table-danger:hover>td,.table-hover .table-danger:hover>th{background-color:#f1b0b7}.table-light,.table-light>td,.table-light>th{background-color:#fdfdfe}.table-light tbody+tbody,.table-light td,.table-light th,.table-light thead th{border-color:#fbfcfc}.table-hover .table-light:hover{background-color:#ececf6}.table-hover .table-light:hover>td,.table-hover .table-light:hover>th{background-color:#ececf6}.table-dark,.table-dark>td,.table-dark>th{background-color:#c6c8ca}.table-dark tbody+tbody,.table-dark td,.table-dark th,.table-dark thead th{border-color:#95999c}.table-hover .table-dark:hover{background-color:#b9bbbe}.table-hover .table-dark:hover>td,.table-hover .table-dark:hover>th{background-color:#b9bbbe}.table-active,.table-active>td,.table-active>th{background-color:rgba(0,0,0,.075)}.table-hover .table-active:hover{background-color:rgba(0,0,0,.075)}.table-hover .table-active:hover>td,.table-hover .table-active:hover>th{background-color:rgba(0,0,0,.075)}.table .thead-dark th{color:#fff;background-color:#343a40;border-color:#454d55}.table .thead-light th{color:#495057;background-color:#e9ecef;border-color:#dee2e6}.table-dark{color:#fff;background-color:#343a40}.table-dark td,.table-dark th,.table-dark thead th{border-color:#454d55}.table-dark.table-bordered{border:0}.table-dark.table-striped tbody tr:nth-of-type(odd){background-color:rgba(255,255,255,.05)}.table-dark.table-hover tbody tr:hover{color:#fff;background-color:rgba(255,255,255,.075)}@media (max-width:575.98px){.table-responsive-sm{display:block;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.table-responsive-sm>.table-bordered{border:0}}@media (max-width:767.98px){.table-responsive-md{display:block;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.table-responsive-md>.table-bordered{border:0}}@media (max-width:991.98px){.table-responsive-lg{display:block;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.table-responsive-lg>.table-bordered{border:0}}@media (max-width:1199.98px){.table-responsive-xl{display:block;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.table-responsive-xl>.table-bordered{border:0}}.table-responsive{display:block;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.table-responsive>.table-bordered{border:0}.
.mt-4,.my-4{margin-top:1.5rem!important}
.container{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}@media (min-width:576px){.container{max-width:540px}}@media (min-width:768px){.container{max-width:720px}}@media (min-width:992px){.container{max-width:960px}}@media (min-width:1200px){.container{max-width:1140px}}.container-fluid,.container-lg,.container-md,.container-sm,.container-xl{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}@media (min-width:576px){.container,.container-sm{max-width:540px}}@media (min-width:768px){.container,.container-md,.container-sm{max-width:720px}}@media (min-width:992px){.container,.container-lg,.container-md,.container-sm{max-width:960px}}@media (min-width:1200px){.container,.container-lg,.container-md,.container-sm,.container-xl{max-width:1140px}}

.text-center {
margin: 0 auto;
width:100px;
}
          </style>
    
      </head>
      <body>
  
      <div class="page-content container">

<div class="container px-0">
    <div class="row mt-4">
        <div class="col-12 col-lg-12">
            <div class="row">
                <div class="col-12">
                    <div class="text-center">
                       <img style="margin: 0 auto" src="https://res.cloudinary.com/fejora/image/upload/v1665938983/fejoraLogo_oasld1.png" height="70px">
                    </div>
                </div>
            </div>
            <!-- .row -->

            <hr class="row brc-default-l1 mx-n1 mb-4" />

            <div class="row">
                <div class="col-sm-6">
                    <div>
                        <span class="text-sm text-grey-m2 align-middle">Statement Period:</span>
                        <span class="text-600 text-110 text-dark align-middle">${formatstartDate()} - ${formatendDate()}</span>
                    </div>
                                <div>
                        <span class="text-sm text-grey-m2 align-middle">Credit ($):</span>
                        <span class="text-600 text-110 text-dark align-middle">$${usd_sum} </span>
                    </div>
                                <div>
                        <span class="text-sm text-grey-m2 align-middle">Credit:</span>
                        <span class="text-600 text-110 text-dark align-middle">₦${naira_value} </span>
                    </div>
                                <div>
                        <span class="text-sm text-grey-m2 align-middle">Debit:</span>
                        <span class="text-600 text-110 text-dark align-middle">₦${debit_naira} </span>
                    </div>
                </div>
                <!-- /.col -->

                <div style="float:left, margin-bottom:30px, width:100%" class="text-95 col-sm-6">
                    <hr class="d-sm-none" />
                    <div class="text-grey-m2">
                        <div class="my-2">
          <span class="text-600 text-90">Print Date:</span> ${printDate()}</div>

                   </div>
                </div>
                <!-- /.col -->
            </div>

            <div style="margin-top:20px">
                
                <!-- or use a table instead -->
                
        <div class="table-responsive">
            <table class="table table-striped table-borderless border-0 border-b-2 brc-default-l1">
                <thead class="bg-none bgc-default-tp1">
                    <tr class="text-white">
                        <th class="opacity-2">Date</th>
                        <th>Description</th>
                        <th width="140">Amount</th>
                    </tr>
                </thead>
    <tbody class="text-95 text-secondary-d3">
    <tr></tr>
                  ${table}
                  </tbody>
              </table>
          </div>
          

                 
                  <hr />

                
              </div>
          </div>
      </div>
  </div>
</div>
      </body>
    </html>
    
    `

    return html;
  }

  async function createPDF(filtered) { //transaction PDF  (above html is used for the pdf design)
    if (startDate == '' || endDate == '') {

      showToast('Warning', 'Please enter a date');
    }
    else if (filtered.length == 0) {
      showToast('Warning', 'Oops, No transactions found');
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
        fileName: 'transactions',
        directory: 'Documents',
        height: 800,
      };
      let file = await RNHTMLtoPDF.convert(options)
      FileViewer.open(file.filePath, { showOpenWithDialog: true })
        .then((res) => {
          // console.log(res);
        })
        .catch(error => {
          //  console.log(error);
        });

      // console.log("FILTEREDD", filtered);


    }
  }

  //---------------------PDF processing---------------------------------------

  const [trans_count, setTransCount] = useState(0);
  const [page, setPage] = useState(0);
  const [trans_loading, settransLoading] = useState(false);

  const [endReached, setEndReached] = useState(false);
  const [error, setError] = useState(false);

  // const { trans_count } = useSelector((state: RootState) => state.getTransaction);


  const handleRefresh = async () => {
    setEndReached(false);
    setcurrentPage(1);
    settransactions([]);
    setisMiddleLoading(true);
    await getTransactionsHistory(1);
  }

  const getTransactionsHistory = async (page?: number) => {
    await getCompletedTransactionsHistory(page || currentPage + 1)
      .then(res => {
        settotalcredits(res?.totalCreditAmount || total_credits || 0);
        settotalwithdrawals(res?.totalDebitAmount || total_withdrawals || 0);
        if (res?.transactions?.length < 5) {
          setEndReached(true);
        }
        if (res.currentPage !== 1) {
          settransactions((prev) => prev.concat(res?.transactions || []));
        } else {
          settransactions(res?.transactions || []);
        }
        setcurrentPage(res?.currentPage);
      })
      .catch((err) => {
        setError(true);
        setEndReached(true);
        showToast('Warning', 'Unable to fetch withdrawals');
        console.log("Error", err);
      }).finally(() => {
        settransLoading(false);
        setisMiddleLoading(false);
      })
  }


  useEffect(() => {
    getTransactionsHistory(1);
  }, [])


  const refreshNextTransaction = async () => {
    if (endReached) return;
    setcurrentPage((prev) => prev + 1);
    settransLoading(true);
    setError(false);
    await getTransactionsHistory();
  }




  const renderItem = ({ item, index }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#ffffff';
    const color = item.id === selectedId ? 'white' : '#343434';
    // console.log("INDEX", index);
    return (
      <Item
        key={index}
        onPress={
          item?.transactionFor === 'Bitcoin'
            ? () => navigation.navigate('TradeBitcoinComplete')
            : item?.transactionFor === 'Trade' ? () => navigation.navigate('TransDetails', { tradeData: item?.tradeDetails[0] })

              : item?.transactionFor === 'Withdrawal' ? () => toggleM(index)
                : item?.transactionFor === 'Airtime' ? () => toggleAir(index) : null
        }
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
        item={item}
        index={index}
        route={route}
        navigation={navigation}
      />
    );
  };

  const footerComplete = () => {
    return trans_loading ? (

      <View style={{ justifyContent: 'center', flexDirection: 'row', alignContent: 'center', }}>
        <ActivityIndicator color={'#343434'} style={{ paddingVertical: 15 }} />
      </View>
    ) : null
  }

  const showEmpty = () => {
    return error ? null : (
      <Empty />
    )
  }

  return (

    <View style={[styles2.container]}>

      <SafeAreaView
        style={{
          height: height,
          width: width,
          flex: 1,
          backgroundColor: 'transparent',
        }}
        edges={['left', 'right', 'top']}>
        <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

        <HeaderBack navigation={navigation} headerTitle={'Transaction history'} />

        {/*}
        <View style={styles.mainTopCard}>
          <View style={styles.topCard}>
            <MyText style={{ fontSize: 10, color: '#808080' }}>Withdrawals</MyText>
            <MyText style={{ fontSize: 16, color: '#343434' }}>{NAIRA}{total_withdrawals || '0'}</MyText>
          </View>

          <View style={styles.topCard}>
            <MyText style={{ fontSize: 10, color: '#808080' }}>Credit</MyText>
            <MyText style={{ fontSize: 16, color: '#1cc88a' }}>{NAIRA}{total_credits || '0'}</MyText>
          </View>
        </View>
  */}

        <View style={[styles2.Row, styles2.mb10, styles2.lineBottomDark, styles2.pb5, styles2.mt5, { width: '100%', }]}>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

            <TouchableOpacity
              onPress={() => {
                setMainCat('Deposit')
                setSubCat('Crypto')
              }}
              style={[styles2.ph15, { width: 'auto', }]}>
              <MyText style={[styles2.fontSize15, mainCat === 'Deposit' ? styles2.textDark : styles2.textLightGrey]}>Deposit</MyText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMainCat('Withdrawals')
                setCat('Crypto')
                setSubCat('Pending')
              }}
              style={[styles2.ph15, { width: 'auto', }]}>
              <MyText style={[styles2.textCenter, styles2.fontSize15, styles2.fontSemi, mainCat === 'Withdrawals' ? styles2.textDark : styles2.textLightGrey]}>Withdrawals</MyText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMainCat('Giftcard')
                setSubCat('Pending')
              }}
              style={[styles2.ph15, { width: 'auto', }]}>
              <MyText style={[styles2.textCenter, styles2.fontSize15, styles2.fontSemi, mainCat === 'Giftcard' ? styles2.textDark : styles2.textLightGrey]}>Giftcard</MyText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMainCat('Buy')
                setSubCat('')
              }}
              style={[styles2.ph15, { width: 'auto', }]}>
              <MyText style={[styles2.textCenter, styles2.fontSize15, styles2.fontSemi, mainCat === 'Buy' ? styles2.textDark : styles2.textLightGrey]}>Buy</MyText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMainCat('Sell')
                setSubCat('')
              }}
              style={[styles2.ph15, { width: 'auto', }]}>
              <MyText style={[styles2.textCenter, styles2.fontSize15, styles2.fontSemi, mainCat === 'Sell' ? styles2.textDark : styles2.textLightGrey]}>Sell</MyText>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={() => {
                setMainCat('Bills')
                setSubCat('')
              }}
              style={[styles2.ph15, { width: 'auto', }]}>
              <MyText style={[styles2.textCenter, styles2.fontSize15, styles2.fontSemi, mainCat === 'Bills' ? styles2.textDark : styles2.textLightGrey]}>Bills</MyText>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={() => {
                setMainCat('Reward')
                setSubCat('')
              }}
              style={[styles2.ph15, { width: 'auto', }]}>
              <MyText style={[styles2.textCenter, styles2.fontSize15, styles2.fontSemi, mainCat === 'Reward' ? styles2.textDark : styles2.textLightGrey]}>Reward</MyText>
            </TouchableOpacity>

          </ScrollView>

        </View>

        {mainCat === 'Withdrawals' ? (
          <>
            <View style={[styles2.Row, styles2.mb10, { width: '100%', }]}>

              <TouchableOpacity
                onPress={() => {
                  setCat('Crypto')
                  setSubCat('Pending')
                }}
                style={[styles2.tabLineAuto, styles2.ph15, {borderColor: cat === 'Crypto' ? '#1cc88a' : 'transparent',  width: 'auto', }]}>
                <MyText style={[styles2.textCenter, styles2.fontSize15, styles2.fontSemi, { color: cat === 'Crypto' ? '#343434' : '#808080' }]}>Crypto</MyText>
              </TouchableOpacity>


              <TouchableOpacity
                onPress={() => {
                  setCat('Cash')
                  setSubCat('Pending')
                }}
                style={[styles2.tabLineAuto, styles2.ph15, {borderColor: cat === 'Cash' ? '#1cc88a' : 'transparent', width: 'auto', }]}>
                <MyText style={[styles2.textCenter, styles2.fontSize15, styles2.fontSemi, { color: cat === 'Cash' ? '#343434' : '#808080' }]}>Cash</MyText>
              </TouchableOpacity>
            </View>

            <View style={[styles2.Row, styles2.ph15, styles2.pt5, styles2.mb5, { width: '100%' }]}>
              <TouchableOpacity
                onPress={() => setSubCat('Pending')}
                style={[styles2.tabLineAuto, styles2.b8, subCat === 'Pending' ? styles2.bgGrey : null, styles2.ph10, styles2.mr15, subCat === 'Pending' ? styles2.lineBottomCatDark : null, { borderWidth: 1, }]}>
                <MyText style={[styles2.textCenter, styles2.fontSize12, styles2.fontRegular, subCat === 'Pending' ? styles2.textDark : styles2.textGrey]}>Pending</MyText>
              </TouchableOpacity>

              {cat === 'Cash' ?
                <TouchableOpacity
                  onPress={() => setSubCat('Declined')}
                  style={[styles2.tabLineAuto, styles2.b8, subCat === 'Declined' ? styles2.bgGrey : null, styles2.ph10, styles2.mr15, subCat === 'Declined' ? styles2.lineBottomCatDark : null, { borderWidth: 1, }]}>
                  <MyText style={[styles2.textCenter, styles2.fontSize12, styles2.fontRegular, subCat === 'Declined' ? styles2.textDark : styles2.textGrey]}>Declined</MyText>
                </TouchableOpacity>
                : null}

              <TouchableOpacity
                onPress={() => setSubCat('Completed')}
                style={[styles2.tabLineAuto, styles2.b8, subCat === 'Completed' ? styles2.bgGrey : null, styles2.ph10, styles2.mr15, subCat === 'Completed' ? styles2.lineBottomCatDark : null, { borderWidth: 1, }]}>
                <MyText style={[styles2.textCenter, styles2.fontSize12, styles2.fontRegular, subCat === 'Completed' ? styles2.textDark : styles2.textGrey]}>Completed</MyText>
              </TouchableOpacity>

            </View>

          </>
        ) : mainCat === 'Giftcard' ? (

          <View style={[styles2.Row, styles2.ph15, styles2.pt5, styles2.mb5, { width: '100%' }]}>
            <TouchableOpacity
              onPress={() => setSubCat('Pending')}
              style={[styles2.tabLineAuto, styles2.b8, subCat === 'Pending' ? styles2.bgGrey : null, styles2.ph10, styles2.mr15, subCat === 'Pending' ? styles2.borderWidthDark : null, { borderWidth: 1, }]}>
              <MyText style={[styles2.textCenter, styles2.fontSize12, styles2.fontRegular, subCat === 'Pending' ? styles2.textDark : styles2.textGrey]}>Pending</MyText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSubCat('Completed')}
              style={[styles2.tabLineAuto, styles2.b8, subCat === 'Completed' ? styles2.bgGrey : null, styles2.ph10, styles2.mr15, subCat === 'Completed' ? styles2.borderWidthDark : null, { borderWidth: 1, }]}>
              <MyText style={[styles2.textCenter, styles2.fontSize12, styles2.fontRegular, subCat === 'Completed' ? styles2.textDark : styles2.textGrey]}>Completed</MyText>
            </TouchableOpacity>

          </View>

        ) : mainCat === 'Deposit' ? (
          <View style={[styles2.Row, styles2.ph15, styles2.pt5, styles2.mb5, { width: '100%' }]}>
            <TouchableOpacity
              onPress={() => setSubCat('Crypto')}
              style={[styles2.tabLineAuto, styles2.b8, subCat === 'Crypto' ? styles2.bgGrey : null, styles2.ph10, styles2.mr15, subCat === 'Crypto' ? styles2.borderWidthDark : null, { borderWidth: 1,}]}>
              <MyText style={[styles2.textCenter, styles2.fontSize12, styles2.fontRegular, subCat === 'Crypto' ? styles2.textDark : styles2.textGrey]}>Crypto</MyText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSubCat('Cash')}
              style={[styles2.tabLineAuto, styles2.b8, subCat === 'Cash' ? styles2.bgGrey : null, styles2.ph10, styles2.mr15, subCat === 'Cash' ? styles2.borderWidthDark : null, { borderWidth: 1,}]}>
              <MyText style={[styles2.textCenter, styles2.fontSize12, styles2.fontRegular, subCat === 'Cash' ? styles2.textDark : styles2.textGrey]}>Cash</MyText>
            </TouchableOpacity>

          </View>
        ) : null
        }

        {mainCat === 'Giftcard' ? (

          subCat === 'Pending' ? (
            <View style={[styles2.mt5]}>
            <OngoingTrades
              navigation={navigation}
            />
            </View>
          ) : (
            
            <View style={[styles2.mt5]}>
            <CompletedTrades
              navigation={navigation}
            />
            </View>
          )

        ) : (
          <View style={[styles2.pt5]}>

            {error ? (

              <FetchError setRetry={() => handleRefresh()} />

            ) : (
              <>
                {isMiddleLoading && transactions.length == 0 ? (

                  <View style={[styles2.ph5, { flex: 1 }]}>
                    <View style={[styles2.emptyCont, {height:40}]}>
                      <SkeletonPlaceholder >
                        <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between">
                          <SkeletonPlaceholder.Item flexDirection="row">
                            <SkeletonPlaceholder.Item height={30} width={30} borderRadius={30} backgroundColor={'#000'}/>
                            <SkeletonPlaceholder.Item marginLeft={8} height={30} width={170} borderRadius={10} />
                          </SkeletonPlaceholder.Item>
                          <SkeletonPlaceholder.Item height={30} width={60} borderRadius={10} />
                        </SkeletonPlaceholder.Item>
                      </SkeletonPlaceholder>

                    </View>

                    <View style={[styles2.emptyCont, {height:40}]}>
                      <SkeletonPlaceholder >
                        <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between">
                          <SkeletonPlaceholder.Item flexDirection="row">
                            <SkeletonPlaceholder.Item height={30} width={30} borderRadius={30} />
                            <SkeletonPlaceholder.Item marginLeft={8} height={30} width={170} borderRadius={10} />
                          </SkeletonPlaceholder.Item>
                          <SkeletonPlaceholder.Item height={30} width={60} borderRadius={10} />
                        </SkeletonPlaceholder.Item>
                      </SkeletonPlaceholder>

                    </View>

                    <View style={[styles2.emptyCont, {height:40}]}>
                      <SkeletonPlaceholder >
                        <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between">
                          <SkeletonPlaceholder.Item flexDirection="row">
                            <SkeletonPlaceholder.Item height={30} width={30} borderRadius={30} />
                            <SkeletonPlaceholder.Item marginLeft={8} height={30} width={170} borderRadius={10} />
                          </SkeletonPlaceholder.Item>
                          <SkeletonPlaceholder.Item height={30} width={60} borderRadius={10} />
                        </SkeletonPlaceholder.Item>
                      </SkeletonPlaceholder>

                    </View>

                  </View>
                ) : (


                  <FlatList
                    refreshControl={
                      <RefreshControl
                        tintColor={'#343434'}
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                      />
                    }
                    style={[styles2.iosBar, styles2.pv5, { flexGrow: 1 }]}
                    data={transactions}
                    renderItem={renderItem}
                    initialNumToRender={10}
                    maintainVisibleContentPosition={{
                      autoscrollToTopThreshold: 10,
                      minIndexForVisible: 1,
                    }}
                    ListEmptyComponent={showEmpty}
                    onEndReached={refreshNextTransaction}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={footerComplete}

                  />


                )}

              </>
            )}

          </View>
        )}

        {transactions && transactions.length > 0 ? (
          <>
            <WithModal
              isOpen={isBoxVisible}
              handleChange={handleM}
              id={transactions[withdrawindex]?.transactionId}
              username={username}
              amount={transactions[withdrawindex]?.transactionAmount}
              acc_name={transactions[withdrawindex]?.bankDetails?.accountTitle}
              acc_no={transactions[withdrawindex]?.bankDetails?.accountNumber}
              createdAt={transactions[withdrawindex]?.createdAt}
              bank_name={transactions[withdrawindex]?.bankDetails?.bankName}
              fees_deducted={transactions[withdrawindex]?.transactionFees}

            />


            <AirModal
              isOpen={isAirVisible}
              handleChange={handleAir}
              id={transactions[withdrawindex]?.tradeid}
              username={username}
              amount={transactions[withdrawindex]?.transaction_amount}
              date={transactions[withdrawindex]?.transaction_date}
              time={transactions[withdrawindex]?.transaction_time}
              fees_deducted={transactions[withdrawindex]?.fees_deducted}

            />
          </>
        ) : (
          <></>
        )}


        <Modal isOpen={isModalVisible2}
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
              style={[styles.sendBtn, { alignContent: 'center', marginTop: 10, }]}>
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

      {show !== 0 ? (

        <Animated.View
          style={{ transform: [{ translateY: slideAnim }], position: 'absolute', zIndex: 999, bottom: 0 }}>
          <CustomToast
            type={toastType}
            msg={toastMsg}
          />
        </Animated.View>
      ) : null}

    </View>
  );
};

export default TransactionHistory;

export const PostFunctionalWay = React.memo(Item);