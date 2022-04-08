import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HistoryRouter } from '../history-route/history-route';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import LoggedRoute from './logged-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: LoggedRouter', () => {
  beforeEach(() => {
    history.push(AppRoute.Login);
  });

  it('Не должен отрисовать приватный компонент, если пользователь авторизован', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<h1>Public Route</h1>}
            />
            <Route
              path={AppRoute.Login}
              element={
                <LoggedRoute
                  authorizationStatus={AuthorizationStatus.Auth}
                >
                  <h1>Private Route</h1>
                </LoggedRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('Должен отрисовать компонент для всех, если пользователь не авторизован', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<h1>Public Route</h1>}
            />
            <Route
              path={AppRoute.Login}
              element={
                <LoggedRoute
                  authorizationStatus={AuthorizationStatus.NoAuth}
                >
                  <h1>Private Route</h1>
                </LoggedRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
