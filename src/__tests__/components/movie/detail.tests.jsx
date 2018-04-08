import React from 'react';
import renderer from 'react-test-renderer';
import Detail from '../../../components/movie/detail';

describe('movieCard', () => {
    const movie = {
        id: 1,
        title: 'A Movie',
        tagLine: 'some tagline',
        overview: 'something',
        posterImage: '1.png',
        genres: [],
    };

    it('should render the movie detail correctly', () => {
        const detail = renderer.create(<Detail data={movie} />);

        expect(detail.toJSON()).toMatchSnapshot();
    });
});
