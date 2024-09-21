import { View, Text, StatusBar, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Platform } from 'react-native'
import React from 'react'
import Modal from 'react-native-modalbox';
import MyText from '../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles1 from './Styles';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
const { width, height } = Dimensions.get('window');

interface Props {
    isOpen: boolean;
    handleChange: any;
  }
  
  const LearnMore: React.FC<Props> = props => {
    return (
     
        <Modal isOpen={props.isOpen}
        style={{ backgroundColor: '#fff' }}
        keyboardTopOffset={Platform.OS == 'ios' ? 22 : 0}
        swipeToClose={false}
        onClosed={props.handleChange}
        backdropOpacity={1}
        backdropColor="white"
        position="top">  

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
          <TouchableOpacity onPress={() => props.handleChange()}>
        <Icon
          name={'arrow-back-ios'}
          size={20}
          color={'#808080'}
          style={{ marginVertical: 20 }}></Icon>
          </TouchableOpacity>

        <MyText
          style={{
            fontSize: 20,fontFamily: 'Nunito-Bold', fontWeight: '600', 
            marginBottom: 15,
          }}>
          How it Works
        </MyText>
      </View>

      <ScrollView>
        <TouchableOpacity activeOpacity={0.9}>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20, width: '100%', height: '100%',
              backgroundColor: '#ffffff',
            }}>
            <MyText style={{ fontSize: 14, color: '#343434',  fontWeight: '600', marginTop: 0 }}>
              In this program you get to win CASH or Airtime bonus when you trade and reach a target that is set on your dashboard.
            </MyText>
            <MyText style={{ fontSize: 14, color: '#33383F', fontFamily: 'Nunito-Bold', fontWeight: '600', marginTop: 20 }}>Key Terms</MyText>
            <MyText style={{ fontSize: 13, color: '#343434',  fontWeight: '600', marginTop: 20 }}>
              <MyText style={{ fontSize: 14, }}>Duration -</MyText> This simply means Daily, Weekly, Monthly, Yearly or a particular Day of the week.
            </MyText>
            <MyText style={{ fontSize: 13, color: '#343434',  fontWeight: '600', marginTop: 20 }}>
              <MyText style={{ fontSize: 14, }}>Transaction type -</MyText> This is either Giftcard or Bitcoin/USDT transaction.
            </MyText>
            <MyText style={{ fontSize: 13, color: '#343434',  fontWeight: '600', marginTop: 20 }}>
              <MyText style={{ fontSize: 14, }}>Eligible levels (coming soon) -</MyText> These are user levels that are eligible to participate on a particular bonus.
            </MyText>
            <View>
              <MyText style={{ fontSize: 14, color: '#343434', fontFamily: 'Nunito-Bold', fontWeight: '600', marginTop: 40 }}>Example 1:</MyText>
              <MyText style={{ fontSize: 13, color: '#343434',  fontWeight: '600' }}>
                If there are 2 bonuses with thesame duration on the dashboard and transaction type and you meet both targets, you will be credited with the highest winnings.
              </MyText>
            </View>
            <View>
              <MyText style={{ fontSize: 14, color: '#343434', fontFamily: 'Nunito-Bold', fontWeight: '600', marginTop: 20 }}>Example 2:</MyText>
              <MyText style={{ fontSize: 13, color: '#343434',  fontWeight: '600' }}>
                If there are two bonuses with thesame duration, but different transaction type and you meet both targets, you will be credited with both winnings at the end of each duration.
              </MyText>
            </View>
            <View>
              <MyText style={{ fontSize: 14, color: '#343434', fontFamily: 'Nunito-Bold', fontWeight: '600', marginTop: 20 }}>Example 3:</MyText>
              <MyText style={{ fontSize: 13, color: '#343434',  fontWeight: '600' }}>
                If there are two bonuses with different duration, one is set ‘monthly’, while the other ‘yearly’ and you meet both targets, you will be credited with both winnings at the end of each duration.
              </MyText>
            </View>
            <View>
              <View>
                <MyText style={{ fontSize: 14, color: '#343434',  fontWeight: '600', marginTop: 20 }}>NB</MyText>
                <View style={{ width: 20, height: 1, backgroundColor: '#343434' }} />
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5, flexWrap: 'nowrap' }}>
                <View style={{ width: 8, height: 8, backgroundColor: 'black', borderRadius: 50, marginRight: 10, marginLeft: 0, marginTop: 6 }} />
                <MyText style={{ fontSize: 13, color: '#343434',  fontWeight: '600' }}>
                  Winnings are credited either to your cash or airtime balance depending on the bonus you won. {"\n"}Cash bonus can be withdrawn to your bank account, while airtime bonus can only be used for airtime purchases.
                </MyText>
              </View>

            </View>
            <View style={{ flexDirection: 'row', marginTop: 5, flexWrap: 'nowrap' }}>
              <View style={{ width: 8, height: 8, backgroundColor: 'black', borderRadius: 50, marginRight: 10, marginLeft: 0, marginTop: 6 }} />
              <MyText style={{ fontSize: 13, color: '#343434',  fontWeight: '600' }}>
                Only trades that were successfull are calculated on the dashboard
              </MyText>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5, flexWrap: 'nowrap' }}>
              <View style={{ width: 8, height: 8, backgroundColor: 'black', borderRadius: 50, marginRight: 10, marginLeft: 0, marginTop: 6 }} />
              <MyText style={{ fontSize: 13, color: '#343434',  fontWeight: '600' }}>
                We do not calculate giftcard transactions that are 'AUSTRALIA' OR 'SINGAPORE' cards. All other cards are calculated as 'US' cards
              </MyText>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <View style={{ width: 8, height: 8, backgroundColor: 'black', borderRadius: 50, marginRight: 10, marginLeft: 0, marginTop: 6 }} />
              <MyText style={{ fontSize: 13, color: '#343434',  fontWeight: '600' }}>
                Users are limited to only one accounts. Any violation is a cause for permanent suspension of all accounts from participating in this program.
              </MyText>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <View style={{ width: 8, height: 8, backgroundColor: 'black', borderRadius: 50, marginRight: 10, marginLeft: 0, marginTop: 6 }} />
              <MyText style={{ fontSize: 13, color: '#343434',  fontWeight: '600' }}>
                Results will reset at the end of each duration.
              </MyText>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5, paddingBottom: 30 }}>
              <View style={{ width: 8, height: 8, backgroundColor: 'black', borderRadius: 50, marginRight: 10, marginLeft: 0, marginTop: 6 }} />
              <MyText style={{ fontSize: 13, color: '#343434',  fontWeight: '600' }}>
                If we notice suspicious activities or abuse of this program, we can decide to terminate this program or permantly ban affected users from participating.
              </MyText>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
      </SafeAreaView>
      </Modal>
    )
}

export default LearnMore;