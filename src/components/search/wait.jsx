import React from 'react';

const Wait = () => (
    <div className="progress">
        <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: '75%' }}
        />
    </div>
);

export default Wait;
