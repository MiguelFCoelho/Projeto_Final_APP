import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Router from './src/config/router';

export default class Thomar_v5 extends Component {
  render() {
      return <Router />
  }
}

AppRegistry.registerComponent('Thomar_v5', () => Thomar_v5);
