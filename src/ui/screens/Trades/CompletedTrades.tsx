import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Button,
  Platform,
  FlatList,
  Animated,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MyText from '../../components/DefaultTextComponent/MyText';
import ModeratePageCard from '../../components/ModeratePageCard/Index';
import styles from './Style';
import newStyles from '../Styles/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { CompletedTradeCount, getTrade, getTradesByPage_And_Status, OngoingTradeCount } from '../../../redux/redux/actions/tradeAction';
import { RootState } from '../../../redux/redux/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import CustomToast from '../../components/CustomToast/CustomToast';
import Empty from '../../components/Empty/Index';
import FetchError from '../../components/FetchError/Index';
import NoDataFoundComponenet from '../../components/NoDataFound/Index';

import { useTradesStore } from '../../../stores/store';
import { useTheme } from 'react-native-paper';
const { width, height } = Dimensions.get('screen');


const Item2 = ({ item, index, navigation }) => {
  const {setDetailTrades} = useTradesStore()
  return(

  <View style={styles.cont}>
    {item.tradeStatus === 'Completed' ? (
      <ModeratePageCard
        tradeTitle={item?.tradeTitle}
        tradeID={item?.tradeId}
        tradeStatus={item?.tradeStatus}
        cardValue={item?.totalCardValue}
        transValue={item?.totalTransactionValue}
        date={new Date(item?.createdAt).toDateString()}
        time={new Date(item?.createdAt).toLocaleTimeString()}
        userID={item?.user}
        userName={''}

        reDirecttoCardDetail={() =>

          {
            setDetailTrades(item);
            navigation.navigate('tradeCardDetails',{page:"Pending"})}
          }

      />) : null}
  </View>

)}


