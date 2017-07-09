import React from 'react';
import { View, Image } from 'react-native';
import * as globalStyles from '../../../styles';

const IMG2 = require('../../../assets/wt2.png');

export default class WalkSecond extends React.Component {

  render() {
    return (
      <View style={globalStyles.globalStyles.wtContainer}>
        <Image
          source={IMG2}
          style={{
            flex: 1,
            resizeMode: 'contain',
            alignSelf: 'center',
            marginBottom: 20,
            marginTop: 8,
          }}
        />

      </View>
    );
  }
}
