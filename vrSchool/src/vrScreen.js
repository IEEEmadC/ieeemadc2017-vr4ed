import React from 'react';
import {
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  Model,
  AmbientLight
} from 'react-vr';
import Button from './button';

export default class VrScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log('this.props',this);
    this.state = {
      rotation: 130,
      zoom: -40,
      asset: this.props.page,
    };

    this.lastUpdate = Date.now();
    this.styles = StyleSheet.create({
      menu: {
        flex: 1,
        flexDirection: 'column',
        width: 1,
        alignItems: 'stretch',
        transform: [{ translate: [2, 2, -5] }],
      },
    });

    this.rotate = this.rotate.bind(this);
  }

  componentDidMount() {
    this.rotate();
  }

  componentWillUnmount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  rotate() {
    const now = Date.now();
    const delta = now - this.lastUpdate;
    this.lastUpdate = now;

    this.setState({
      rotation: this.state.rotation + delta / 150
    });
    this.frameHandle = requestAnimationFrame(this.rotate);
  }

  tappedZoom() {
    if (this.state.zoom >= -5) {
      return;
    }
    this.setState((prevState) => ({ zoom: prevState.zoom + 5 }))
  }

  render() {

    if (!this.state.asset) {
      return (
        <View>

        </View>
      );
    }

    return (
      <View>
        <AmbientLight intensity={2.6} />

        <Pano source={asset('background.jpg')} />

        <View style={{
          flex: 1,
          transform: [{ translate: [-2, 1.15, -2] }],
        }} >
          <Button back text='Home' onClick={() => this.props.goBack()} />
        </View>


        <View style={this.styles.menu}>
          <Button zoom text='+'
            onClick={() => this.tappedZoom()} />
          <Button zoom text='-'
            onClick={() => this.setState((prevState) => ({ zoom: prevState.zoom - 5 }))} />
        </View>

        <Model
          style={{
            transform: [
              { translate: [-1, 0, this.state.zoom] },
              { scale: 0.05 },
              { rotateY: this.state.rotation },
              { rotateX: 1 },
              { rotateZ: -1 }
            ],
          }}
          source={{ obj: asset(this.state.asset + '.obj'), mtl: asset(this.state.asset + '.mtl') }}
          lit={true}
        />

      </View>
    );
  }
};