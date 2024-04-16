import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Login from 'src/pages/login';
import { useRouter } from 'next/router';

jest.mock('axios');
jest.mock('react-toastify/dist/ReactToastify.css', () => ({}));

// Mock useRouter globally for all tests
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


    test('displays error message when email field is empty', async () => {
        render(<Login />);
        
        const loginButton = screen.getByRole('button', { name: "Login" });
        fireEvent.click(loginButton);

         await waitFor(() => {
             
            expect(screen.getByText("Email address is required")).toBeInTheDocument();
         })   
      });

      
      test('submits form with valid data and sets localStorage', async () => {
        // Mock axios post response
        axios.post.mockResolvedValueOnce({
          data: {
            data: {
              permissionData: {},
              token: 'mockToken',
              roleID: 'mockRoleID'
            }
          }
        });
      
        render(<Login />);
        
        // Fill in the email and password fields
        fireEvent.change(screen.getByLabelText("Email address"), { target: { value: 'super@gmail.com' } });
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: 'Super@123' } });
      
        // Click the login button
        fireEvent.click(screen.getByRole('button', { name: "Login" }));
      
        await screen.findByText("Please sign in to your account and start the advanced!");
      
        expect(localStorage.getItem('user')).toBe(JSON.stringify({}));
        expect(localStorage.getItem('token')).toBe('mockToken');
        expect(localStorage.getItem('Role')).toBe('mockRoleID');
      });
      
      test('displays error on invalid credentials', async () => {
      
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
