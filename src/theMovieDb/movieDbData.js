/** @module theMovieDb/MovieDbData */

/** @typedef {Object} Configuration
 * @property baseImageUrl the url to be used as the base for images
 */

/** @typedef {Object} MovieFromSearch
 * @property id
 * @property title
 * @property posterImage
 */

const searchPosterSize = 'w300';

const createImageUrl = (baseUrl, size, imagePath) =>
    `${baseUrl}${size}${imagePath}`;

const createPosterImageUrl = (baseUrl, imagePath) => createImageUrl(baseUrl, searchPosterSize, imagePath);

const MovieDbData = () => {
    /** @function configuration
     * @param movieDbConfig the data received from the config api
     * @returns {Configuration}
     */
    const configuration = movieDbConfig => ({
        baseImageUrl: movieDbConfig.images.base_url,
    });

    /** @function search
     * @param movieDbSearch the data received from the search api
     * @param {Configuration} config  the configuration
     * @returns {MovieFromSearch[]}
     */
    const search = (movieDbSearch, config) =>
        movieDbSearch.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            posterImage: createPosterImageUrl(config.baseImageUrl, movie.poster_path),
        }));

    return {
        configuration,
        search,
    };
};

export default MovieDbData();
