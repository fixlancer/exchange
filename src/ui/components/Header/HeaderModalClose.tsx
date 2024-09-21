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
    handleChange: any;
    headerTitle: any;
}


const HeaderModalClose: React.FC<Props> = props => {
    const { handleChange, headerTitle } = props;

    const theme = useTheme()
    const styles = newStyles(theme);

    return (

        <View style={[styles.newModalHeader,]}>
            <TouchableOpacity
                onPress={handleChange}
                style={[styles.b30, styles.alignCenter, styles.borderDark, styles.mt10, {height: moderateScale(30), width: moderateScale(30)}]}>
                <IconM
                    name={'close'}
                    size={moderateScale(17)}
                    color={theme.dark ? '#fff' : '#343434'}
                    style={{ }} />

            </TouchableOpacity>

            <Text style={[styles.largeLabel, styles.fontSize22, styles.mt15, styles.mb5]}>{headerTitle}</Text>


        </View>

    );
};


export default HeaderModalClose;