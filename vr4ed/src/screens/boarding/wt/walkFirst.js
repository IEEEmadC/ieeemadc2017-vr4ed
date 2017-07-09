import React from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import * as globalStyles from '../../../styles';

const IMG_CARDBOARD = require('../../../assets/cardboard.png');

export default class WalkFirst extends React.Component {

  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <View style={globalStyles.globalStyles.wtContainer}>
        <Text style={{
          flex: 1,
          fontSize: width / 15,
          color: 'white',
          justifyContent: 'center',
          alignItems: 'flex-start',
          textAlign: 'center',
          marginTop: height / 13.34,
          fontWeight: '800',
        }}
        > Welcome to VR4Ed </Text>
        <Text
          style={globalStyles.globalStyles.wtText}
        >  We thought that education would be the most effective way to learn for students with the help of virtual reality </Text>
        <Text />
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }} >
          <Image
            source={IMG_CARDBOARD}
            style={{
              width: height / 5,
              height: height / 5,
              resizeMode: 'contain',
            }} />
        </View>


        <Text
          style={globalStyles.globalStyles.wtText}
        > Swipe to right </Text>
        <Text />
      </View>
    );
  }
}
