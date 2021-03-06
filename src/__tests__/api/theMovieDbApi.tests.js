import TheMovieDbApi from '../../api/theMovieDbApi';
import configurationData from '../configurationData.json';
import searchData from '../searchData.json';
import movieData from '../movieData.json';
import creditsData from '../creditsData.json';
import videosData from '../videosData.json';
import requestTokenData from '../requestTokenData.json';
import sessionData from '../sessionData.json';

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

    describe('createRequestToken', () => {
        it('should fetch from the correct url', () => {
            api.createRequestToken();

            expect(fetch.mock.calls).toHaveLength(1);
            expect(fetch.mock.calls[0][0]).toBe(`${apiUrl}/authentication/token/new?api_key=${apiKey}`);
        });

        it('should return the token from the response', () => {
            fetch.mockResponseOnce(JSON.stringify(requestTokenData));
            return api.createRequestToken().then((token) => {
                expect(token).toEqual(requestTokenData);
            });
        });

        it('should return the error if the call fails', () => {
            fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });

            return api.createRequestToken().catch((error) => {
                expect(error).toEqual('Not Found');
            });
        });

        it('should return nothing if the body cannot be parsed', () => {
            fetch.mockResponseOnce({});

            return api.createRequestToken().then((data) => {
                expect(data).toBeFalsy();
            });
        });
    });

    describe('createSession', () => {
        const token = '9876543210';
        it('should fetch from the correct url', () => {
            api.createSession(token);

            expect(fetch.mock.calls).toHaveLength(1);
            expect(fetch.mock.calls[0][0])
                .toBe(`${apiUrl}/authentication/session/new?api_key=${apiKey}&request_token=${token}`);
        });

        it('should return the session from the response', () => {
            fetch.mockResponseOnce(JSON.stringify(sessionData));
            return api.createSession(token).then((session) => {
                expect(session).toEqual(sessionData);
            });
        });

        it('should return the error if the call fails', () => {
            fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });

            return api.createSession(token).catch((error) => {
                expect(error).toEqual('Not Found');
            });
        });

        it('should return nothing if the body cannot be parsed', () => {
            fetch.mockResponseOnce({});

            return api.createSession(token).then((data) => {
                expect(data).toBeFalsy();
            });
        });
    });

    describe('rateMovie', () => {
        const sessionId = '1234567890';
        const movieId = 9;
        it('should post to the correct url', () => {
            api.rateMovie(9, 1, sessionId);

            expect(fetch.mock.calls).toHaveLength(1);
            expect(fetch.mock.calls[0][0])
                .toBe(`${apiUrl}/movie/${movieId}/rating?api_key=${apiKey}&session_id=${sessionId}`);
            expect(fetch.mock.calls[0][1].method).toBe('POST');
        });

        it('should post the rating', () => {
            api.rateMovie(9, 1, sessionId);

            expect(fetch.mock.calls).toHaveLength(1);
            expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify({ value: 1 }));
        });
    });
});
