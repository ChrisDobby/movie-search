/** @module api/TheMovieDbApi */

const ConfigurationRoute = '/configuration';
const SearchRoute = '/search';
const MovieRoute = '/movie';
const ApiKeyQueryString = 'api_key';
const SearchQueryString = 'query';

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

    return {
        getConfig,
        searchMovie,
    };
};

export default TheMovieDbApi;
