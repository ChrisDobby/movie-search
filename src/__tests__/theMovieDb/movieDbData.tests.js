import MovieDbData from '../../theMovieDb/movieDbData';
import configurationData from '../configurationData.json';
import searchData from '../searchData.json';

describe('movieDbData', () => {
    describe('configuration', () => {
        const config = MovieDbData.configuration(configurationData);

        it('should get the base image url', () => {
            expect(config.baseImageUrl).toBe('http://image.tmdb.org/t/p/');
        });
    });

    describe('search', () => {
        const config = { baseImageUrl: 'http://image.tmdb.org/t/p/' };
        const movies = MovieDbData.search(searchData, config);

        it('should return a list of the movies', () => {
            expect(movies).toHaveLength(11);
        });

        it('should return id and title for a movie', () => {
            expect(movies[0].id).toBe(116149);
            expect(movies[0].title).toBe('Paddington');
        });

        it('should create a url for movie posters', () => {
            expect(movies[0].posterImage).toBe(`${config.baseImageUrl}w300/hfjfjYsTBHgfogLWWiTm5OP7KpD.jpg`);
        });
    });
});
