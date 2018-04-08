import React from 'react';
import PropTypes from 'prop-types';
import SearchEntry from './searchEntry';

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
};

const componentStyle = {
    flex: '1',
    overflowY: 'auto',
    overflowX: 'hidden',
    marginTop: '8px',
};

const imageStyle = {
    height: '80px',
};

const WithNavBar = (Component) => {
    const NavBar = props => (
        <div style={containerStyle}>
            <nav className="navbar navbar-dark bg-info">
                <img
                    className="navbar-brand"
                    alt="Powered by The Movie DB"
                    style={imageStyle}
                    src="https://www.themoviedb.org/static_cache/v4/logos/powered-by-square-blue-30582ce92620a08ce2ab8082fb19897a3c69093aa20e786cfe6a041e54e21b2b.svg"
                />
                <form className="form-inline">
                    <SearchEntry doSearch={searchText => props.history.push(`/search/${searchText}`)} />
                </form>
            </nav>

            <div style={componentStyle}>
                <Component {...props} />
            </div>
        </div>
    );

    NavBar.propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func,
        }).isRequired,
    };

    return NavBar;
};


export default WithNavBar;
