import React from 'react';
import { Route } from 'react-router-dom';

const Routes = () => (
    <div>
        <Route exact path="/" render={() => <div id="react-entry">React app</div>} />
    </div>
);

export default Routes;
