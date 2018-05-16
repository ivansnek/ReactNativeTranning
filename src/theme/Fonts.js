import { Platform } from 'react-native';

const sizes = {
  h1: 25,
  h2: 20,
  h3: 18,
  h4: 15,
  h5: 12,
  small: 8,
  normal: 13
};

const types = {
  base:  Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  bold:  Platform.OS === 'ios' ?'AvenirNext-Bold' : 'Roboto',
  light:  Platform.OS === 'ios' ?'AvenirNext-Light' : 'Roboto'
}

const Fonts = {
  sizes,
  types,
  h1: {
    fontSize: sizes.h1,
    fontFamily: types.base
  },
  h1b: {
    fontSize: sizes.h1,
    fontFamily: types.bold
  },
  h1l: {
    fontSize: sizes.h1,
    fontFamily: types.light
  },
  h2: {
    fontSize: sizes.h2,
    fontFamily: types.base
  },
  h2b: {
    fontSize: sizes.h2,
    fontFamily: types.bold
  },
  h2l: {
    fontSize: sizes.h2,
    fontFamily: types.light
  },
  h3: {
    fontSize: sizes.h3,
    fontFamily: types.base
  },
  h3b: {
    fontSize: sizes.h3,
    fontFamily: types.bold
  },
  h3l: {
    fontSize: sizes.h3,
    fontFamily: types.light
  },
  h4: {
    fontSize: sizes.h4,
    fontFamily: types.base
  },
  h4b: {
    fontSize: sizes.h4,
    fontFamily: types.bold
  },
  h4l: {
    fontSize: sizes.h4,
    fontFamily: types.light
  },
  h5: {
    fontSize: sizes.h5,
    fontFamily: types.base
  },
  h5b: {
    fontSize: sizes.h5,
    fontFamily: types.bold
  },
  h5l: {
    fontSize: sizes.h5,
    fontFamily: types.light
  },
  normal: {
    fontSize: sizes.normal,
    fontFamily: types.base
  },
  small: {
    fontSize: sizes.small,
    fontFamily: types.bold
  }
};

export default Fonts;
