import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppRouting from './Routes';

export default class App extends React.Component {
  render() {
    return <AppRouting />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 15
  }
});