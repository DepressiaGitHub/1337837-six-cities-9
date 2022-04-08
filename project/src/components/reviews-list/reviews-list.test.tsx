import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import {  NameSpace } from '../../const';
import { makeFakeCommentList, makeFakeOffer } from '../../utils/mocks';
import ReviewList from './reviews-list';

const mockStore = configureMockStore();
const mockOffer = makeFakeOffer();
const mockComments = makeFakeCommentList();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.Data]: {
    property: mockOffer,
    comments: mockComments,
  },
});

describe('Component: ReviewList', () => {
  it('должен отрисоваться "ReviewList"', () => {
    history.push(`/offer/${mockOffer.id}`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewList />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
  });
});
