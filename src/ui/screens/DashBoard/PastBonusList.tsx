import React, { useContext, useRef, useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import MyText from '../../components/DefaultTextComponent/MyText';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getTradeCounters } from '../../../redux/redux/actions/tradeCounterAction';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBonusList } from '../../../redux/redux/actions/bonusAction';
import { RootState } from '../../../redux/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, NAIRA } from '../../../utils/utils';
import CustomToast from '../../components/CustomToast/CustomToast';

const PastBonusList = ({ navigation, route }) => {

  const dispatch = useDispatch();

  const { bonus } = useSelector((state: RootState) => state.bonusReducer);
  const { trade_counters } = useSelector((state: RootState) => state.tradecounterReducer);

  const [id, setId] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [isEmpty, setisEmpty] = useState(false);
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
    let isEmpty = false;
    trade_counters && bonus && bonus.bonus.forEach((item) => {
      if (item.status != 'expired')
        isEmpty = true;

      else
        isEmpty = false;
    })

    if (isEmpty) {
      setisEmpty(true);
    } else {
      setisEmpty(false);
    }
  }, [emptyCount])


  useEffect(() => {

    async function getCounter() {

      const user_id = await AsyncStorage.getItem('id');

      dispatch(
        getTradeCounters({
          id: user_id
        })
      )
    }
    getCounter();


  }, [])


  function getBonus() {

    setisLoading(true);

    dispatch(getBonusList())
      .then(res => {
        setisLoading(false);
        setisRefreshing(false);
        setemptyCount(true);
      })

      .catch(err => {
        setisLoading(false);
        setisRefreshing(false);
           
        showToast('Warning', 'Unable to fetch bonus');
      });


  }

  const handleRefresh = () => {
    setisRefreshing(true);
    getBonus();

    async function getCounter() {

      const user_id = await AsyncStorage.getItem('id');

      dispatch(
        getTradeCounters({
          id: user_id
        })
      )
        .then((res) => {
          setemptyCount(false);
        })

    }
    getCounter();
  }

  const userLevel = '1';

  const imgLevel = [
    {
      id: 1,
      img: require('../../../Assets/badge1.png')
    },
    {
      id: 2,
      img: require('../../../Assets/badge2.png')
    },
    {
      id: 3,
      img: require('../../../Assets/badge3.png')
    },
  ]

  const emptyMsg = () => {
    return (
      <View style={{ flex: 1, width: '100%', paddingHorizontal: 5, }}>
        <View style={styles.emptyCont}>
          <MyText style={{ fontSize: 13, color: '#343434', textAlign: 'center', marginVertical: 0 }}>No Bonus available</MyText>
        </View>
      </View>
    )
  }


  const renderItem = ({ item, index }) => {

    const won = item.duration == 'Daily' ? (
      trade_counters && trade_counters.trade_counters.daily_counter.map((item1, index) => (
        item1.bonusID === item._id ? (
          item1.won) : null
      ))
    ) : item.duration == 'Weekly' ? (
      trade_counters && trade_counters.trade_counters.weekly_counter.map((item1, index) => (
        item1.bonusID === item._id ? (
          item1.value) : null
      ))
    ) : item.duration == 'Monthly' ? (
      trade_counters && trade_counters.trade_counters.monthly_counter.map((item1, index) => (
        item1.bonusID === item._id ? (
          item1.value) : null
      ))
    ) : item.duration == 'Yearly' ? (
      trade_counters && trade_counters.trade_counters.yearly_counter.map((item1, index) => (
        item1.bonusID === item._id ? (
          item1.value) : null
      ))
    ) : item.duration == 'Day of the week' ? (
      trade_counters && trade_counters.trade_counters.day_of_the_week_counter.map((item1, index) => (
        item1.bonusID === item._id ? (
          item1.value) : null
      ))
    ) : null

    const amount = item.duration == 'Daily' ? (
      trade_counters && trade_counters.trade_counters.daily_counter.map((item1, index) => (
        item1.bonusID === item._id ? (
          item1.value) : null
      ))
    ) : item.duration == 'Weekly' ? (
      trade_counters && trade_counters.trade_counters.weekly_counter.map((item1, index) => (
        item1.bonusID === item._id ? (
          item1.value) : null
      ))
    ) : item.duration == 'Monthly' ? (
      trade_counters && trade_counters.trade_counters.monthly_counter.map((item1, index) => (
        item1.bonusID === item._id ? (
          item1.value) : null
      ))
    ) : item.duration == 'Yearly' ? (
      trade_counters && trade_counters.trade_counters.yearly_counter.map((item1, index) => (
        item1.bonusID === item._id ? (
          item1.value) : null
      ))
    ) : item.duration == 'Day of the week' ? (
      trade_counters && trade_counters.trade_counters.day_of_the_week_counter.map((item1, index) => (
        item1.bonusID === item._id ? (
          item1.value) : null
      ))
    ) : null


    return (

      item.status === 'expired' ? (
        <>

          <View style={[styles.mainBody, { borderBottomWidth: 0, borderColor: '#fff' }]}>

            <View style={styles.inlineCardPortion}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <View>

                  <View style={{ flexDirection: 'row', }}>
                    {won.map((item) => (
                      item === 0 ? (
                        <View style={[styles.iStorage, { }]}>
                          <Icon
                            name={'emoji-events'}
                            size={19}
                            color={'#92b7cb'}
                            style={{ alignSelf: 'center' }}></Icon>
                        </View>
                      ) : null

                    ))}

                    {won.filter(w => w !== null).map((item) => (
                      item === 1 ? (
                        <View style={[styles.iStorage, { backgroundColor: '#e7fbda' }]}>
                          <Icon
                            name={'emoji-events'}
                            size={19}
                            color={'#1cc88a'}
                            style={{ alignSelf: 'center' }}></Icon>
                        </View>
                      ) : null
                    ))}

                    <View>

                      <MyText
                        style={{
                          color: '#343434',
                          fontSize: 14,
                          marginVertical: 3,
                        }}>
                        {NAIRA}{item.amount}
                      </MyText>

                      <MyText
                        style={{
                          color: '#808080',
                          fontFamily: 'Nunito-Regular',
                          fontSize: 11,
                        }}>Trade atleast ${item.total_amount} worth of giftcards</MyText>

                      <MyText
                        style={{
                          color: '#808080',
                          fontFamily: 'Nunito-Regular',
                          fontSize: 11,
                        }}>{item.duration} to win {NAIRA}{item.amount}
                      </MyText>
                    </View>
                  </View>
                </View>

                {won.filter(w => w !== null).map((item) => (
                  <View>
                    {item === 1 ? (
                      <MyText style={{ color: '#1cc88a', marginTop: 3, fontSize: 13, }}>Won</MyText>
                    ) : null}


                    {item === 0 ? (
                      <>
                        <MyText style={{ color: '#808080', marginTop: 3, fontSize: 13, }}>Expired</MyText>
                      </>
                    ) : null}

                  </View>
                ))}
              </View>


              <View style={styles.amountPortion}>

                <View style={styles.Row}>
                  <MyText style={styles.mdFontGreyColor}>
                    Amount Traded:
                  </MyText>

                  {amount ? (
                  <MyText style={styles.mdFontBlackColor}>${amount}</MyText>
                  ) : (
                  <MyText style={styles.mdFontBlackColor}>0</MyText>
                  )}
                </View>

                <View style={styles.Row}>
                  <MyText style={styles.mdFontGreyColor}>
                    Expired:
                  </MyText>
                  <View style={styles.Row}>
                    <Icon
                      name={'timer'}
                      size={15}
                      color={'#808080'}
                      style={{ marginRight: 2, marginTop: 1 }}></Icon>
                    <MyText style={[styles.mdFontBlackColor, { color: '#343434' }]}>
                      {item.expiry}
                    </MyText>
                  </View>

                </View>

                {item.winners_selected === 'Random' ? (
                <View style={[styles.Row, { marginTop: 10, justifyContent: 'center', paddingVertical: 10, borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#f2f2f2' }]}>
                  <MyText style={[styles.mdFontGreyColor, { textAlign: 'center', color: '#808080' }]}>
                    {item.winners_to_display} winners were picked randomly
                  </MyText>

                </View>
              ) : (
                <View style={[styles.Row, { marginTop: 10, justifyContent: 'center', paddingVertical: 10, borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#f2f2f2' }]}>
                  <MyText style={[styles.mdFontGreyColor, { alignItems: 'center', marginTop: 10, textAlign: 'center' }]}>
                    First {item.winners_to_display} users to reach the target won
                  </MyText>

                </View>
              )}

              </View>

              {/*
    
       <View style={[styles.Row,  {marginTop: 10}]}>
        <MyText style={styles.mdFontGreyColor}>
          Eligible Levels:
        </MyText>
     
        <View style={{flexDirection:'row'}}>

{item.levels.map((itemL, indexL) => (
itemL == userLevel ? (
<View key={index}>
<Image
  style={{
    alignSelf: 'center',
    marginVertical: 0,
    width: 28,
    height:40,
  }}
  source={imgLevel[indexL].img}
/>
</View>

): null )
)}
</View>   
      
      </View>

*/}


            </View>
          </View>

        </>
      ) : null

    ) //return
  }


  return (

    <>

      <SafeAreaView
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          backgroundColor: '#fff',
        }}
        edges={['left', 'right', 'top']}>
        <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />

        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ marginLeft: 15, marginTop: 5 }}
            onPress={() => navigation.goBack(null)}>
            <Icon
              name={'arrow-back-ios'}
              size={20}
              color={'#343434'}
              style={{ marginTop: 10 }}></Icon>
          </TouchableOpacity>
          <MyText style={styles.headerHeading}>Past Bonus</MyText>
          <MyText></MyText>
        </View>

<View style={styles.bg}>
        {isLoading ? (

          <View style={{ flex: 1, width: '100%', paddingHorizontal: 5, }}>
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
            <FlatList
              refreshControl={
                <RefreshControl
                  tintColor={'#1CC88A'}
                  refreshing={isRefreshing}
                  onRefresh={handleRefresh}
                />
              }
              data={bonus.bonus}
              style={{ paddingHorizontal: 5, paddingTop: 5}}
              keyExtractor={(item) => item.key}
              renderItem={renderItem}

            />

            {isEmpty ? (
              <View style={{ flex: 1, width: '100%', paddingHorizontal: 5, marginTop: 20, marginBottom: 50 }}>
                {/*    <View style={styles.emptyCont}>*/}

                <MyText style={{ fontSize: 13, color: '#343434', textAlign: 'center', marginVertical: 0 }}>No past bonus yet</MyText>
                {/*   </View> */}
              </View>
            ) : null}

          </>
        )}
</View>

      </SafeAreaView>

 {show !== 0 ? (

<Animated.View
  style={{transform: [{translateY: slideAnim}], position:'absolute', zIndex:999, bottom:0}}>
  <CustomToast
    type={toastType}
    msg={toastMsg}
  />
</Animated.View>
      ) : null }

</>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Platform.OS == 'ios' ? 0 : 10,
  },
  headerHeading: {
    textAlign: 'center',
    fontSize: 16,
    marginLeft: -18,
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
  bg: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f3f5f9',
    flex: 1,
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
})

export default PastBonusList;