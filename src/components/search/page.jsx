import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../loading';
import SearchEntry from './searchEntry';
import MovieList from './movieList';

class Page extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            search: {
                searching: false,
                searchError: false,
                movies: [],
            },
        };

        this.movieSearch = this.movieSearch.bind(this);
    }

    movieSearch(searchText) {
        this.setState({
            search: {
                searching: true,
                searchError: false,
                movies: [],
            },
        });

        this.props.actions.search(searchText, this.props.config)
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
                <SearchEntry doSearch={this.movieSearch} />
                {this.state.search.searchError &&
                    <div className="alert alert-danger" role="alert">
                        There was an error searching.  Please try again.
                    </div>
                }

                {this.state.search.searching &&
                    <Loading />}

                {!this.state.search.searching && this.state.search.movies.length > 0 &&
                    <MovieList movies={this.state.search.movies} />}
            </div>
        );
    }
}

Page.propTypes = {
    actions: PropTypes.shape({
        search: PropTypes.func,
    }).isRequired,
    config: PropTypes.shape({}).isRequired,
};

export default Page;
