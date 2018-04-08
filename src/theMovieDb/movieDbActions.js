const MovieDbActions = (api, data) => {
    const getConfig = () =>
        api.getConfig().then(configData => data.configuration(configData));

    const search = (searchText, config) =>
        api.searchMovie(searchText).then(searchData => data.search(searchData, config));

    return {
        getConfig,
        search,
    };
};

export default MovieDbActions;
