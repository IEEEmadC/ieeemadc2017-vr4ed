import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, AsyncStorage, StatusBar } from 'react-native';
import Orientation from 'react-native-orientation';
import IconButton from '../components/iconButton';
import MySwitch from '../components/mySwitch';
import * as utils from './utils';
import * as fire from '../firestack';
import * as catsData from '../data';
import i18n from '../localization';
import * as globalStyles from '../styles';

const OPENED_CATEGORIES = '@openedCategories';


export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.openedCategories = this.openedCategories.bind(this);
  }


  state = {
    cats: [],
    vrSchool: false,
    space: false,
    nature: false,
    fun: false,
  };



  openedCategories() {
    const categories = this.props.navigation.state.params.openedCategory;
    if (categories) {
      for (const cat of categories) {
        if (cat.key === 'space') {
          this.setState({ space: true })
        } if (cat.key === 'nature') {
          this.setState({ nature: true })
        } if (cat.key === 'fun') {
          this.setState({ fun: true })
        } if (cat.key === 'vrSchool') {
          this.setState({ vrSchool: true })
        }
      }
      this.setState({
        cats: categories,
      });
    }

  }

  componentWillMount() {
    this.openedCategories();
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

  async goBack() {
    try {
      const cats = JSON.stringify(this.selected_categories());
      const res = await AsyncStorage.setItem(OPENED_CATEGORIES, cats);
      StatusBar.setBackgroundColor(globalStyles.colors.blue, false)
      this.props.navigation.goBack()
    } catch (error) {
      console.log('There was an error', error);
    }
  }
  async quit() {
    try {
      const res = fire.stack.auth.signOut()
      if (res) {
        StatusBar.setBackgroundColor(globalStyles.colors.blue, false)
        utils.resetTo(this, 'Boarding');
        Orientation.lockToLandscape();
      }
    } catch (error) {
      console.log(error);
    }
  }

  renderProfilePhoto() {
    return (
      <View style={{ width: 120, height: 120, backgroundColor: 'pink', borderRadius: 8 }} >

      </View>
    );
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: globalStyles.colors.green, flex: 1 }} >
        <IconButton
          onPress={() => this.goBack()} />
        <View style={{
          flexDirection: 'column',
          alignSelf: 'stretch',
          marginHorizontal: 30,
        }} >

          <Text style={{ color: 'white', margin: 8, marginTop: 2, fontSize: 22, fontWeight: '600' }} >
            {i18n.t('selectCategory')}
          </Text>
          <MySwitch value={this.state.vrSchool} text={i18n.t('vr.vrSchool')} onValueChange={() => this.setState({ vrSchool: !this.state.vrSchool })} />
          <MySwitch value={this.state.space} text={i18n.t('vr.space')} onValueChange={() => this.setState({ space: !this.state.space })} />
          <MySwitch value={this.state.nature} text={i18n.t('vr.nature')} onValueChange={() => this.setState({ nature: !this.state.nature })} />
          <MySwitch value={this.state.fun} text={i18n.t('vr.fun')} onValueChange={() => this.setState({ fun: !this.state.fun })} />
        </View>
        <TouchableOpacity onPress={() => this.quit()} style={{ backgroundColor: 'white', padding: 8, borderRadius: 8, width: 120, alignSelf: 'center', margin: 18, marginBottom: 30, alignItems: 'center', justifyContent: 'center' }} >
          <Text style={{ color: globalStyles.colors.green, fontSize: 20 }} >
            {i18n.t('quit')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
