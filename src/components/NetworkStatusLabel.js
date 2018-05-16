import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  NetInfo,
  TouchableOpacity,
  Image,
  Animated,
  Easing
} from 'react-native';
import { Metrics, Colors, Fonts, Images } from '../theme';

export default class NetworkStatusLabel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      connectionType: '',
      lastConnectionType: null,
      visible: false,
      message: ''
    };
    this.animatedHeight = new Animated.Value(0);
  }

  componentDidMount() {
    NetInfo.addEventListener(
      'connectionChange',
      this.handleNetworkStatusChanged
    );
  }

  handleNetworkStatusChanged = ({ type, effectiveType }) => {
    let message = '';
    let error = false;
    switch (type) {
      case 'wifi':
      case 'cellular':
        message = 'The connection has been restored';
        error = false;
        break;
      case 'none':
      case 'unkow':
        message = 'There is no internet connection';
        error = true;
        break;
      default:
        message = 'none';
        error = true;
        break;
    }

    if (this.state.lastConnectionType) this.animateVisibility(true);
    this.setState({
      connectionType: error ? styles.error : styles.success,
      lastConnectionType: type,
      message
    })
  };

  animateVisibility = visible => {
    Animated.timing(this.animatedHeight, {
      toValue: visible ? 30 : 0,
      duration: 300,
      easing: visible ? Easing.bounce : Easing.ease
    }).start();
  };

  render() {
    const { connectionType, message } = this.state;
    const heightStyle = { height: this.animatedHeight };
    return (
      <Animated.View style={[styles.container, connectionType, heightStyle]}>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity
           style={{position: 'absolute', right: 5}}
           onPress={() => this.animateVisibility(false)}
         >
           <Animated.Image source={Images.close} style={[styles.closeIcon, heightStyle]}/>
         </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    top: Metrics.navBarHeight,
    width: '100%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  error: { backgroundColor: Colors.red },
  success: { backgroundColor: Colors.green },
  message: {
    ...Fonts.pnormal,
    color: Colors.grayBlue,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    width: Metrics.icons.medium,
    height: Metrics.icons.medium,
    tintColor: Colors.grayBlue
  }
});