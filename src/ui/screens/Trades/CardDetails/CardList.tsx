import React, { useState, Fragment, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StatusBar,
//Image,
  ImageBackground,
  Platform,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MyText from '../../../components/DefaultTextComponent/MyText';
import ImagePreviewModal from '../../../components/ImagePreviewModal';
import Style from './Style';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

const { width, height } = Dimensions.get('window');

interface Props {
  image: any;
  navigation: any;
  status: any;
  tradeTitle: any;
  transValue: any;
  time: any;
  date: any;
  cardValue: any;
  cardType: any;
  cardCode: any;
  country: any;
  declineReasonImage: any;
  declineReason: any;
  rate: any;
  id: any;
  giftcard: any;
}

const CardList: React.FC<Props> = props => {
  const CloudinaryBaseUrl = process.env.REACT_APP_CLOUDINARY_BASEURL;
  const { giftcard, navigation, image, status, cardValue, time, date, rate, country, cardType, cardCode, tradeTitle, transValue, id, declineReason,declineReasonImage } = props;
  const ecodeImg = require('../../../../Assets/CARDS/ecode.jpg');
  
  const [currency_format, setFormat] = useState('EUR');
  const [country_format, setCountryFormat] = useState('\u20AC');


  useEffect(() => {

  /*  if(country == 'US'){
      setFormat('USD')
    } else if (country == 'UK'){
      setFormat('GBP');
    } else if(country == 'CANADA'){
      setFormat('CAD')
    } else if(country == 'AUSTRALIA'){
      setFormat('AUD')
    } else if(country == 'SINGAPORE'){
      setFormat('SGD')
    } else {
      setFormat('EUR')
    }

*/
        //country

        if(country == 'US'){
          setCountryFormat('\u0024')
        } else if (country == 'UK'){
          setCountryFormat('\u00A3');
        } else if(country == 'CANADA'){
          setCountryFormat('CAD')
        } else if(country == 'AUSTRALIA'){
          setCountryFormat('\u20B3')
        } else if(country == 'SINGAPORE'){
          setCountryFormat('SGD')
        } else {
          setCountryFormat('\u20AC')
        }
    
  }, [country_format]);


/*
  const moneyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency_format,
  });
*/

  const ngnFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN'
  })


  const [previewImgPath, setpreviewImgPath]:any= useState("");
  const [isPreviewImage, setisPreviewImage] = useState(false);
  const [imgLoading, setImgLoading] = useState(false)

  const previewImage = (image) => {
    console.log(CloudinaryBaseUrl + image,"image");
    setpreviewImgPath({ uri: CloudinaryBaseUrl + image});
    togglePreviewImgModal();
  };

  const togglePreviewImgModal = () => {
    setisPreviewImage(!isPreviewImage);
  };

const renderLoader = () => {
return (
  <ActivityIndicator size={"small"} color={"#343434"}/>
)
}

  return (

    <View style={Style.mainBody}>
      <View style={Style.inlineCardPortion}>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row', marginTop: 0 }}>
            <View
              style={Style.number}>

              <MyText
                style={{
                  color: '#808080',
                  fontSize: 11,
                  textAlign: 'center'
                }}>
                {id}
              </MyText>
            </View>

            <View style={{ marginLeft: 6, marginTop: 5 }}>
              <MyText style={[{ color: '#808080', fontSize: 10 }]}>{date} {', '}{time} </MyText>

              <View style={{ flexDirection: 'row' }}>
                <MyText
                  style={{
                    color: '#343434',
                    fontSize: 13,
                    marginVertical: 3,
                  }}>
                  {tradeTitle}
                </MyText>

                {status === 'Pending' ? (
                  <Icon
                    name={'schedule'}
                    size={18}
                    color={'#f27415'}
                    style={{ marginLeft: 10, marginTop: 3 }}></Icon>

                ) : null}


                {status === 'Declined' ? (

                  <MyText style={[Style.mdFontGreyColor, { marginLeft: 10, marginTop: 4, color: '#ff0000' }]}>
                    Declined
                  </MyText>
                ) : null}


                {status === 'Completed' ? (
                  <Icon
                    name={'check-circle'}
                    size={18}
                    color={'#1cc88a'}
                    style={{ marginLeft: 10, marginTop: 3 }}></Icon>
                ) : null}

              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginLeft: -3,
              // position: 'relative',
              // right: 50,
            }}>
              
