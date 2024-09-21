import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Dimensions,
    Image,
    TouchableOpacity,
    Platform,
    StatusBar,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import MyText from '../../../components/DefaultTextComponent/MyText';
import newStyles from '../../Styles/Styles';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import Navbar from '../../../components/Navbars/Navbar';
import HeaderMain from '../../../components/Header/HeaderMain';
import MarketMain from './MarketMain';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');


const Market = ({ navigation, route }) => {

    const theme = useTheme()
    const styles = newStyles(theme);

    return (

        <View style={[styles.container,]}>

            <SafeAreaView
                style={{
                    height: height,
                    width: width,
                    flex: 1,
                    backgroundColor: 'transparent',
                }}
                edges={['left', 'right', 'top']}>
        <StatusBar translucent barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

                
                <HeaderMain headerTitle={'Market'} />

                <MarketMain navigation={navigation} />
         


            </SafeAreaView >

            <Navbar
        navigation={navigation}
        activePage={'Market'}
        backgroundColor={undefined}
      />

        </View>
    );
};


export default Market;