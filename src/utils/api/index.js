import { populateImageURIs } from '../helpers';

const API_HOST = 'https://api.themoviedb.org/3/';
const API_KEY = '559a34e930aeee655f57722df37170ef';
const API_URL = `${API_HOST}#?api_key=${API_KEY}`;


const DISCOVER_TYPE = 'discover/movie';
const MOVIE_TYPE = 'movie';
const SORT_POPULARITY = 'sort_by=popularity.desc';

export const fetchPopularMovies = async (page = 1) => {
  const url = API_URL.replace('#', DISCOVER_TYPE);
  try {
    const response = await fetch(`${url}&${SORT_POPULARITY}&page=${page}`);
    const data = await response.json();
    return {
      page: data.page,
      movies: populateImageURIs(data.results)
    };
  } catch(err) {
    console.log('Error Fetching Movie List', err);
    return null;
  }
}

export const fetchMovieDetail = async id => {
  try {
    const movieQuery = `${MOVIE_TYPE}/${id}`
    const result = await fetch(API_URL.replace('#', movieQuery));
    const movie = await result.json();
    return { movie: populateImageURIs(movie) };
  } catch(err) {
    console.log('Error Fetching Movie Detail', err);
    return null;
  }
}
