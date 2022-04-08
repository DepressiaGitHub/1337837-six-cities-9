import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeCommentList, makeFakeNearbyList, makeFakeOffer, makeFakeOfferList, makeFakeUser } from '../../utils/mocks';
import { HistoryRouter } from '../history-route/history-route';
import App from './app';

const mockStore = configureMockStore();
const mockOffer = makeFakeOffer();
const mockOffers = makeFakeOfferList();
const mockComments = makeFakeCommentList();
const mockNearby = makeFakeNearbyList();
const mockUser = makeFakeUser();
const history = createMemoryHistory();


describe('Application Routing', () => {
  it('Должен отрисоваться "MainPageScreen" когда переходим на "/"', () => {
    history.push(AppRoute.Main);

    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Data]: {
        data: mockOffers,
        isDataLoaded: true,
      },
      [NameSpace.Data]: {
        user: mockUser,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('locations')).toBeInTheDocument();
  });


  it('Должен отрисоваться "SignInScreen" когда переходим на "/login"', () => {
    history.push(AppRoute.Login);

    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
      [NameSpace.Data]: {
        data: mockOffers,
        isDataLoaded: true,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('Должен отрисоваться "FavoritesScreen" когда переходим на "/favorites"', () => {
    history.push(AppRoute.Favorites);

    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Data]: {
        data: mockOffers,
        isDataLoaded: true,
      },
      [NameSpace.Data]: {
        user: mockUser,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('favorites')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('Должен отрисоваться "OfferScreen" когда переходим на "/offer"', () => {
    history.push(AppRoute.Room);

    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Data]: {
        isDataLoaded: true,
        property: mockOffer,
        comments: mockComments,
        nearbyOffers: mockNearby,
      },
      [NameSpace.Data]: {
        user: mockUser,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('property')).toBeInTheDocument();
    expect(screen.getByTestId('places')).toBeInTheDocument();
  });

  it('должен отрисоваться "NotFoundScreen" когда переходим на "/404"', () => {
    history.push('/non-existent-route');

    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Data]: {
        user: mockUser,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('4 0 4')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });

  it('должен отрисоваться "NotFoundScreen" когда пытаемся перейти на несуществующий раздел', () => {
    history.push(AppRoute.NotFound);

    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Data]: {
        user: mockUser,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('4 0 4')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });
});

