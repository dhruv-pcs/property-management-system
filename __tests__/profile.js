import React from 'react'
import { render, fireEvent, waitFor, act, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Profile from 'src/pages/profile'
import axios from 'axios'

jest.mock('axios')
jest.mock('../../public/images/profile/Img1.png', () => '/../../public/images/profile/Img1.png')

describe('Profile Component', () => {
  test('renders without crashing', async () => {
    await act(() => render(<Profile />))
  })

  test('fetches user data on mount', async () => {
    const mockUserData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      alternate_phone: '0987654321',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      PinCode: '10001',
      role_u_id: 'ROL1000000001'
    }

    axios.get.mockResolvedValueOnce({ data: { data: { data: mockUserData } } })

    await act(async () => {
      render(<Profile />)
    })

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
    })
  })

  test('renders user profile data', async () => {
    const mockUserData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      alternate_phone: '0987654321',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      PinCode: '10001',
      role: { name: 'Admin' },
      status: true
    }

    axios.get.mockResolvedValueOnce({ data: { data: { data: mockUserData } } })

    const { getByTestId } = await act(async () => render(<Profile />))

    await waitFor(() => {
      expect(getByTestId('profile-name')).toHaveTextContent('John Doe')
      expect(getByTestId('profile-email')).toHaveTextContent('Email: john.doe@example.com')
      expect(getByTestId('profile-role')).toHaveTextContent('Role: Admin')
      expect(getByTestId('profile-status')).toHaveTextContent('Status: Active')
      expect(getByTestId('profile-phone')).toHaveTextContent('Contact Number: 1234567890')
    })
  })

  test('allows editing profile data', async () => {
    const mockUserData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      alternate_phone: '0987654321',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      PinCode: '10001',
      role_u_id: 'ROL1000000002'
    }

    axios.get.mockResolvedValueOnce({ data: { data: { data: mockUserData } } })

    await act(() => render(<Profile />))

    await waitFor(() => {
      fireEvent.click(screen.getByText('Edit'))
    })

    fireEvent.change(document.querySelector('[name="first_name"]'), { target: { value: 'Jane' } })
    fireEvent.change(document.querySelector('[name="last_name"]'), { target: { value: 'Doe' } })

    const formElement = document.querySelector('form')

    fireEvent.submit(formElement)
  })

  test('displays error messages for all required fields', async () => {
    const mockUserData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      alternate_phone: '0987654321',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      PinCode: '10001',
      role_u_id: 'ROL1000000002'
    }

    axios.get.mockResolvedValueOnce({ data: { data: { data: mockUserData } } })

    await act(() => render(<Profile />))

    await waitFor(() => {
      fireEvent.click(screen.getByText('Edit'))
    })

    fireEvent.change(document.querySelector('[name="first_name"]'), { target: { value: '' } })
    fireEvent.change(document.querySelector('[name="last_name"]'), { target: { value: '' } })
    fireEvent.change(document.querySelector('[name="email"]'), { target: { value: '' } })

    fireEvent.change(document.querySelector('[name="phone"]'), { target: { value: '' } })

    const formElement = document.querySelector('form')

    fireEvent.submit(formElement)

    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument()
      expect(screen.getByText('Last name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })
  })
})
