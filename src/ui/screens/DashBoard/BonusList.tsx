import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native';
import MyText from '../../components/DefaultTextComponent/MyText';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { getToken, NAIRA } from '../../../utils/utils';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  total_amount: any;
  amount: any;
  id: any;
  bonusStatus: any;
  duration: any;
  user_won: any;
  win_amount: any;
  expiry: any;
  maxWinners: any;
  winSelection: any;
}

const BonusList: React.FC<Props> = props => {

  const { total_amount, id, user_won, amount, duration, bonusStatus, win_amount, expiry, maxWinners, winSelection } = props;

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

  return (

    <>
      {bonusStatus !== 'resume' ? (
        null
      ) : (

        <View style={[styles.mainBody, { borderBottomWidth: user_won !== 1 ? 0 : 1, borderColor: user_won !== 1 ? '#fff' : '#1cc88a' }]}>

          <View style={styles.inlineCardPortion}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

              <View>
                <View style={{ flexDirection: 'row', }}>
                  {user_won !== 1 ? (
                    <View style={styles.iStorage}>
                      <Icon
                        name={'emoji-events'}
                        size={19}
                        color={'#92b7cb'}
                        style={{ alignSelf: 'center' }}></Icon>
                    </View>
                  ) : (
                    <View style={[styles.iStorage, { backgroundColor: '#e7fbda' }]}>
                      <Icon
                        name={'emoji-events'}
                        size={19}
                        color={'#1cc88a'}
                        style={{ alignSelf: 'center' }}></Icon>
                    </View>
                  )}

                  <View>

                    <MyText
                      style={{
                        color: '#343434',
                        fontSize: 14,
                        marginVertical: 3,
                      }}>
                      {NAIRA}{win_amount}
                    </MyText>

                    <MyText
                      style={{
                        color: '#808080',
                        fontFamily: 'Nunito-Regular',
                        fontSize: 11,
                      }}>Trade atleast ${total_amount} worth of giftcards</MyText>

                    <MyText
                      style={{
                        color: '#808080',
                        fontFamily: 'Nunito-Regular',
                        fontSize: 11,
                      }}>{duration} to win {NAIRA}{win_amount}
                    </MyText>
                  </View>
                </View>
              </View>

              <View>

                
                  <Icon
                    name={'schedule'}
                    size={18}
                    color={'#6e9eb8'}
                    style={{ marginLeft: 10, marginTop: 3 }}></Icon>

              </View>
            </View>


            <View style={styles.amountPortion}>

              <View style={styles.Row}>
                <MyText style={styles.mdFontGreyColor}>
                  Amount Traded:
                </MyText>
                {amount < total_amount ? (
                  
                  amount === 0 || amount === null || !amount || amount === '' ? (
                    <MyText style={styles.mdFontBlackColor}>
                      $0
                    </MyText>
                  ) : (
                    <MyText style={styles.mdFontBlackColor}>${amount}</MyText>
                  )
                ) : (
                  <MyText style={styles.mdFontBlackColor}>${total_amount}</MyText>
                )}
              </View>

              <View style={[styles.Row, { marginTop: 10 }]}>
                <MyText style={styles.mdFontGreyColor}>
                  Expires:
                </MyText>
                <View style={styles.Row}>
                  <Icon
                    name={'timer'}
                    size={15}
                    color={'#808080'}
                    style={{ marginRight: 2, marginTop: 1 }}></Icon>
                  <MyText style={[styles.mdFontBlackColor, { color: '#343434' }]}>
                    {expiry}
                  </MyText>
                </View>

              </View>
              {/*
            <View style={[styles.Row,  {marginTop: 10}]}>
              <MyText style={styles.mdFontGreyColor}>
                Eligible Levels:
              </MyText>
              
              <View style={{flexDirection:'row'}}>

{imgLevel.map((item, index) => {
  return (
    <View key={index}>
<Image
        style={{
          alignSelf: 'center',
          marginVertical: 0,
          width: 28,
          height:40,
        }}
        source={item.img}
      />
      </View>
    )}
)}
      </View>
            </View>
      */}


              {winSelection === 'Random' ? (
                <View style={[styles.Row, { marginTop: 10, justifyContent: 'center', paddingVertical: 10, borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#f2f2f2' }]}>
                  <MyText style={[styles.mdFontGreyColor, { textAlign: 'center', color: '#808080' }]}>
                    {maxWinners} winners to be picked randomly
                  </MyText>

                </View>
              ) : (
                <View style={[styles.Row, { marginTop: 10, justifyContent: 'center', paddingVertical: 10, borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#f2f2f2' }]}>
                  <MyText style={[styles.mdFontGreyColor, { alignItems: 'center', marginTop: 10, textAlign: 'center' }]}>
                    First {maxWinners} users to reach the target wins
                  </MyText>

                </View>
              )}

            </View>

          </View>
        </View>

      )}


    </>

  );
};

const styles = StyleSheet.create({
  mainBody: {
    width: '100%',
    height: 'auto',
    backgroundColor: 'white',
    marginBottom: 8,
    marginHorizontal: 0,
    borderRadius: 8,
    padding: 5,
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

export default BonusList;