import TheMovieDbApi from '../../api/theMovieDbApi';
import configurationData from '../configurationData.json';
import searchData from '../searchData.json';
import movieData from '../movieData.json';
import creditsData from '../creditsData.json';
import videosData from '../videosData.json';

describe('theMovieDbApi', () => {
    const apiUrl = 'http://testurl.com';
    const apiKey = '123456789';

    const api = TheMovieDbApi(apiUrl, apiKey);

    beforeEach(() => {
        fetch.resetMocks();
    });

    describe('getConfig', () => {
        it('should fetch from the correct url', () => {
            api.getConfig();

            expect(fetch.mock.calls).toHaveLength(1);
            expect(fetch.mock.calls[0][0]).toBe(`${apiUrl}/configuration?api_key=${apiKey}`);
        });

        it('should return the config from the response', () => {
            fetch.mockResponseOnce(JSON.stringify(configurationData));
            return api.getConfig().then((config) => {
                expect(config).toEqual(configurationData);
            });
        });

        it('should return the error if the call fails', () => {
            fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });

            return api.getConfig().catch((error) => {
                expect(error).toEqual('Not Found');
            });
        });

        it('should return nothing if the body cannot be parsed', () => {
            fetch.mockResponseOnce({});

            return api.getConfig().then((data) => {
                expect(data).toBeFalsy();
            });
        });
    });

    describe('searchMovie', () => {
        const searchText = 'paddington';

        it('should fetch from the correct url', () => {
            api.searchMovie(searchText);

            expect(fetch.mock.calls).toHaveLength(1);
            expect(fetch.mock.calls[0][0]).toBe(`${apiUrl}/search/movie?api_key=${apiKey}&query=${searchText}`);
        });

        it('should return the search from the response', () => {
            fetch.mockResponseOnce(JSON.stringify(searchData));
            return api.searchMovie(searchText).then((search) => {
                expect(search).toEqual(searchData);
            });
        });

        it('should return the error if the call fails', () => {
            fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });

            return api.searchMovie(searchText).catch((error) => {
                expect(error).toEqual('Not Found');
            });
        });

        it('should return nothing if the body cannot be parsed', () => {
            fetch.mockResponseOnce({});

            return api.searchMovie(searchText).then((data) => {
                expect(data).toBeFalsy();
            });
        });
    });

    describe('getMovie', () => {
        const movieId = 9999;

        it('should fetch from the correct url', () => {
            api.getMovie(movieId);

            expect(fetch.mock.calls).toHaveLength(1);
            expect(fetch.mock.calls[0][0]).toBe(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`);
        });

        it('should return the movie from the response', () => {
            fetch.mockResponseOnce(JSON.stringify(movieData));
            return api.getMovie(movieId).then((movie) => {
                expect(movie).toEqual(movieData);
            });
        });

        it('should return the error if the call fails', () => {
            fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });

            return api.getMovie(movieId).catch((error) => {
                expect(error).toEqual('Not Found');
            });
        });

        it('should return nothing if the body cannot be parsed', () => {
            fetch.mockResponseOnce({});

            return api.getMovie(movieId).then((data) => {
                expect(data).toBeFalsy();
            });
        });
    });

    describe('getCredits', () => {
        const movieId = 9999;

        it('should fetch from the correct url', () => {
            api.getCredits(movieId);

            expect(fetch.mock.calls).toHaveLength(1);
            expect(fetch.mock.calls[0][0]).toBe(`${apiUrl}/movie/${movieId}/credits?api_key=${apiKey}`);
        });

        it('should return the credits from the response', () => {
            fetch.mockResponseOnce(JSON.stringify(creditsData));
            return api.getCredits(movieId).then((credits) => {
                expect(credits).toEqual(creditsData);
            });
        });

        it('should return the error if the call fails', () => {
            fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });

            return api.getCredits(movieId).catch((error) => {
                expect(error).toEqual('Not Found');
            });
        });

        it('should return nothing if the body cannot be parsed', () => {
            fetch.mockResponseOnce({});

            return api.getCredits(movieId).then((data) => {
                expect(data).toBeFalsy();
            });
        });
    });

    describe('getVideos', () => {
        const movieId = 9999;

        it('should fetch from the correct url', () => {
            api.getVideos(movieId);

            expect(fetch.mock.calls).toHaveLength(1);
            expect(fetch.mock.calls[0][0]).toBe(`${apiUrl}/movie/${movieId}/videos?api_key=${apiKey}`);
        });

        it('should return the videos from the response', () => {
            fetch.mockResponseOnce(JSON.stringify(videosData));
            return api.getVideos(movieId).then((videos) => {
                expect(videos).toEqual(videosData);
            });
        });

        it('should return the error if the call fails', () => {
            fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });

            return api.getVideos(movieId).catch((error) => {
                expect(error).toEqual('Not Found');
            });
        });

        it('should return nothing if the body cannot be parsed', () => {
            fetch.mockResponseOnce({});

            return api.getVideos(movieId).then((data) => {
                expect(data).toBeFalsy();
            });
        });
    });
});
