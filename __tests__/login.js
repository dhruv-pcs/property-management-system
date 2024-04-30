import React from 'react'
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios'
import Login from 'src/pages/login'
import { Provider } from 'react-redux'
import { store } from 'src/redux/store'

jest.mock('axios')
jest.mock('react-toastify/dist/ReactToastify.css', () => ({}))

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn()
  }))
}))

const MockData = {
  permissionData: {},
  token: 'mockToken',
  roleID: 'mockRoleID'
}

process.env.NEXT_PUBLIC_API_URL = 'https://pms.codenticsoftware.in'

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders login form correctly', async () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    )
  })

  test('displays error on empty credentials', async () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(screen.getByText('Email address is required')).toBeInTheDocument()
      expect(screen.getByText('Password is required')).toBeInTheDocument()
    })
  })

  test('displays error on invalid credentials', async () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    )

    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'invalidPassword' } })

    fireEvent.click(screen.getByRole('button', { name: 'Login' }))
    await waitFor(() => {
      expect(screen.getByText('Invalid Credentials')).toBeInTheDocument()
    })
  })

  test('login Successfully', async () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    )

    axios.post.mockResolvedValueOnce({
      data: {
        data: MockData
      }
    })

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
      expect(localStorage.getItem('user'))
      expect(localStorage.getItem('token'))
      expect(localStorage.getItem('Role'))
    })
  })
})
