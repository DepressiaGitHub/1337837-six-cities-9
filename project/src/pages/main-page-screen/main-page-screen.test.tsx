import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { NameSpace } from '../../const';
import { makeFakeOfferList } from '../../utils/mocks';
import MainPageScreen from './main-page-screen';

const mockStore = configureMockStore();
const mockOffer = makeFakeOfferList();
const store = mockStore({
  [NameSpace.Data]: {
    offersSortedByCity: mockOffer,
  },
});

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
