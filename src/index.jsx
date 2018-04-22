import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';
import TheMovieDb from './theMovieDb/movieDb';

render(
    <BrowserRouter>
        <Routes actions={TheMovieDb.actions} />
    </BrowserRouter>,
    document.getElementById('react-app')
);
