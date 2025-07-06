import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';

describe('Home Page', () => {
  it('renders a Login link', () => {
    render(<Home />);
    const loginLink = screen.getByRole('link', { name: /Login/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', 'login');
  });
  
  it('renders the main layout', () => {
    render(<Home />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });
});