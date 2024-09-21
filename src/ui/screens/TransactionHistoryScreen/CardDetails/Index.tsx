import React, { useState, Fragment, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MyText from '../../../components/DefaultTextComponent/MyText';
import ImagePreviewModal from '../../../components/ImagePreviewModal';
import Style from './Style';
import newStyles from '../../Styles/Styles';
import CardList from './CardList';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderBack from '../../../components/Header/HeaderBack';
import { useTheme } from 'react-native-paper';


const { width, height } = Dimensions.get('window');

const TransDetails = ({ navigation, route }: any) => {
  const [previewImgPath, setpreviewImgPath] = useState(0);
  const [isPreviewImage, setisPreviewImage] = useState(false);
  const theme = useTheme()
  const styles = newStyles(theme);

  const [image, setImage] = useState(null);
  const { tradeData } = route.params;
  const [isLoading, setisLoading] = useState(false);
  const previewImage = (image) => {
    setpreviewImgPath(image);
    togglePreviewImgModal();
  };

  const togglePreviewImgModal = () => {
    setisPreviewImage(!isPreviewImage);
  };



  // console.log("INDEX => ",index);
  // console.log(tradeData.selected[index].tradeid);
  // const CardData = [
  //   {
  //     id: '1',
  //     // cardImage: require('../../../Assets/images/Fixes/fix1.jpg'),
  //     tradeTitle: 'Itunes',
  //     rate: '380',
  //     status: 'IN PROGRESS',
  //     cardValue: '100',
  //     transValue: '30000',
  //     createdAt: '27 May 2022'
  //   },
  // ]


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

        {isLoading ? (
          <View style={{ flex: 1, width: '100%', backgroundColor: '#f3f5f9', paddingHorizontal: 5, }}>
            <View style={Style.emptyCont}>
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item>
                  <SkeletonPlaceholder.Item flexDirection="row">
                    <SkeletonPlaceholder.Item height={40} width={40} borderRadius={30} />
                    <SkeletonPlaceholder.Item>
                      <SkeletonPlaceholder.Item marginLeft={8} marginBottom={5} height={10} width={100} borderRadius={10} />
                      <SkeletonPlaceholder.Item marginLeft={8} marginBottom={5} height={10} width={80} borderRadius={10} />
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
                      <SkeletonPlaceholder.Item marginLeft={8} marginBottom={5} height={10} width={100} borderRadius={10} />
                      <SkeletonPlaceholder.Item marginLeft={8} marginBottom={5} height={10} width={80} borderRadius={10} />
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

              {tradeData?.giftCards?.length > 0 ? (
                <View >
                  {
                    React.Children.toArray(
                      tradeData?.giftCards.map((card, index) => (
                        <View key={index}>
                          <CardList
                            id={index + 1}
                            tradeTitle={card?.cardTitle}
                            image={card?.cardImage}
                            rate={card?.cardRate}
                            status={card?.status}
                            cardValue={card?.cardValue}
                            cardCode={card?.cardCode}
                            cardType={card?.cardType}
                            country={card?.cardCountry}
                            transValue={card?.transactionValue}
                            createdAt={card?.createdAt}
                            navigation={navigation}
                            tradeData={tradeData}
                            declineReason={card?.declineReason}
                            declineReasonImage={card?.declineReasonImage}
                            giftcard={card}
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
                    marginVertical: 20,
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

      </SafeAreaView>
      <ImagePreviewModal
        image={previewImgPath}
        isPreviewImgVisible={isPreviewImage}
        togglePreviewImgModal={togglePreviewImgModal}
      />
    </Fragment>
  );
};

export default TransDetails;