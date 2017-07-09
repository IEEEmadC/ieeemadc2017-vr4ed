import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as globalStyles from '../styles';
import Card from '../components/card';
import i18n from '../localization';

export default class GamesScreen extends React.Component {
  /**
   * open Selected Game
   * @param {any} c
   *
   * @memberof GamesScreen
   */
  openGame(c) {
    StatusBar.setBackgroundColor(globalStyles.colors.blue, false);

    this.props.navigation.navigate('VR', { game: c });
  }

  goBack() {
    StatusBar.setBackgroundColor(globalStyles.colors.blue, false);
    this.props.navigation.goBack();
  }

  render() {
    const category = this.props.navigation.state.params.category;
    const videos = category.videos ? category.videos : [];
    return (
      <View style={{ flex: 1, backgroundColor: globalStyles.colors.purple }} >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24, marginHorizontal: 24 }} >
          <TouchableOpacity onPress={() => this.goBack()} >
            <Icon name={'home'} color={globalStyles.colors.white} size={50} />
          </TouchableOpacity>
          <Text style={{ fontSize: 32, marginLeft: 8, color: globalStyles.colors.white }} >
            {category.title} {i18n.t('videos')}
          </Text>

        </View>
        <ScrollView style={{ flex: 1 }} horizontal >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} >
            {
              videos.map(c =>
                (<Card
                  key={c.name}
                  title={c.name}
                  img={c.img}
                  onPress={() => this.openGame(c)}
                />))
            }
          </View>
        </ScrollView>
      </View >
    );
  }
}

