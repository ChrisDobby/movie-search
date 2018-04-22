import React from 'react';
import PropTypes from 'prop-types';

const style = {
    borderRadius: '50%',
    border: '2px solid #ffeeba',
    textAlign: 'center',
    padding: '8px',
    fontSize: '32px',
    margin: '4px',
    maxWidth: '80px',
    maxHeight: '80px',
    cursor: 'pointer',
    color: '#856404',
};

const notSelectedStyle = {
    ...style,
    background: '#ffffff',
};

const selectedStyle = {
    ...style,
    background: '#fff3cd',
};

const RatingValue = ({ value, currentRating, select }) => (
    <div
        className="col-xs-3 col-sm-2 col-md-2 col-lg-1"
        style={value > currentRating ? notSelectedStyle : selectedStyle}
        onClick={select}
        onKeyDown={(event) => { if (event.keyCode === 13) { select(); } }}
        role="presentation"
    >{value}
    </div>
);

RatingValue.propTypes = {
    value: PropTypes.number.isRequired,
    currentRating: PropTypes.number.isRequired,
    select: PropTypes.func.isRequired,
};

export default RatingValue;
