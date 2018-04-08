import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../loading';
import MovieList from './movieList';

const searchStorageKey = 'search';

class Page extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            search: {
                searching: true,
                searchError: false,
                movies: [],
            },
        };
    }

    componentWillMount() {
        const storedSearch = this.props.storage.getItem(searchStorageKey);
        if (!storedSearch) { return; }

        const foundSearch = JSON.parse(storedSearch);
        if (foundSearch.searchText === this.props.searchText) {
            this.setState({
                search: {
                    searching: false,
                    searchError: false,
                    movies: foundSearch.results,
                },
            });
        }
    }

    componentDidMount() {
        if (!this.state.search.searching) { return; }

        this.props.actions.search(this.props.searchText, this.props.config)
            .then((movies) => {
                this.setState({
                    search: {
                        searching: false,
                        searchError: false,
                        movies,
                    },
                });
                this.props.storage.setItem(searchStorageKey, JSON.stringify({
                    searchText: this.props.searchText,
                    results: movies,
                }));
            })
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
    searchText: PropTypes.string.isRequired,
    storage: PropTypes.shape({
        getItem: PropTypes.func,
        setItem: PropTypes.func,
    }).isRequired,
};

export default Page;
