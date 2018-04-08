import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';
import MovieDbApi from './api/theMovieDbApi';
import MovieDbData from './theMovieDb/movieDbData';
import MovieDbActions from './theMovieDb/movieDbActions';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'e2e02c3de2b84529b9d19e41a1848501';

const actions = MovieDbActions(
    MovieDbApi(apiUrl, apiKey),
    MovieDbData
);

render(
    <BrowserRouter>
        <Routes actions={actions} />
    </BrowserRouter>,
    document.getElementById('react-app')
);
