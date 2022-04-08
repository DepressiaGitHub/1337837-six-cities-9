import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { AuthorizationStatus, NameSpace } from '../../../src/const';
import OfferScreen from './offer-screen';
import { makeFakeCommentList, makeFakeNearbyList, makeFakeOffer } from '../../utils/mocks';

const mockStore = configureMockStore();
const mockOffer = makeFakeOffer();
const mockComments = makeFakeCommentList();
const mockNearby = makeFakeNearbyList();
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  [NameSpace.Data]: {
    property: mockOffer,
    nearbyOffers: mockNearby,
    comments: mockComments,
  },
  [NameSpace.App]: {
    offerByHover: null,
  },
});

describe('Component: OfferScreen', () => {
  it('должен отрисоваться "OfferScreen" когда пользователь переходит на  "/offer/id"', () => {
    const history = createMemoryHistory();
    history.push(`/offer/${mockOffer.id}`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByTestId('property')).toBeInTheDocument();
    expect(screen.getByTestId('places')).toBeInTheDocument();
    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });
});
