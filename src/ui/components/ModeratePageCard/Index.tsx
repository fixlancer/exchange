import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import MyText from '../DefaultTextComponent/MyText'
import Style from './Style'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize'
import styles from './Style';
import moment from 'moment';

interface Props {
    tradeTitle: any;
    tradeID: any;
    tradeStatus: any;
    cardValue: any
    transValue: any;
    time: any;
    date: any;
    reDirecttoCardDetail: any;
    userName: any;
    userID: any;
}

const index: React.FC<Props> = props => {
    const { reDirecttoCardDetail, tradeTitle, tradeID, cardValue, tradeStatus, transValue, time, date, userName, userID } = props;

    const ngnFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN'
    })


    return (


        <TouchableOpacity
            activeOpacity={1}
            onPress={reDirecttoCardDetail}
        >

            <View style={Style.mainBody}>

                {/* Upper portion */}
                <View style={Style.inlineCardPortion}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Image source={
                                    tradeTitle == 'ITUNES' ?

                                        require('../../../Assets/CARDS/itunes.png')
                                        : tradeTitle == 'STEAM' ?
                                            require('../../../Assets/CARDS/steam.png')
                                            : tradeTitle == 'GOOGLE PLAY' ?
                                                require('../../../Assets/CARDS/Googleplay.png')
                                                : tradeTitle == 'SEPHORA' ?
                                                    require('../../../Assets/CARDS/sephora.png')
                                                    : tradeTitle == 'AMERICAN EXPRESS' ?
                                                        require('../../../Assets/CARDS/americanexpress.png')
                                                        : tradeTitle == 'VANILLA' ?
                                                            require('../../../Assets/CARDS/vanilla.png')
                                                            : tradeTitle == 'WALMART' ?
                                                                require('../../../Assets/CARDS/walmart.png')
                                                                : tradeTitle == 'VISA' ?
                                                                    require('../../../Assets/CARDS/vanilla.png')
                                                                    : tradeTitle == 'EBAY' ?
                                                                        require('../../../Assets/CARDS/ebay.png')
                                                                        : tradeTitle == 'AMAZON' ?
                                                                            require('../../../Assets/CARDS/amazon.png')
                                                                            : tradeTitle == 'NORDSTROM' ?
                                                                                require('../../../Assets/CARDS/nordstrom.png')
                                                                                : tradeTitle == 'NIKE' ?
                                                                                    require('../../../Assets/CARDS/nike.png')
                                                                                    : tradeTitle == 'FOOTLOCKER' ?
                                                                                        require('../../../Assets/CARDS/footlocker.png')
                                                                                        : null
                                } style={Style.titleImage} />
                            </View>

                            <View style={{ marginLeft: 6, marginTop: 5 }}>

                                <MyText style={[Style.smFontSize, { color: '#808080', textAlign: 'left' }]}>
                                    {date}{', '}{time}
                                </MyText>

                                <MyText style={{ color: '#343434', marginVertical: 4, textAlign: 'left', fontSize: 13 }}>
                                    {tradeTitle}
                                </MyText>

                                <MyText style={{ color: '#808080', textAlign: 'left', fontSize: 9 }}>
                                    #{tradeID}
                                </MyText>

                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', paddingTop:20, }}>
                            <MyText style={{ color: '#343434', marginVertical: 4, textAlign: 'left', marginRight:10, fontSize: 13 }}>
                                {cardValue}
                            </MyText>
                            <Icon
                                name={'arrow-forward-ios'}
                                size={15}
                                color={'#808080'}
                                style={{ marginTop: 5, marginLeft: 5, }} />


                            {/* {tradeStatus === 'Pending' ? (
                                <>
                                    <Icon
                                        name={'schedule'}
                                        size={20}
                                        color={'#F27415'}
                                        style={{ marginTop: 20, marginLeft: 5, }}></Icon>
                                </>
                            ) : null}

                            {tradeStatus === 'Ongoing' ? (
                                <>
                                    <Icon
                                        name={'watch-later'}
                                        size={20}
                                        color={'#F27415'}
                                        style={{ marginTop: 20, marginLeft: 5, }}></Icon>
                                </>
                            ) : null}


                            {tradeStatus === 'Completed' ? (
                                <>
                                    <Icon
                                        name={'check-circle'}
                                        size={20}
                                        color={'#1cc88a'}
                                        style={{ marginTop: 20, marginLeft: 5, }}></Icon>
                                </>
                            ) : null} */}


                        </View>

                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default index;
