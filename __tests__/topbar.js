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

const useMockProSidebar = () => ({
  collapseSidebar: jest.fn(),
  toggleSidebar: jest.fn(),
  broken: true
});


jest.mock('react-pro-sidebar', () => ({
  ...jest.requireActual('react-pro-sidebar'),
  useProSidebar: useMockProSidebar
}));

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

  jest.mock('next/router', () => {
    const mockPush = jest.fn();

    return {
      useRouter: () => ({
        push: mockPush,
      }),
    };
  });
  
  test('should handle non-200 status codes without redirecting', async () => {
    axios.get.mockResolvedValue({ data: { statusCode: 401 } });
  
    render(
      <ProSidebarProvider>
        <Topbar />
      </ProSidebarProvider>
    );
  
    await waitFor(() => {
      const logout = screen.getByTestId('logout');
      fireEvent.click(logout);
    });
  
    const { useRouter } = require('next/router');
    expect(useRouter().push).not.toHaveBeenCalledWith('/login');
  });

  test('toggle Sidebar in mobile view', async () => {
    axios.get.mockResolvedValue({ data: { statusCode: 401 } });
  
    render(
      <ProSidebarProvider>
        <Topbar />
      </ProSidebarProvider>
    );
  
    await waitFor(() => {
      const logout = screen.getByTestId('menu');
      fireEvent.click(logout);
    });
  
  
  });

})
