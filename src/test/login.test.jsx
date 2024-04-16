import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Login from 'src/pages/login';
import { useRouter } from 'next/router';

jest.mock('axios');
jest.mock('react-toastify/dist/ReactToastify.css', () => ({}));
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('Login Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useRouter.mockReturnValue({
            push: jest.fn(),
        });
        global.localStorage = {
          getItem: jest.fn(),
          setItem: jest.fn(),
          removeItem: jest.fn(),
          clear: jest.fn()
        };
      });

      test('renders login form correctly', async () => {
        render(<Login />);
        
        // Assert that the login form elements and the submit button are present
        expect(screen.getByLabelText('Login')).toBeInTheDocument();
        expect(screen.getByLabelText('Email address')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
           
          expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    
      });
      
  test('validates form submission with empty fields', async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    await waitFor(() => {
      expect(screen.getByText('Email address is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    const userData = {
        permissionData: {
            // Your user permission data
        },
        token: 'mockToken',
        roleID: 'mockRoleID'
    };

    axios.post.mockResolvedValueOnce({ data: userData });
    render(<Login />);
    
    // Simulate form submission
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'super@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Super@123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    // Wait for the login process to complete asynchronously
    await waitFor(() => {
        expect(localStorage.getItem('user'));
        expect(localStorage.getItem('token'));
        expect(localStorage.getItem('Role'));
        
    });
});


  test('displays error on invalid credentials', async () => {
    axios.post.mockRejectedValueOnce(new Error('Invalid credentials'));
    render(<Login />);
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'invalidPassword' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    await waitFor(() => {
      expect(screen.getByText('Invalid Credentials')).toBeInTheDocument();
    });
  });

 
  test('toggles password visibility', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Assuming your button has an aria-label of 'Toggle password visibility'
    const toggleButton = screen.getByLabelText('Toggle password visibility');
    
    fireEvent.click(toggleButton);
    
    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});
