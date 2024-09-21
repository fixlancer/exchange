import {
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/Ionicons';
import MyText from '../DefaultTextComponent/MyText';
import newStyles from './Styles';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

interface Props {
    navigation: any;
}


const HeaderSubClose: React.FC<Props> = props => {
    const { navigation } = props;

    const theme = useTheme()
    const styles = newStyles(theme);

    return (

        <View style={[styles.newModalHeader]}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[styles.b30, styles.alignCenter, styles.bgWhite, styles.borderDark, styles.mt10, {width: moderateScale(30), height : moderateScale(30)}]}>
                <IconM
                    name={'close'}
                    size={moderateScale(15)}
                    color={theme.dark ? '#fff' : '#343434'}
                    style={{ }} />

            </TouchableOpacity>

        </View>

    );
};


export default HeaderSubClose;