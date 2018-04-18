import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image
} from 'react-native';

import { Colors, Fonts, Images, Metrics } from '../theme';

export default function({ title, image, releaseDate, index, id }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image, cache: 'force-cache' }}
        style={styles.logoStyle}
        onError={err => console.log('ERROr Imgae', err)}
      />
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text
            style={styles.movieTitle}
            numberOfLines={1}
          >
           {title}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Image
            resizeMode="contain"
            source={Images.calendar}
            style={styles.infoIcon}
          />
          <Text style={styles.releaseDate}>{releaseDate}</Text>
        </View>
      </View>
      <Image source={Images.chevronRight} style={styles.arrowRight} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 120,
    backgroundColor: Colors.darkBlue,
    padding: 10
  },
  movieTitle: {
    ...Fonts.h4b,
    paddingLeft: 10,
    color: Colors.white
  },
  releaseDate: {
    ...Fonts.normal,
    color: Colors.blue
  },
  infoContainer: {
    paddingHorizontal: 10,
    flex: 2,
    justifyContent: 'space-around'
  },
  logoStyle: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: Colors.lightOverlay
  },
  arrowRight: {
    width: Metrics.icons.small,
    height: Metrics.icons.small,
    tintColor: Colors.gray
  },
  infoIcon: {
    width: 15,
    height: 15,
    paddingHorizontal: 15,
    tintColor: Colors.gray
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 5
  }
})