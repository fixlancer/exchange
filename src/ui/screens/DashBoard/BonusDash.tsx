import React, { useContext, useEffect, useRef, useMemo, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  StatusBar,
  Platform,
  Animated,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import MyText from '../../components/DefaultTextComponent/MyText';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '../../components/Navbars/Navbar';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import BonusList from './BonusList';
import LearnMore from './learnMore';
import { getToken, NAIRA } from '../../../utils/utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getTradeCounters } from '../../../redux/redux/actions/tradeCounterAction';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getBonusList } from '../../../redux/redux/actions/bonusAction';
import { RootState } from '../../../redux/redux/store/store';
// import { useDispatch, useSelector } from 'react-redux';
import CustomToast from '../../components/CustomToast/CustomToast';
import styles from './Styles';

const { width, height } = Dimensions.get('window');

const BonusDash = ({ navigation, route }) => {

  const [id, setId] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [isEmptyBonus, setisEmpty] = useState(false);
  const [emptyCount, setemptyCount] = useState(false);


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

  // const { bonus } = useSelector((state: RootState) => state.bonusReducer);
  // const { trade_counters } = useSelector((state: RootState) => state.tradecounterReducer);
  // const dispatch = useDispatch();
 const bonus = null;
const trade_counters = null;

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(true);
  };

  const handleModal = () => {
    setModalVisible(false);
  };


  useEffect(() => {
    getToken(setToken, setId);
    // openModal();
  }, [token]);

  useEffect(() => {
    if (token == null) {
      getBonus();
    }
  }, [token]);


  useEffect(() => {

    async function getCounter() {

      // const user_id = await AsyncStorage.getItem('id');

      // dispatch(
      //   getTradeCounters(user_id)
      // )
    }
    getCounter();

  }, [])


  function getBonus() {

    // setisLoading(true);

    // dispatch(getBonusList())
    //   .then(res => {
    //     setisLoading(false);
    //     setisRefreshing(false);
    //     setemptyCount(true);
    //   })

    //   .catch(err => {
    //     setisLoading(false);
    //     setisRefreshing(false);
    //     showToast('Warning', 'Unable to fetch bonus');
    //   });

  }

  const handleRefresh = () => {
    // setisRefreshing(true);
    // getBonus();

    // async function getCounter() {

    //   const user_id = await AsyncStorage.getItem('id');

    //   dispatch(
    //     getTradeCounters(user_id)
    //   )

    // }
    // getCounter();
  }

  useEffect(() => {
    // let isEmpty = false;
    // trade_counters && bonus && bonus.bonus.forEach((item) => {
    //   if (item.status != 'resume')
    //     isEmpty = true;

    //   else
    //     isEmpty = false;
    // })

    // setisEmpty(isEmpty);
  }, [emptyCount])

  return (

    <View style={{ width: '100%', flex: 1 }}>
      <SafeAreaView
        style={{

          flex: 1,
          height: '100%',
          width: '100%',
          backgroundColor: '#fff',
        }}
        edges={['left', 'right', 'top']}>
        <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />

        <View style={styles1.header}>
          <MyText style={styles1.headerHeading}>Bonus</MyText>

          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity
              activeOpacity={0.9}
              style={{ marginLeft: 15, marginTop: 5 }}
              onPress={() => toggleModal()}>
              <Icon
                name={'help-outline'}
                size={22}
                color={'#f27415'}
                style={{ marginTop: 8, }} />
            </TouchableOpacity>
          </View>
        </View>


        <ScrollView
          refreshControl={
            <RefreshControl
              tintColor={'#343434'}
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          showsVerticalScrollIndicator={false} style={{}}>

          <View style={{ width: '100%', backgroundColor: '#f3f5f9', paddingHorizontal: 5, }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('PastBonus')}
              style={[styles.emptyCont, { borderWidth: StyleSheet.hairlineWidth, marginTop: 10, borderColor: '#ddd' }]}>
              <View style={styles1.Row}>
                <MyText style={{ fontSize: 13, color: '#343434', paddingLeft: 5, marginVertical: 0 }}>Past Bonus</MyText>
                <Icons
                  name={'chevron-right'}
                  size={20}
                  color={'#343434'}
                  style={{ marginTop: 0, }} />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignSelf: 'center',
              width: width,
              paddingTop: 5, flex: 1,
              backgroundColor: '#f3f5f9',
              height: '100%',
            }}>


            <View style={{ backgroundColor: '#f3f5f9', width: '100%', height: '100%', flex: 1 }}>

              {isLoading && !bonus && !trade_counters ? (
                <View style={{ width: '100%', paddingHorizontal: 5, }}>
                  <View style={styles.emptyCont}>
                    <SkeletonPlaceholder>
                      <SkeletonPlaceholder.Item flexDirection="row">
                        <SkeletonPlaceholder.Item flexDirection="row">
                          <SkeletonPlaceholder.Item height={40} width={40} borderRadius={30} />
                          <SkeletonPlaceholder.Item>
                            <SkeletonPlaceholder.Item marginLeft={8} marginBottom={5} height={20} width={80} borderRadius={10} />
                            <SkeletonPlaceholder.Item marginLeft={8} height={45} width={180} borderRadius={10} />
                          </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder.Item>
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>

                  </View>

                  <View style={styles.emptyCont}>
                    <SkeletonPlaceholder>
                      <SkeletonPlaceholder.Item flexDirection="row">
                        <SkeletonPlaceholder.Item flexDirection="row">
                          <SkeletonPlaceholder.Item height={40} width={40} borderRadius={30} />
                          <SkeletonPlaceholder.Item>
                            <SkeletonPlaceholder.Item marginLeft={8} marginBottom={5} height={20} width={80} borderRadius={10} />
                            <SkeletonPlaceholder.Item marginLeft={8} height={45} width={180} borderRadius={10} />
                          </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder.Item>
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>

                  </View>
                </View>
              ) : (
                <>
                  {trade_counters && bonus && bonus?.bonus?.length > 0 ? (
                    bonus.bonus.map((v, i) => {

                      const won = v.duration == 'Daily' ? (
                        trade_counters && trade_counters?.trade_counters?.daily_counter?.map((item1, index) => (
                          item1.bonusID === v._id ? (
                            item1.won) : null
                        ))
                      ) : v.duration == 'Weekly' ? (
                        trade_counters && trade_counters?.trade_counters?.weekly_counter?.map((item1, index) => (
                          item1.bonusID === v._id ? (
                            item1.won) : null
                        ))
                      ) : v.duration == 'Monthly' ? (
                        trade_counters && trade_counters?.trade_counters?.monthly_counter?.map((item1, index) => (
                          item1.bonusID === v._id ? (
                            item1.won) : null
                        ))
                      ) : v.duration == 'Yearly' ? (
                        trade_counters && trade_counters?.trade_counters?.yearly_counter.map((item1, index) => (
                          item1.bonusID === v._id ? (
                            item1.won) : null
                        ))
                      ) : v.duration == 'Day of the week' ? (
                        trade_counters && trade_counters?.trade_counters?.day_of_the_week_counter.map((item1, index) => (
                          item1.bonusID === v._id ? (
                            item1.won) : null
                        ))
                      ) : null

                      return (
                        <View key={i}>
                          {v.duration === 'Daily' ? (

                            <View key={i} style={styles.cont}>
                              <BonusList
                                id={i}
                                total_amount={v.total_amount}
                                duration={v.duration}
                                win_amount={v.amount}
                                user_won={won}
                                expiry={v.expiry}
                                amount={
                                  trade_counters?.trade_counters?.daily_counter.map((item, index) => (
                                    item.value
                                  ))

                                } // circle

                                maxWinners={v.winners_to_display}
                                winSelection={v.winners_selected}

                                bonusStatus={v.status}
                              // trade_counters.trade_counters.daily_counter === v.total_amount || trade_counters.trade_counters.daily_counter > v.total_amount ?
                              // 'Completed' : trade_counters.trade_counters.daily_counter
                              />
                            </View>
                          ) : v.duration === 'Weekly' ? (

                            <View style={styles.cont}>
                              <BonusList
                                id={i}
                                total_amount={v.total_amount}
                                win_amount={v.amount}
                                duration={v.duration}
                                user_won={won}
                                expiry={v.expiry}
                                amount={
                                  trade_counters?.trade_counters?.weekly_counter?.map((item, index) => (
                                    item.value
                                  ))

                                } // circle

                                maxWinners={v.winners_to_display}
                                winSelection={v.winners_selected}
                                bonusStatus={v.status}

                              />
                            </View>
                          ) : v.duration === 'Monthly' ? (

                            <View style={styles.cont}>
                              <BonusList
                                id={i}
                                total_amount={v.total_amount}
                                duration={v.duration}
                                user_won={won}
                                win_amount={v.amount}
                                expiry={v.expiry}
                                amount={
                                  trade_counters.trade_counters.monthly_counter.map((item, index) => (
                                    item.value
                                  ))
                                }// circle

                                maxWinners={v.winners_to_display}
                                winSelection={v.winners_selected}
                                bonusStatus={v.status}

                              />
                            </View>
                          ) : v.duration === 'Yearly' ? (
                            <View style={styles.cont}>
                              <BonusList
                                id={i}
                                total_amount={v.total_amount}
                                duration={v.duration}
                                user_won={won}
                                win_amount={v.amount}
                                expiry={v.expiry}
                                amount={
                                  trade_counters?.trade_counters?.yearly_counter?.map((item, index) => (
                                    item.value
                                  ))
                                } // circle

                                maxWinners={v.winners_to_display}
                                winSelection={v.winners_selected}
                                bonusStatus={v.status}
                              />
                            </View>
                          ) : v.duration === 'Day of the week' ? (
                            <View style={styles.cont}>
                              <BonusList
                                id={i}
                                total_amount={v.total_amount}
                                duration={v.duration}
                                user_won={won}
                                win_amount={v.amount}
                                expiry={v.expiry}
                                amount={
                                  trade_counters?.trade_counters?.day_of_the_week_counter.map((item, index) => (
                                    item.value
                                  ))
                                } // circle

                                maxWinners={v.winners_to_display}
                                winSelection={v.winners_selected}
                                bonusStatus={v.status}
                              />
                            </View>

                          ) : null}

                        </View>
                      )
                    }

                    )

                  ) : null}

                  {isEmptyBonus ? (
                    <View style={{ flex: 1, width: '100%', paddingHorizontal: 5, marginTop: 20, marginBottom: 50 }}>
                      {/*    <View style={styles.emptyCont}>*/}

                      <MyText style={{ fontSize: 13, color: '#343434', textAlign: 'center', marginVertical: 0 }}>No Bonus available</MyText>
                      {/*   </View> */}
                    </View>
                  ) : null}
                </>
              )}

            </View>

          </View>



        </ScrollView>


        <LearnMore
          isOpen={isModalVisible}
          handleChange={handleModal}

        />

        <NavBar
          navigation={navigation}
          activePage={'bonus'}
          backgroundColor={undefined}
        />
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

const styles1 = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd', paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Platform.OS == 'ios' ? 0 : 10,
  },
  headerHeading: {
    textAlign: 'center',
    fontSize: 18,
    marginLeft: 0,
    marginTop: 14,
    color: '#343434',
  },
  mainBody: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#fff',
    marginBottom: 10,
    marginHorizontal: 0,
    borderRadius: 8,
    padding: 5,
    flex: 1,
  },
  emptyCont: {
    height: 'auto',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 3,
    paddingHorizontal: 9,
    paddingVertical: 10,
    elevation: 0,
  },
  cont: {
    height: 'auto',
    width: '100%',
    marginVertical: 1.5,
    paddingHorizontal: 6,
  },
  amountPortion: {
    // flexDirection: 'row',
    borderTopColor: '#f1f1f1',
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 15,
    paddingTop: 10,
    justifyContent: 'center',
  },
  mdFontGreyColor: {
    color: '#808080',
    fontSize: 12, marginVertical: 2,
    textAlign: 'left',
  },
  inlineCardPortion: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  mdFontBlackColor: {
    color: '#343434',
    fontSize: 12,
    marginVertical: 2,
  },
  iStorage: {
    backgroundColor: '#f3f5f9', width: 40, height: 40, marginRight: 10, borderRadius: 30, justifyContent: 'center', alignItems: 'center',
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default BonusDash;