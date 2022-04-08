import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeOfferList } from '../../utils/mocks';
import OffersList from './offers-list';

const mockStore = configureMockStore();
const mockOffers = makeFakeOfferList();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  [NameSpace.Data]: {
    offersSortedByType: mockOffers,
  },
});

describe('Component: NearPlacesList', () => {
  it('должен отрисоваться "NearPlacesList"', () => {

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
