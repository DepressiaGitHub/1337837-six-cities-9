import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { NameSpace } from '../../const';
import { makeFakeOffer, makeFakeOfferList } from '../../utils/mocks';
import NearPlacesList from './near-places-list';

const mockStore = configureMockStore();
const mockOffers =makeFakeOfferList();
const mockOffer = makeFakeOffer();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.Data]: {
    property: mockOffer,
    nearbyOffers: mockOffers,
  },
});

describe('Component: OffersList', () => {
  it('должен отрисоваться "OffersList"', () => {
    history.push(`/offer/${mockOffer.id}`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NearPlacesList />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('places-list')).toBeInTheDocument();
  });
});
