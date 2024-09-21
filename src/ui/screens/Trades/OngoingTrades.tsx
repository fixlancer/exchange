import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  FlatList,
  Animated,
  RefreshControl,
  ActivityIndicator,
  Platform
} from 'react-native';
import styles from './Style';
import newStyles from '../Styles/Styles';
import ModeratePageCard from '../../components/ModeratePageCard/Index';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MyText from '../../components/DefaultTextComponent/MyText';
import CustomToast from '../../components/CustomToast/CustomToast';
import { getTradesByPage_And_Status } from '../../../redux/redux/actions/tradeAction';
import Empty from '../../components/Empty/Index';
import FetchError from '../../components/FetchError/Index';
import { useTradesStore } from '../../../stores/store';
import NoDataFoundComponenet from '../../components/NoDataFound/Index';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

const Item = ({ item, index, navigation }) => {
  const { setDetailTrades } = useTradesStore()

  return (
    <View style={styles.cont}>

      {item.tradeStatus === 'Pending' ? (
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

          reDirecttoCardDetail={() => {
            setDetailTrades(item);
            navigation.navigate('tradeCardDetails', { page: "Pending" })
          }
          }

        />) : null}
    </View>
  )
}

const OngoingTrades = ({
  navigation,
}) => {

  const { completedTotalItems, pendingTotalItems, setDetailTrades, setCompletedTotalItems, setPendingTotalItems } = useTradesStore()

  const theme = useTheme()
  const styles2 = newStyles(theme);

  const [pendingTrades, setPendingTrades] = useState([]);
  const [pendingCurrentPage, setPendingCurrentPage] = useState(1);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isMiddleLoading, setisMiddleLoading] = useState(true);
  const [noDataFound, setNoDataFound] = useState(false);

  const [endReached, setEndReached] = useState(false);
  const [error, setError] = useState(false);


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
    setisMiddleLoading(true);
    setNoDataFound(false);
    getPendingTrades(1)
  }




  useEffect(() => {
    setisMiddleLoading(true);
    setNoDataFound(false);
    setError(false)
    getPendingTrades(1);
  }, [])


  const refreshNextOngoing = async () => {
    if (endReached) return;
    setisLoading(true);
    setError(false);
    await getPendingTrades(pendingCurrentPage + 1);
  };



  const getPendingTrades = async (page: number) => {
    getTradesByPage_And_Status("Pending", page)
      .then(res => {
        if (!res) {
          setPendingTotalItems(0);
          setNoDataFound(true);
          return
        }
        if (page === res?.totalPages) {
          setEndReached(true);
        }
        if (res) {
          if (res?.message == "No Pending trades found") {
            setNoDataFound(false);
          }
          setPendingTrades((page == 1 ? [...res?.trades] : [...pendingTrades, ...res?.trades]) || []);
          setPendingCurrentPage(res?.currentPage || 1);
          setPendingTotalItems(res?.totalItems || 0);
        }
      })
      .catch((err) => {
        setError(true);
        setEndReached(true);
      }).finally(() => {
        setisLoading(false);
        setisMiddleLoading(false);
        setisRefreshing(false);
      })
  }



  const renderItem = ({ item, index }) => {
    return (
      <Item item={item} index={index} navigation={navigation} />
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

      <View>

        {error || (noDataFound && pendingTrades?.length === 0) ?
          error ? (

            <FetchError setRetry={() => handleRefresh()} />

          ) : (<NoDataFoundComponenet setRetry={() => handleRefresh()}></NoDataFoundComponenet>) : (
            <>

              {isMiddleLoading ? (
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
                    data={pendingTrades}
                    refreshing={false}
                    renderItem={renderItem}
                    initialNumToRender={4}
                    maintainVisibleContentPosition={{
                      autoscrollToTopThreshold: 4,
                      minIndexForVisible: 1,
                    }}
                    keyExtractor={(item, index) => String(index)}
                    ListEmptyComponent={showEmpty}
                    onEndReached={() => {
                      refreshNextOngoing();
                    }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={footerComplete}

                  />

                  {/*pendingEmptyCount ? (
              <View style={{ width: '100%', flex: 1, paddingHorizontal: 5, marginTop: '-20%', }}>
                <MyText style={{ fontSize: 13, color: '#808080', textAlign: 'center', marginVertical: 0 }}>No trades yet</MyText>
              </View>
            ) : null
            */}
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

export default OngoingTrades;

export const PostFunctionalWay = React.memo(Item);