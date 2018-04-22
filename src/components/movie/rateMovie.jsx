import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../loading';
import WithAuthentication from '../withAuthentication';
import TheMovieDb from '../../theMovieDb/movieDb';
import RatingValue from './ratingValue';

const authErrorMessage = (
    <div className="alert alert-danger" role="alert">
        There was an error logging in to MovieDb.
    </div>);

const authenticateButtonStyle = {
    whiteSpace: 'normal',
};

class RateMovie extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            rating: 0,
        };

        this.setRating = this.setRating.bind(this);
    }

    setRating(value) {
        this.setState({
            rating: value,
        });
    }

    render() {
        return (
            <div>
                <h4>Rate this movie</h4>
                {this.props.isAuthenticating && <Loading />}
                {this.props.authenticationError && authErrorMessage}
                {!this.props.isAuthenticated && !this.props.isAuthenticating &&
                    <button
                        className="btn btn-link"
                        onClick={this.props.authenticate}
                        style={authenticateButtonStyle}
                    >You are not logged in to MovieDb.  Click here to login.
                    </button>
                }
                {this.props.isAuthenticated &&
                    <div>
                        <div className="row">
                            {Array.from(Array(10).keys())
                                .map(number => (
                                    <RatingValue
                                        key={number}
                                        value={number + 1}
                                        currentRating={this.state.rating}
                                        select={() => this.setRating(number + 1)}
                                    />))}
                        </div>
                    </div>}
            </div>
        );
    }
}

RateMovie.propTypes = {
    isAuthenticated: PropTypes.bool,
    isAuthenticating: PropTypes.bool,
    authenticationError: PropTypes.bool,
    authenticate: PropTypes.func.isRequired,
};

RateMovie.defaultProps = {
    isAuthenticated: false,
    isAuthenticating: false,
    authenticationError: false,
};

export default WithAuthentication(TheMovieDb.authentication, () => new URL(document.location).searchParams)(RateMovie);
