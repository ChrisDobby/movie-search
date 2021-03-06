import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => (
    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <div className="card">
            <Link to={`/movie/${movie.id}`}>
                {movie.posterImage
                    ? <img className="card-img-top" src={movie.posterImage} alt={movie.title} />
                    : (
                        <div className="card-body">
                            <h5 className="card-title">{movie.title}</h5>
                        </div>)
                }
            </Link>
        </div>
    </div>);

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        posterImage: PropTypes.string,
    }).isRequired,
};

export default MovieCard;
