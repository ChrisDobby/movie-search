import React from 'react';
import PropTypes from 'prop-types';
import YoutubeLink from './youtubeLink';

const Videos = ({ data }) => (
    <div>
        <div className="row">
            <div className="col-md-12" style={{ textAlign: 'center' }}>
                <h2>Video links</h2>
            </div>
        </div>
        <div className="row">
            <ul className="list-group">
                {data.map(video => (
                    <li key={video.id} className="list-group-item">
                        <YoutubeLink video={video} />
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

Videos.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
    })).isRequired,
};

export default Videos;
