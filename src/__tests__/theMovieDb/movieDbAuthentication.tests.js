import MovieDbAuthentication from '../../theMovieDb/movieDbAuthentication';

describe('movieDbAuthentication', () => {
    const sessionStorageKey = 'session';

    const mockToken = '987654321';

    const mockSessionId = '1234567890';

    const mockActions = {
        createRequestToken: jest.fn(() => Promise.resolve(mockToken)),
        createSession: jest.fn(() => Promise.resolve(mockSessionId)),
    };

    describe('isAuthenticated', () => {
        it('should return true when a sessionid is available', () => {
            const storage = {
                getItem: key => (key === sessionStorageKey ? mockSessionId : null),
            };

            const authentication = MovieDbAuthentication(storage);
            const authenticated = authentication.isAuthenticated();

            expect(authenticated).toBeTruthy();
        });

        it('should return false when no sessionid is available', () => {
            const storage = {
                getItem: () => null,
            };

            const authentication = MovieDbAuthentication(storage);
            const authenticated = authentication.isAuthenticated();

            expect(authenticated).toBeFalsy();
        });
    });

    describe('authenticate', () => {
        const authenticationRedirectUrl = 'https://www.themoviedb.org/authenticate/';

        it('should return authentication complete and sessionid if a sessionid is available', () => {
            const storage = {
                getItem: key => (key === sessionStorageKey ? mockSessionId : null),
                setItem: jest.fn(),
            };

            const authentication = MovieDbAuthentication(storage, mockActions);

            return authentication.authenticate().then((authenticationResult) => {
                expect(mockActions.createRequestToken.mock.calls).toHaveLength(0);
                expect(mockActions.createSession.mock.calls).toHaveLength(0);
                expect(storage.setItem.mock.calls).toHaveLength(0);
                expect(authenticationResult.authenticated).toBeTruthy();
                expect(authenticationResult.sessionId).toBe(mockSessionId);
            });
        });

        it(
            'should request a token and redirect to the moviedb authentication page if no session available',
            () => {
                const redirect = jest.fn();
                const storage = {
                    getItem: () => null,
                    setItem: jest.fn(),
                };

                const authentication = MovieDbAuthentication(storage, mockActions, redirect);

                return authentication.authenticate().then((authenticationResult) => {
                    expect(mockActions.createRequestToken.mock.calls).toHaveLength(1);
                    expect(redirect.mock.calls).toHaveLength(1);
                    expect(redirect.mock.calls[0][0]).toBe(`${authenticationRedirectUrl}${mockToken}`);
                    expect(authenticationResult.authenticated).toBeFalsy();
                    expect(authenticationResult.redirecting).toBeTruthy();
                });
            }
        );

        it('should return an error if requesting token fails', () => {
            const storage = {
                getItem: () => null,
                setItem: jest.fn(),
            };

            const authentication = MovieDbAuthentication(
                storage,
                { createRequestToken: jest.fn(() => Promise.reject()) }
            );

            return authentication.authenticate().then((authenticationResult) => {
                expect(authenticationResult.authenticated).toBeFalsy();
                expect(authenticationResult.tokenError).toBeTruthy();
            });
        });

        it('should include return url when redirecting to the moviedb authentication page', () => {
            const redirect = jest.fn();
            const storage = {
                getItem: () => null,
                setItem: jest.fn(),
            };

            const returnUrl = 'http://www.google.co.uk';
            const authentication = MovieDbAuthentication(storage, mockActions, redirect);

            authentication.authenticate(returnUrl)
                .then(() => {
                    expect(redirect.mock.calls).toHaveLength(1);
                    expect(redirect.mock.calls[0][0])
                        .toBe(`${authenticationRedirectUrl}${mockToken}?redirect_to=${returnUrl}`);
                });
        });
    });

    describe('createSession', () => {
        it('should store the session and return it after receiving it', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const authentication = MovieDbAuthentication(storage, mockActions);

            return authentication.createSession(mockToken).then((authenticationResult) => {
                expect(storage.setItem.mock.calls).toHaveLength(1);
                expect(storage.setItem.mock.calls[0][0]).toBe(sessionStorageKey);
                expect(storage.setItem.mock.calls[0][1]).toBe(mockSessionId);
                expect(authenticationResult.authenticated).toBeTruthy();
                expect(authenticationResult.sessionId).toBe(mockSessionId);
            });
        });

        it('should return an error if no token available', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const authentication = MovieDbAuthentication(storage, mockActions);

            return authentication.createSession(null).then((authenticationResult) => {
                expect(authenticationResult.authenticated).toBeFalsy();
                expect(authenticationResult.sessionError).toBeTruthy();
            });
        });

        it('should return an error if session action fails', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const authentication = MovieDbAuthentication(
                storage,
                { createSession: jest.fn(() => Promise.reject()) }
            );

            return authentication.createSession(mockToken).then((authenticationResult) => {
                expect(authenticationResult.authenticated).toBeFalsy();
                expect(authenticationResult.sessionError).toBeTruthy();
            });
        });
    });

    describe('authenticatedAction', () => {
        it('should call the function with the sessionId as parameter', () => {
            const storage = {
                getItem: () => mockSessionId,
            };

            const authentication = MovieDbAuthentication(storage);
            const action = jest.fn(() => Promise.resolve());

            authentication.authenticatedAction(action).then(() => {
                expect(action.mock.calls).toHaveLength(1);
                expect(action.mock.calls[0][0]).toBe(mockSessionId);
            });
        });

        it('should fail if no sessionId available', () => {
            const storage = {
                getItem: () => null,
            };

            const authentication = MovieDbAuthentication(storage);
            const action = jest.fn(() => Promise.resolve());

            return expect(authentication.authenticatedAction(action)).rejects.toEqual(new Error('no session'));
        });
    });
});
