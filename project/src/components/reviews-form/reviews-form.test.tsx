import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import ReviewsForm from './reviews-form';

const mockStore = configureMockStore();
const mockOffer = makeFakeOffer();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  [NameSpace.Data]: {
    property: mockOffer,
  },
});

describe('Component: ReviewsForm', () => {
  it('должен отрисоваться "ReviewsForm" для авторизованного пользователя', () => {
    history.push(`/offer/${mockOffer.id}`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsForm />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('reviews-form')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('comment'), 'Tell how was your stay, what you like and what can be improved');
    expect(screen.getByDisplayValue('Tell how was your stay, what you like and what can be improved')).toBeInTheDocument();

    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
});
