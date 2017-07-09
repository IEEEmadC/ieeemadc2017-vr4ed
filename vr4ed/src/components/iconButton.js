import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

export default class IconButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    next: PropTypes.bool,
  };
  static defaultProps = {
    next: false,
  }


  render() {

    let alignSelf = 'flex-start';
    let iconType = 'arrow-left';
    if (this.props.next) {
      alignSelf = 'flex-end';
      iconType = 'arrow-right';
    }
    return (<View
      style={styles.container} >
      <TouchableOpacity style={{ height: 30, alignSelf: alignSelf }} onPress={() => this.props.onPress()}  >
        <Icon name={iconType} size={30} color="white" />
      </TouchableOpacity>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60, justifyContent: 'center', margin: 8, marginBottom: 2,
  },
});