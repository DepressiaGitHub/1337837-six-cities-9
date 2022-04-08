import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { NameSpace } from '../../const';
import { makeFakeOfferList } from '../../utils/mocks';
import MainPageScreenEmpty from './main-page-screen-empty';

const mockStore = configureMockStore();
const mockOffers = makeFakeOfferList();
const store = mockStore({
  [NameSpace.Data]: {
    activeCity: mockOffers[0].city.name,
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

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${mockOffers[0].city.name}`)).toBeInTheDocument();
  });
});
