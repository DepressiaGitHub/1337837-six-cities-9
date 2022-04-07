import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { NameSpace } from '../../../src/const';
import OfferScreen from './offer-screen';
import { makeFakeOffer } from '../../utils/mocks';

const mockStore = configureMockStore();
const mockOffer = makeFakeOffer();
const store = mockStore({
  [NameSpace.Data]: {
    property: mockOffer,
  },
});

describe('Component: OfferScreen', () => {
  it('должен отрисоваться "OfferScreen" когда пользователь переходит на  "/offer/id"', () => {
    const history = createMemoryHistory();
    history.push('/favorites');

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
  });
});
