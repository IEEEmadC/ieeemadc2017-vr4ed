import React from 'react';
import { View, Text, WebView, StyleSheet, PixelRatio, Dimensions, Platform, TouchableOpacity, StatusBar } from 'react-native';
import YouTube from 'react-native-youtube';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconButton from '../components/iconButton';
import * as globalStyles from '../styles';
import i18n from '../localization';

export default class VRScreen extends React.Component {

  state = {
    isStart: false,
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: true,
    isLooping: true,
    duration: 0,
    currentTime: 0,
    fullscreen: true,
    time: 10,
  };

  goBack() {
    StatusBar.setBackgroundColor(globalStyles.colors.purple, false)
    this.props.navigation.goBack();
  }

  renderYoutube() {

    const id = this.props.navigation.state.params.game.id
    return (<View style={{ backgroundColor: 'green', flex: 1 }} >
      <YouTube
        ref={(component) => {
          this._youTubeRef = component;
        }}


        // You must have an apiKey for the player to load in Android
        apiKey="AIzaSyD1hZPksLuWkG0IrsDahbwffLGz9ZSDmEw"

        // Un-comment one of videoId / videoIds / playlist.
        // You can also edit these props while Hot-Loading in development mode to see how
        // it affects the loaded native module
        videoId={id}
        play={this.state.isPlaying}
        loop={this.state.isLooping}
        fullscreen={this.state.fullscreen}
        controls={1}
        style={styles.player}
        onError={e => this.setState({ error: e.error })}
        onReady={e => this.setState({ isReady: true })}
        onChangeState={e => this.setState({ status: e.state })}
        onChangeQuality={e => this.setState({ quality: e.quality })}
        onChangeFullscreen={e => this.setState({ fullscreen: e.isFullscreen })}
        onProgress={Platform.OS === 'ios'
          ? e => this.setState({ duration: e.duration, currentTime: e.currentTime })
          : undefined}
      >
      </YouTube>
    </View>);
  }
  componentWillMount() {
    if (this.state.time !== -1) {
      setInterval(
        () => {
          const time = parseInt(this.state.time) - 1;

          this.setState({ time })
        },
        1000
      );
    }
  }

  render() {
    if (this.state.time >= 0) {

      return (
        <View style={{ flex: 1, backgroundColor: globalStyles.colors.blue }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 24, marginHorizontal: 24 }} >
            <TouchableOpacity onPress={() => this.goBack()} >
              <Icon name={'angle-left'} color={globalStyles.colors.white} size={80} />
            </TouchableOpacity>


          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <View style={{ width: 100, height: 100, backgroundColor: globalStyles.colors.purple, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }} >
              <Text style={{ fontSize: 50, color: globalStyles.colors.white }} >{this.state.time}</Text>

            </View>
            <Text style={{ color: 'white', fontSize: 18, margin: 8, marginTop: 16 }} >
              {i18n.t('cardboardWarn')}
            </Text>

          </View>
        </View>

      );
    }
    return this.renderYoutube();
  }
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    height: PixelRatio.roundToNearestPixel(Dimensions.get('window').width / (16 / 9)),
    alignSelf: 'stretch',
    backgroundColor: globalStyles.colors.pink,
    flex: 1,
  },
});