import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import SearchPage from '../../../components/search/page';

describe('search page', () => {
    const mockConfig = ({
        baseImageUrl: 'http://www.google.com',
    });

    const mockSearch = [{}];

    const successfulActions = {
        search: jest.fn(() => Promise.resolve(mockSearch)),
    };

    const failingActions = {
        search: jest.fn(() => Promise.reject()),
    };

    it('should set state from succesful search action', () => {
        const page = shallow(<SearchPage actions={successfulActions} config={mockConfig} />);
        page.setState({
            configuration: { config: mockConfig },
        });

        page.instance().movieSearch('paddington');

        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().search.searching).toBeFalsy();
                expect(page.state().search.searchError).toBeFalsy();
                expect(page.state().search.movies).toEqual(mockSearch);
            });
    });

    it('should set state from failed search action', () => {
        const page = shallow(<SearchPage actions={failingActions} config={mockConfig} />);
        page.setState({
            configuration: { config: mockConfig },
        });

        page.instance().movieSearch('paddington');

        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().search.searching).toBeFalsy();
                expect(page.state().search.searchError).toBeTruthy();
                expect(page.state().search.movies).toEqual([]);
            });
    });

    it('should render correctly when searching', () => {
        const page = renderer.create(<SearchPage actions={successfulActions} config={mockConfig} />);
        page.getInstance().setState({
            search: {
                searching: true,
                searchError: false,
                movies: [],
            },
        });

        expect(page.toJSON()).toMatchSnapshot();
    });

    it('should render correctly when search failed', () => {
        const page = renderer.create(<SearchPage actions={successfulActions} config={mockConfig} />);
        page.getInstance().setState({
            search: {
                searching: false,
                searchError: true,
                movies: [],
            },
        });

        expect(page.toJSON()).toMatchSnapshot();
    });
});