{cardType === 'Ecode' ? (

<>
<Image
                style={{
                  width: 40,backgroundColor:'#f2f2f2',borderRadius:4,
                  height: 40,
                  marginTop: 5,
                  justifyContent: 'center',
                }} 
                source={ecodeImg}
                imageStyle={{borderRadius:4,width:40, height:40,}}
                />
</>

) : (
  image ? (
            <TouchableOpacity
              activeOpacity={0.9}
              // onPress={() => previewImage(1)}>
              onPress={() => previewImage(image)}>

              <Image
                style={{
                  width: 40,backgroundColor:'#f2f2f2',borderRadius:4,
                  height: 40,
                  marginTop: 5,
                  justifyContent: 'center',
                }} 
                source={{ uri: CloudinaryBaseUrl + image}}
                imageStyle={{borderRadius:4,width:40, height:40}}
                indicator={renderLoader}
                />
              
            </TouchableOpacity>
  ) : null 
            )}       

          </View>
        </View>

        <View
          style={Style.lowerPortion}>

          <View style={Style.Row}>
            <MyText style={[Style.mdFontGreyColor, , {}]}>
              Card Value:
            </MyText>
            <MyText style={Style.mdFontBlackColor}>
            {country_format}{cardValue}
            </MyText>
          </View>

          <View style={Style.Row}>
            <MyText style={[Style.mdFontGreyColor, {}]}>
              Trans. Amount:
            </MyText>

            <MyText style={[Style.mdFontBlackColor, {}]}>
            {ngnFormat.format(transValue)}
            </MyText>
          </View>

          <View style={Style.Row}>
            <MyText style={[Style.mdFontGreyColor, {}]}>
              Country:
            </MyText>

            <MyText style={[Style.mdFontBlackColor, {}]}>
              {country}
            </MyText>
          </View>

{cardCode ? (
  <>
          <View style={Style.Row}>
          <MyText style={[Style.mdFontGreyColor, {}]}>
            Card Code:
          </MyText>

          <MyText style={[Style.mdFontBlackColor, {}]}>
            {cardCode}
          </MyText>
        </View>

</>
) : null }

          <View style={Style.Row}>
            <MyText style={[Style.mdFontGreyColor, {}]}>
              Rate:
            </MyText>

            <MyText style={Style.mdFontBlackColor}>
              {rate}/{country_format}
            </MyText>
          </View>



          {status === 'Declined' ? (

            <View
              style={Style.lowerPortion}>

              <View
                style={[
                  {
                    marginBottom: 0,
                    flexDirection: 'row',
                    paddingLeft: 5,
                    paddingRight: 5,
                  },
                ]}>
                <View>
                  <MyText
                    style={[{ color: 'gray', fontSize: 10, marginBottom: 2 }]}>
                    REASON FOR DECLINE
                  </MyText>
                  <MyText
                    style={[{ color: '#343434', fontSize: 11, marginBottom: 2 }]}>
                    {declineReason}
                  </MyText>
                </View>

                <View style={[{ flexDirection: 'row', marginLeft: 20 }]}>

                  {declineReasonImage.map((item, index) => (
                    <View key={index}>
                      {item ? (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        previewImage(item);
                      }}>
                      <Image
                     imageStyle={{borderRadius:4,}}
                      style={{
                        width: 40,borderRadius:4,
                        height: 40,backgroundColor:'#f2f2f2',
                        justifyContent: 'center',
                      }}
                      source={{ uri: CloudinaryBaseUrl + item }}
                      indicator={Progress.Circle}
                      indicatorProps={{
                        size: 25,
                        color: '#808080',
                      }} 
                        />
                    </TouchableOpacity>
                      ) : null }
                    </View>
                  ))}


                  {declineReason !== "Card is already redeemed" ? (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        navigation.navigate('RetryCard', { giftCardData: giftcard });
                      }}
                      style={
                        {
                          backgroundColor: '#1CC88A',
                          borderRadius: 4,
                          padding: 5,height:30,alignItems:'center',justifyContent:'center',
                          // width: 40,
                          marginLeft: 10,
                          marginTop: 5,
                        }}>
                      <MyText
                        style={[
                          {
                            color: 'white',
                            fontSize: 11,
                            alignSelf: 'center',
                            paddingLeft: 6,
                            paddingRight: 6,
                          },
                        ]}>
                        Retry
                      </MyText>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
          ) : null}
        </View>


        <ImagePreviewModal
          image={previewImgPath}
          isPreviewImgVisible={isPreviewImage}
          togglePreviewImgModal={togglePreviewImgModal}
        />
      </View>
    </View>
  );
};

export default CardList;