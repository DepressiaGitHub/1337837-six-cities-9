import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../components/history-route/history-route';
import NotFoundScreen from './not-found-screeen';

describe('Component: NotFoundScreen', () => {
  it('должно корректно отрисоваться NotFoundScreen когда неверный адрес', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NotFoundScreen />
      </HistoryRouter>,
    );

    expect(screen.getByText('4 0 4')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });
});
