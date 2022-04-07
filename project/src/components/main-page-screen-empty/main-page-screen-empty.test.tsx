import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { NameSpace } from '../../const';
import MainPageScreenEmpty from './main-page-screen-empty';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Data]: {
    activeCity: 'Paris',
  },
});
const history = createMemoryHistory();

describe('Component: MainPageScreenEmpty', () => {
  it('должен отрисоваться "MainPageScreenEmpty" когда пользователь переходит на  "/"', () => {
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainPageScreenEmpty />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('No places to stay available')).toBeInTheDocument();
    expect(screen.getByTestId('We could not find any property available at the moment in Paris')).toBeInTheDocument();
  });
});
