
import React from 'react';
import {
  View, Text, TouchableOpacity, Dimensions,
  StatusBar, StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';
import * as utils from '../utils';
import { getValidation, validateEmail } from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconButton from '../../components/iconButton';
import { globalStyles, colors } from '../../styles';
import MyTextInput from '../../components/textInput';
import * as fire from '../../firestack';
import i18n from '../../localization';


export default class LoginScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
  }

  state = {
    email: '',
    password: '',
    valid: false,
    title: '',
  };

  goBack() {
    StatusBar.setBackgroundColor(colors.gray, false);
    this.props.navigation.goBack();
  }
  async submit() {

    try {
      const user = await fire.stack.auth.signInWithEmail(this.state.email, this.state.password);

      if (user) {
        console.log('User successfully logged in', user)
        StatusBar.setBackgroundColor(colors.purple, false);
        utils.resetTo(this, 'Dash')
      }
    } catch (error) {
      console.log('User signin error', error);
      this.setState({ title: 'wrongField' })
    }
  }
  openForgotPasswordScreen() {
    console.log('openForgotPasswordScreen');

    StatusBar.setBackgroundColor(colors.pink, false);
    utils.navigateTo(this, 'Forgot');
  }

  renderTextField() {
    return (
      <View style={{ flex: 1, margin: 8 }} >
        <View style={{
          flexDirection: 'column',
          alignSelf: 'stretch',
          marginVertical: 30,
          marginHorizontal: 30,
        }} >
          <Text style={{ color: 'white', margin: 8, fontSize: 23 }} >
            {this.state.title}
          </Text>
          <MyTextInput
            onChangeText={(pass) => {
              this.setState(prev => ({
                email: pass,
                valid: getValidation(prev.email, pass),
              }));
            }}
            underlineColorAndroid={'rgba(0,0,0,0)'}
            placeholder={i18n.t('email')}
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            keyboardType={'email-address'}
            returnKeyType={'go'}
          />
          <MyTextInput
            placeholder={i18n.t('password')}
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            underlineColorAndroid={'rgba(0,0,0,0)'}
            onChangeText={(pass) => {
              this.setState(prev => ({
                password: pass,
                valid: getValidation(prev.email, pass),
              }));
            }}
            keyboardType={'default'}
            returnKeyType={'go'}
            spellCheck={false}
            value={this.state.password}
            onSubmitEditing={() => this.submit()}
            secureTextEntry
          />

          <TouchableOpacity style={{ margin: 32 }} onPress={() => this.openForgotPasswordScreen()} >
            <Text style={{ color: 'white' }} >
              {i18n.t('dontRememberPassword')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.blue, padding: 8 }} >

        <IconButton
          onPress={() => this.goBack()} />
        {this.renderTextField()}
        <IconButton
          onPress={() => this.submit()}
          next
        />
      </View>
    );
  }
}