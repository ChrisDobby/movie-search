/** @module theMovieDb/MovieDbData */

/** @typedef {Object} Configuration
 * @property baseImageUrl the url to be used as the base for images
 */

/** @typedef {Object} MovieFromSearch
 * @property id
 * @property title
 * @property posterImage
 */

/** @typedef {Object} Movie
 * @property id
 * @property title
 * @property tagLine
 * @property overview
 * @property genres a list of the genres attached to the movie
 * @property posterImage
 */

/** @typedef {Object} CastMember
 * @property id
 * @property name
 * @property character
 * @property profileImage
 */

/** @typedef {Object} Video
 * @property id
 * @property name
 * @property key
 */

const searchPosterSize = 'w300';
const profileImageSize = 'w185';

const YouTubeSite = 'YouTube';

const createImageUrl = (baseUrl, size, imagePath) =>
    `${baseUrl}${size}${imagePath}`;

const createPosterImageUrl = (baseUrl, imagePath) => createImageUrl(baseUrl, searchPosterSize, imagePath);
const createProfileImageUrl = (baseUrl, imagePath) => createImageUrl(baseUrl, profileImageSize, imagePath);

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

    /** @function movie
     * @param movieDbMovie the data received from the movie api
     * @param {Configuration} config  the configuration
     * @returns {Movie}
     */
    const movie = (movieDbMovie, config) => ({
        id: movieDbMovie.id,
        title: movieDbMovie.title,
        tagLine: movieDbMovie.tagline,
        overview: movieDbMovie.overview,
        genres: movieDbMovie.genres.map(genre => genre.name),
        posterImage: createPosterImageUrl(config.baseImageUrl, movieDbMovie.poster_path),
    });

    /** @function cast
     * @param movieDbCredits the data received from the credits api
     * @param {Configuration} config  the configuration
     * @returns {CastMember[]}
     */
    const cast = (movieDbCredits, config) =>
        movieDbCredits.cast.map(castMember => ({
            id: castMember.cast_id,
            character: castMember.character,
            name: castMember.name,
            profileImage: createProfileImageUrl(config.baseImageUrl, castMember.profile_path),
        }));

    /** @function youtubeVideos
     * @param movieDbVideos the data received from the videos api
     * @returns {Video[]}
     */
    const youtubeVideos = movieDbVideos =>
        movieDbVideos.results
            .filter(video => video.site === YouTubeSite)
            .map(video => ({
                id: video.id,
                name: video.name,
                key: video.key,
            }));

    return {
        configuration,
        search,
        movie,
        cast,
        youtubeVideos,
    };
};

export default MovieDbData();
