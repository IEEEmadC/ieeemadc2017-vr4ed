import React from 'react';
import { View, Text, Switch } from 'react-native';


export default class MySwitch extends React.Component {

  state = {
    value: this.props.value ? this.props.value : false,
  }
  changeSwitch() {
    this.setState({ value: !this.state.value })
    this.props.onValueChange();
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }} >

        <Text style={{ color: 'white', margin: 8, fontSize: 20 }} >
          {this.props.text}</Text>
        <Switch value={this.state.value} onValueChange={() => this.changeSwitch()} />
      </View>
    )
  }
}