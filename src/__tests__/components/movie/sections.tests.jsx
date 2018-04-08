import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import Section from '../../../components/movie/section';

const TestComponent = ({ data }) => <div>{data.id}</div>;
TestComponent.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
    }).isRequired,
};

describe('section', () => {
    const mockData = ({ id: 1 });
    const successfulAction = jest.fn(() => Promise.resolve(mockData));
    const failedAction = jest.fn(() => Promise.reject());

    const SectionComponent = Section(TestComponent);

    it('should set state from successful action', () => {
        const section = mount(<SectionComponent action={successfulAction} />);
        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(section.state().loading).toBeFalsy();
                expect(section.state().error).toBeFalsy();
                expect(section.state().data).toEqual(mockData);
            });
    });

    it('should set state from failed action', () => {
        const section = mount(<SectionComponent action={failedAction} />);
        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(section.state().loading).toBeFalsy();
                expect(section.state().error).toBeTruthy();
                expect(section.state().data).toBeFalsy();
            });
    });
});
