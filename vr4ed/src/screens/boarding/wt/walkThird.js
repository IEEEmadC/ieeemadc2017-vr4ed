import React from 'react';
import { View, Image } from 'react-native';
import * as globalStyles from '../../../styles';


export default class WalkThird extends React.Component {

  render() {
    return (
      <View style={globalStyles.globalStyles.wtContainer}>
        <Image
          source={require('../../../assets/wt3.png')}
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
