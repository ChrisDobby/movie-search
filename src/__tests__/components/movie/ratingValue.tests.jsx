import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import RatingValue from '../../../components/movie/ratingValue';

describe('ratingStar', () => {
    it('should call select when clicked', () => {
        const props = {
            select: jest.fn(),
            value: 1,
            currentRating: 0,
        };
        const component = shallow(<RatingValue {...props} />);

        component.find('div').at(0).simulate('click');

        expect(props.select.mock.calls).toHaveLength(1);
    });

    it('should call select when return key pressed', () => {
        const props = {
            select: jest.fn(),
            value: 1,
            currentRating: 0,
        };
        const component = shallow(<RatingValue {...props} />);

        component.find('div').at(0).simulate('keydown', { keyCode: 13 });

        expect(props.select.mock.calls).toHaveLength(1);
    });

    it('should not call select when other key pressed', () => {
        const props = {
            select: jest.fn(),
            value: 1,
            currentRating: 0,
        };
        const component = shallow(<RatingValue {...props} />);

        component.find('div').at(0).simulate('keydown', { keyCode: 65 });

        expect(props.select.mock.calls).toHaveLength(0);
    });

    it('should render correctly when not selected', () => {
        const props = {
            select: jest.fn(),
            value: 10,
            currentRating: 5,
        };

        const component = renderer.create(<RatingValue {...props} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it('should render correctly when selected', () => {
        const props = {
            select: jest.fn(),
            value: 4,
            currentRating: 5,
        };

        const component = renderer.create(<RatingValue {...props} />);

        expect(component.toJSON()).toMatchSnapshot();
    });
});
