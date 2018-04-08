import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import SearchPage from './components/search/page';

const Routes = ({ actions }) => (
    <div className="container-fluid">
        <Route exact path="/" render={props => <SearchPage {...props} actions={actions} />} />
    </div>
);

Routes.propTypes = {
    actions: PropTypes.shape({}).isRequired,
};

export default Routes;
