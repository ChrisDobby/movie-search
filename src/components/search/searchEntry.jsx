import React from 'react';
import PropTypes from 'prop-types';

class SearchEntry extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { searchText: '' };

        this.searchTextChange = this.searchTextChange.bind(this);
        this.searchKeyDown = this.searchKeyDown.bind(this);
        this.search = this.search.bind(this);
    }

    search() {
        if (this.state.searchText) {
            this.props.doSearch(this.state.searchText);
        }
    }

    searchTextChange(event) {
        this.setState({ searchText: event.target.value });
    }

    searchKeyDown(event) {
        if (event.keyCode === 13) {
            this.search();
        }
    }

    render() {
        return (
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for a movie"
                    aria-label="Search for a movie"
                    aria-describedby="basic-addon2"
                    value={this.state.searchText}
                    onChange={this.searchTextChange}
                    onKeyDown={this.searchKeyDown}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={this.search}
                    ><i className="fas fa-search" />
                    </button>
                </div>
            </div>
        );
    }
}

SearchEntry.propTypes = {
    doSearch: PropTypes.func.isRequired,
};

export default SearchEntry;
