import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { AuthorizationStatus, CITIES, DEFAULT_CITY_INDEX, DEFAULT_SORT_INDEX, NameSpace, SORTS } from '../../const';
import { makeFakeOfferList, makeFakeUser } from '../../utils/mocks';
import MainPageScreen from './main-page-screen';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  [NameSpace.Data]: {
    data: makeFakeOfferList(),
    user: makeFakeUser(),
    activeCity: CITIES[DEFAULT_CITY_INDEX],
    offersSortedByCity: makeFakeOfferList(),
    selectedType: SORTS[DEFAULT_SORT_INDEX],
    offersSortedByType: [],
    isDataLoaded: true,
    property: null,
    comments: [],
    nearbyOffers: [],
    reviewFormStatus: 'initial',
    favoriteOffers: [],
    isFavoriteLoaded: false,
    updateOffer: null,
  },
  [NameSpace.App]: {
    offerByHover: null,
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
