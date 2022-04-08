import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeUser } from '../../utils/mocks';
import NotFoundScreen from './not-found-screeen';

const mockStore = configureMockStore();
const mockUser = makeFakeUser();
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
  [NameSpace.Data]: {
    user: mockUser,
  },
});

describe('Component: NotFoundScreen', () => {
  it('должно корректно отрисоваться NotFoundScreen когда неверный адрес', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NotFoundScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('4 0 4')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });
});
