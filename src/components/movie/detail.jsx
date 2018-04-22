import React from 'react';
import PropTypes from 'prop-types';
import RateMovie from './rateMovie';

const imageStyle = {
    width: '100%',
    borderRadius: '8px',
};

const genreStyle = {
    display: 'inline-block',
    height: '32px',
    fontSize: '13px',
    fontWeight: '500',
    color: 'rgba(0,0,0,0.6)',
    lineHeight: '32px',
    padding: '0 12px',
    borderRadius: '16px',
    backgroundColor: '#e4e4e4',
    marginBottom: '5px',
    marginRight: '5px',
};

const Detail = ({ data, actions }) => (
    <div className="row">
        <div className="col-lg-8 col-md-7 col-sm-6 col-xs-12">
            <h1>{data.title}</h1>
            <h3>{data.tagLine}</h3>
            {data.genres.map(genre => (
                <div key={genre} style={genreStyle}>{genre}</div>
            ))}
            <p>{data.overview}</p>
            <RateMovie id={data.id} actions={actions} />
        </div>
        <div className="col-lg-4 col-md-5 col-sm-6 col-xs-12">
            <img style={imageStyle} alt={data.title} src={data.posterImage} />
        </div>
    </div>
);

Detail.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        tagLine: PropTypes.string,
        overview: PropTypes.string,
        posterImage: PropTypes.string,
        genres: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    actions: PropTypes.shape({
        RateMovie: PropTypes.func,
    }).isRequired,
};

export default Detail;
