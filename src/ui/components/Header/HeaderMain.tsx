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
    headerTitle: any;
  }
  
  
  const HeaderMain: React.FC<Props> = props => {
    const { headerTitle } = props;

    const theme = useTheme()
    const styles = newStyles(theme);
    return (

                <View style={[styles.newModalHeader, styles.RowB]}>
                    <Text style={[styles.extraLabel, styles.fontSize25, styles.mt15, styles.mb10]}>{headerTitle}</Text>
                    <MyText style={styles.pl10}></MyText>

                </View>

    );
};


export default HeaderMain;