import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import PlacesOptions from './places-options';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});

describe('Component: PlacesOptions', () => {
  it('должен отрисоваться "PlacesOptions"', () => {
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlacesOptions />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('places-sorting')).toBeInTheDocument();
    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });
});
