import React from 'react';
import {
  AppRegistry,
} from 'react-vr';
import Home from './src/home';

export default class vrSchool extends React.Component {
  render() {
    return (
      <Home />
    );
  }
};

AppRegistry.registerComponent('vrSchool', () => vrSchool);
