import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import SearchPage from './components/search/page';
import MoviePage from './components/movie/page';
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
        <Route
            exact
            path="/movie/:id"
            render={props => PageWithNavBar(
                MoviePage,
                {
                    ...props,
                    id: Number(props.match.params.id),
                },
                actions
            )}
        />
    </div>
);

Routes.propTypes = {
    actions: PropTypes.shape({}).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }),
    }),
};

Routes.defaultProps = {
    match: null,
};

export default Routes;
