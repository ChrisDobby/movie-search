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
});
