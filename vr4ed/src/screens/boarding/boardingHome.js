import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar, Platform, TouchableOpacity, Text, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import Orientation from 'react-native-orientation';
import WalkFirst from './wt/walkFirst';
import WalkSecond from './wt/walkSecond';
import WalkThird from './wt/walkThird';
import * as utils from '../utils';
import * as fire from '../../firestack';
import i18n from '../../localization';
import * as globalStyles from '../../styles';

const icon = require('../../assets/icon.png');

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.colors.blue,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.colors.purple,
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.colors.green,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  allButtons: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    alignItems: 'center',
    bottom: 60,
    left: 0,
    right: 0,
  },
  buttonCnt: {
    flex: 1,
    margin: 6,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 4,
    width: 248,
    height: 40,
    backgroundColor: globalStyles.colors.buttonBackColor,
  },
  buttonText: {
    color: globalStyles.colors.white,
  },
});

export default class BoardingHome extends Component {
  constructor(p) {
    super(p);
    this.state = {
      index: 0,
      showWalkThrough: true,
      isLogin: false,
    };
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
  }


  componentWillMount() {
    this.isAuth();
    Orientation.lockToPortrait();
  }
  componentDidMount() {
    // this locks the view to Landscape Mode
    Orientation.lockToPortrait();
  }


  onMomentumScrollEnd(e, state) {
    this.state.index = state.index;
    if (Platform.OS === 'android') {
      const barColor = (state.index === 0) ? globalStyles.colors.blue :
        (state.index === 1 ? globalStyles.colors.purple : (state.index === 2 ? globalStyles.colors.green : globalStyles.colors.gray));
      StatusBar.setBackgroundColor(barColor, true);
    }
  }
  register() {
    StatusBar.setBackgroundColor(globalStyles.colors.purple, false);
    utils.navigateTo(this, 'Register');
  }
  loginButton() {
    StatusBar.setBackgroundColor(globalStyles.colors.blue, false);
    console.log('loginButton');
    utils.navigateTo(this, 'Login');
  }
  async isAuth() {
    try {
      await fire.stack.auth.listenForAuth((evt) => {
        // evt is the authentication event
        // it contains an `error` key for carrying the
        // error message in case of an error
        // and a `user` key upon successful authentication
        if (!evt.authenticated) {
          // There was an error or there is no user

        } else {
          // evt.user contains the user details
          utils.resetTo(this, 'Dash');
        }
      }).bind(this);
    } catch (error) {
      console.log('Listening for authentication changes');
    }
  }


  renderButtons() {
    return (
      <View style={styles.allButtons}>
        <TouchableOpacity style={styles.buttonCnt} onPress={() => { this.register(); }}>
          <Text
            style={styles.buttonText}
          > {i18n.t('register')} </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonCnt}
          onPress={() => { this.loginButton(); }}
        >
          <Text
            style={styles.buttonText}
          > {i18n.t('login')} </Text>
        </TouchableOpacity>
      </View >
    );
  }



  renderBoarding() {
    const w = Dimensions.get('window').width;
    return (
      <View style={{
        flex: 1,
        backgroundColor: globalStyles.colors.gray,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 30,
      }}
      >
        <Image source={icon} style={{ width: w / 1.5, height: w / 1.5 }} />
        {this.renderButtons()}
      </View>
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }} >
        <Swiper
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          animated
          loop={false}
          dotColor={'white'}
        >
          <View style={styles.slide1}>
            <WalkFirst />
          </View>
          <View style={styles.slide2}>
            <WalkSecond />
          </View>
          <View style={styles.slide3}>
            <WalkThird />
          </View>
          <View style={{ flex: 1 }}>
            {this.renderBoarding()}
          </View>
        </Swiper>
      </View>
    );
  }
}

