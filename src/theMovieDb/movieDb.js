import MovieDbApi from '../api/theMovieDbApi';
import MovieDbData from './movieDbData';
import MovieDbActions from './movieDbActions';
import MovieDbAuthentication from './movieDbAuthentication';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'e2e02c3de2b84529b9d19e41a1848501';

const actions = MovieDbActions(
    MovieDbApi(apiUrl, apiKey),
    MovieDbData
);

const authentication = MovieDbAuthentication(
    sessionStorage,
    actions,
    (url) => { window.location = url; }
);

const MovieDb = {
    actions,
    authentication,
};

export default MovieDb;
