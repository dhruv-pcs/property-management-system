import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Topbar from 'src/components/topbar/topbar'
import { waitFor } from '@testing-library/react'
import { ProSidebarProvider } from 'react-pro-sidebar'
import axios from 'axios'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn()
  }))
}))

jest.mock('axios')

describe('Topbar Component', () => {
  test('should render topbar component', async () => {
    render(
      <ProSidebarProvider>
        <Topbar />
      </ProSidebarProvider>
    )
  })

  test('should render logout button', async () => {
    render(
      <ProSidebarProvider>
        <Topbar />
      </ProSidebarProvider>
    )
    await waitFor(() => {
      expect(screen.getByTestId('logout')).toBeInTheDocument()
    })
  })

  test('should render logout button and when click it logout user', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: { statusCode: 200 } })
    render(
      <ProSidebarProvider>
        <Topbar />
      </ProSidebarProvider>
    )
    await waitFor(() => {
      const logout = screen.getByTestId('logout')
      expect(logout).toBeInTheDocument()
      fireEvent.click(logout)
    })

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })
  })

  test('should render logout button and when click it show error', async () => {
    axios.get = jest.fn().mockRejectedValue(new Error('API request failed'))
    render(
      <ProSidebarProvider>
        <Topbar />
      </ProSidebarProvider>
    )
    await waitFor(() => {
      const logout = screen.getByTestId('logout')
      expect(logout).toBeInTheDocument()
      fireEvent.click(logout)
    })

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })

    await waitFor(() => {
      expect(screen.getByText('Error Logging Out')).toBeInTheDocument()
    })
  })
})
