import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import SearchPage from './components/search/page';
import WithNavBar from './components/withNavBar';
import WithConfig from './components/withConfig';

const PageWithNavBar = (page, props, actions) => {
    const NewPage = WithConfig(
        WithNavBar(page),
        actions
    );

    return <NewPage {...props} actions={actions} />;
};

const Routes = ({ actions }) => (
    <div className="container-fluid">
        <Route exact path="/" render={props => PageWithNavBar(SearchPage, props, actions)} />
    </div>
);

Routes.propTypes = {
    actions: PropTypes.shape({}).isRequired,
};

export default Routes;
