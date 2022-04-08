import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { NameSpace } from '../../const';
import { makeFakeCommentList, makeFakeOffer } from '../../utils/mocks';
import ReviewsItem from './reviews-item';

const mockStore = configureMockStore();
const mockOffer = makeFakeOffer();
const mockComments = makeFakeCommentList();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.Data]: {
    property: mockOffer,
  },
});

describe('Component: ReviewsItem', () => {
  it('должен отрисоваться "ReviewsItem"', () => {
    history.push(`/offer/${mockOffer.id}`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsItem comment={mockComments[0]}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(`${mockComments[0].user.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockComments[0].comment}`)).toBeInTheDocument();
  });
});
