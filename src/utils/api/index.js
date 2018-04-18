const API_HOST = 'https://api.themoviedb.org/3/';
const API_KEY = '559a34e930aeee655f57722df37170ef';
const API_URL = `${API_HOST}#?api_key=${API_KEY}`;


const MOVIE_TYPE = 'discover/movie';
const SORT_POPULARITY = 'sort_by=popularity.desc';

const IMAGE_HOST = 'https://image.tmdb.org/t/p/';

export const fetchPopularMovies = (page = 1) => {
  const url = API_URL.replace('#', MOVIE_TYPE);
  return fetch(`${url}&${SORT_POPULARITY}&page=${page}`)
    .then(response =>
      response.ok ? response.json() : Promise.reject(response.statusText)
    )
    .then(data => {
      let movies = data.results.map(movie => {
        movie.poster_path = `${IMAGE_HOST}w300${movie.poster_path}`;
        return movie;
      });
      return {
        page: data.page,
        movies
      }
    })
    .catch(err => console.log('ERrr', err));
}
