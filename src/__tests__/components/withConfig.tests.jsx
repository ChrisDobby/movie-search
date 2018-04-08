import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import WithConfig from '../../components/withConfig';

const TestComponent = ({ config }) => <div>{config.baseImageUrl}</div>;
TestComponent.propTypes = {
    config: PropTypes.shape({}).isRequired,
};

describe('WithConfig', () => {
    const mockConfig = ({
        baseImageUrl: 'http://www.google.com',
    });

    const successfulActions = {
        getConfig: jest.fn(() => Promise.resolve(mockConfig)),
    };

    const failingActions = {
        getConfig: jest.fn(() => Promise.reject()),
    };

    it('should set state from succesful config action', () => {
        const ConfigComponent = WithConfig(TestComponent, successfulActions);
        const page = mount(<ConfigComponent />);
        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().loading).toBeFalsy();
                expect(page.state().error).toBeFalsy();
                expect(page.state().config).toEqual(mockConfig);
            });
    });

    it('should set state from failed config action', () => {
        const ConfigComponent = WithConfig(TestComponent, failingActions);
        const page = mount(<ConfigComponent />);
        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().loading).toBeFalsy();
                expect(page.state().error).toBeTruthy();
                expect(page.state().config).toBeFalsy();
            });
    });

    it('should render correctly when loading config', () => {
        const ConfigComponent = WithConfig(TestComponent, successfulActions);
        const page = renderer.create(<ConfigComponent />);
        page.getInstance().setState({
            loading: true,
            error: false,
            config: null,
        });

        expect(page.toJSON()).toMatchSnapshot();
    });

    it('should render correctly when loading config failed', () => {
        const ConfigComponent = WithConfig(TestComponent, successfulActions);
        const page = renderer.create(<ConfigComponent />);
        page.getInstance().setState({
            loading: false,
            error: true,
            config: null,
        });

        expect(page.toJSON()).toMatchSnapshot();
    });

    it('should render correctly when loading config successful', () => {
        const ConfigComponent = WithConfig(TestComponent, successfulActions);
        const page = renderer.create(<ConfigComponent />);
        page.getInstance().setState({
            loading: false,
            error: false,
            config: mockConfig,
        });

        expect(page.toJSON()).toMatchSnapshot();
    });
});
