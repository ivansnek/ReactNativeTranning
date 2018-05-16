import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image
} from 'react-native';

import { Colors, Fonts, Metrics } from '../theme';

export default function({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: Metrics.navBarHeight,
    backgroundColor: Colors.grayBlue,
    padding: 15
  },
  title: {
    ...Fonts.h2b,
    color: Colors.white
  }
})