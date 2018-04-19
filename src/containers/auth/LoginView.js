import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Animated,
  Easing,
  Keyboard
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import { Images, Colors, Fonts } from '../../theme';

export default class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      password: ''
    }
  }

  componentWillMount() {
    this.logoTraslationValue = new Animated.ValueXY();
    this.logoScaleValue = new Animated.Value(1);
  }

  handleKeyboardDidShow  = () => {
    Animated.timing(this.logoTraslationValue, {
      toValue: { x: 0, y: -35 },
      duration: 200,
      easing: Easing.linear
    }).start();
    Animated.timing(this.logoScaleValue, {
      toValue: .75,
      duration: 200,
      easing: Easing.linear
    }).start();
  };

  validForm () {
    const { text, password } = this.state;
    return text && password && text !== '' && password !== '';
  }

  handleOnLogin = () => {
    if (this.validForm()) {
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'MovieList' })],
      }));
    }
  }

  handleKeyboardDidHide = () => {
    Animated.timing(this.logoTraslationValue, {
      toValue: { x: 0, y: 0 },
      duration: 200,
      easing: Easing.linear
    }).start();
    Animated.timing(this.logoScaleValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear
    }).start();
  }

  render() {
    const {
      container,
      logoContainer,
      logoStyle,
      inputContainer,
      inputStyle,
      textStyle,
      buttonStyle,
      buttonTextStyle,
      loginButton,
      fbButton,
      buttonTextStyleDark,
      imgBackground,
      fbLogo,
      titleStyle
    } = styles;
    const animateLogoTransform = {
      transform: [
        ...this.logoTraslationValue.getTranslateTransform(),
        { scale: this.logoScaleValue }
      ]
    };
    return (
      <ImageBackground
        blurRadius={50}
        source={Images.loginBackground2}
        style={imgBackground}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={[container, {width: '100%'}]}
        >
          <Animated.View style={logoContainer}>
            <Animated.Image
              source={Images.logo}
              style={[logoStyle, animateLogoTransform]}
            />
          </Animated.View>
          <View style={inputContainer}>
            <TextInput
              autoCapitalize="none"
              style={[inputStyle, textStyle]}
              onChangeText={(text) => this.setState({text})}
              onFocus={this.handleKeyboardDidShow}
              onBlur={this.handleKeyboardDidHide}
              placeholder="Enter your username"
              placeholderTextColor="#FFF"
              returnKeyType="next"
              value={this.state.text}
              underlineColorAndroid="transparent"
            />
            <TextInput
              autoCapitalize="none"
              style={[inputStyle, textStyle]}
              onChangeText={(password) => this.setState({password})}
              onFocus={this.handleKeyboardDidShow}
              onBlur={this.handleKeyboardDidHide}
              placeholder="Enter your password"
              placeholderTextColor="#FFF"
              returnKeyType="send"
              secureTextEntry
              value={this.state.password}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={inputContainer}>
            <TouchableOpacity
              onPress={this.handleOnLogin}
              style={[buttonStyle, loginButton]}
            >
              <Text style={buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.handleOnLogin}
              style={[buttonStyle, fbButton]}
              >
              <Image
                source={require('../../../assets/social-facebook.png')}
                style={fbLogo}
              />
              <Text style={buttonTextStyleDark}>LOGIN WITH FACEBOOK</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imgBackground: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: Colors.lightOverlay
  },
  inputContainer: {
    flex: 2,
    width: '100%',
    minHeight: 170,
    paddingVertical: 40,
  },
  textStyle: {
    ...Fonts.h3b,
    color: Colors.white
  },
  buttonTextStyle: {
    ...Fonts.h3b,
    color: Colors.white
  },
  buttonTextStyleDark: {
    ...Fonts.h3b,
    color: Colors.blue
  },
  inputStyle: {
    height: 60,
    borderColor: Colors.white,
    borderWidth: 2,
    width: '100%',
    borderRadius: 30,
    color: '#fff',
    paddingHorizontal: 10,
    marginVertical: 5,
    textAlign: 'center',
  },
  logoContainer: {
    flex: 3,
    marginVertical: 80
  },
  logoStyle: {
    width: 150,
    height: 150,
    borderRadius: 25,
    paddingVertical: 20
  },
  buttonStyle: {
    height: 60,
    width: '100%',
    borderRadius: 30,
    paddingHorizontal: 10,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginButton: {
    backgroundColor: Colors.blue,
  },
  fbButton: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  fbLogo: {
    width: 30, height: 30, tintColor: Colors.blue
  }
});