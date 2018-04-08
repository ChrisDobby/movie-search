import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import MovieList from '../../../components/search/movieList';

describe('movieList', () => {
    const movies = [{
        id: 1,
        title: 'A Movie',
        posterImage: '1.png',
    },
    {
        id: 2,
        title: 'Another Movie',
        posterImage: '2.png',
    }];

    it('should render the list correctly', () => {
        const list = renderer.create((
            <MemoryRouter>
                <MovieList movies={movies} />
            </MemoryRouter>));

        expect(list.toJSON()).toMatchSnapshot();
    });
});
