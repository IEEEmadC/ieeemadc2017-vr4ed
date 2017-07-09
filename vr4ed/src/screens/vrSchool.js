import React from 'react';
import { View, WebView } from 'react-native';

export default class VrSchool extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }} >
        <WebView style={{ flex: 1 }} source={{ uri: 'http://muhammetdemirci.com/vr/' }} >
        </WebView>
      </View>
    );
  }
}