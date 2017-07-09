import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as styleManager from './../styles';

export default class Card extends React.Component {

  render() {
    return (
      <TouchableOpacity
        style={styleManager.globalStyles.cardTouchable}
        onPress={() => this.props.onPress()}
      >
        <Image
          source={{ uri: this.props.img }}
          style={styleManager.globalStyles.cardImage}
        />
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.33)', borderRadius: 40 }} >
          <Text style={{ fontSize: 28, color: 'white', shadowColor: 'black', marginBottom: 12, marginHorizontal: 8 }} >
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
