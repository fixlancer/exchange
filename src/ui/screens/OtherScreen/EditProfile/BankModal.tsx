import React, { useState } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modalbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyText from '../../../components/DefaultTextComponent/MyText';
import styles from './Style';

const { width } = Dimensions.get('screen');

const PAGE_SIZE = 10; // Define how many items you want to load per page

interface Props {
  isOpen: boolean;
  handleChange: () => void;
  data: any[];
  bankName: any;
  bankCode: any;
  isLoading: boolean;
  nextPage: (page: number) => void;
}

const BankM: React.FC<Props> = props => {
  const [page, setPage] = useState(1);

  const loadMore = () => {
    props.nextPage(page);
  };

  const renderFooter = () => {
    return props.isLoading ? (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="#1cc88a" />
      </View>
    ) : null;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        width: '100%',
        height: 'auto',
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#ddd',
      }}
      onPress={() => {
        props.bankName(item.name);
        props.bankCode(item.code);
        props.handleChange();
      }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <MyText style={{ color: '#343434', fontSize: 13 }}>{item.name}</MyText>
        <Icon
          name={'arrow-forward-ios'}
          size={10}
          color={'#f27415'}
          style={{ marginTop: 3 }}
        />
      </View>
    </TouchableOpacity>
  );

  const slicedData = props.data;

  return (
    <Modal
      isOpen={props.isOpen}
      style={{}}
      onClosed={props.handleChange}
      swipeArea={400}
      keyboardTopOffset={Platform.OS === 'ios' ? 22 : 0}
      backdropOpacity={1}
      backdropColor="white"
      position="top">
      <SafeAreaView
        style={{
          flex: 1,
          height: '100%',
          width: width,
          backgroundColor: '#fff',
        }}
        edges={['left', 'right', 'top']}>
        <View style={styles.header2}>
          <MyText
            style={{
              color: '#343434',
              fontSize: 18,
              fontFamily: 'Nunito-Bold',
              fontWeight: '400',
            }}>
            Select Bank
          </MyText>
          <TouchableOpacity onPress={props.handleChange} style={styles.roundClose}>
            <Icon name={'close'} size={20} color={'#fff'} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={slicedData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default BankM;
