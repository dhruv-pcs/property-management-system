import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import Owner from 'src/pages/owner'
import React from 'react'
import '@testing-library/jest-dom'
import axios from 'axios'

// Mocked permissions and owner data
const mockPermissions = [
  {
    module: {
      alias_name: 'Owner'
    },
    view: true,
    update: true,
    remove: true,
    add: true
  }
]

const mockOwnerData = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    aadhar_card_no: '123456789012',
    is_verified: true,
    status: true
  }
]

// Mocking localStorage.getItem
Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockPermissions))

describe('Owner Component', () => {
  beforeEach(async () => {
    localStorage.setItem('user', JSON.stringify(mockPermissions))
    axios.get = jest.fn().mockResolvedValue({ data: { data: { ownerData: mockOwnerData } } })
    render(<Owner />)
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })
  })

  test('Owner List Rendering Test', async () => {
    const ownerList = await screen.findByTestId('owner-list')
    expect(ownerList).toBeInTheDocument()
  })

  test('renders owner list from API', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Phone')).toBeInTheDocument()
      expect(screen.getByText('Aadhar Card')).toBeInTheDocument()
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
    })
  })

  test('handles error when API request fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('API request failed'))

    render(<Owner />)

    await waitFor(() => {
      expect(screen.getByText('Error Fetching Data')).toBeInTheDocument()
    })
  })

  test('clicking Edit button to see edit model', async () => {
    const edit = screen.getByTestId('edit-owner')
    expect(edit).toBeInTheDocument()
    fireEvent.click(edit)

    expect(screen.getByTestId('save-changes')).toBeInTheDocument()
  })

  test('clicking View button to see view model', async () => {
    const view = screen.getByTestId('view-owner')
    expect(view).toBeInTheDocument()
    fireEvent.click(view)

    expect(screen.getByText('View Owner')).toBeInTheDocument()
  })

  test('clicking Delete button to see delete model', async () => {
    const deleteOwner = screen.getByTestId('delete-owner')
    expect(deleteOwner).toBeInTheDocument()
    fireEvent.click(deleteOwner)
    expect(screen.getByText('Delete Owner')).toBeInTheDocument()
  })

  test('clicking Add button to see add model', async () => {
    const add = screen.getByTestId('add-owner')
    expect(add).toBeInTheDocument()
    fireEvent.click(add)
    expect(screen.getByText('Add Owner')).toBeInTheDocument()
  })

  test('clicking Delete button and then click confirm delete button to delete owner - Success', async () => {
    const mockResponseData = { data: { statusCode: 200 } }
    jest.spyOn(axios, 'delete').mockResolvedValue(mockResponseData)

    render(<Owner />)

    const deleteOwner = screen.getByTestId('delete-owner')
    fireEvent.click(deleteOwner)

    expect(screen.getByText('Delete Owner')).toBeInTheDocument()

    const confirmDelete = screen.getByTestId('confirm-delete')
    fireEvent.click(confirmDelete)

    await waitFor(() => {
      expect(screen.queryByText('Delete Owner')).not.toBeInTheDocument()
      expect(screen.queryAllByText('Owner Deleted Successfully')[0]).toBeInTheDocument()
    })
  })

  test('clicking Delete button and then click confirm delete button to delete owner - Error', async () => {
    axios.get.mockRejectedValueOnce(new Error('API request failed'))

    const mockResponseData = { data: { statusCode: 400 } }
    jest.spyOn(axios, 'delete').mockResolvedValue(mockResponseData)

    render(<Owner />)

    const deleteOwner = screen.getByTestId('delete-owner')
    fireEvent.click(deleteOwner)

    expect(screen.getByText('Delete Owner')).toBeInTheDocument()

    const confirmDelete = screen.getByTestId('confirm-delete')
    fireEvent.click(confirmDelete)

    await waitFor(() => {
      expect(screen.queryByText('Delete Owner')).not.toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.queryByText('Failed to Delete Owner')).toBeInTheDocument()
    })
  })
})
