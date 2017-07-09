
import React from 'react';
import {
  View, Text, TouchableOpacity, Dimensions,
  StatusBar, Easing, StyleSheet, Switch, AsyncStorage
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';
import * as utils from '../utils';
import { getValidation, validateEmail, validatePassword } from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconButton from '../../components/iconButton';
import MyTextInput from '../../components/textInput';
import * as fire from '../../firestack';
import MySwitch from '../../components/mySwitch';
import * as catsData from '../../data';
import i18n from '../../localization';
import * as globalStyles from '../../styles';


const EMAIL = i18n.t('typeEmailAdress');
const PASSWORD = i18n.t('typePassword');
const SELECT_CATEGORY = i18n.t('selectCategory');

const OPENED_CATEGORIES = '@openedCategories';

export default class RegisterScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
  }

  state = {
    email: '',
    pass: '',
    valid: false,
    page: EMAIL,
    warn: '',
    space: false,
    vrSchool: false,
    nature: false,
    fun: false,
    errorText: '',
  };

  goBack() {
    this.props.navigation.goBack();
  }

  selected_categories() {
    const selected_cats = [];
    if (this.state.space) {
      selected_cats.push(catsData.space);
    } if (this.state.nature) {
      selected_cats.push(catsData.nature);
    } if (this.state.fun) {
      selected_cats.push(catsData.fun);
    }
    return selected_cats
  }

  async submit() {
    StatusBar.setBackgroundColor(globalStyles.colors.blue, false)
    if (!this.state.valid) {
      this.setState({ warn: i18n.t('typeValidEmail') })
      return;
    }

    if (this.state.page === EMAIL) {
      this.setState({ page: PASSWORD, warn: '' })
    }
    else if (this.state.page === PASSWORD) {
      this.setState({ page: SELECT_CATEGORY, warn: '' })
    }
    else if (this.state.page === SELECT_CATEGORY) {
      try {
        const res = await fire.stack.auth.createUserWithEmail(this.state.email, this.state.pass);

        if (res) {

          const cats = JSON.stringify(this.selected_categories());
          const res = await AsyncStorage.setItem(OPENED_CATEGORIES, cats);
          utils.resetTo(this, 'Dash')
        }
      } catch (error) {
        console.log('There was an error', error);
        this.setState({ errorText: i18n.t('errorMessageWhileCreatingUser') })
      }
    }
  }

  renderEmail() {
    return (
      <View style={{ backgroundColor: globalStyles.colors.purple, flex: 1, padding: 8 }} >
        <IconButton
          onPress={() => this.goBack()} />
        <View style={{
          flexDirection: 'column',
          alignSelf: 'stretch',
          marginVertical: 30,
          marginHorizontal: 30,
        }} >

          <Text style={{ color: 'white', margin: 8, fontSize: 23 }} >
            {this.state.page}
          </Text>
          <MyTextInput
            onChangeText={(email) => {
              this.setState(prev => ({
                email: email,
                valid: validateEmail(email),
              }));
            }}
            underlineColorAndroid={'rgba(0,0,0,0)'}
            placeholder={i18n.t('email')}
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            keyboardType={'email-address'}
            returnKeyType={'go'}
            onSubmitEditing={() => this.submit()}
          />
          <Text style={{ color: 'white', margin: 8, fontSize: 23 }} >
            {this.state.warn}
          </Text>
        </View>
        <IconButton
          onPress={() => this.submit()}
          next
        />
      </View>
    );
  }
  renderPassword() {
    return (
      <View style={{ backgroundColor: globalStyles.colors.pink, flex: 1, padding: 8, paddingTop: 24 }} >
        <IconButton
          onPress={() => this.goBack()} />
        <View style={{
          flexDirection: 'column',
          alignSelf: 'stretch',
          marginVertical: 30,
          marginHorizontal: 30,
        }} >

          <Text style={{ color: 'white', margin: 8, fontSize: 23 }} >
            {this.state.page}
          </Text>
          <MyTextInput
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            underlineColorAndroid={'rgba(0,0,0,0)'}
            onChangeText={(pass) => {
              this.setState(prev => ({
                pass: pass,
                valid: validatePassword(pass),
              }));
            }}
            value={this.state.pass}
            keyboardType={'default'}
            returnKeyType={'go'}
            spellCheck={false}
            onSubmitEditing={() => this.submit()}
            secureTextEntry
          />
        </View>
        <IconButton
          onPress={() => this.submit()}
          next
        />
      </View>
    );
  }
  renderOpenedCategory() {
    StatusBar.setBackgroundColor(globalStyles.colors.green, false)
    return (
      <View style={{ backgroundColor: globalStyles.colors.green, flex: 1, padding: 8, paddingTop: 24 }} >
        <IconButton
          onPress={() => this.goBack()} />
        <View style={{
          flexDirection: 'column',
          alignSelf: 'stretch',
          marginVertical: 30,
          marginHorizontal: 30,
        }} >

          <Text style={{ color: 'white', margin: 8, fontSize: 22, fontWeight: '600' }} >
            {i18n.t('selectCategory')}
          </Text>
          <MySwitch text={'VR School'} onValueChange={() => this.setState({ vrSchool: !this.state.vrSchool })} />
          <MySwitch text={'Space'} onValueChange={() => this.setState({ space: !this.state.space })} />
          <MySwitch text={'Nature'} onValueChange={() => this.setState({ nature: !this.state.nature })} />
          <MySwitch text={'Fun'} onValueChange={() => this.setState({ fun: !this.state.fun })} />

          <Text>
            {this.state.errorText}
          </Text>

        </View>
        <IconButton
          onPress={() => this.submit()}
          next
        />
      </View>
    );
  }

  render() {
    if (this.state.page === EMAIL) {
      return this.renderEmail();
    }
    else if (this.state.page === PASSWORD) {
      return this.renderPassword();
    }
    else if (this.state.page === SELECT_CATEGORY) {
      return this.renderOpenedCategory();
    }
  }
}
