import React from 'react';

const spinnerStyle = {
    fontSize: '24px',
};

const Loading = () => (
    <div className="col-md-12" style={{ textAlign: 'center' }}>
        <div><i className="fa fa-spinner fa-spin" style={spinnerStyle} /></div>
    </div>
);

export default Loading;
