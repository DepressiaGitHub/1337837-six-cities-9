import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeOfferList } from '../../utils/mocks';
import FavoritesScreen from './favorites-screen';

const mockStore = configureMockStore();
const mockOffer = makeFakeOfferList();
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  [NameSpace.Data]: {
    favoriteOffers: mockOffer,
    isFavoriteLoaded: true,
  },
});

describe('Component: FavoritesScreen', () => {
  it('должен отрисоваться "FavoritesScreen" когда пользователь переходит на  "/favorites"', () => {
    const history = createMemoryHistory();
    history.push('/favorites');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByTestId('favorites')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
