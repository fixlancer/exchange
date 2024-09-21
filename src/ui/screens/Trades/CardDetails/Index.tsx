import React, { useState, Fragment, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StatusBar,
  ImageBackground,
  Platform,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MyText from '../../../components/DefaultTextComponent/MyText';
import ImagePreviewModal from '../../../components/ImagePreviewModal';
import Style from './Style';
import newStyles from '../../Styles/Styles';
import CardList from './CardList';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FetchError from '../../../components/FetchError/Index';
import { useTradesStore } from '../../../../stores/store';
import HeaderBack from '../../../components/Header/HeaderBack';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const TradeCardDetails = ({ navigation }) => {

  const { detailTrades } = useTradesStore()

  const theme = useTheme()
  const styles = newStyles(theme);

  const [previewImgPath, setpreviewImgPath] = useState(0);
  const [isPreviewImage, setisPreviewImage] = useState(false);
  const [error, setError] = useState(false);
  const tradeData = detailTrades;
  console.log(tradeData, "Data");
  const [isLoading, setisLoading] = useState(false);
  console.log(tradeData, "tradeData");



  const handleRefresh = () => {
    // fetchList();
  }

  const previewImage = (image) => {
    setpreviewImgPath(image);
    togglePreviewImgModal();
  };

  const togglePreviewImgModal = () => {
    setisPreviewImage(!isPreviewImage);
  };

  const navigateBack = () => {
    navigation.goBack(null);
  };


  return (
    <Fragment>

      <SafeAreaView
        style={{
          height: height,
          width: width,
          flex: 1,
          backgroundColor: 'transparent',
        }}
        edges={['left', 'right', 'top']}>
        <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

        {isLoading ? (
          <></>
        ) : (
          <HeaderBack navigation={navigation} headerTitle={tradeData && tradeData?.tradeTitle + '-' + tradeData?.tradeId} />
        )}


        {error ? (

          <FetchError setRetry={() => handleRefresh()} />

        ) : (

          <>
            {isLoading ? (
              <View style={{ flex: 1, width: '100%', backgroundColor: '#f3f5f9', paddingHorizontal: 5, }}>
                <View style={Style.emptyCont}>
                  <SkeletonPlaceholder>
                    <SkeletonPlaceholder.Item>
                      <SkeletonPlaceholder.Item flexDirection="row">
                        <SkeletonPlaceholder.Item height={40} width={40} borderRadius={30} />
                        <SkeletonPlaceholder.Item>
                          <SkeletonPlaceholder.Item marginLeft={8} marginBottom={5} height={15} width={100} borderRadius={10} />
                          <SkeletonPlaceholder.Item marginLeft={8} marginBottom={5} height={15} width={80} borderRadius={10} />
                        </SkeletonPlaceholder.Item>
                      </SkeletonPlaceholder.Item>

                      <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between">
                        <SkeletonPlaceholder.Item>
                          <SkeletonPlaceholder.Item height={15} marginTop={5} marginBottom={5} width={160} borderRadius={10} />
                          <SkeletonPlaceholder.Item height={15} marginBottom={5} width={140} borderRadius={10} />
                        </SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item>
                          <SkeletonPlaceholder.Item marginTop={5} marginBottom={5} height={15} width={40} borderRadius={10} />
                          <SkeletonPlaceholder.Item marginBottom={5} height={15} width={40} borderRadius={10} />
                        </SkeletonPlaceholder.Item>
                      </SkeletonPlaceholder.Item>

                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder>

                </View>

                <View style={Style.emptyCont}>
                  <SkeletonPlaceholder>
                    <SkeletonPlaceholder.Item>
                      <SkeletonPlaceholder.Item flexDirection="row">
                        <SkeletonPlaceholder.Item height={40} width={40} borderRadius={30} />
                        <SkeletonPlaceholder.Item>
                          <SkeletonPlaceholder.Item marginLeft={8} marginBottom={5} height={15} width={100} borderRadius={10} />
                          <SkeletonPlaceholder.Item marginLeft={8} marginBottom={5} height={15} width={80} borderRadius={10} />
                        </SkeletonPlaceholder.Item>
                      </SkeletonPlaceholder.Item>

                      <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between">
                        <SkeletonPlaceholder.Item>
                          <SkeletonPlaceholder.Item height={15} marginTop={5} marginBottom={5} width={160} borderRadius={10} />
                          <SkeletonPlaceholder.Item height={15} marginBottom={5} width={140} borderRadius={10} />
                        </SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item>
                          <SkeletonPlaceholder.Item marginTop={5} marginBottom={5} height={15} width={40} borderRadius={10} />
                          <SkeletonPlaceholder.Item marginBottom={5} height={15} width={40} borderRadius={10} />
                        </SkeletonPlaceholder.Item>
                      </SkeletonPlaceholder.Item>

                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder>

                </View>

              </View>
            ) : (

              <ScrollView style={[styles.iosBar, styles.bgGrey]}>

                <View style={Style.cont}>

                  {tradeData ? (
                    <View key={tradeData.tradeId}>
                      {
                        React.Children.toArray(
                          tradeData?.giftCards?.map((giftcard, index1) => (
                            <View key={index1 + 1}>
                              <CardList
                                id={index1 + 1}
                                tradeTitle={giftcard?.cardTitle}
                                image={giftcard?.cardImage}
                                rate={giftcard?.cardRate}
                                status={giftcard?.status}
                                cardValue={giftcard?.cardValue}
                                cardCode={giftcard?.cardCode}
                                cardType={giftcard?.cardType}
                                country={giftcard?.cardCountry}
                                transValue={giftcard?.transactionValue}
                                declineReasonImage={giftcard?.declineReasonImage && giftcard?.declineReasonImage.length ? giftcard?.declineReasonImage : []}
                                declineReason={giftcard?.declineReason}
                                date={new Date(tradeData?.createdAt).toDateString()}
                                time={new Date(tradeData?.createdAt).toLocaleTimeString()}
                                navigation={navigation}
                                giftcard={giftcard}

                              />
                            </View>

                          ))

                        )}
                    </View>
                  ) : (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: 'Nunito-Regular',
                        }}>
                        No record found
                      </Text>
                    </View>
                  )}

                </View>
              </ScrollView>
            )}

          </>
        )}



      </SafeAreaView>
      <ImagePreviewModal
        image={previewImgPath}
        isPreviewImgVisible={isPreviewImage}
        togglePreviewImgModal={togglePreviewImgModal}
      />
    </Fragment>
  );
};

export default TradeCardDetails;