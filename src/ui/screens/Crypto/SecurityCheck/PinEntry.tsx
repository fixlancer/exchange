import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import MyText from '../../../components/DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import newStyles from '../../Styles/Styles';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { useTheme } from 'react-native-paper';

interface Props {
    handleSubmit: any;
    maxEntry: any;
    secureEntry: any;
}

const PinEntry: React.FC<Props> = props => {
    const { handleSubmit, secureEntry, maxEntry } = props;

    const theme = useTheme()
    const styles = newStyles(theme);

    const [pin, setPin] = useState([]);

    const pinRow = ['1', '2', '3']
    const pinRow2 = ['4', '5', '6']
    const pinRow3 = ['7', '8', '9']
    const pinRow4 = ['0', 'Del']


    const handlePress = (data) => {
        if (pin.length < maxEntry) {
            setPin([...pin, data]);
        }
    }

    const handleDelete = () => {
        if (pin.length > 0) {
            setPin(prevPin => prevPin.slice(0, -1));
        }
    }

    useEffect(() => {
        if (pin.length == maxEntry) {
            setPin(prevPin => prevPin.slice(0, -4));
             handleSubmit(pin);
        }

    }, [pin])

    return (
        <View style={[styles.pb15, styles.ph15]}>

            <View style={[styles.RowB, styles.alignCenter, { height: moderateScale(100) }]}>
                {pin.map((item, index) => (
                    <View key={index} style={[styles.alignCenter, styles.mr5, { width: moderateScale(45), height: moderateScale(45) }]}>
                        <Text style={[styles.userLabel, styles.textDark, secureEntry ? styles.pt5 : null, styles.fontSize20]}>{secureEntry ? '*' : item}</Text>
                    </View>
                ))}
                {Array.from({ length: 4 - pin.length }).map((i, index) => (
                    <View key={index} style={[styles.alignCenter, styles.mr5, { width: moderateScale(45), height: moderateScale(45) }]}>
                        <Text style={[styles.userLabel, styles.textLightGrey, styles.pt5, styles.fontSize20]}>*</Text>
                    </View>
                ))}


            </View>


            <View style={[styles.RowB, styles.mb20,]}>
                {pinRow.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => handlePress(item)}
                            style={[styles.b30, styles.borderWidthDark, styles.alignCenter, { width: moderateScale(50), height: moderateScale(50) }]}>
                            <MyText style={[styles.tinyLabel, styles.fontSize20]}>{item}</MyText>

                        </TouchableOpacity>
                    </View>
                ))}
            </View>


            <View style={[styles.RowB, styles.mb20]}>
                {pinRow2.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => handlePress(item)}
                            style={[styles.b30, styles.borderWidthDark, styles.alignCenter, { width: moderateScale(50), height: moderateScale(50) }]}>
                            <MyText style={[styles.tinyLabel, styles.fontSize20,]}>{item}</MyText>

                        </TouchableOpacity>

                    </View>
                ))}
            </View>


            <View style={[styles.RowB, styles.mb20]}>
                {pinRow3.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => handlePress(item)}
                            style={[styles.b30, styles.borderWidthDark, styles.alignCenter, { width: moderateScale(50), height: moderateScale(50) }]}>
                            <MyText style={[styles.tinyLabel, styles.fontSize20]}>{item}</MyText>

                        </TouchableOpacity>
                    </View>
                ))
                }
            </View>


            <View style={[styles.RowB,]}>
                <></>
                {pinRow4.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                item === 'Del' ? handleDelete() : handlePress(item)
                            }}
                            style={[styles.b30, styles.borderWidthDark, styles.alignCenter, { width: moderateScale(50), height: moderateScale(50) }]}>

                            <MyText style={[styles.tinyLabel, styles.fontSize20]}>{item}</MyText>

                        </TouchableOpacity>
                    </View>
                ))}

            </View>

        </View>
    )
}


export default PinEntry;