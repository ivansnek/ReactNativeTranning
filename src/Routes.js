import { StackNavigator } from 'react-navigation';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import MovieListView from './containers/movies/MovieListView';
import MovieDetailView from './containers/movies/MovieDetailView';
import LoginView from './containers/auth/LoginView';
import { Colors, Fonts } from './theme';

export default StackNavigator(
  {
    Login: {
      screen: LoginView,
      navigationOptions: {
        header: null
      }
    },
    MovieList: {
      screen: MovieListView,
      navigationOptions:{
        title: 'Popular Movies',
        headerStyle: {
          backgroundColor: Colors.grayBlue,
          borderBottomWidth: 0,
          // elevation: 0
        },
        headerTitleStyle: {
          ...Fonts.h3b,
          color: Colors.white
        },
        headerBackTitle: null,
        headerTintColor: Colors.white
      },
    },
    MovieDetail: {
      screen: MovieDetailView,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params ? navigation.state.params.title : 'Detail',
        headerStyle: {
          backgroundColor: Colors.grayBlue,
          borderBottomWidth: 0,
          // elevation: 0
        },
        headerTitleStyle: {
          ...Fonts.h3b,
          color: Colors.white
        },
        headerTintColor: Colors.white
       
      }),
    }
  },
  {
    initialRouteName: 'MovieList'
  }
);