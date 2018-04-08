import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import MovieCard from '../../../components/search/movieCard';

describe('movieCard', () => {
    const movie = {
        id: 1,
        title: 'A Movie',
        posterImage: '1.png',
    };

    it('should render the movie correctly', () => {
        const card = renderer.create((
            <MemoryRouter>
                <MovieCard movie={movie} />
            </MemoryRouter>));

        expect(card.toJSON()).toMatchSnapshot();
    });
});
