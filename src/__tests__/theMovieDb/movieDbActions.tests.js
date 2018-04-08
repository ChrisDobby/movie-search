import MovieDbActions from '../../theMovieDb/movieDbActions';
import configurationData from '../configurationData.json';
import searchData from '../searchData.json';

describe('movieDbActions', () => {
    const mockApi = ({
        getConfig: jest.fn(() => Promise.resolve(configurationData)),
        searchMovie: jest.fn(() => Promise.resolve(searchData)),
    });

    const mockConfig = ({
        baseImageUrl: 'http://www.google.com',
    });

    const mockSearch = [{ id: 1 }];

    const mockDataTransform = ({
        configuration: jest.fn(() => mockConfig),
        search: jest.fn(() => mockSearch),
    });

    const actions = MovieDbActions(mockApi, mockDataTransform);

    describe('getConfig', () => {
        it('should call getConfig on the api and the data transformation', () =>
            actions.getConfig().then(() => {
                expect(mockApi.getConfig.mock.calls).toHaveLength(1);
                expect(mockDataTransform.configuration.mock.calls).toHaveLength(1);
                expect(mockDataTransform.configuration.mock.calls[0][0]).toEqual(configurationData);
            }));

        it('should return a promise with the transformation result', () =>
            actions.getConfig().then((data) => {
                expect(data).toEqual(mockConfig);
            }));
    });

    describe('search', () => {
        it('should call search on the api and the data transformation', () => {
            const searchText = 'Paddington';
            return actions.search(searchText, mockConfig).then(() => {
                expect(mockApi.searchMovie.mock.calls).toHaveLength(1);
                expect(mockApi.searchMovie.mock.calls[0][0]).toEqual(searchText);
                expect(mockDataTransform.search.mock.calls).toHaveLength(1);
                expect(mockDataTransform.search.mock.calls[0][0]).toEqual(searchData);
                expect(mockDataTransform.search.mock.calls[0][1]).toEqual(mockConfig);
            });
        });

        it('should return a promise with the transformation result', () => {
            const searchText = 'Paddington';
            return actions.search(searchText, mockConfig).then((data) => {
                expect(data).toEqual(mockSearch);
            });
        });
    });
});
