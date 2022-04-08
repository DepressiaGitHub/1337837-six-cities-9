import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { NameSpace } from '../../const';
import FavoritesScreenEmpty from './favorites-screen-empty';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.Data]: {
    favoriteOffers: [],
  },
});

describe('Component: FavoritesScreenEmpty', () => {
  it('должен отрисоваться "FavoritesScreenEmpty" когда массив favoriteOffers пустой', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesScreenEmpty />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('favorites')).toBeInTheDocument();
    expect(screen.getByText('Favorites (empty)')).toBeInTheDocument();
    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
  });
});
