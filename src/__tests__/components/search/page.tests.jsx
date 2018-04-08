import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import SearchPage from '../../../components/search/page';

const searchStorageKey = 'search';

describe('search page', () => {
    const mockConfig = ({
        baseImageUrl: 'http://www.google.com',
    });

    const mockSearch = [{ id: 1 }];

    const successfulActions = {
        search: jest.fn(() => Promise.resolve(mockSearch)),
    };

    const failingActions = {
        search: jest.fn(() => Promise.reject()),
    };

    const storageWithNoSearch = {
        getItem: () => null,
        setItem: jest.fn(),
    };

    it('should set state from succesful search action', () => {
        const page = shallow((
            <SearchPage
                actions={successfulActions}
                config={mockConfig}
                searchText="paddington"
                storage={storageWithNoSearch}
            />));

        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().search.searching).toBeFalsy();
                expect(page.state().search.searchError).toBeFalsy();
                expect(page.state().search.movies).toEqual(mockSearch);
            });
    });

    it('should set state from failed search action', () => {
        const page = shallow((
            <SearchPage
                actions={failingActions}
                config={mockConfig}
                searchText="paddington"
                storage={storageWithNoSearch}
            />));

        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().search.searching).toBeFalsy();
                expect(page.state().search.searchError).toBeTruthy();
                expect(page.state().search.movies).toEqual([]);
            });
    });

    it('should set state when search in storage', () => {
        const storage = {
            getItem: key => (key === searchStorageKey
                ? JSON.stringify({
                    searchText: 'paddington',
                    results: mockSearch,
                })
                : null),
            setItem: jest.fn(),
        };

        const page = shallow((
            <SearchPage
                actions={failingActions}
                config={mockConfig}
                searchText="paddington"
                storage={storage}
            />));

        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(page.state().search.searching).toBeFalsy();
                expect(page.state().search.searchError).toBeFalsy();
                expect(page.state().search.movies).toEqual(mockSearch);
            });
    });

    it('should set storage when search successful', () => {
        const storage = {
            getItem: () => null,
            setItem: jest.fn(),
        };

        shallow((
            <SearchPage
                actions={successfulActions}
                config={mockConfig}
                searchText="paddington"
                storage={storage}
            />));

        return new Promise(resolve => setImmediate(resolve))
            .then(() => {
                expect(storage.setItem.mock.calls).toHaveLength(1);
                expect(storage.setItem.mock.calls[0][0]).toBe(searchStorageKey);
                expect(storage.setItem.mock.calls[0][1]).toEqual(JSON.stringify({
                    searchText: 'paddington',
                    results: mockSearch,
                }));
            });
    });

    it('should render correctly when searching', () => {
        const page = renderer.create((
            <MemoryRouter>
                <SearchPage
                    actions={successfulActions}
                    config={mockConfig}
                    searchText="paddington"
                    storage={storageWithNoSearch}
                />
            </MemoryRouter>));
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
        const page = renderer.create((
            <MemoryRouter>
                <SearchPage
                    actions={successfulActions}
                    config={mockConfig}
                    searchText="paddington"
                    storage={storageWithNoSearch}
                />
            </MemoryRouter>));
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
