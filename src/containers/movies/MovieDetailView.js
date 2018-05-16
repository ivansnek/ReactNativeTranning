import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
  Platform,
  Animated
} from 'react-native';

import { Colors, Fonts, Metrics, Images } from '../../theme';
import { fetchMovieDetail } from '../../utils/api';
import { formatDate, formatCurrency } from '../../utils/helpers';
import { InfoRow, ListSeparator } from '../../components';

const oneThirdScreenSize = Metrics.screenWidth / 3;

export default class MovieDetailView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      scrollY: new Animated.Value(0)
    };
    this.scaleImageValue = new Animated.Value(1);
    this.opacityValue = new Animated.Value(1);
  }

  async componentWillMount() {
    const movieId =
      this.props.navigation.state && this.props.navigation.state.params
        ? this.props.navigation.state.params.movie.id : null;
    if (movieId) {
      const { movie } = await fetchMovieDetail(movieId);
      this.setState({ movie });
    }
  }

  handleOpenURL = url =>
    Linking.openURL(url).catch(err => console.log('Error Opening Web', url));

  handleShareMovie = url => {
    const content = {
      title: 'Look this awesome movie I found:',
      message: `Look this awesome movie I found \n ${url}`
    };
    if (Platform.OS === 'ios') content['url'] =`\n ${url}`;
    Share.share(content);
  } ;

  formatGenres = genres => genres ? genres.map(g => g.name).join() : '' ;

  shouldScaleUp (event) {
    let currentOffset = event.nativeEvent.contentOffset.y;
    return currentOffset < 0;
  }

  /*
  * Poor Performance implementation
  */
  handleOnScroll = event => {
    let currentOffset = event.nativeEvent.contentOffset.y;
    let scaleValue = currentOffset < 0 ? 1 + 0.8*(-currentOffset / 10) : 1;
    let opacityValue = currentOffset > 0 ? 1 + 0.9*(-currentOffset / 10) : 1;
    if (scaleValue > 2) scaleValue = 2;
    if (opacityValue < 0) opacityValue = 0;
    if (currentOffset < 0) {
      Animated.timing(this.scaleImageValue, {
        toValue: scaleValue,
        duration: 200
      }).start();
    } else {
      console.log('WILL ANIMATGE UP');
      Animated.timing(this.opacityValue, {
        toValue: opacityValue,
        duration: 200
      }).start();
    }
  };

  /*
  * Poor Performance implementation
  */
  handleImageReset = event => {
    Animated.parallel(
      Animated.timing(this.opacityValue, {
        toValue: 1,
        duration: 200
      }).start(),
      Animated.timing(this.scaleImageValue, {
        toValue: 1,
        duration: 200
      }).start()
    );
}
  render() {
    const { title } = this.props.navigation.state.params;
    const { movie } = this.state;
    const scaleStyle = { transform: [{ scale: this.scaleImageValue }] };
    const opacityStyle = { opacity: this.opacityValue };
    const {
      container,
      generalInfoContainer,
      detailInfoContainer,
      backgroundImage,
      posterImage,
      movieTitle,
      label,
      overViewText,
      shareButton,
      titleContainer,
      listContainer
    } = styles;
    if (movie) {
      return (
        <View style={container}>
          {/* <Animated.Image
            resizeMode="cover"
            source={{
              uri: movie.backdrop_path
            }}
            style={[backgroundImage, scaleStyle, opacityStyle ]}
          /> */}
          <Animated.Image
            resizeMode="cover"
            style={[styles.backgroundImage, {
              opacity: this.state.scrollY.interpolate({
                inputRange: [0, 150],
                outputRange: [1, 0]
              }),
              transform: [{
                scale: this.state.scrollY.interpolate({
                  inputRange: [-200, 0, 1],
                  outputRange: [2.0, 1, 1]
                })
              }]
            }]}
            source={{
              uri: movie.backdrop_path
            }}
          />
          {/* <ScrollView
            contentContainerStyle={listContainer}
            style={container}
            onScroll={this.handleOnScroll}
            onScrollEndDrag={this.handleImageReset}
          > */}
          <Animated.ScrollView
            contentContainerStyle={listContainer}
            style={container}
            scrollEventThrottle={1}
            onScroll={
              Animated.event([{
                nativeEvent: { contentOffset: { y: this.state.scrollY } }
              }], {
                useNativeDriver: true//Platform.OS === 'ios'
              })
            }
          >

            <View style={titleContainer}>
              <Text numberOfLines={1} style={movieTitle}>{title}</Text>
              <TouchableOpacity onPress={() => this.handleShareMovie(movie.homepage)}>
                <Image source={Images.share} style={shareButton} />
              </TouchableOpacity>
            </View>
            <ListSeparator color="dark" />
            <View style={generalInfoContainer}>
              <Image
                resizeMode="contain"
                source={{
                  uri: movie.poster_path
                }}
                style={posterImage}
              />
              <View style={{justifyContent: 'flex-start'}}>
                <InfoRow
                  icon={Images.calendar}
                  label="Release Date:"
                  text={formatDate(movie.release_date)}
                />
                <InfoRow
                  icon={Images.chat}
                  label="Language:"
                  text={movie.original_language}
                />
                <InfoRow
                  icon={Images.world}
                  label="Home Page:"
                />
                <TouchableOpacity onPress={() => this.handleOpenURL(movie.homepage)}>
                  <InfoRow
                    lines={2}
                    text={movie.homepage}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <ListSeparator color="dark" />
            <View style={detailInfoContainer}>
              <Text style={label}>Overview</Text>
              <Text style={overViewText} textAlign="justify">{movie.overview}</Text>
            </View>
            <ListSeparator color="dark" />
            <View style={detailInfoContainer}>
              <InfoRow
                icon={Images.movie}
                label="Genre: "
                text={this.formatGenres(movie.genres)}
              />
              <InfoRow
                icon={Images.money}
                label="Budget: "
                text={`${formatCurrency(movie.budget)}`}
              />
              <InfoRow
                icon={Images.money}
                label="Revenue: "
                text={`${formatCurrency(movie.revenue)}`}
              />
            </View>
          {/* </ScrollView> */}
          </Animated.ScrollView>
        </View>
      );
    } return null;

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground
  },
  listContainer: {
    top: 150,
    minHeight: Metrics.screenHeight,
    paddingBottom: 150
  },
  backgroundImage: {
    width: '100%',
    height: 150,
    zIndex: 100,
    position: 'absolute'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  posterImage: {
    width: oneThirdScreenSize,
    height: oneThirdScreenSize,
  },
  movieTitle: {
    ...Fonts.h1,
    color: Colors.blue,
    padding: Metrics.basePadding
  },
  overViewText: {
    ...Fonts.normal,
    color: Colors.white,
    paddingVertical: Metrics.basePadding
  },
  label: {
    ...Fonts.h5b,
    color: Colors.white
  },
  generalInfoContainer: {
    flexDirection: 'row',
    paddingVertical: Metrics.doubleBasePadding,
    paddingRight: 10
  },
  detailInfoContainer: {
    padding: Metrics.basePadding,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  shareButton: {
    width: Metrics.icons.medium,
    height: Metrics.icons.medium,
    tintColor: Colors.white,
    paddingRight: Metrics.basePadding
  }
});