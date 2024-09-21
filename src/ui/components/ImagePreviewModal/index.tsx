import React from 'react';
import {View, Text, ActivityIndicator, Dimensions, Image, TouchableOpacity, Platform, StyleSheet, StatusBar} from 'react-native';
import Modal from 'react-native-modalbox';
import MyText from '../DefaultTextComponent/MyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('screen');

const index = ({image, isPreviewImgVisible, togglePreviewImgModal}) => {
  const imgs: any = [image];

  return (
    <Modal
      //style={{ backgroundColor:'#fafafa' , height:height/2}}
      isOpen={isPreviewImgVisible}
      style={{backgroundColor:'#000'}}
      swipeArea={400}
      coverScreen={true}
      onClosed={togglePreviewImgModal}
      keyboardTopOffset={Platform.OS == 'ios' ? 22 : 0}
      backdropOpacity={1}
      backdropColor="white"
      position="top">

<SafeAreaView
        style={{
          height: height,
          width: width,
          flex: 1,
          backgroundColor:'#000'
        }}
        edges={['left', 'right', 'top']}>

<StatusBar barStyle={"light-content"} translucent backgroundColor={"transparent"} />

<View style={styles.header}>
          <Icon
              name={'maximize'}
              size={20}
              color={'#808080'}
              style={{marginTop: 5}}></Icon>
            <MyText
              style={{
                fontSize: 15,
                color:'#fff'
              }}>
              Preview
            </MyText>
          </View>


      <View
        style={{
          paddingVertical: 10,flex:1,alignItems:'center',
          paddingHorizontal: 20,width:'100%',height:'100%',
          backgroundColor: '#000',
        }}>

        <Image
          style={{alignSelf: 'center', height: 300, width: 300}}
          source={imgs}
          resizeMode={'contain'}
        />
      </View>

      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 60,
    alignItems:'center',
    backgroundColor: '#000',
    borderBottomWidth: 0,
    marginTop:Platform.OS === 'ios' ? 55 : 0,
    borderColor: '#f1f1f1',
  },
})
export default index;
