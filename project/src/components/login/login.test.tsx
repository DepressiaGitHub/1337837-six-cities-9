import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../history-route/history-route';
import Login from './login';

const mockStore = configureMockStore();

describe('Component: Login', () => {
  it('должен отрисоваться "Login" когда пользователь переходит на  /login', () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Login />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('login-form')).toBeInTheDocument();

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('login'), 'alex');
    userEvent.type(screen.getByTestId('password'), 'qwerty123');

    expect(screen.getByDisplayValue(/alex/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/qwerty123/i)).toBeInTheDocument();
  });
});
