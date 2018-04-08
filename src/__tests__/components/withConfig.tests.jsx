import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import WithConfig from '../../components/withConfig';

const TestComponent = ({ config }) => <div>{config.baseImageUrl}</div>;
TestComponent.propTypes = {
    config: PropTypes.shape({}).isRequired,
};

const configStorageKey = 'config';

describe('WithConfig', () => {
    const mockConfig = ({
        baseImageUrl: 'http://www.google.com',
    });

    const storageWithNoConfig = {
        getItem: () => null,
        setItem: jest.fn(),
    };

    const successfulActions = {
        getConfig: jest.fn(() => Promise.resolve(mockConfig)),
    };

    const failingActions = {
        getConfig: jest.fn(() => Promise.reject()),
    };

    it('should set state from succesful config action', () => {
        const storage = {
            getItem: () => null,
            setItem: jest.fn(),
        };

        const ConfigComponent = WithConfig(TestComponent, successfulActions, storage);
        const page = mount(<ConfigComponent />);
        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().loading).toBeFalsy();
                expect(page.state().error).toBeFalsy();
                expect(page.state().config).toEqual(mockConfig);
            });
    });

    it('should set state from failed config action', () => {
        const storage = {
            getItem: () => null,
            setItem: jest.fn(),
        };

        const ConfigComponent = WithConfig(TestComponent, failingActions, storage);
        const page = mount(<ConfigComponent />);
        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().loading).toBeFalsy();
                expect(page.state().error).toBeTruthy();
                expect(page.state().config).toBeFalsy();
            });
    });

    it('should set state from stored config', () => {
        const storage = {
            getItem: key => (key === configStorageKey ? JSON.stringify(mockConfig) : null),
        };

        const ConfigComponent = WithConfig(TestComponent, failingActions, storage);
        const page = mount(<ConfigComponent />);
        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().loading).toBeFalsy();
                expect(page.state().error).toBeFalsy();
                expect(page.state().config).toEqual(mockConfig);
            });
    });

    it('should update storage from succesful config action', () => {
        const storage = {
            getItem: () => null,
            setItem: jest.fn(),
        };

        const ConfigComponent = WithConfig(TestComponent, successfulActions, storage);
        mount(<ConfigComponent />);
        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(storage.setItem.mock.calls).toHaveLength(1);
                expect(storage.setItem.mock.calls[0][0]).toBe(configStorageKey);
                expect(storage.setItem.mock.calls[0][1]).toEqual(JSON.stringify(mockConfig));
            });
    });

    it('should render correctly when loading config', () => {
        const ConfigComponent = WithConfig(TestComponent, successfulActions, storageWithNoConfig);
        const page = renderer.create(<ConfigComponent />);
        page.getInstance().setState({
            loading: true,
            error: false,
            config: null,
        });

        expect(page.toJSON()).toMatchSnapshot();
    });

    it('should render correctly when loading config failed', () => {
        const ConfigComponent = WithConfig(TestComponent, successfulActions, storageWithNoConfig);
        const page = renderer.create(<ConfigComponent />);
        page.getInstance().setState({
            loading: false,
            error: true,
            config: null,
        });

        expect(page.toJSON()).toMatchSnapshot();
    });

    it('should render correctly when loading config successful', () => {
        const ConfigComponent = WithConfig(TestComponent, successfulActions, storageWithNoConfig);
        const page = renderer.create(<ConfigComponent />);
        page.getInstance().setState({
            loading: false,
            error: false,
            config: mockConfig,
        });

        expect(page.toJSON()).toMatchSnapshot();
    });
});
