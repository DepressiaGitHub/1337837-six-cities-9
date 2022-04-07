import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import PlaceCard from './place-card';

const mockStore = configureMockStore();
const mockOffer = makeFakeOffer();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

describe('Component: PlaceCard', () => {
  it('должен отрисоваться "PlaceCard"', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlaceCard offer={mockOffer}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('place-card')).toBeInTheDocument();
    expect(screen.getByTestId('place-card-image')).toBeInTheDocument();
    expect(screen.getByText('night')).toBeInTheDocument();
    expect(screen.getByTestId('place-card-info')).toBeInTheDocument();
    expect(screen.getByTestId('place-card-rating')).toBeInTheDocument();
    expect(screen.getByTestId('place-card-name')).toBeInTheDocument();
  });
});
