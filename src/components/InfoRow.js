import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

import { Colors, Fonts, Metrics } from '../theme';
const twoThirdScreenSize = 2* (Metrics.screenWidth / 3);

export default function ({ icon, label, text, lines }) {
  return (
    <View style={styles.container} >
      {icon && (
        <Image resizeMode="contain" source={icon} style={styles.infoIcon} />
      )}
      {label && (<Text style={styles.detailLabel}>{label}</Text>)}
      <Text
        ellipsizeMode="tail"
        numberOfLines={lines || 1}
        style={styles.detailText}
      >
        {text}
      </Text>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 30  ,
    maxHeight: 60,
    flexDirection: 'row'
  },
  detailLabel: {
    ...Fonts.normal,
    color: Colors.blue,
    paddingHorizontal: 5,
  },
  detailText: {
    ...Fonts.normal,
    color: Colors.white,
    maxWidth: twoThirdScreenSize
  },
  infoIcon: {
    width: 15,
    height: 15,
    paddingHorizontal: 5,
    tintColor: Colors.gray
  },
});