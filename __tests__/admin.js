import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Admin from 'src/pages/admin';

// Mock axios globally
jest.mock('axios');

const mockPermissions = [
  {
    module: {
      alias_name: 'Admin'
    },
    view: true,
    update: true,
    remove: true,
    add: true
  }
];

const mockAdminData = [
  {
    u_id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    alternate_phone: "0987654321",
    status: true,
    is_superadmin: false
  }
];

// Setup axios mock for each test
beforeEach(() => {
  axios.get.mockResolvedValue({
    data: {
      data: {
        adminData: mockAdminData
      }
    }
  });

  Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockPermissions));
});

// describe('Admin Component', () => {

//   test('renders admin component with mock permission data', async () => {
//     render(<Admin />);
    
//     const addButton = await screen.findByTestId('add-admin');
//     expect(addButton).toBeInTheDocument();
//   });

describe('Admin Component', () => {
  beforeEach(async () => {
    localStorage.setItem('user', JSON.stringify(mockPermissions))
    axios.get = jest.fn().mockResolvedValue({ data: { data: { adminData: mockAdminData } } })
    render(<Admin />)
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })
  })

  test('handles error when deleting admin', async () => {
    jest.spyOn(axios, 'delete').mockRejectedValueOnce(new Error('Delete request failed'))
    render(<Admin />)
    const deleteAdmin = screen.getByTestId('delete-owner')
    fireEvent.click(deleteAdmin)
    expect(screen.getByText('Delete Admin')).toBeInTheDocument()
    const confirmDelete = screen.getByTestId('confirm-delete')
    fireEvent.click(confirmDelete)

    await waitFor(() => {
      expect(screen.getByText('Error deleting Admin')).toBeInTheDocument()
    })
  })

  test('Admin List Rendering Test', async () => {
    const adminList = await screen.findByTestId('admin-list')
    expect(adminList).toBeInTheDocument()
  })

  test('renders Admin list from API', async () => {
    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Phone')).toBeInTheDocument()
      expect(screen.getByText('Alternate Phone')).toBeInTheDocument()
      expect(screen.getByText('Status')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()
    })
  })

  test('handles error when API request fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('API request failed'))

    render(<Admin />)

    await waitFor(() => {
      expect(screen.getByText('Error Fetching Data')).toBeInTheDocument()
    })
  })

  test('clicking Edit button to see edit model', async () => {
    const edit = screen.getByTestId('edit-admin')
    expect(edit).toBeInTheDocument()
    fireEvent.click(edit)

    expect(screen.getByTestId('Save_changes')).toBeInTheDocument()
  })

  test('clicking View button to see view model', async () => {
    const view = screen.getByTestId('view-admin')
    expect(view).toBeInTheDocument()
    fireEvent.click(view)

    expect(screen.getByText('View Admin')).toBeInTheDocument()
  })

  test('clicking Delete button to see delete model', async () => {
    const deleteAdmin = screen.getByTestId('delete-admin')
    expect(deleteAdmin).toBeInTheDocument()
    fireEvent.click(deleteAdmin)
    expect(screen.getByText('Delete Admin')).toBeInTheDocument()
  })

  test('clicking Add button to see add model', async () => {
    const add = screen.getByTestId('add-admin')
    expect(add).toBeInTheDocument()
    fireEvent.click(add);
const elements = screen.getAllByText('Add Admin');
elements.forEach(element => {
  expect(element).toBeInTheDocument();
});

  })

  test('clicking Delete button and then clicking confirm delete button to delete admin - Success', async () => {
    const mockResponseData = { data: { statusCode: 200 } };
    axios.delete.mockResolvedValue(mockResponseData); // Ensure the correct mock is used
  
    render(<Admin />);
  
    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument()); // Wait for initial data load
  
    const deleteAdminButton = screen.getByTestId('delete-admin');
    fireEvent.click(deleteAdminButton);
  
    const confirmDeleteButton = screen.getByTestId('confirm-delete');
    fireEvent.click(confirmDeleteButton);
  
    await waitFor(() => {
      expect(screen.queryByText('Delete Admin')).not.toBeInTheDocument();
      expect(screen.getByText('User deleted successfully!')).toBeInTheDocument();
    });
  });
  
  test('clicking Delete button and then clicking confirm delete button to delete admin - Error', async () => {
    axios.delete.mockRejectedValue(new Error('API request failed')); // Ensure the correct mock is used
  
    render(<Admin />);
  
    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument()); // Wait for initial data load
  
    const deleteAdminButton = screen.getByTestId('delete-admin');
    fireEvent.click(deleteAdminButton);
  
    const confirmDeleteButton = screen.getByTestId('confirm-delete');
    fireEvent.click(confirmDeleteButton);
  
    await waitFor(() => {
      expect(screen.queryByText('Delete Admin')).toBeInTheDocument(); // Verify if modal is still visible
      expect(screen.queryAllByText('Error deleting Admin')[0]).toBeInTheDocument();
    });
  });
  

});
