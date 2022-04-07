import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { makeFakeOffer } from '../../utils/mocks';
import FavoritePlacesCard from './favorite-places-card';

const mockStore = configureMockStore();
const mockOffer = makeFakeOffer();
const history = createMemoryHistory();
const store = mockStore({});

describe('Component: FavoritePlacesCard', () => {
  it('должен отрисоваться "FavoritePlacesCard"', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritePlacesCard offer={mockOffer}/>
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
