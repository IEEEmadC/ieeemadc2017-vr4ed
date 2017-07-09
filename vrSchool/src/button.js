import React from 'react';
import {
  StyleSheet,
  Text,
  VrButton,
} from 'react-vr';
import styles from './styles.js'

export default class Button extends React.Component {
  constructor() {
    super();
    this.styles = StyleSheet.create({
      button: {
        margin: 0.05,
        height: 1.4,
        width: 1.4,
        backgroundColor: 'rgb(77,74,151)',
        borderRadius: 0.15,
        borderColor: 'rgb(192,192,186)',
        borderWidth: 0.01
      },
      text: {
        fontSize: 0.3,
        textAlign: 'center',
      },
    });
  }

  render() {

    if (this.props.zoom) {
      this.styles = StyleSheet.create({
        button: {
          flex: 1,
          margin: 0.05,
          height: 0.8,
          width: 0.8,
          backgroundColor: 'rgb(192,192,186)',
          borderRadius: 0.15,
          borderColor: 'rgb(192,192,186)',
          borderWidth: 0.01,
          justifyContent: 'flex-end',
          alignItems: 'center'
        },
        text: {
          fontSize: 1,
          textAlign: 'center'
        },
      });
    }

    if (this.props.back) {
      this.styles = StyleSheet.create({
        button: {
          flex: 1,
          margin: 0.05,
          height: 0.4,
          backgroundColor: 'rgb(77,74,151)',
          borderRadius: 0.015,
          borderColor: 'rgb(192,192,186)',
          borderWidth: 0.01,
          justifyContent: 'center',
          alignItems: 'center'
        },
        text: {
          fontSize: 0.24,
          textAlign: 'center'
        },
      });
    }

    return (
      <VrButton style={this.styles.button}
        onClick={() => this.props.onClick()}>
        <Text style={this.styles.text}>
          {this.props.text}
        </Text>
      </VrButton>
    );
  }
}