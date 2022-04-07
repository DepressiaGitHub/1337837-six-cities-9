import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import SignInScreen from './sign-in-screen';

const mockStore = configureMockStore();

describe('Component: SignInScreen', () => {
  it('должен отрисоваться "SignInScreen" когда пользователь переходит на  /login', () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <SignInScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText(/Paris|Brussels|Amsterdam|Hamburg|Dusseldorf|Cologne/)).toBeInTheDocument();
  });
});
