import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, AsyncStorage, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Orientation from 'react-native-orientation';
import Card from '../components/card';
import * as styleManager from '../styles';
import * as utils from './utils';
import i18n from '../localization';
import * as globalStyles from '../styles';
import * as data from '../data';

const OPENED_CATEGORIES = '@openedCategories';
const KEY_VRSCHOOL = 'vrSchool';

export default class DashboardHome extends React.Component {
  constructor(props) {
    super(props);
    this.getCats = this.getCats.bind(this);
  }

  state = {
    cats: [],
  }

  async getCats() {
    try {
      const value = await AsyncStorage.getItem(OPENED_CATEGORIES);
      if (value !== null) {
        // We have data!!
        const parsed_cats = JSON.parse(value)
        this.setState({ cats: parsed_cats });
      } else {
        const catData = [data.fun, data.nature, data.space, data.vrSchool];
        this.setState({ cats: catData })
        console.log('value is null')
      }
    } catch (error) {
      // Error retrieving data
      console.error(error)
    }
  }

  componentWillMount() {
    this.getCats();
    Orientation.lockToLandscape();
  }

  /**
   * navigate to gamesScreen
   * @param {any} c 
   * 
   * @memberof DashboardHome
   */
  openCategory(c) {
    StatusBar.setBackgroundColor(globalStyles.colors.purple, false)
    console.log('ccccc : ', c.key);
    if (c.key === KEY_VRSCHOOL) {
      this.props.navigation.navigate('VRSchool');
    } else {
      this.props.navigation.navigate('Games', { category: c });
    }

  }
  openProfile() {
    StatusBar.setBackgroundColor(globalStyles.colors.green, false)
    this.props.navigation.navigate('Profile', { openedCategory: this.state.cats });

  }

  render() {
    const m = { title: "deneme", }
    this.getCats();

    return (
      <View style={{ flex: 1, backgroundColor: styleManager.colors.blue }}  >
        <View style={{
          flexDirection: 'row', alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 24, marginHorizontal: 12
        }} >

          <Text style={{ fontSize: 32, marginLeft: 8, color: styleManager.colors.white }} >
            {i18n.t('categoryTitle')}
          </Text>
          <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => this.openProfile()} >
            <Icon name={'cog'} color={'white'} size={50} />
          </TouchableOpacity>

        </View>
        <ScrollView style={{ flex: 1 }} horizontal >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} >
            {
              this.state.cats.map(c =>
                <Card
                  key={c.title}
                  title={c.title}
                  img={c.img}
                  onPress={() => this.openCategory(c)}
                />)
            }
          </View>
        </ScrollView>
      </View >
    );
  }
}

