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
      imageBlurRadius: 0
    };
    this.scaleImageValue = new Animated.Value(1);
    this.blurRadiusImageValue = new Animated.Value(0);
    this.blurRadiusImageValue.addListener((value) => {
      this.setState({ imageBlurRadius: value.value });
    })
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

  handleOnScroll = event => {
    let currentOffset = event.nativeEvent.contentOffset.y;
    let scaleValue = currentOffset < 0 ? 1 + 0.8*(-currentOffset / 10) : 1;
    if (scaleValue > 2) scaleValue = 2;
    if (currentOffset < 0) {
      Animated.parallel([
        Animated.timing(this.blurRadiusImageValue, {
          toValue: scaleValue * 2,
          duration: 200
        }).start(),
        Animated.timing(this.scaleImageValue, {
          toValue: scaleValue,
          duration: 200
        }).start()
      ]);
    }
  };

  handleImageReset = event => {
    Animated.parallel([
      Animated.timing(this.blurRadiusImageValue, {
        toValue: 0,
        duration: 200
      }).start(),
      Animated.timing(this.scaleImageValue, {
        toValue: 1,
        duration: 200
      }).start()
    ]);
}
  render() {
    const { title } = this.props.navigation.state.params;
    const { movie, imageBlurRadius } = this.state;
    const scaleStyle = { transform: [{ scale: this.scaleImageValue }] };
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
      titleContainer
    } = styles;
    if (movie) {
      return (
        <View style={container}>
          <Animated.Image
            blurRadius={imageBlurRadius}
            resizeMode="cover"
            source={{
              uri: movie.backdrop_path
            }}
            style={[backgroundImage, scaleStyle ]}
          />
          <ScrollView
            style={container}
            onScroll={this.handleOnScroll}
            onScrollEndDrag={this.handleImageReset}
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
          </ScrollView>
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
  backgroundImage: {
    width: '100%',
    height: 150,
    zIndex: 100
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
    ...Fonts.small,
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