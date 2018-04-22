/** @module api/TheMovieDbApi */

const ConfigurationRoute = '/configuration';
const SearchRoute = '/search';
const MovieRoute = '/movie';
const CreditsRoute = '/credits';
const VideosRoute = '/videos';
const AuthenticationRoute = '/authentication';
const TokenRoute = '/token';
const SessionRoute = '/session';
const NewRoute = '/new';
const RatingRoute = '/rating';
const ApiKeyQueryString = 'api_key';
const SearchQueryString = 'query';
const RequestTokenQueryString = 'request_token';
const SessionIdQueryString = 'session_id';

const handleResponse = (response, resolve, reject) => {
    if (!response.ok) {
        reject(response.statusText);
        return;
    }

    response.json().then(json => resolve(json))
        .catch(() => resolve(''));
};

const TheMovieDbApi = (apiUrl, apiKey) => {
    /** @function getConfig
     * Gets the movie db configuration. */
    const getConfig = () => new Promise((resolve, reject) =>
        fetch(`${apiUrl}${ConfigurationRoute}?${ApiKeyQueryString}=${apiKey}`)
            .then(response => handleResponse(response, resolve, reject)));

    /** @function searchMovie
     * Searches for a movie
     * @param searchText the text to search for */
    const searchMovie = searchText => new Promise((resolve, reject) =>
        fetch(`${apiUrl}${SearchRoute}${MovieRoute}?${ApiKeyQueryString}=${apiKey}&${SearchQueryString}=${searchText}`)
            .then(response => handleResponse(response, resolve, reject)));

    /** @function getMovie
     * Gets a movie details
     * @param movieId the id of the movie */
    const getMovie = movieId => new Promise((resolve, reject) =>
        fetch(`${apiUrl}${MovieRoute}/${movieId}?${ApiKeyQueryString}=${apiKey}`)
            .then(response => handleResponse(response, resolve, reject)));

    /** @function getCredits
     * Gets the credits for a movie
     * @param movieId the id of the movie */
    const getCredits = movieId => new Promise((resolve, reject) =>
        fetch(`${apiUrl}${MovieRoute}/${movieId}${CreditsRoute}?${ApiKeyQueryString}=${apiKey}`)
            .then(response => handleResponse(response, resolve, reject)));

    /** @function getVideos
     * Gets videos associated with a movie
     * @param movieId the id of the movie */
    const getVideos = movieId => new Promise((resolve, reject) =>
        fetch(`${apiUrl}${MovieRoute}/${movieId}${VideosRoute}?${ApiKeyQueryString}=${apiKey}`)
            .then(response => handleResponse(response, resolve, reject)));

    /** @function createRequestToken
     * Creates a temporary request token
     */
    const createRequestToken = () => new Promise((resolve, reject) =>
        fetch(`${apiUrl}${AuthenticationRoute}${TokenRoute}${NewRoute}?${ApiKeyQueryString}=${apiKey}`)
            .then(response => handleResponse(response, resolve, reject)));

    /** @function createSession
     * Creates a valid session id
     * @param token the request token
     */
    const createSession = token => new Promise((resolve, reject) =>
        fetch(`${apiUrl}${AuthenticationRoute}${SessionRoute}${NewRoute}` +
            `?${ApiKeyQueryString}=${apiKey}&${RequestTokenQueryString}=${token}`)
            .then(response => handleResponse(response, resolve, reject)));

    /** @function rateMovie
     * Posts a rating of a movie
     * @param movieId the id of the movie
     * @param rating the rating
     * @param sessionId the session id of the user
     */
    const rateMovie = (movieId, rating, sessionId) =>
        fetch(
            `${apiUrl}${MovieRoute}/${movieId}${RatingRoute}` +
            `?${ApiKeyQueryString}=${apiKey}&${SessionIdQueryString}=${sessionId}`,
            {
                method: 'POST',
                body: JSON.stringify({ value: rating }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

    return {
        getConfig,
        searchMovie,
        getMovie,
        getCredits,
        getVideos,
        createRequestToken,
        createSession,
        rateMovie,
    };
};

export default TheMovieDbApi;
