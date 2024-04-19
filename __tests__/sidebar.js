import React from 'react';
import { render } from '@testing-library/react';
import MyProSidebar from 'src/components/sidebar/sidebar';

// Mocking useRouter hook
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    push: jest.fn(),
  }),
}));

// Mocking localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
};
global.localStorage = mockLocalStorage;

describe('MyProSidebar component', () => {
  test('renders items based on localStorage data', () => {
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify([{ view: true, module: { alias_name: 'moduleName' } }]));
    const { getByTestId, queryByText } = render(<MyProSidebar />);
    
    // Check if the item that should be rendered is present
    expect(getByTestId('dashboard')).toBeInTheDocument();
    
    // Ensure that items that should not be rendered are not present
    expect(queryByText('Item title')).toBeNull();
  });

  test('does not render items when localStorage data does not match condition', () => {
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify([{ view: false, module: { alias_name: 'moduleName' } }]));
    const { queryByTestId } = render(<MyProSidebar />);
    
    // Ensure that no items are rendered when condition is not met
    expect(queryByTestId('dashboard')).toBeNull();
  });
});
