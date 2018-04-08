import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from './movieCard';

const MovieList = ({ movies }) => (
    <div className="row">
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
    </div>);

MovieList.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        posterImage: PropTypes.string,
    })).isRequired,
};

export default MovieList;
