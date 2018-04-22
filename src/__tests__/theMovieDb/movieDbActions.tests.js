import MovieDbActions from '../../theMovieDb/movieDbActions';
import configurationData from '../configurationData.json';
import searchData from '../searchData.json';
import movieData from '../movieData.json';
import creditsData from '../creditsData.json';
import videosData from '../videosData.json';
import requestTokenData from '../requestTokenData.json';
import sessionData from '../sessionData.json';

describe('movieDbActions', () => {
    const mockApi = ({
        getConfig: jest.fn(() => Promise.resolve(configurationData)),
        searchMovie: jest.fn(() => Promise.resolve(searchData)),
        getMovie: jest.fn(() => Promise.resolve(movieData)),
        getCredits: jest.fn(() => Promise.resolve(creditsData)),
        getVideos: jest.fn(() => Promise.resolve(videosData)),
        createRequestToken: jest.fn(() => Promise.resolve(requestTokenData)),
        createSession: jest.fn(() => Promise.resolve(sessionData)),
        rateMovie: jest.fn(() => Promise.resolve()),
    });

    const mockConfig = ({
        baseImageUrl: 'http://www.google.com',
    });

    const mockSearch = [{ id: 1 }];
    const mockMovie = { id: 1 };
    const mockCast = { id: 2 };
    const mockVideos = { id: 3 };
    const mockToken = '987654321';
    const mockSessionId = 'xxxxxxxxxx';

    const mockDataTransform = ({
        configuration: jest.fn(() => mockConfig),
        search: jest.fn(() => mockSearch),
        movie: jest.fn(() => mockMovie),
        cast: jest.fn(() => mockCast),
        youtubeVideos: jest.fn(() => mockVideos),
        requestToken: jest.fn(() => mockToken),
        session: jest.fn(() => mockSessionId),
    });

    const actions = MovieDbActions(mockApi, mockDataTransform);

    describe('getConfig', () => {
        it('should call getConfig on the api and the data transformation', () =>
            actions.getConfig().then(() => {
                expect(mockApi.getConfig.mock.calls).toHaveLength(1);
                expect(mockDataTransform.configuration.mock.calls).toHaveLength(1);
                expect(mockDataTransform.configuration.mock.calls[0][0]).toEqual(configurationData);
            }));

        it('should return a promise with the transformation result', () =>
            actions.getConfig().then((data) => {
                expect(data).toEqual(mockConfig);
            }));
    });

    describe('search', () => {
        it('should call search on the api and the data transformation', () => {
            const searchText = 'Paddington';
            return actions.search(searchText, mockConfig).then(() => {
                expect(mockApi.searchMovie.mock.calls).toHaveLength(1);
                expect(mockApi.searchMovie.mock.calls[0][0]).toEqual(searchText);
                expect(mockDataTransform.search.mock.calls).toHaveLength(1);
                expect(mockDataTransform.search.mock.calls[0][0]).toEqual(searchData);
                expect(mockDataTransform.search.mock.calls[0][1]).toEqual(mockConfig);
            });
        });

        it('should return a promise with the transformation result', () => {
            const searchText = 'Paddington';
            return actions.search(searchText, mockConfig).then((data) => {
                expect(data).toEqual(mockSearch);
            });
        });
    });

    describe('getMovie', () => {
        it('should call getMovie on the api and the data transformation', () => {
            const movieId = 9999;
            return actions.getMovie(movieId, mockConfig).then(() => {
                expect(mockApi.getMovie.mock.calls).toHaveLength(1);
                expect(mockApi.getMovie.mock.calls[0][0]).toEqual(movieId);
                expect(mockDataTransform.movie.mock.calls).toHaveLength(1);
                expect(mockDataTransform.movie.mock.calls[0][0]).toEqual(movieData);
                expect(mockDataTransform.movie.mock.calls[0][1]).toEqual(mockConfig);
            });
        });

        it('should return a promise with the transformation result', () => {
            const movieId = 9999;
            return actions.getMovie(movieId, mockConfig).then((data) => {
                expect(data).toEqual(mockMovie);
            });
        });
    });

    describe('getCast', () => {
        it('should call getCredits on the api and the data transformation', () => {
            const movieId = 9999;
            return actions.getCast(movieId, mockConfig).then(() => {
                expect(mockApi.getCredits.mock.calls).toHaveLength(1);
                expect(mockApi.getCredits.mock.calls[0][0]).toEqual(movieId);
                expect(mockDataTransform.cast.mock.calls).toHaveLength(1);
                expect(mockDataTransform.cast.mock.calls[0][0]).toEqual(creditsData);
                expect(mockDataTransform.cast.mock.calls[0][1]).toEqual(mockConfig);
            });
        });

        it('should return a promise with the transformation result', () => {
            const movieId = 9999;
            return actions.getCast(movieId, mockConfig).then((data) => {
                expect(data).toEqual(mockCast);
            });
        });
    });

    describe('getYoutubeVideos', () => {
        it('should call getVideos on the api and the data transformation', () => {
            const movieId = 9999;
            return actions.getYoutubeVideos(movieId).then(() => {
                expect(mockApi.getVideos.mock.calls).toHaveLength(1);
                expect(mockApi.getVideos.mock.calls[0][0]).toEqual(movieId);
                expect(mockDataTransform.youtubeVideos.mock.calls).toHaveLength(1);
                expect(mockDataTransform.youtubeVideos.mock.calls[0][0]).toEqual(videosData);
            });
        });

        it('should return a promise with the transformation result', () => {
            const movieId = 9999;
            return actions.getYoutubeVideos(movieId).then((data) => {
                expect(data).toEqual(mockVideos);
            });
        });
    });

    describe('createRequestToken', () => {
        it('should call createRequestToken on the api and requestToken data transformation', () =>
            actions.createRequestToken().then(() => {
                expect(mockApi.createRequestToken.mock.calls).toHaveLength(1);
                expect(mockDataTransform.requestToken.mock.calls).toHaveLength(1);
                expect(mockDataTransform.requestToken.mock.calls[0][0]).toEqual(requestTokenData);
            }));

        it('should return a promise with the transformation result', () =>
            actions.createRequestToken().then((requestToken) => {
                expect(requestToken).toEqual(mockToken);
            }));
    });

    describe('createSession', () => {
        const token = '987654321';
        it('should createSession on the api and session data transformation', () =>
            actions.createSession(token).then(() => {
                expect(mockApi.createSession.mock.calls).toHaveLength(1);
                expect(mockApi.createSession.mock.calls[0][0]).toEqual(token);
                expect(mockDataTransform.session.mock.calls).toHaveLength(1);
                expect(mockDataTransform.session.mock.calls[0][0]).toEqual(sessionData);
            }));

        it('should return a promise with the transformation result', () =>
            actions.createSession(token).then((sessionId) => {
                expect(sessionId).toEqual(mockSessionId);
            }));
    });

    describe('rateMovie', () => {
        it('should call rateMovie on the api', () => {
            const sessionId = '987654321';
            const movieId = 9;
            const rating = 1;
            return actions.rateMovie(movieId, rating)(sessionId).then(() => {
                expect(mockApi.rateMovie.mock.calls).toHaveLength(1);
                expect(mockApi.rateMovie.mock.calls[0][0]).toBe(movieId);
                expect(mockApi.rateMovie.mock.calls[0][1]).toBe(rating);
                expect(mockApi.rateMovie.mock.calls[0][2]).toBe(sessionId);
            });
        });
    });
});
