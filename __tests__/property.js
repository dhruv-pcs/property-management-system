import {fireEvent, render, screen, waitFor } from '@testing-library/react'
import Property from 'src/pages/property'
import React from 'react'
import '@testing-library/jest-dom'
import axios from 'axios'

// Mocked permissions and owner data
const mockPermissions = [
  {
    module: {
      alias_name: 'Property'
    },
    view: true,
    update: true,
    remove: true,
    add: true
  }
]

const mockPropertyData = [
    {
        id: 1,
        name: "Vista Apartment",
        rent: 1200,
        location: "Downtown",
        address: "123 Main St",
        district: "Central",
      },
]

// Mocking localStorage.getItem
Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockPermissions))

describe('Property Component', () => {
  beforeEach(async () => {
    localStorage.setItem('user', JSON.stringify(mockPermissions))
    axios.get = jest.fn().mockResolvedValue({ data: { data: { propertyData: mockPropertyData } } })
    render(<Property />)
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })
  })

  test('Property List Rendering Test', async () => {
    const propertyList = await screen.findByTestId('property-list')
    expect(propertyList).toBeInTheDocument()
  })

  test('renders property list from API', async () => {
    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Rent')).toBeInTheDocument()
      expect(screen.getByText('Location')).toBeInTheDocument()
      expect(screen.getByText('Address')).toBeInTheDocument()
      expect(screen.getByText('District')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()
    })
  })

  test('handles error when API request fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('API request failed'))

    render(<Property />)

    await waitFor(() => {
      expect(screen.getByText('Error Fetching Data')).toBeInTheDocument()
    })
  })

  test('clicking Edit button to see edit model', async () => {
    const edit = screen.getByTestId('edit-property')
    expect(edit).toBeInTheDocument()
    fireEvent.click(edit)

    expect(screen.getByTestId('save-changes')).toBeInTheDocument()
  })

  test('clicking View button to see view model', async () => {
    const view = screen.getByTestId('view-property')
    expect(view).toBeInTheDocument()
    fireEvent.click(view)

    expect(screen.getByText('View Property')).toBeInTheDocument()
  })

  test('clicking Delete button to see delete model', async () => {
    const deleteProperty = screen.getByTestId('delete-property')
    expect(deleteProperty).toBeInTheDocument()
    fireEvent.click(deleteProperty)
    expect(screen.getByText('Delete Property')).toBeInTheDocument()
  })

  test('clicking Add button to see add model', async () => {
    const add = screen.getByTestId('add-property')
    expect(add).toBeInTheDocument()
    fireEvent.click(add)
    expect(screen.getByText('Add Property')).toBeInTheDocument()
  })

})