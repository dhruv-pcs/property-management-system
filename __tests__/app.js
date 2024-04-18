import React from 'react'
import { render, act } from '@testing-library/react'
import { useRouter } from 'next/router'
import App from 'src/pages/_app'

// Mocking useRouter
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}))

describe('App Component', () => {
  let useRouterMock

  beforeEach(() => {
    useRouterMock = jest.fn()
    useRouterMock.mockReturnValue({
      pathname: '/',
      push: jest.fn(),
    })
    useRouter.mockReturnValue(useRouterMock)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders App correctly', async () => {
    act(() => {
      render(<App />)
    })
  })
})
