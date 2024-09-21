import {
    Image,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform,
} from 'react-native';
import React from 'react';
import MyText from '../../components/DefaultTextComponent/MyText';
const { width, height } = Dimensions.get('window');
import IconM from 'react-native-vector-icons/Ionicons';
import newStyles from '../../screens/Styles/Styles';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { useTheme } from 'react-native-paper';


const Empty = () => {

    const theme = useTheme()
    const styles = newStyles(theme);

    return (

        <View style={{flex:1}}>
            <View style={[styles.alignCenter, styles.pt30, { height:'100%', width:'100%' }]}>

                       <View style={[styles.circleBg, styles.bgWhite]}>
                        <IconM
                        name={'folder-open-outline'}
                        size={moderateScale(30)}
                        color={theme.dark ? '#fff' : '#343434'}
                        style={{ alignSelf: 'center' }}
                    />
                    </View>
                    <Text style={[styles.largeLabel, styles.pt15, styles.textCenter]}>No data found</Text>
                

            </View>

        </View>

    )
}


export default Empty;