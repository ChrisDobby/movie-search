import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import WithAuthentication from '../../components/withAuthentication';

const TestComponent = ({ isAuthenticated }) => <div>{isAuthenticated}</div>;

TestComponent.propTypes = {
    isAuthenticated: PropTypes.bool,
};

TestComponent.defaultProps = {
    isAuthenticated: false,
};

const auth = {
    isAuthenticated: () => false,
    authenticatedAction: () => Promise.resolve({}),
};

describe('WithAuthentication', () => {
    it('should set isAuthenticated when mounting', () => {
        const authentication = {
            ...auth,
            isAuthenticated: () => true,
        };

        const Component = WithAuthentication(authentication)(TestComponent);
        const page = shallow(<Component />);
        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().isAuthenticated).toBeTruthy();
            });
    });

    it('should do nothing if not authenticated and no authentication query string params', () => {
        const getQueryString = () => ({
            has: () => false,
        });

        const Component = WithAuthentication(auth, getQueryString)(TestComponent);
        const page = shallow(<Component />);
        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().isAuthenticated).toBeFalsy();
            });
    });

    it('should do nothing if approved query string param is not true', () => {
        const getQueryString = () => ({
            has: () => true,
            get: key => (key === 'approved' ? 'false' : null),
        });

        const Component = WithAuthentication(auth, getQueryString)(TestComponent);
        const page = shallow(<Component />);
        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().isAuthenticated).toBeFalsy();
            });
    });

    it('should call create session if approved true and token query string param is available', () => {
        const token = '1234567890';
        const authentication = {
            ...auth,
            createSession: jest.fn(() => Promise.resolve({})),
        };

        const getQueryString = () => ({
            has: () => true,
            get: key => (key === 'approved' ? 'true' : token),
        });

        const Component = WithAuthentication(authentication, getQueryString)(TestComponent);
        const page = shallow(<Component />);
        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().isAuthenticated).toBeFalsy();
                expect(authentication.createSession.mock.calls).toHaveLength(1);
                expect(authentication.createSession.mock.calls[0][0]).toEqual(token);
            });
    });

    it('should update state when create session returns', () => {
        const token = '1234567890';
        const authentication = {
            ...auth,
            createSession: jest.fn(() => Promise.resolve({
                authenticated: true,
                redirecting: false,
                tokenError: false,
                sessionError: false,
            })),
        };

        const getQueryString = () => ({
            has: () => true,
            get: key => (key === 'approved' ? 'true' : token),
        });

        const Component = WithAuthentication(authentication, getQueryString)(TestComponent);
        const page = shallow(<Component />);
        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().isAuthenticated).toBeTruthy();
                expect(page.state().isAuthenticating).toBeFalsy();
                expect(page.state().authenticationError).toBeFalsy();
            });
    });

    it('should update state with authentication error when create session returns a session error', () => {
        const token = '1234567890';
        const authentication = {
            ...auth,
            createSession: jest.fn(() => Promise.resolve({
                authenticated: false,
                redirecting: false,
                tokenError: false,
                sessionError: true,
            })),
        };

        const getQueryString = () => ({
            has: () => true,
            get: key => (key === 'approved' ? 'true' : token),
        });

        const Component = WithAuthentication(authentication, getQueryString)(TestComponent);
        const page = shallow(<Component />);
        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().isAuthenticated).toBeFalsy();
                expect(page.state().isAuthenticating).toBeFalsy();
                expect(page.state().authenticationError).toBeTruthy();
            });
    });

    it('should set state to authenticating and authenticate when authenticate is called', () => {
        const authentication = {
            ...auth,
            authenticate: jest.fn(() => Promise.resolve({})),
        };

        const getQueryString = () => ({
            has: () => false,
        });

        const Component = WithAuthentication(authentication, getQueryString)(TestComponent);
        const page = shallow(<Component />);

        const returnUrl = 'http://www.google.co.uk/';
        global.jsdom.reconfigure({
            url: returnUrl,
        });

        page.instance().authenticate();

        expect(page.state().isAuthenticating).toBeTruthy();
        expect(authentication.authenticate.mock.calls).toHaveLength(1);
        expect(authentication.authenticate.mock.calls[0][0]).toBe(returnUrl);
    });

    it('should set state to authenticated when authentication is complete', () => {
        const authentication = {
            ...auth,
            authenticate: jest.fn(() => Promise.resolve({ authenticated: true })),
        };

        const getQueryString = () => ({
            has: () => false,
        });

        const Component = WithAuthentication(authentication, getQueryString)(TestComponent);
        const page = shallow(<Component />);

        page.instance().authenticate();

        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().isAuthenticated).toBeTruthy();
            });
    });

    it('should set state to authenticating when authentication is complete and redirecting', () => {
        const authentication = {
            ...auth,
            authenticate: jest.fn(() => Promise.resolve({ redirecting: true })),
        };

        const getQueryString = () => ({
            has: () => false,
        });

        const Component = WithAuthentication(authentication, getQueryString)(TestComponent);
        const page = shallow(<Component />);

        page.instance().authenticate();

        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().isAuthenticating).toBeTruthy();
            });
    });

    it('should set state to authenticationError when authentication is complete and session error', () => {
        const authentication = {
            ...auth,
            authenticate: jest.fn(() => Promise.resolve({ sessionError: true })),
        };

        const getQueryString = () => ({
            has: () => false,
        });

        const Component = WithAuthentication(authentication, getQueryString)(TestComponent);
        const page = shallow(<Component />);

        page.instance().authenticate();

        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().authenticationError).toBeTruthy();
            });
    });

    it('should call authenticatedAction', () => {
        const authentication = {
            ...auth,
            authenticatedAction: jest.fn(() => Promise.resolve({})),
        };

        const getQueryString = () => ({
            has: () => false,
        });

        const Component = WithAuthentication(authentication, getQueryString)(TestComponent);
        const page = shallow(<Component />);

        page.find(TestComponent).at(0).props().authenticatedAction(() => { });

        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(authentication.authenticatedAction.mock.calls).toHaveLength(1);
            });
    });

    it('should remove the query string from the return url when calling authenticate', () => {
        const authentication = {
            ...auth,
            authenticate: jest.fn(() => Promise.resolve({})),
        };

        const getQueryString = () => ({
            has: () => false,
        });

        const Component = WithAuthentication(authentication, getQueryString)(TestComponent);
        const page = shallow(<Component />);

        const returnUrl = 'http://www.google.co.uk/';
        global.jsdom.reconfigure({
            url: `${returnUrl}?a=1`,
        });

        page.instance().authenticate();

        expect(page.state().isAuthenticating).toBeTruthy();
        expect(authentication.authenticate.mock.calls).toHaveLength(1);
        expect(authentication.authenticate.mock.calls[0][0]).toBe(returnUrl);
    });
});
