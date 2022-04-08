import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeOfferList } from '../../utils/mocks';
import { HistoryRouter } from '../history-route/history-route';
import App from './app';

const mockStore = configureMockStore();
const mockOffers = makeFakeOfferList();
const store = mockStore({
  [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
  [NameSpace.Data]: {
    isDataLoaded: true,
    offersSortedByCity: mockOffers,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('Должен отрисоваться "MainPageScreen" когда переходим на "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('locations')).toBeInTheDocument();
  });

  it('Должен отрисоваться "SignInScreen" когда переходим на "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('Должен отрисоваться "FavoritesScreen" когда переходим на "/favorites"', () => {
    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('favorites')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('Должен отрисоваться "OfferScreen" когда переходим на "/offer"', () => {
    history.push(AppRoute.Room);

    render(fakeApp);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('property')).toBeInTheDocument();
    expect(screen.getByTestId('places')).toBeInTheDocument();
  });

  it('должен отрисоваться "NotFoundScreen" когда переходим на "/404"', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('4 0 4')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });

  it('должен отрисоваться "NotFoundScreen" когда пытаемся перейти на несуществующий раздел', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('4 0 4')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });
});

