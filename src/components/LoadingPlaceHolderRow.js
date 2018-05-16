import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import { Colors, Fonts, Images, Metrics } from '../theme';
import { formatDate } from '../utils/helpers';

export default function(props) {
  return (
    <View style={styles.container}>
      <View style={styles.logoStyle}/>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.movieTitle}/>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.releaseDate} />
        </View>
      </View>
    </View>
  );
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
    width: '95%',
    height: 20,
    borderRadius: 5,
    backgroundColor: Colors.gray
  },
  releaseDate: {
    width: '70ss%',
    height: 20,
    borderRadius: 5,
    backgroundColor: Colors.gray
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
    backgroundColor: Colors.gray
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 5
  }
})