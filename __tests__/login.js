import React from 'react'
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios'
import Login from 'src/pages/login'
import { useRouter } from 'next/router'

jest.mock('axios')
jest.mock('react-toastify/dist/ReactToastify.css', () => ({}))

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn()
  }))
}))

// Mock the environment variable
process.env.NEXT_PUBLIC_API_URL = 'https://pms.codenticsoftware.in';

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    // global.localStorage = {
    //   getItem: jest.fn(),
    //   setItem: jest.fn(),
    //   removeItem: jest.fn(),
    //   clear: jest.fn()
    // }
  })

  test('renders login form correctly', async () => {
    render(<Login />)
  })
  test('renders login form correctly', async () => {
    render(<Login />)

    const email = screen.getByTestId('email')
    expect(email).toBeInTheDocument()
    const password = screen.getByTestId('password')
    expect(password).toBeInTheDocument()

    fireEvent.change(email, { target: { value: 'super@gmail.com' } })
    fireEvent.change(password, { target: { value: 'Super@123' } })

    const getPasswordIcon = screen.getByTestId('toggle-password')
    fireEvent.click(getPasswordIcon)

    const submitButton = screen.getByTestId('login-button')

    await act(async () => {
      fireEvent.click(submitButton)
    })
  })
})
