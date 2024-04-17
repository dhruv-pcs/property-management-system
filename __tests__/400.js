import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Notfound from 'src/pages/400';

describe('Notfound component', () => {
  test('renders the page not found text', () => {
    render(<Notfound />);
    const notFoundText = screen.getByText('Page Not Found');
    expect(notFoundText).toBeInTheDocument();
  });

  test('renders the return to dashboard link', () => {
    render(<Notfound />);
    const returnLink = screen.getByRole('link', { name: "return to dashboard" });
    expect(returnLink).toBeInTheDocument();
  });

  test('redirects to dashboard when return link is clicked', () => {
    render(<Notfound />);
    const returnLink = screen.getBy(document.querySelector('[name="return to dashboard"]'));
    userEvent.click(returnLink);
    
  });
});
