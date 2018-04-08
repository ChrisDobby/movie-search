import React from 'react';
import { shallow } from 'enzyme';
import SearchEntry from '../../../components/search/searchEntry';

describe('searchEntry', () => {
    beforeEach(() => jest.resetAllMocks());

    const doSearch = jest.fn();
    const updateEvent = { target: { value: 'paddington' } };

    it('should update the state when the input value is changed', () => {
        const searchEntry = shallow(<SearchEntry doSearch={doSearch} />);
        searchEntry.find('input').at(0).simulate('change', updateEvent);

        expect(searchEntry.state().searchText).toBe('paddington');
    });

    it('should call the search function when the search button is clicked', () => {
        const searchEntry = shallow(<SearchEntry doSearch={doSearch} />);
        searchEntry.find('input').at(0).simulate('change', updateEvent);
        searchEntry.find('button').at(0).simulate('click');

        expect(doSearch.mock.calls).toHaveLength(1);
        expect(doSearch.mock.calls[0][0]).toBe('paddington');
    });

    it('should call the search function when the return key is pressed', () => {
        const searchEntry = shallow(<SearchEntry doSearch={doSearch} />);
        searchEntry.find('input').at(0).simulate('change', updateEvent);
        searchEntry.find('input').at(0).simulate('keydown', { keyCode: 13 });

        expect(doSearch.mock.calls).toHaveLength(1);
        expect(doSearch.mock.calls[0][0]).toBe('paddington');
    });

    it('should not call the search function when the search button is clicked if no text has been entered', () => {
        const searchEntry = shallow(<SearchEntry doSearch={doSearch} />);
        searchEntry.find('button').at(0).simulate('click');

        expect(doSearch.mock.calls).toHaveLength(0);
    });

    it('should not call the search function when the return key is pressed if no text has been entered', () => {
        const searchEntry = shallow(<SearchEntry doSearch={doSearch} />);
        searchEntry.find('input').at(0).simulate('keydown', { keyCode: 13 });

        expect(doSearch.mock.calls).toHaveLength(0);
    });

    it('should not call the search function when a non return key is pressed', () => {
        const searchEntry = shallow(<SearchEntry doSearch={doSearch} />);
        searchEntry.find('input').at(0).simulate('change', updateEvent);
        searchEntry.find('input').at(0).simulate('keydown', { keyCode: 65 });

        expect(doSearch.mock.calls).toHaveLength(0);
    });
});
