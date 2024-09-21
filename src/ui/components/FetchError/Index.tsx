import {
    Image,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform,
} from 'react-native';
import MyText from '../../components/DefaultTextComponent/MyText';
const { width, height } = Dimensions.get('window');
import IconM from 'react-native-vector-icons/Ionicons';
import newStyles from '../../screens/Styles/Styles';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { useTheme } from 'react-native-paper';

interface Props {
    setRetry: any;
}

const FetchError: React.FC<Props> = props => {

    const { setRetry } = props;

    const theme = useTheme()
    const styles = newStyles(theme);

    return (

        <View style={[styles.alignCenter, { height:'70%', width:'100%' }]}>

            <TouchableOpacity
                onPress={() => setRetry(true)}
                style={[styles.alignCenter, { flex: 1 }]}>

                    <IconM
                        name={'refresh'}
                        size={moderateScale(30)}
                        color={theme.dark ? '#fff' : '#343434'}
                        style={{ alignSelf: 'center' }}

                    />
                <MyText style={[styles.tinyLabel, styles.textDark, styles.pt20, styles.textCenter]}>Could not complete your request</MyText>
            </TouchableOpacity>

        </View>

    )
}


export default FetchError;