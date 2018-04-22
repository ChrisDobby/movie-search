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

const sendErrorMessage = (
    <div className="alert alert-danger" role="alert">
        There was an sending your rating.  Please try again.
    </div>);

const authenticateButtonStyle = {
    whiteSpace: 'normal',
};

const sendButtonStyle = {
    marginTop: '10px',
};

class RateMovie extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            rating: 0,
            sending: false,
            sendSuccess: false,
            sendError: false,
        };

        this.setRating = this.setRating.bind(this);
        this.sendRating = this.sendRating.bind(this);
    }

    setRating(value) {
        this.setState({
            rating: value,
            sendSuccess: false,
        });
    }

    sendRating() {
        this.setState({
            sending: true,
            sendSuccess: false,
            sendError: false,
        });

        this.props.authenticatedAction(this.props.actions.rateMovie(this.props.id, this.state.rating))
            .then(() => {
                this.setState({
                    sending: false,
                    sendSuccess: true,
                });
            })
            .catch(() => this.setState({
                sendError: true,
                sending: false,
            }));
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
                        {this.state.sending &&
                            <Loading />
                        }
                        {!this.state.sending &&
                            <div className="row" style={sendButtonStyle}>
                                <button
                                    className="btn btn-secondary"
                                    disabled={this.state.rating < 1}
                                    onClick={this.sendRating}
                                >Send rating
                                </button>
                            </div>}
                        {this.state.sendSuccess &&
                        <h5>Rating sent</h5>}
                        {this.state.sendError && sendErrorMessage}
                    </div>}
            </div>
        );
    }
}

RateMovie.propTypes = {
    id: PropTypes.number.isRequired,
    isAuthenticated: PropTypes.bool,
    isAuthenticating: PropTypes.bool,
    authenticationError: PropTypes.bool,
    authenticate: PropTypes.func.isRequired,
    authenticatedAction: PropTypes.func.isRequired,
    actions: PropTypes.shape({
        rateMovie: PropTypes.func,
    }).isRequired,
};

RateMovie.defaultProps = {
    isAuthenticated: false,
    isAuthenticating: false,
    authenticationError: false,
};

export default WithAuthentication(TheMovieDb.authentication, () => new URL(document.location).searchParams)(RateMovie);
