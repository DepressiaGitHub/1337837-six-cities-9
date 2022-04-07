import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import MainPageScreen from './main-page-screen';

const mockStore = configureMockStore();
const store = mockStore({});

describe('Component: MainPageScreen', () => {
  it('должен отрисоваться "MainPageScreen" когда пользователь переходит на  "/"', () => {
    const history = createMemoryHistory();
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainPageScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('locations')).toBeInTheDocument();
  });
});
