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
  Platform
} from 'react-native';

export default class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      password: ''
    }

    UIManager.createView(
      2,
      'RCTView',
      1,
      { flex: 1 }
    );
    UIManager.createView(
      3,
      'RCTTextField',
      1,
      { text: 'Juan Perez' }
    );
    UIManager.setChildren(
      2,
      [ 3 ]
    );
    UIManager.setChildren(
      1,
      [ 2 ]
    );

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
      fbLogo
    } = styles;
    return (
      <ImageBackground
        blurRadius={50}
        source={require('../../../assets/bg2.jpg')} style={imgBackground}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={[container, {width: '100%'}]}
        >
          <View style={logoContainer}>
            <Image source={require('../../../assets/icon.jpg')} style={logoStyle} />
          </View>
          <View style={inputContainer}>
            <TextInput
              autoCapitalize="none"
              style={[inputStyle, textStyle]}
              onChangeText={(text) => this.setState({text})}
              placeholder="Enter your username"
              placeholderTextColor="#FFF"
              returnKeyType="next"
              value={this.state.user}
            />
            <TextInput
              autoCapitalize="none"
              style={[inputStyle, textStyle]}
              onChangeText={(text) => this.setState({text})}
              placeholder="Enter your password"
              placeholderTextColor="#FFF"
              returnKeyType="send"
              secureTextEntry
              value={this.state.password}
            />
          </View>
          <View style={inputContainer}>
            <TouchableOpacity
              onPress={this._onPressButton}
              style={[buttonStyle, loginButton]}
            >
              <Text style={buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this._onPressButton}
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
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  inputContainer: {
    flex: 2,
    width: '100%',
    minHeight: 160,
    paddingVertical: 40,
  },
  textStyle: {
    fontSize: 18,
    fontFamily: 'AvenirNext-Regular',
    color: '#fff'
  },
  buttonTextStyle: {
    fontSize: 18,
    fontFamily: 'AvenirNext-Bold',
    color: '#fff'
  },
  buttonTextStyleDark: {
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Bold' : 'Roboto',
    color: '#1da1f2'
  },
  inputStyle: {
    height: 60,
    borderColor: '#fff',
    borderWidth: 2,
    width: '100%',
    borderRadius: 30,
    color: '#fff',
    paddingHorizontal: 10,
    marginVertical: 10,
    textAlign: 'center',
  },
  logoContainer: {
    flex: 3,
    marginVertical: 80,
  },
  logoStyle: {
    width: 135,
    height: 135,
    paddingVertical: 60
  },
  buttonStyle: {
    height: 60,
    width: '100%',
    borderRadius: 30,
    paddingHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginButton: {
    backgroundColor: '#1da1f2',
  },
  fbButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  fbLogo: {
    width: 30, height: 30, tintColor: '#1da1f2'
  }
});