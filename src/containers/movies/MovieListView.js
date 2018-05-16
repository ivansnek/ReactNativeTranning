import React from 'react';
import { StyleSheet, Text, View, SectionList, FlatList, ListView } from 'react-native';

import { CustomHeader, ListSeparator, LoadingPlaceHolderRow, TableRow } from '../../components';
import { Colors, Fonts } from '../../theme';
import { fetchPopularMovies } from '../../utils/api';
import { generateId } from '../../utils/helpers';
const movieList = require('../../utils/mock-data/movie-list.json');


export default class MovieListView extends React.Component {
  MOVIE_LIMIT_NUMBER = 10;
  constructor(props){
    super(props);
    this.state = {
      movies: [],
      lastPage: 1,
      loading: false,
      moviesLoaded: false
    };
    this.placeholders = Array.apply(null, Array(10)).map(item => ({
      id: generateId()
    }));
  }

  componentWillMount() {
    this.loadMovies();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState && nextState.movies) {
      return this.state.movies.length !== nextState.movies.length;
    }
    return false;
  }

  loadMovies = async () => {
    if (!this.state.loading && this.state.lastPage) {
      const response = await fetchPopularMovies(this.state.lastPage);
      if (response) {
        this.setState({
          movies: [...this.state.movies, ...response.movies],
          lastPage: parseInt(response.page) + 1,
          loading: false,
          moviesLoaded: true
        })
      }
    }
  }

  keyExtractor = (item, index) => `${item.id}-${index}`;

  renderItem = ({ item, index }) => (
    <TableRow
      id={item.id}
      image={item.poster_path}
      index={index}
      onPress={() =>
        this.props.navigation.navigate(
          'MovieDetail',
          { title: item.title, movie: item }
        )
      }
      releaseDate={item.release_date}
      title={item.title}
    />
  );

  renderEmptyItem = () => <LoadingPlaceHolderRow />;

  render() {
    const { movies, moviesLoaded } = this.state;
    // Static data
    // const movies = movieList.results;
    const data = moviesLoaded ? movies : this.placeholders;
    const {
      container,
      listStyle
    } = styles;
    return (
      <View style={container}>
        {/* <CustomHeader title="Popular Movies"/> */}
        <FlatList
          data={data}
          ItemSeparatorComponent={() => <ListSeparator color="light" />}
          keyExtractor={this.keyExtractor}
          onEndReached={({ distanceFromEnd }) => this.loadMovies()}
          onEndReachedThreshold={1}
          renderItem={moviesLoaded ? this.renderItem : this.renderEmptyItem }
          style={listStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.darkBackground },
  listStyle: { flex: 1, width: '100%' }
});