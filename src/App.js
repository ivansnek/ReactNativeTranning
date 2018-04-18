import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginView from './containers/auth/LoginView';
import MovieListView from './containers/songs/MovieListView';

export default class App extends React.Component {
  render() {
    return <MovieListView />;
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