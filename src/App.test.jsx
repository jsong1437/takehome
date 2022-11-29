import { render, screen } from '@testing-library/react';
import App from './App';
import { NONE_SELECTED } from './components/FileTable/constants';

test('renders App page', () => {
  render(<App />);
  const selectedText = screen.getByText(NONE_SELECTED);
  expect(selectedText).toBeInTheDocument();
});
