import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import RateMovie from '../../../components/movie/rateMovie';
import RatingValue from '../../../components/movie/ratingValue';

jest.mock('../../../components/withAuthentication');

describe('rateMovie', () => {
    const defaultProps = {
        id: 1,
        isAuthenticated: true,
        authenticate: jest.fn(() => Promise.resolve({})),
        actions: {},
        authenticatedAction: jest.fn(result => result),
    };

    it('should set the rating in state when setRating called', () => {
        const page = shallow(<RateMovie {...defaultProps} />).dive();

        page.instance().setRating(7);

        expect(page.state().rating).toBe(7);
    });

    it('should set the rating when rating component selected', () => {
        const page = shallow(<RateMovie {...defaultProps} />).dive();
        const ratingValue = page.find(RatingValue).at(0);

        ratingValue.props().select();

        expect(page.state().rating).toBe(ratingValue.props().value);
    });

    it('should set state to sending when sendRating called', () => {
        const props = {
            ...defaultProps,
            actions: { rateMovie: jest.fn(() => Promise.resolve({})) },
        };

        const page = shallow(<RateMovie {...props} />).dive();

        page.instance().sendRating();

        expect(page.state().sending).toBeTruthy();
    });

    it('should call rateMovie action when sendRating called', () => {
        const props = {
            ...defaultProps,
            actions: { rateMovie: jest.fn(() => Promise.resolve({})) },
        };

        const page = shallow(<RateMovie {...props} />).dive();

        page.setState({ rating: 8 });
        page.instance().sendRating();

        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(props.actions.rateMovie.mock.calls).toHaveLength(1);
                expect(props.actions.rateMovie.mock.calls[0][0]).toBe(props.id);
                expect(props.actions.rateMovie.mock.calls[0][1]).toBe(8);
            });
    });

    it('should set the state to sendSuccess after sending complete', () => {
        const props = {
            ...defaultProps,
            actions: { rateMovie: jest.fn(() => Promise.resolve({})) },
        };

        const page = shallow(<RateMovie {...props} />).dive();

        page.setState({ rating: 8 });
        page.instance().sendRating();

        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().sendSuccess).toBeTruthy();
                expect(page.state().sendError).toBeFalsy();
            });
    });

    it('should set the state to sendError after sending fails', () => {
        const props = {
            ...defaultProps,
            actions: { rateMovie: jest.fn(() => Promise.reject()) },
        };

        const page = shallow(<RateMovie {...props} />).dive();

        page.setState({ rating: 8 });
        page.instance().sendRating();

        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().sendError).toBeTruthy();
                expect(page.state().sendSuccess).toBeFalsy();
            });
    });

    it('should render correctly when authenticating', () => {
        const props = {
            ...defaultProps,
            isAuthenticated: false,
            isAuthenticating: true,
        };

        const page = renderer.create(<RateMovie {...props} />);

        expect(page.toJSON()).toMatchSnapshot();
    });

    it('should render correctly after authentication error', () => {
        const props = {
            ...defaultProps,
            isAuthenticated: false,
            authenticationError: true,
        };

        const page = renderer.create(<RateMovie {...props} />);

        expect(page.toJSON()).toMatchSnapshot();
    });

    it('should render correctly when not authenticated', () => {
        const props = {
            ...defaultProps,
            isAuthenticated: false,
        };

        const page = renderer.create(<RateMovie {...props} />);

        expect(page.toJSON()).toMatchSnapshot();
    });

    it('should render correctly when authenticated', () => {
        const props = {
            ...defaultProps,
            isAuthenticated: true,
        };

        const page = renderer.create(<RateMovie {...props} />);

        expect(page.toJSON()).toMatchSnapshot();
    });

    it('should render correctly when sending', () => {
        const props = {
            ...defaultProps,
            isAuthenticated: true,
        };

        const page = renderer.create(<RateMovie {...props} />);
        page.getInstance().setState({ sending: true });

        expect(page.toJSON()).toMatchSnapshot();
    });

    it('should render correctly after sent successfully', () => {
        const props = {
            ...defaultProps,
            isAuthenticated: true,
        };

        const page = renderer.create(<RateMovie {...props} />);
        page.getInstance().setState({ sendSuccess: true });

        expect(page.toJSON()).toMatchSnapshot();
    });

    it('should render correctly after sent error', () => {
        const props = {
            ...defaultProps,
            isAuthenticated: true,
        };

        const page = renderer.create(<RateMovie {...props} />);
        page.getInstance().setState({ sendError: true });

        expect(page.toJSON()).toMatchSnapshot();
    });
});
