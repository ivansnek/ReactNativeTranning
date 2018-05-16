import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppRouting from './Routes';
import { NetworkStatusLabel } from './components';

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <NetworkStatusLabel />
        <AppRouting />
      </View>
    );
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