import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeCommentList, makeFakeOffer } from '../../utils/mocks';
import Reviews from './reviews';

const mockStore = configureMockStore();
const mockOffer = makeFakeOffer();
const mockComments = makeFakeCommentList();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  [NameSpace.Data]: {
    property: mockOffer,
    comments: mockComments,
  },
});

describe('Component: Reviews', () => {
  it('должен отрисоваться "Reviews"', () => {
    history.push(`/offer/${mockOffer.id}`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Reviews />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('reviews')).toBeInTheDocument();
  });
});
