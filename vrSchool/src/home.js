import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
} from 'react-vr';
import Button from './button';
import VrScreen from './vrScreen';

const PAGE_MAIN = 'main';
const PAGE_SKELETON = 'skelet';
const PAGE_HEART = 'Heart';


export default class Home extends React.Component {
  state = {
    page: PAGE_MAIN,
  }

  openPage(page) {
    this.setState({ page: page });
  }


  render() {
    if (this.state.page !== PAGE_MAIN) {
      return (<View>
        <VrScreen page={this.state.page} goBack={() => this.setState({ page: PAGE_MAIN })} />
      </View>);
    }

    return (
      <View>
        <Pano source={asset('background.jpg')} />
        <View style={{
          flex: 1,
          transform: [{ translate: [-1.6, 1, -2] }],
        }} >
          <Text style={{
            fontSize: 0.15
          }} >Welcome to VR School, Firstly select a category.
        </Text>
        <Text style={{
            fontSize: 0.10
          }} > This is beta version. We will add new lessons, games, videos
        </Text>
        </View>


        <View style={{
          flex: 1,
          flexDirection: 'row',
          width: 1,
          alignItems: 'stretch',
          transform: [{ translate: [-2, 2, -5] }]
        }}
        >
          <Button text={'Skeleton'} onClick={() => this.openPage(PAGE_SKELETON)} />
          <Button text={'Heart'} onClick={() => this.openPage(PAGE_HEART)} />
        </View>
      </View >
    );
  }
};

