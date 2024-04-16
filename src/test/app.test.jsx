import React from 'react'
import { render, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from 'src/pages/_app'
import { useRouter } from 'next/navigation'

// Mock the useRouter hook
jest.mock('next/router')

describe('App Component', () => {
  beforeEach(() => {
    // Mock the useRouter object
    useRouter.mockReturnValue({
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
    })
  })

  test('renders without crashing', () => {
    render(<App />)
  })

  test('Bootstrap is loaded', async () => {
    
    const mockImport = jest.fn()
    jest.mock('bootstrap/dist/js/bootstrap.bundle.min.js', () => ({
      __esModule: true,
      default: mockImport,
    }))
    console.log('hi');
    render(<App />)

    await waitFor(() => {
      expect(mockImport).toHaveBeenCalled()
    })
  })

  test('renders login page correctly', () => {
    const { getByText } = render(<App />)
    expect(getByText('Login Page')).toBeInTheDocument()
  })


  test('renders 404 page correctly', () => {
    const { getByText } = render(<App />)
    expect(getByText('404 Page Not Found')).toBeInTheDocument()
  })

  
  test('renders component when user is logged in', () => {
    const { getByText } = render(<App />)
    expect(getByText('Dashboard')).toBeInTheDocument()
  })

  // Test component behavior when user is not authorized
  test('redirects to unauthorized page when user does not have access', () => {
    const { history } = render(<App />)
    expect(history.location.pathname).toEqual('/unauthorized')
  })

  // Test component behavior when user has access
  test('renders component when user has access', () => {
    const { getByText } = render(<App />)
    expect(getByText('Allowed Page')).toBeInTheDocument()
  })

  // Add more test cases as needed...
})
