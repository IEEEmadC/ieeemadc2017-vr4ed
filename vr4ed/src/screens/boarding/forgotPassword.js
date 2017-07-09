
import React from 'react';
import {
  View, Text, TouchableOpacity, Dimensions,
  StatusBar, Easing, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import * as utils from '../utils';
import { getValidation, validateEmail } from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconButton from '../../components/iconButton';
import MyTextInput from '../../components/textInput';
import * as fire from '../../firestack';
import i18n from '../../localization';
import * as globalStyles from '../../styles';



export default class ForgotScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
  }

  state = {
    forgotEmail: '',
    valid: false,
    title: i18n.t('typeEmailForPassMessage')
  };

  goBack() {
    StatusBar.setBackgroundColor(globalStyles.colors.blue, false);
    this.props.navigation.goBack();
  }
  async submit() {

    try {
      const res = await fire.stack.auth.sendPasswordResetWithEmail(this.state.forgotEmail);

      if (res) {
        console.log('User successfully logged in', res)
        this.setState({ title: i18n.t('sendEmailForPassMessage') })
        setTimeout(() => {
          StatusBar.setBackgroundColor(globalStyles.colors.blue, false);
          this.props.navigation.goBack()
        }
          , 2000)
      }
    } catch (error) {
      console.log('There was an error', error);
    }
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
            onChangeText={(email) => {
              this.setState(prev => ({
                forgotEmail: email,
                valid: validateEmail(email),
              }));
            }}
            placeholder={i18n.t('email')}
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            keyboardType={'email-address'}
            returnKeyType={'go'}
            onSubmitEditing={() => this.submit()}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: globalStyles.colors.pink, padding: 8 }} >

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