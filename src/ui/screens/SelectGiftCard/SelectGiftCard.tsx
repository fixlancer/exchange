import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableNativeFeedback,
  Keyboard,
  StatusBar,
  ActivityIndicator,
  Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import MyText from '../../components/DefaultTextComponent/MyText';
import { getCardList } from '../../../redux/redux/actions/cardAction';
import { RootState } from '../../../redux/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateToken } from '../../../redux/redux/axios/axios';
import { useCardStore, useSettingsStore } from '../../../stores/store'
import { getSettings } from '../../../redux/redux/actions/userAction';
import HeaderBack from '../../components/Header/HeaderBack';
import newStyles from '../Styles/Styles';
import { useTheme } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('screen');

const SelectGiftCard = ({ navigation }) => {

  const theme = useTheme()
  const styles2 = newStyles(theme);

  const { settings, setSettings } = useSettingsStore();
  const { cards, setCards } = useCardStore();
  const [headerText, setheaderText] = useState('Select Giftcard');
  const [isLoading, setIsLoading] = React.useState(false);
  // const { cards } = useSelector((state: RootState) => state.cardReducer);


  useEffect(() => {
    setIsLoading(true)
    updateSettings();
    getCardList().then(res => {

      if (res) {
        setCards(res)
        setIsLoading(false)
      }
    }
    ).catch(err => {
      console.log("error getting cards", err);
      setIsLoading(false);
    })

  }, [])

  const changeHeaderText = (ImageIndex: number) => {

    let name: string = cards[ImageIndex].cardName;

    if (name) {
      navigation.navigate('UploadGiftCard', {
        headerTitle: `${name}`,
        icon: `${name}`
      });
    }
  };

  const updateSettings = async () => {
    await getSettings().then(res => {
      if (res) {
        setSettings(res);
      }
    }, err => {
      const { data } = err.response;
      console.log('error getting settings', data);
    });
  }

  const bgImg = require('../../../Assets/premiumBG.png');


  return (
    <View style={[styles2.container]}>

      {theme.dark ? null :
        <Image
          source={bgImg}
          style={styles2.accountBG}
        />
      }

      <SafeAreaView
        style={{
          height: height,
          width: width,
          flex: 1,
          backgroundColor: 'transparent',
        }}
        edges={['left', 'right', 'top']}>
        <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

        <HeaderBack navigation={navigation} headerTitle={'Select giftcard'} />

        {settings && settings?.allowGiftcardTrading === false ? (
                          <View style={{ flex: 1 }}>
                          <View style={[styles2.alignCenter, styles2.pt30, { height: '100%', width: '100%' }]}>
        
                            <View style={[styles2.circleBg, styles2.bgWhite]}>
                              <IconM
                                name={'warning-outline'}
                                size={moderateScale(30)}
                                color={theme.dark ? '#fff' : '#343434'}
                                style={{ alignSelf: 'center' }}
                              />
                            </View>
                            <MyText style={[styles2.largeLabel, styles2.fontSize13, styles2.pt15, styles2.textCenter]}>
              We are not accepting Giftcard trades at the moment. Check back later</MyText>
        
                          </View>
        
                        </View>
        ) : null}

        <ScrollView style={[styles2.iosBar]} showsVerticalScrollIndicator={false}>

          {isLoading ? (
            <View style={[styles().whiteCardBg, {}]}>
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item flexDirection="row" justifyContent="center">
                  <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between">
                    <SkeletonPlaceholder.Item marginBottom={10} height={(width - 60) / 2} width={(width - 60) / 2} borderRadius={30} />
                    <SkeletonPlaceholder.Item marginLeft={20} marginBottom={10} height={(width - 60) / 2} width={(width - 60) / 2} borderRadius={30} />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>


              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item marginTop={10} flexDirection="row" justifyContent="center">
                  <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between">
                    <SkeletonPlaceholder.Item marginBottom={10} height={(width - 60) / 2} width={(width - 60) / 2} borderRadius={30} />
                    <SkeletonPlaceholder.Item marginLeft={20} marginBottom={10} height={(width - 60) / 2} width={(width - 60) / 2} borderRadius={30} />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>

              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item marginTop={10} flexDirection="row" justifyContent="center">
                  <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between">
                    <SkeletonPlaceholder.Item marginBottom={10} height={(width - 60) / 2} width={(width - 60) / 2} borderRadius={30} />
                    <SkeletonPlaceholder.Item marginLeft={20} marginBottom={10} height={(width - 60) / 2} width={(width - 60) / 2} borderRadius={30} />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>

              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item marginTop={10} flexDirection="row" justifyContent="center">
                  <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between">
                    <SkeletonPlaceholder.Item marginBottom={10} height={(width - 60) / 2} width={(width - 60) / 2} borderRadius={30} />
                    <SkeletonPlaceholder.Item marginLeft={20} marginBottom={10} height={(width - 60) / 2} width={(width - 60) / 2} borderRadius={30} />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            </View>
          ) : (

            <View style={[styles().whiteCardBg, {}]}>
              {cards && cards.length > 0 ? (
                <>
                  {cards.map((item, index) => {
                    return (
                      // setting && setting[0].giftcard_status === true 
                      cards ? (
                        !item.disabled ? (
                          <TouchableOpacity
                            onPress={() => changeHeaderText(index)}
                            key={index}
                            style={{
                              backgroundColor: theme.dark ? '#343434' : '#fff',
                              borderWidth: 1,
                              borderColor: theme.dark ? '#535353' : '#f1f1f1',
                              width: (width - 60) / 2,
                              alignItems: 'center',
                              borderRadius: 30,
                              marginTop: 10,
                              height: (width - 60) / 2,
                              alignContent: 'center',
                              justifyContent: 'center',
                            }}>

                            <Image key={index} source={

                              item.cardName == 'ITUNES' ?
                                require('../../../Assets/CARDS/itunes.png')
                                : item.cardName == 'STEAM' ?
                                  require('../../../Assets/CARDS/steam.png')
                                  : item.cardName == 'GOOGLE PLAY' ?
                                    require('../../../Assets/CARDS/Googleplay.png')
                                    : item.cardName == 'SEPHORA' ?
                                      require('../../../Assets/CARDS/sephora.png')
                                      : item.cardName == 'AMERICAN EXPRESS' ?
                                        require('../../../Assets/CARDS/americanexpress.png')
                                        : item.cardName == 'VANILLA' ?
                                          require('../../../Assets/CARDS/vanilla.png')
                                          : item.cardName == 'WALMART' ?
                                            require('../../../Assets/CARDS/walmart.png')
                                            : item.cardName == 'VISA' ?
                                              require('../../../Assets/CARDS/visa.png')
                                              : item.cardName == 'EBAY' ?
                                                require('../../../Assets/CARDS/ebay.png')
                                                : item.cardName == 'AMAZON' ?
                                                  require('../../../Assets/CARDS/amazon.png')
                                                  : item.cardName == 'NORDSTROM' ?
                                                    require('../../../Assets/CARDS/nordstrom.png')
                                                    : item.cardName == 'NIKE' ?
                                                      require('../../../Assets/CARDS/nike.png')
                                                      : item.cardName == 'FOOTLOCKER' ?
                                                        require('../../../Assets/CARDS/footlocker.png')
                                                        : null
                            } style={styles().image} />
                          </TouchableOpacity>
                        ) : (
                          null
                        )
                      ) : (

                        <TouchableOpacity
                          key={index}
                          style={{
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: '#f1f1f1',
                            width: (width - 60) / 2,
                            alignItems: 'center',
                            borderRadius: 30,
                            marginTop: 10,
                            height: (width - 60) / 2,
                            alignContent: 'center',
                            justifyContent: 'center',
                          }}>

                          <Image key={index} source={
                            item.cardName == 'ITUNES' ?
                              require('../../../Assets/CARDS/itunes.png')
                              : item.cardName == 'STEAM' ?
                                require('../../../Assets/CARDS/steam.png')
                                : item.cardName == 'GOOGLE PLAY' ?
                                  require('../../../Assets/CARDS/Googleplay.png')
                                  : item.cardName == 'SEPHORA' ?
                                    require('../../../Assets/CARDS/sephora.png')
                                    : item.cardName == 'AMERICAN EXPRESS' ?
                                      require('../../../Assets/CARDS/americanexpress.png')
                                      : item.cardName == 'VANILLA' ?
                                        require('../../../Assets/CARDS/vanilla.png')
                                        : item.cardName == 'WALMART' ?
                                          require('../../../Assets/CARDS/walmart.png')
                                          : item.cardName == 'VISA' ?
                                            require('../../../Assets/CARDS/vanilla.png')
                                            : item.cardName == 'EBAY' ?
                                              require('../../../Assets/CARDS/ebay.png')
                                              : item.cardName == 'AMAZON' ?
                                                require('../../../Assets/CARDS/amazon.png')
                                                : item.cardName == 'NORDSTROM' ?
                                                  require('../../../Assets/CARDS/nordstrom.png')
                                                  : item.cardName == 'NIKE' ?
                                                    require('../../../Assets/CARDS/nike.png')
                                                    : item.cardName == 'FOOTLOCKER' ?
                                                      require('../../../Assets/CARDS/footlocker.png')
                                                      : null
                          } style={styles().image} />

                        </TouchableOpacity>
                      )
                    );
                  })}


                  <View style={{ paddingHorizontal: 15, paddingTop: 20, justifyContent: 'center', width: '100%' }}>

                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center', padding: 8, paddingHorizontal: 0,
                        marginVertical: 20,
                      }}>
                      <MyText
                        style={{
                          fontSize: 12, textAlign: 'center',
                          fontFamily: 'Nunito-Regular', color: '#808080',
                        }}>
                        Can't find the giftcard you want to trade?
                      </MyText>
                    </View>


                    <TouchableOpacity onPress={() => {
                      Linking.openURL('https://wa.me/message/SBTZ6V4ASELQB1');
                    }}
                      style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 10, marginBottom: 10, width: '100%', height: 'auto', }}>

                      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={[styles().roundClose2, { backgroundColor: '#1cc88a' }]}>
                          <IconM
                            name={'logo-whatsapp'}
                            size={15}
                            color={'#fff'}
                            style={{ alignSelf: 'center' }} />
                        </View>

                        <MyText style={[styles2.textDark, styles2.fontSize13, styles2.pl10, { marginTop: moderateScale(2) }]}>Whatsapp us</MyText>
                      </View>
                    </TouchableOpacity>
                  </View>

                </>
              ) : (


                <View style={{ flex: 1 }}>
                  <View style={[styles2.alignCenter, styles2.pt30, { height: '100%', width: '100%' }]}>

                    <View style={[styles2.circleBg, styles2.bgWhite]}>
                      <IconM
                        name={'folder-open-outline'}
                        size={moderateScale(30)}
                        color={theme.dark ? '#fff' : '#343434'}
                        style={{ alignSelf: 'center' }}
                      />
                    </View>
                    <MyText style={[styles2.largeLabel, styles2.fontSize13, styles2.pt15, styles2.textCenter]}>No cards available yet. Check back later</MyText>

                  </View>

                </View>
              )}


            </View>

          )}

        </ScrollView>

      </SafeAreaView>

    </View>

  );
};

