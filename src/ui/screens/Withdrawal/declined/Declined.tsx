import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, Animated, FlatList, Platform, RefreshControl } from 'react-native';
import MyText from '../../../components/DefaultTextComponent/MyText';
import styles from './Style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomToast from '../../../components/CustomToast/CustomToast';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { getWithdrawalTransactions } from '../../../../redux/redux/actions/userAction';


const Item = ({ item, index }) => {
    const formattedDateTime = (createdAt) => {
        const dateObj = new Date(createdAt);
        const date = dateObj.toLocaleDateString();
        const time = dateObj.toLocaleTimeString();
        return `${date}, ${time}`;
      }
    return (
        <>
            <View key={index+1} style={styles.mainBody}>

                <View style={styles.inlineCardPortion}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <MyText style={[{ color: '#808080', fontSize: 10 }]}>{formattedDateTime(item?.createdAt)}</MyText>
                            <MyText
                                style={{
                                    color: '#343434',
                                    fontSize: 16,
                                    marginTop: 3,
                                }}>
                                {'\u20A6'}{item?.transactionAmount}
                            </MyText>
                        </View>
                        <View>
                        <Icon
                                name={'block'}
                                size={18}
                                color={'#ff0000'}
                                style={{ marginLeft: 10, marginTop: 3 }}></Icon>
                        </View>
                    </View>

                    <View style={styles.amountPortion}>

                        <View style={styles.Row}>
                            <MyText style={styles.mdFontGreyColor}>
                                Account No:
                            </MyText>
                            <MyText style={styles.mdFontBlackColor}>
                                {item?.bankDetails?.accountNumber || 'none'}
                            </MyText>
                        </View>

                        <View style={styles.Row}>
                            <MyText style={styles.mdFontGreyColor}>
                                Account Name:
                            </MyText>
                            <MyText style={styles.mdFontBlackColor}>
                                {item?.bankDetails?.accountTitle || 'none'}
                            </MyText>
                        </View>

                        <View style={styles.Row}>
                            <MyText style={styles.mdFontGreyColor}>
                                Bank:
                            </MyText>
                            <MyText style={[styles.mdFontBlackColor, { color: '#343434' }]}>
                                {item?.bankDetails?.bankName || 'none'}
                            </MyText>
                        </View>

                    </View>

                </View>
            </View>
        </>
    )
}


export default function Declined() {

    
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


    const [declinedWithdrawals, setDeclinedWithdrawals] = useState([]);
    const [declinedWithdrawalLoading, setdeclinedWithdrawalLoading] = useState(false);
    const [isRefreshing, setisRefreshing] = useState(false);
    const [currentPage, setcurrentPage] = useState(1);
    const [isMiddleLoading, setisMiddleLoading] = useState(true);
    const [endReached, setEndReached] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchNextDeclined();
    }, [])


    const handleDeclinedRefresh = async () => {
        setcurrentPage(0);
        setEndReached(false);
        setisMiddleLoading(true);
        await getPendingWithdrawals(1);
    };


    useEffect(() => {
            fetchNextDeclined();
    }, [])

 
    const fetchNextDeclined = async () => {
        if (endReached) {
            return;
        }
        setisRefreshing(true);
       await getPendingWithdrawals();
    };


    const getPendingWithdrawals = async (page?:number) => {
        await getWithdrawalTransactions(page || currentPage+1,'Declined')
             .then(res => {
                 if (res?.withdrawalTransactions?.length < 5) {
                     setEndReached(true);
                 }
                 if (res.currentPage !== 1) {
                     setDeclinedWithdrawals((prev) => prev.concat(res?.withdrawalTransactions || []));
                 }else{
                    setDeclinedWithdrawals(res?.withdrawalTransactions || []);
                 }
                 setcurrentPage(res?.currentPage);
             })
             .catch((err) => {
                 setError(true);
                 setEndReached(true);
                 showToast('Warning', 'Unable to fetch withdrawals');
                 console.log("Error", err);
             }).finally(() => {
                 setdeclinedWithdrawalLoading(false);
                 setisMiddleLoading(false);
                 setisRefreshing(false);
             })
     }
 



    const emptyMsg = ({ item }) => {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center', paddingTop: 20
                }}>
                <Text
                    style={{
                        fontSize: 13, alignSelf: 'center',
                        fontFamily: 'Nunito-Regular',
                    }}>
                    No Transactions yet
                </Text>
            </View>
        )
    }



  const renderItem = ({ item, index }) => {

    return (
        <Item item={item} index={index} />
    )
    }


    const footerComplete = () => {
        return declinedWithdrawalLoading ? (
    
          <View style={{ justifyContent: 'center', flexDirection: 'row', alignContent: 'center', }}>
            <ActivityIndicator color={'#343434'} style={{ paddingVertical: 15 }} />
          </View>
        ) : null
      }

    return (
        <>
            {/* {declinedWithdrawalLoading && declinedWithdrawals.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', marginTop: '50%', alignItems: 'center', }}>
                    <View style={styles.loader}>
                        <ActivityIndicator color={'#fff'} />
                    </View>
                </View>
            ) : ( */}

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
                            onRefresh={handleDeclinedRefresh}
                        />
                    }
                    contentContainerStyle={{paddingBottom:Platform.OS === 'ios' ? 50 : 20,}}
                    style={{ paddingVertical: 5, paddingHorizontal: 7, }}
                    data={declinedWithdrawals}
                    getItemLayout={(data, index) => ({
                      length: 135,
                      offset: 135 * index,
                      index
                      })
                      } 
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key}
                    initialNumToRender={10}
                    maintainVisibleContentPosition={{
                        autoscrollToTopThreshold: 10,
                    minIndexForVisible: 1,
                  }} 
                    ListEmptyComponent={emptyMsg}
                    onEndReached={fetchNextDeclined}
                    onEndReachedThreshold={0.01}
                    ListFooterComponent={footerComplete}
                />


                </>

)}

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
    )
}


export const PostFunctionalWay = React.memo(Item);