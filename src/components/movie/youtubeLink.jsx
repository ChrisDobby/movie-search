import React from 'react';
import PropTypes from 'prop-types';

const YoutubeLink = ({ video }) => (
    <a target="_blank" href={`https://www.youtube.com/watch?v=${video.key}`}>
        <h5>{video.name}</h5>
    </a>
);

YoutubeLink.propTypes = {
    video: PropTypes.shape({
        name: PropTypes.string,
        key: PropTypes.string,
    }).isRequired,
};

export default YoutubeLink;
