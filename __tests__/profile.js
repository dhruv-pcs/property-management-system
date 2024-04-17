import React from 'react'
import { act, render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios'
import Profile from 'src/pages/profile'

jest.mock('axios')
jest.mock('react-toastify/dist/ReactToastify.css', () => ({}))

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn()
  }))
}))

const MockData = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@example.com',
  phone: '1234567890',
  alternate_phone: '0987654321',
  city: 'New York',
  country: 'USA',
  pincode: '10001',
  state: 'NY',
  role_u_id: 'ROLE_ID_123',
  status: true
}

process.env.NEXT_PUBLIC_API_URL = 'https://pms.codenticsoftware.in'

describe('Profile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders Profile correctly', async () => {
    act(() => {
      render(<Profile />)
    })
  })

  test('fetch Data from api', async () => {
    await act(async () => {
      axios.get.mockResolvedValue({
        data: {
          data: {
            data: MockData
          }
        }
      })

      render(<Profile />)
    })

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })

    
    expect(screen.getByTestId('first_name')).toHaveValue('John')
    expect(screen.getByTestId('last_name')).toHaveValue('Doe')
    expect(screen.getByTestId('email')).toHaveValue('john.doe@example.com')
    expect(screen.getByTestId('phone')).toHaveValue('1234567890')
    expect(screen.getByTestId('alternate_phone')).toHaveValue('0987654321')
    expect(screen.getByTestId('city')).toHaveValue('New York')
    expect(screen.getByTestId('state')).toHaveValue('NY')
    expect(screen.getByTestId('country')).toHaveValue('USA')
    expect(screen.getByTestId('pincode')).toHaveValue('10001')
  })

  test('clicking Edit button toggles edit mode', async () => {

    act(() => {
        
        render(<Profile />)
    })

    await waitFor(() => {
      expect(screen.getByTestId('edit-button')).toBeInTheDocument()
    })
    expect(screen.queryByTestId('update-button')).not.toBeInTheDocument()
    fireEvent.click(screen.getByTestId('edit-button'))

    expect(screen.getByTestId('update-button')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('edit-button'))

    expect(screen.queryByTestId('update-button')).not.toBeInTheDocument()
  })

  test('submitting the form updates the profile', async () => {
    act(() => {
      render(<Profile />)
    })

    await waitFor(() => {
      expect(screen.getByTestId('edit-button')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByTestId('edit-button'))
    fireEvent.change(screen.getByTestId('first_name'), { target: { value: 'John' } })
    fireEvent.change(screen.getByTestId('last_name'), { target: { value: 'Doe' } })
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'john.doe@example.com' } })

    fireEvent.click(screen.getByTestId('update-button'))

    await waitFor(() => {
      expect(screen.getByText('Profile updated successfully')).toBeInTheDocument()
    })
  })

  test('submitting the empty form to get error', async () => {
    act(() => {
      render(<Profile />)
    })

    const edit = screen.getByTestId('edit-button')
    expect(edit).toBeInTheDocument()

    fireEvent.click(edit)
    const update = screen.getByTestId('update-button')
    expect(update).toBeInTheDocument()
    fireEvent.change(screen.getByTestId('first_name'), { target: { value: '' } })
    fireEvent.change(screen.getByTestId('last_name'), { target: { value: '' } })
    fireEvent.change(screen.getByTestId('email'), { target: { value: '' } })
    fireEvent.change(screen.getByTestId('phone'), { target: { value: '' } })

    fireEvent.click(update)

    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument()
      expect(screen.getByText('Last name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(
        screen.getByText('phone must be a `number` type, but the final value was: `NaN` (cast from the value `""`).')
      ).toBeInTheDocument()
    })
  })

  test('Not Showing Button if User Role is Super Admin', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        data: {
          data: {
            ...MockData,
            role_u_id: 'ROL1000000001'
          }
        }
      }
    })

    await act(async () => {
      render(<Profile />)
    })

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })

    await waitFor(() => {
      expect(screen.queryByTestId('edit-button')).not.toBeInTheDocument()
      expect(screen.queryByTestId('update-button')).not.toBeInTheDocument()
    })
  })
})
