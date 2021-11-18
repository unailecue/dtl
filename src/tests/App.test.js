import { render, screen } from '@testing-library/react';
import App from '../pages/App';

test('renders NavBar', () => {
  render(<App />);
  const linkElement = screen.getByText(/Day Trader Latino/i);
  expect(linkElement).toBeInTheDocument();
});
