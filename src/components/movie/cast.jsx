import React from 'react';
import PropTypes from 'prop-types';
import CastCard from './castCard';

const Cast = ({ data }) => (
    <div>
        <div className="row">
            <div className="col-md-12" style={{ textAlign: 'center' }}>
                <h2>Cast</h2>
            </div>
        </div>
        <div className="row">
            {data.slice(0, 20)
                .filter(castMember => castMember.profileImage)
                .map(castMember => (
                    <CastCard key={castMember.id} castMember={castMember} />
                ))}
        </div>
    </div>
);

Cast.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
    })).isRequired,
};

export default Cast;
