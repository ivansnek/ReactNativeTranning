import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginView from './containers/auth/LoginView';

export default class App extends React.Component {
  render() {
    return <LoginView />;
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