const MovieDbActions = (api, data) => {
    const getConfig = () =>
        api.getConfig().then(configData => data.configuration(configData));

    const search = (searchText, config) =>
        api.searchMovie(searchText).then(searchData => data.search(searchData, config));

    const getMovie = (id, config) =>
        api.getMovie(id).then(movieData => data.movie(movieData, config));

    const getCast = (id, config) =>
        api.getCredits(id).then(creditsData => data.cast(creditsData, config));

    const getYoutubeVideos = id =>
        api.getVideos(id).then(videosData => data.youtubeVideos(videosData));

    return {
        getConfig,
        search,
        getMovie,
        getCast,
        getYoutubeVideos,
    };
};

export default MovieDbActions;
