import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Admin from 'src/pages/admin';
import { useRouter } from 'next/router';

jest.mock('axios');
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('Admin Component', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useRouter.mockReturnValue({ push: mockPush });
    });

    test('renders admin dashboard correctly', () => {
        render(<Admin />);
        expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    test('allows admin to navigate to user management', async () => {
        render(<Admin />);
        fireEvent.click(screen.getByText('Manage Users'));
        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/admin/users');
        });
    });

    test('fetches and displays list of users', async () => {
        const users = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];
        axios.get.mockResolvedValueOnce({ data: users });
        render(<Admin />);

        await waitFor(() => {
            users.forEach(user => {
                expect(screen.getByText(user.name)).toBeInTheDocument();
            });
        });
    });

    test('handles API error when fetching users', async () => {
        const errorMessage = 'Failed to fetch';
        axios.get.mockRejectedValueOnce(new Error(errorMessage));
        render(<Admin />);

        await waitFor(() => {
            expect(screen.getByText('Error loading users')).toBeInTheDocument();
        });
    });

    test('allows admin to delete a user', async () => {
        const users = [{ id: 1, name: 'John Doe' }];
        axios.delete.mockResolvedValueOnce({});
        axios.get.mockResolvedValueOnce({ data: users });
        render(<Admin />);

        fireEvent.click(screen.getByText('Delete John Doe'));
        await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledWith('/api/users/1');
            expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        });
    });

});

