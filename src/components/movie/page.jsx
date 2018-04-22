import React from 'react';
import PropTypes from 'prop-types';
import Section from './section';
import Detail from './detail';
import Cast from './cast';
import Videos from './videos';

const sectionStyle = {
    marginBottom: '20px',
};

const Page = ({ id, actions, config }) => {
    const Details = Section(Detail);
    const CastMembers = Section(Cast);
    const VideoList = Section(Videos);

    return (
        <div className="container">
            <div style={sectionStyle}>
                <Details action={() => actions.getMovie(id, config)} actions={actions} />
            </div>
            <div style={sectionStyle}>
                <CastMembers action={() => actions.getCast(id, config)} />
            </div>
            <div style={sectionStyle}>
                <VideoList action={() => actions.getYoutubeVideos(id)} />
            </div>
        </div>
    );
};

Page.propTypes = {
    id: PropTypes.number.isRequired,
    actions: PropTypes.shape({
        getMovie: PropTypes.func,
        getCast: PropTypes.func,
        getYoutubeVideos: PropTypes.func,
    }).isRequired,
    config: PropTypes.shape({}).isRequired,
};

export default Page;
