import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { NameSpace } from '../../const';
import { makeFakeOfferList } from '../../utils/mocks';
import LocationsList from './locations-list';

const mockStore = configureMockStore();
const mockOffers = makeFakeOfferList();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.Data]: {
    activeCity: mockOffers[0].city,
  },
});

describe('Component: LocationsList', () => {
  it('должен отрисоваться "LocationsList" когда пользователь переходит на  "/"', () => {
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LocationsList />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('locations-list')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
    expect(screen.getByText('Dusseldorf')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
  });
});
