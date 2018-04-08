import React from 'react';
import PropTypes from 'prop-types';
import Wait from './wait';
import SearchEntry from './searchEntry';
import MovieList from './movieList';

class Page extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            configuration: {
                loading: true,
                loadingError: false,
                config: null,
            },
            search: {
                searching: false,
                searchError: false,
                movies: [],
            },
        };

        this.movieSearch = this.movieSearch.bind(this);
    }

    componentDidMount() {
        this.props.actions.getConfig()
            .then(config => this.setState({
                configuration: {
                    loading: false,
                    loadingError: false,
                    config,
                },
            }))
            .catch(() => this.setState({
                configuration: {
                    loading: false,
                    loadingError: true,
                    config: null,
                },
            }));
    }

    movieSearch(searchText) {
        this.setState({
            search: {
                searching: true,
                searchError: false,
                movies: [],
            },
        });

        this.props.actions.search(searchText, this.state.configuration.config)
            .then(movies => this.setState({
                search: {
                    searching: false,
                    searchError: false,
                    movies,
                },
            }))
            .catch(() => this.setState({
                search: {
                    searching: false,
                    searchError: true,
                    movies: [],
                },
            }));
    }

    render() {
        return (
            <div>
                {this.state.configuration.config &&
                <SearchEntry doSearch={this.movieSearch} />}
                {this.state.configuration.loadingError &&
                    <div className="alert alert-danger" role="alert">
                        There was an error loading the movie db configuration.  Refresh to try again.
                    </div>
                }
                {this.state.search.searchError &&
                    <div className="alert alert-danger" role="alert">
                        There was an error searching.  Please try again.
                    </div>
                }

                {(this.state.configuration.loading || this.state.search.searching) &&
                    <Wait />}

                {!this.state.search.searching && this.state.search.movies.length > 0 &&
                    <MovieList movies={this.state.search.movies} />}
            </div>
        );
    }
}

Page.propTypes = {
    actions: PropTypes.shape({
        getConfig: PropTypes.func,
        search: PropTypes.func,
    }).isRequired,
};

export default Page;
