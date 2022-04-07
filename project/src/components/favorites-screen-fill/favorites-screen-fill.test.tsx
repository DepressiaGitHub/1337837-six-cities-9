import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { NameSpace } from '../../const';
import { makeFakeOfferList } from '../../utils/mocks';
import FavoritesScreenFill from './favorites-screen-fill';

const mockStore = configureMockStore();
const mockOffers = makeFakeOfferList();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.Data]: {
    favoriteOffers: mockOffers,
  },
});

describe('Component: FavoritesScreenFill', () => {
  it('должен отрисоваться "FavoritesScreenFill" когда будет массив favoriteOffers с элементами', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesScreenFill favoriteOffers={mockOffers}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('favorites')).toBeInTheDocument();
    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText(`${mockOffers[0].city}`)).toBeInTheDocument();
    expect(screen.getByTestId('place-card')).toBeInTheDocument();
  });
});
