import MovieDbData from '../../theMovieDb/movieDbData';
import configurationData from '../configurationData.json';
import searchData from '../searchData.json';
import movieData from '../movieData.json';
import creditsData from '../creditsData.json';
import videosData from '../videosData.json';

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

    describe('movie', () => {
        const config = { baseImageUrl: 'http://image.tmdb.org/t/p/' };
        const movie = MovieDbData.movie(movieData, config);

        it('should return the movie details', () => {
            expect(movie.id).toBe(116149);
            expect(movie.title).toBe('Paddington');
            expect(movie.tagLine).toBe('THE ADVENTURE BEGINS');
            expect(movie.overview).toBe('After a deadly earthquake destroys his home in Peruvian rainforest,' +
                ' a young bear makes his way to England in search of a new home. The bear, dubbed "Paddington"' +
                ' for the london train station, finds shelter with the family of Henry and Mary Brown.' +
                ' Although Paddington\'s amazement at urban living soon endears him to the Browns, someone' +
                ' else has her eye on him: Taxidermist Millicent Clyde has designs on the rare bear and his hide.');
            expect(movie.genres).toEqual(['Comedy', 'Adventure']);
        });

        it('should create a url for the movie poster', () => {
            expect(movie.posterImage).toBe(`${config.baseImageUrl}w300/hfjfjYsTBHgfogLWWiTm5OP7KpD.jpg`);
        });
    });

    describe('cast', () => {
        const config = { baseImageUrl: 'http://image.tmdb.org/t/p/' };
        const cast = MovieDbData.cast(creditsData, config);

        it('should return a list of cast member', () => {
            expect(cast).toHaveLength(69);
        });

        it('should return details for each cast member', () => {
            expect(cast[0].id).toBe(19);
            expect(cast[0].character).toBe('Paddington (voice)');
            expect(cast[0].name).toBe('Ben Whishaw');
        });

        it('should create a url for the cast member profile', () => {
            expect(cast[0].profileImage).toBe(`${config.baseImageUrl}w185/e74Cz65ifeNb9zHfUTvF5rTix0d.jpg`);
        });
    });

    describe('youtubeVideos', () => {
        const videos = MovieDbData.youtubeVideos(videosData);
        it('should return a list of youtube videos', () => {
            expect(videos).toHaveLength(1);
        });

        it('should return details for each video', () => {
            expect(videos[0].id).toBe('539f7416c3a36850df00003c');
            expect(videos[0].name).toBe('PADDINGTON - Trailer 2 - On DVD, Blu-ray and Download now');
            expect(videos[0].key).toBe('qFuzMlfZGWM');
        });
    });
});
