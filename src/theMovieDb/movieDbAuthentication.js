const sessionStorageKey = 'session';
const authenticateUrl = 'https://www.themoviedb.org/authenticate/';
const redirectQueryString = 'redirect_to';

const movieDbAuthentication = (storage, actions, redirect) => {
    const isAuthenticated = () => {
        if (storage.getItem(sessionStorageKey)) {
            return true;
        }

        return false;
    };

    const authenticate = returnUrl => new Promise((resolve) => {
        const redirectUrl = token => (
            returnUrl
                ? `${authenticateUrl}${token}?${redirectQueryString}=${returnUrl}`
                : `${authenticateUrl}${token}`);

        const sessionId = storage.getItem(sessionStorageKey);
        if (sessionId) {
            resolve({
                authenticated: true,
                redirecting: false,
                sessionId,
            });

            return;
        }

        actions.createRequestToken().then((requestToken) => {
            redirect(redirectUrl(requestToken));
            resolve({
                authenticated: false,
                redirecting: true,
            });
        })
            .catch(() => resolve({
                authenticated: false,
                tokenError: true,
            }));
    });

    const createSession = requestToken => new Promise((resolve) => {
        if (requestToken) {
            actions.createSession(requestToken)
                .then((sessionId) => {
                    storage.setItem(sessionStorageKey, sessionId);
                    resolve({
                        authenticated: true,
                        sessionId,
                    });
                })
                .catch(() => resolve({
                    authenticated: false,
                    sessionError: true,
                }));
        } else {
            resolve({
                authenticated: false,
                sessionError: true,
            });
        }
    });

    const authenticatedAction = action => new Promise((resolve, reject) => {
        const sessionId = storage.getItem(sessionStorageKey);
        if (!sessionId) {
            reject(new Error('no session'));
            return;
        }

        resolve(action(sessionId));
    });

    return {
        isAuthenticated,
        authenticate,
        createSession,
        authenticatedAction,
    };
};

export default movieDbAuthentication;
