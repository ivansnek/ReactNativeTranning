import React from 'react';
import { StyleSheet, Text, View, SectionList, FlatList, ListView } from 'react-native';

import TableRow from '../../components/TableRow';
import CustomHeader from '../../components/CustomHeader';
import { Colors, Fonts } from '../../theme';
import { fetchPopularMovies } from '../../utils/api';
import { generateId } from '../../utils/helpers';
// const movieList = require('../../utils/mock-data/movie-list.json');


export default class MovieListView extends React.Component {
  MOVIE_LIMIT_NUMBER = 10;
  constructor(props){
    super(props);
    this.state = {
      movies: [],
      lastPage: 1,
      loading: false
    };
  }

  componentWillMount() {
    this.loadMovies();
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('NEXT', nextState);
    if (nextState && nextState.movies) {
      return this.state.movies.length !== nextState.movies.length;
    }
    return false;
  }

  loadMovies = () => {
    if (!this.state.loading && this.state.lastPage) {
      console.log('Fetch next movies');
      fetchPopularMovies(this.state.lastPage)
        .then(response =>
          this.setState({
            movies: [...this.state.movies, ...response.movies],
            lastPage: parseInt(response.page) + 1,
            loading: false
          })
        )
        .catch(err => {
          console.log('ERROR LOADING MOVIES', err);
        });
    }
  }

  keyExtractor = (item, index) => `${item.id}-${index}`;

  renderItem = ({ item, index }) => (
    <TableRow
      id={item.id}
      image={item.poster_path}
      index={index}
      releaseDate={item.release_date}
      title={item.title}
    />
  );

  separator = () => <View style={styles.listSeparator} />;

  render() {
    const { movies, dataSource } = this.state;
    // Static data
    // const movies = movieList.results;
    const {
      container,
      listStyle
    } = styles;
    return (
      <View style={container}>
        <CustomHeader title="Popular Movies"/>
        <FlatList
          data={movies}
          ItemSeparatorComponent={this.separator}
          keyExtractor={this.keyExtractor}
          onEndReached={({ distanceFromEnd }) => {console.log('DISTANCE', distanceFromEnd); this.loadMovies();}}
          onEndReachedThreshold={1}
          renderItem={this.renderItem}
          style={listStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.darkBackground },
  listStyle: { flex: 1, width: '100%' },
  listSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.lightOverlay
  }
});