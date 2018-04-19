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
  Platform
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
      movie: {}
    };
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

  render() {
    const { title, movie } = this.props.navigation.state.params;
    const data = this.state.movie;
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
    if (data) {
      return (
        <View style={container}>
          <Image
            resizeMode="cover"
            source={{
              uri: data.backdrop_path
            }}
            style={backgroundImage}
          />
          <ScrollView style={container}>
          <View style={titleContainer}>
            <Text numberOfLines={1} style={movieTitle}>{title}</Text>
            <TouchableOpacity onPress={() => this.handleShareMovie(data.homepage)}>
              <Image source={Images.share} style={shareButton} />
            </TouchableOpacity>
          </View>
          <ListSeparator color="dark" />
          <View style={generalInfoContainer}>
            <Image
              resizeMode="contain"
              source={{
                uri: data.poster_path
              }}
              style={posterImage}
            />
            <View style={{justifyContent: 'flex-start'}}>
              <InfoRow
                icon={Images.calendar}
                label="Release Date:"
                text={formatDate(data.release_date)}
              />
              <InfoRow
                icon={Images.chat}
                label="Language:"
                text={data.original_language}
              />
              <InfoRow
                icon={Images.world}
                label="Home Page:"
              />
              <TouchableOpacity onPress={() => this.handleOpenURL(data.homepage)}>
                <InfoRow
                  lines={2}
                  text={data.homepage}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ListSeparator color="dark" />
          <View style={detailInfoContainer}>
            <Text style={label}>Overview</Text>
            <Text style={overViewText} textAlign="justify">{data.overview}</Text>
          </View>
          <ListSeparator color="dark" />
          <View style={detailInfoContainer}>
            <InfoRow
              icon={Images.movie}
              label="Genre: "
              text={this.formatGenres(data.genres)}
            />
            <InfoRow
              icon={Images.money}
              label="Budget: "
              text={`$${formatCurrency(data.budget)}`}
            />
            <InfoRow
              icon={Images.money}
              label="Revenue: "
              text={`$${formatCurrency(data.revenue)}`}
            />
          </View>
        </ScrollView>
        </View>
      );
    } return null;

  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.darkBackground },
  backgroundImage: {
    width: '100%',
    height: 150
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center'
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