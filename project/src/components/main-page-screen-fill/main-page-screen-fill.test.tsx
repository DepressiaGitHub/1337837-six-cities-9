import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { AuthorizationStatus, NameSpace } from '../../const';
import { getNameSpaceData, makeFakeOfferList } from '../../utils/mocks';
import MainPageScreenFill from './main-page-screen-fill';

const mockStore = configureMockStore();
const mockOffers = makeFakeOfferList();
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  [NameSpace.Data]: {
    ...getNameSpaceData(),
    activeCity: mockOffers[0].city.name,
    offersSortedByCity: mockOffers,
  },
  [NameSpace.App]: {
    offerByHover: null,
  },
});
const history = createMemoryHistory();

describe('Component: MainPageScreenFill', () => {
  it('должен отрисоваться "MainPageScreenFill" когда пользователь переходит на  "/"', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainPageScreenFill />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('places')).toBeInTheDocument();
    expect(screen.getByText(`${mockOffers.length} places to stay in ${mockOffers[0].city.name}`)).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
