import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { NameSpace } from '../../const';
import { makeFakeOfferList } from '../../utils/mocks';
import OffersList from './offers-list';

const mockStore = configureMockStore();
const mockOffers = makeFakeOfferList();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.Data]: {
    offers: mockOffers,
  },
});

describe('Component: NearPlacesList', () => {
  it('должен отрисоваться "NearPlacesList"', () => {
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OffersList />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('places-list')).toBeInTheDocument();
  });
});
