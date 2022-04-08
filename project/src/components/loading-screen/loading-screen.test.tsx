import {render, screen} from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: LoadingScreen', () => {
  it('должен корректно отрисоваться', () => {
    render(<LoadingScreen />);

    expect(screen.getByTestId('preloader')).toBeInTheDocument();
    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });
});
