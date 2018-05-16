import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Colors } from '../theme';

export default function({ color }) {
  const styleColor = color === 'light' || color === 'dark'
      ?  styles[color] : { backgroundColor: color };
  return <View style={[styles.listSeparator, styleColor]} />;
}

const styles = StyleSheet.create({
  listSeparator: {
    width: '100%',
    height: 1
  },
  dark: { backgroundColor: Colors.darkOverlay },
  light: { backgroundColor: Colors.lightOverlay }
})
