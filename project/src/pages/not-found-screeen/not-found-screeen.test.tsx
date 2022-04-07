import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../components/history-route/history-route';
import NotFoundScreen from './not-found-screeen';

describe('Component: NotFoundScreen', () => {
  it('должно корректно отрисоваться', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NotFoundScreen />
      </HistoryRouter>,
    );

    const headerElement = screen.getByText('4 0 4');
    const textElement = screen.getByText('Page not found');
    const linkElement = screen.getByText('Go to main page');

    expect(headerElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