const CompletedTrades = ({navigation}) => {



  const { setCompletedTotalItems,pendingTotalItems,completedTotalItems } = useTradesStore()

  const theme = useTheme()
  const styles2 = newStyles(theme);

  // const { tradeData } = useSelector((state: RootState) => state.tradeReducer);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [completedTrades, setCompletedTrades] = useState([]);
  const [completedTotalPages, setCompletedTotalPages] = useState(0);
  const [completedCurrentPage, setCompletedCurrentPage] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [isMiddleLoading, setisMiddleLoading] = useState(true);
  const [completeEmptyCount, setCompleteEmptyCount] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [error, setError] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false);
  
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


  const handleRefresh = async () => {
    setEndReached(false);
    setCompletedCurrentPage(1);
    setisMiddleLoading(true);
   await getCompletedTrades(1)
  }





  useEffect( () => {
    setisMiddleLoading(true);
    setNoDataFound(false);
    setError(false)
    getCompletedTrades(1)
  }, [])


  const refreshNextCompleted = async () => {
    setError(false)
  await getCompletedTrades(completedCurrentPage+1)
  };


  const fetchNextCompleted = async () => {
    if (endReached) {
      return;
    } else {
      setError(false)
      refreshNextCompleted()
    }
  };

  const getCompletedTrades = async (page:number) => {
    getTradesByPage_And_Status("Completed", page)
      .then(res => {
        if(!res){
          setCompletedTotalItems(0);
          setNoDataFound(true);
          return
        }
        if (page == res?.totalPages) {
          setEndReached(true);
        }
        if(res) {
          setCompletedTrades((page == 1 ? [...res?.trades] || [] : [...completedTrades,...res?.trades])|| []);
          setCompletedCurrentPage(res?.currentPage||1);
          setCompletedTotalItems(res?.totalItems||0);
          setCompletedTotalPages(res?.totalPages||0);
        };
      })
      .catch((err) => {
        setError(true);
        setEndReached(true);
        console.log(err);
        showToast('Warning', 'Unable to fetch trades');
      }).finally(() => {
        setisLoading(false);
        setisMiddleLoading(false);
        setisRefreshing(false);
      })
  }



  const renderItem = ({ item, index }) => {

    return (
      <Item2 item={item} index={index} navigation={navigation} />

    )
  };


  const footerComplete = () => {
    return isLoading ? (

      <View style={[styles2.Row, styles2.alignCenter]}>
        <ActivityIndicator color={'#343434'} style={{ paddingVertical: 15 }} />
      </View>
    ) : null
  }

  const showEmpty = () => {
    return error ? null : (
      <Empty />
    )
  }


  const [tab, setTab] = useState('Ongoing');


  return (

    <>

{/*}
      <View style={[styles2.Row, styles2.mt10, { borderColor: '#ddd', borderBottomWidth: StyleSheet.hairlineWidth, width: '100%' }]}>
        <TouchableOpacity
          onPress={() => {
            setTab('Completed')
            screen('Completed')
          }}
          style={[styles2.tabLine, styles2.pb10, { borderColor: tab === 'Ongoing' ? '#1cc88a' : 'transparent', }]}>
          <MyText style={[styles2.textCenter, styles2.fontSize13, styles2.fontSemi, { color: tab === 'Ongoing' ? '#343434' : '#808080' }]}>Ongoing ({pendingTotalItems ? pendingTotalItems : 0})</MyText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setTab('Completed')
            screen('Completed')
          }}
          style={[styles2.tabLine, styles2.pb10, { borderColor: tab === 'Completed' ? '#1cc88a' : 'transparent', }]}>
          <MyText style={[styles2.textCenter, styles2.fontSize13, styles2.fontSemi, { color: tab === 'Completed' ? '#343434' : '#808080' }]}>Completed ({completedTotalItems ? completedTotalItems : 0})</MyText>
        </TouchableOpacity>


      </View>
        */}

      <View style={[]}>
          {error || (noDataFound && completedTrades?.length === 0)?
          error ? (

            <FetchError setRetry={() => handleRefresh()} />

          ) : (<NoDataFoundComponenet setRetry={() => handleRefresh()}></NoDataFoundComponenet>)
           : (
            <>
              {isMiddleLoading  ? (
                <View style={{ flex: 1, width: '100%', paddingHorizontal: 5, }}>
                  <View style={styles.emptyCont}>
                    <SkeletonPlaceholder>
                      <SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item flexDirection="row">
                          <SkeletonPlaceholder.Item height={40} width={40} borderRadius={30} />
                          <SkeletonPlaceholder.Item>
                            <SkeletonPlaceholder.Item marginLeft={8} marginBottom={5} height={15} width={100} borderRadius={10} />
                            <SkeletonPlaceholder.Item marginLeft={8} marginBottom={5} height={15} width={80} borderRadius={10} />
                          </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item marginTop={8} height={35} width={250} borderRadius={10} />
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>

                  </View>

                  <View style={styles.emptyCont}>
                    <SkeletonPlaceholder>
                      <SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item flexDirection="row">
                          <SkeletonPlaceholder.Item height={40} width={40} borderRadius={30} />
                          <SkeletonPlaceholder.Item>
                            <SkeletonPlaceholder.Item marginLeft={8} marginBottom={5} height={15} width={100} borderRadius={10} />
                            <SkeletonPlaceholder.Item marginLeft={8} marginBottom={5} height={15} width={80} borderRadius={10} />
                          </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item marginTop={8} height={35} width={250} borderRadius={10} />
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>

                  </View>
                </View>
              ) : (
                <>

                  <FlatList
                    refreshControl={
                      <RefreshControl
                        tintColor={'#343434'}
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                      />
                    }
                    style={[styles2.iosBar, {flexGrow: 1}]}
                    data={completedTrades}
                    renderItem={renderItem}
                    keyExtractor={(item,index) =>String(index)}
                    initialNumToRender={5}
                    maintainVisibleContentPosition={{
                      autoscrollToTopThreshold: 4,
                      minIndexForVisible: 1,
                    }}
                       ListEmptyComponent={showEmpty}
                    onEndReached={fetchNextCompleted}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={footerComplete}
                  />

                </>
              )}

              </>
          )}

            </View>

        {show !== 0 ? (

            <Animated.View
              style={{ transform: [{ translateY: slideAnim }], position: 'absolute', zIndex: 999, bottom: 0 }}>
              <CustomToast
                type={toastType}
                msg={toastMsg}
              />
            </Animated.View>
          ) : null}

      </>
      );
};
      export default CompletedTrades;

      export const PostFuncty = React.memo(Item2);