const styles = () =>
  StyleSheet.create({
    image: {
      width: 75,
      height: 75, borderRadius: 15,
      marginVertical: 20,
    },
    header: {
      width: width,
      height: 60,
      backgroundColor: '#fff',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#DDDDDD',
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
    whiteCardBg: {
      //flex: 75,
      //height: '75%',
      //  backgroundColor: '#f3f5f9',
      width: width,
      padding: 20,
      //paddingTop: 30,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    Heading: {
      fontWeight: '700',
      alignSelf: 'center',
      fontSize: 15,
      color: '#343434',
    },
    TextInputStyle: {
      backgroundColor: '#fafafa',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#949494',
      paddingLeft: 10,
      color: '#000',
      fontFamily: 'Nunito-Regular',
    },
    GreenButton: {
      borderWidth: 1,
      borderColor: '#1CC88A',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 15,
      fontSize: 15,
      fontWeight: '700',
      color: '#fafafa',
      backgroundColor: '#1CC88A',
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 50 },
      shadowOpacity: 0.25,
      shadowRadius: 5,
      elevation: 5,
      //marginTop: 20,
      //marginBottom: 10
    },
    BottomRowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    loader: {
      backgroundColor: '#000', height: 50, justifyContent: 'center', alignItems: 'center', width: 50, padding: 10, borderRadius: 10, elevation: 2,
    },
    emptyCont: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#f1f1f1',
      width: '100%',
      alignItems: 'center',
      borderRadius: 30,
      marginTop: 10,
      height: (width - 60) / 2,
      alignContent: 'center',
      justifyContent: 'center',
    },
    roundClose2: {
      backgroundColor: '#5f8692', width: 25, height: 25, borderRadius: 30, justifyContent: 'center', alignItems: 'center',
    },
  });
export default SelectGiftCard;
