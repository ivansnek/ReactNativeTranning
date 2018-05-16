'use strict';

// @flow

import { Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  baseMargin: 10,
  doubleBaseMargin: 20,
  maxBaseMargin: 80,
  halfBasePadding: 10,
  basePadding: 10,
  doubleBasePadding: 20,
  smallMargin: 5,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50,
    modal: 100
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  },
  isSmallScreen: () => width <= 320
};

export default metrics;
