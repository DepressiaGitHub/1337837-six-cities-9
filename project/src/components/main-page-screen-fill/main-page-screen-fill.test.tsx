import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { NameSpace } from '../../const';
import MainPageScreenFill from './main-page-screen-fill';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Data]: {
    activeCity: 'Paris',
  },
});
const history = createMemoryHistory();

describe('Component: MainPageScreenFill', () => {
  it('должен отрисоваться "MainPageScreenFill" когда пользователь переходит на  "/"', () => {
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainPageScreenFill />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('places')).toBeInTheDocument();
    expect(screen.getByTestId('places to stay in Paris')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
