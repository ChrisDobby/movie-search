import React from 'react';
import PropTypes from 'prop-types';

const CastCard = ({ castMember }) => (
    <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
        <div className="card">
            <img className="card-img-top" src={castMember.profileImage} alt={castMember.name} />
            <div className="card-body">
                <h5 className="card-title">{castMember.name}</h5>
                <h6 className="card-title">{castMember.character}</h6>
            </div>
        </div>
    </div>);

CastCard.propTypes = {
    castMember: PropTypes.shape({
        name: PropTypes.string,
        character: PropTypes.string,
        profileImage: PropTypes.string,
    }).isRequired,
};

export default CastCard;
