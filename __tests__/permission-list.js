import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Permission from 'src/pages/permission-list';
import axios from 'axios';

jest.mock('axios');

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useTheme: jest.fn().mockReturnValue({
    palette: {
      mode: 'light',
    },
  }),
}));





// Mock Math.random() to return a fixed value for testing
jest.spyOn(Math, 'random').mockReturnValue(0.5); // Example: always return 0.5 for testing

// Mock Math.floor() to ensure consistent behavior in your test environment
const originalFloor = Math.floor;
jest.spyOn(Math, 'floor').mockImplementation(originalFloor);

const getRoleBackgroundColor = jest.fn((role) => {
  switch (role.toLowerCase()) {
    case 'admin':
      return '#00FF00'; 
    case 'super-admin':
      return '#FF0000'; 
    default:
      const min = parseInt('3da58a', 16);
      const max = parseInt('4cceac', 16);
      const randomColor = '#' + Math.floor(Math.random() * (max - min + 1) + min).toString(16);
      

    return randomColor;
  }
});



describe('Permission component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('renders permission list when data is fetched successfully', async () => {
    const permissionData = [
      { module: 'Module 1', role: ['Admin'] },
      { module: 'Module 2', role: ['Super-Admin'] },
    ];

    axios.get.mockResolvedValueOnce({ data: {data: {permissionData}} });

    render(<Permission />);

    await waitFor(() => {
      expect(screen.getByTestId('permission-list')).toBeInTheDocument();
      expect(screen.getByText('Module 1')).toBeInTheDocument();
      expect(screen.getByText('Admin')).toBeInTheDocument();
      expect(screen.getByText('Module 2')).toBeInTheDocument();
      expect(screen.getByText('Super-Admin')).toBeInTheDocument();
    });
  });



  test('renders error message when data fetching fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Error fetching data'));

    render(<Permission />);

    await waitFor(() => {
      expect(screen.getByText('Error Fetching Data')).toBeInTheDocument();
    });
  });

  test('renders no data message when permissionData is empty', async () => {
    axios.get.mockResolvedValueOnce({ data: { data:  { permissionData: [] } }});

    render(<Permission />);

    await waitFor(() => {
      expect(screen.getByText('There is No Data Available')).toBeInTheDocument();
    });
  });


  test('returns correct role background color for admin', () => {
    const role = 'Admin';
    const result = getRoleBackgroundColor(role);
    expect(result).toBe('#00FF00'); 
  });
  
  test('returns correct role background color for super-admin', () => {
    const role = 'Super-Admin';
    const result = getRoleBackgroundColor(role);
    expect(result).toBe('#FF0000'); 
  });    
 
});
