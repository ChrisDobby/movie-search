import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'jest-fetch-mock';

global.fetch = fetchMock;
global.sessionStorage = { getItem: jest.fn(), setItem: jest.fn() };

configure({ adapter: new Adapter() });
