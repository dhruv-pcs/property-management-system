import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import MyProSidebar from 'src/components/sidebar/sidebar'
import { ProSidebarProvider} from 'react-pro-sidebar'

import { renderHook } from '@testing-library/react-hooks'
import { MyProSidebarProvider, useSidebarContext } from 'src/components/sidebar/sidebar-context'

jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    push: jest.fn()
  })
}))

jest.mock('@components/sidebar/sidebarItem', () => ({
  __esModule: true,
  default: jest.fn(() => [{ title: 'Admin', to: '/', icon: 'mdi:home-outline', subject: 'admin', path: '/' }]),
  navigation: jest.fn(() => [{ title: 'Admin', to: '/', icon: 'mdi:home-outline', subject: 'admin', path: '/' }])
}))

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn()
}

global.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }
})

jest.mock('@components/sidebar/sidebarItem', () => ({
  __esModule: true,
  default: jest.fn(() => [{ title: 'Admin', to: '/', icon: 'mdi:home-outline', subject: 'Admin', path: '/' }])
}))

global.localStorage = mockLocalStorage




describe('MyProSidebar component', () => {
  test('does not render items when localStorage data does not match condition', () => {
    render(
      <ProSidebarProvider>
        <MyProSidebar />
      </ProSidebarProvider>
    )

    expect(screen.queryByTestId('Admin')).toBeNull()
  })

  test('collapses the sidebar when the collapse button is clicked', () => {
    render(
      <ProSidebarProvider>
        <MyProSidebar />
      </ProSidebarProvider>
    )

    const collapseButton = screen.getByTestId('collapse-sidebar')
    fireEvent.click(collapseButton)
  })

  test('renders items based on navigation and user data when localStorage data matches', async () => {
    const mockUserData = [{ view: true, module: { alias_name: 'Admin' } }]
    const mockUserDataString = JSON.stringify(mockUserData)
    global.localStorage.setItem('user', mockUserDataString)

    await act(() =>
      render(
        <ProSidebarProvider>
          <MyProSidebar />
        </ProSidebarProvider>
      )
    )

    expect(screen.getAllByTestId('Dashboard')).toHaveLength(1)
    expect(screen.getAllByTestId('Admin')).toHaveLength(1)

    await waitFor(() => {
      fireEvent.click(screen.getAllByTestId('Admin')[0])
    })
  })

  test('renders items based on navigation and user data when localStorage data not matches', () => {
    const mockUserData = [{ view: true, module: { alias_name: 'admin' } }]
    const mockUserDataString = JSON.stringify(mockUserData)
    global.localStorage.setItem('user', mockUserDataString)

    render(
      <ProSidebarProvider>
        <MyProSidebar />
      </ProSidebarProvider>
    )

    expect(screen.getAllByTestId('Dashboard')).toHaveLength(1)
  })

  
  
})

describe('useSidebarContext', () => {
  it('returns sidebar context values', () => {
    const wrapper = ({ children }) => (
      <ProSidebarProvider>
        <MyProSidebarProvider>{children}</MyProSidebarProvider>
      </ProSidebarProvider>
    )

    const { result } = renderHook(() => useSidebarContext(), { wrapper })

    expect(result.current.sidebarBackgroundColor).toBeUndefined()

    act(() => {
      result.current.setSidebarBackgroundColor('red')
    })

    expect(result.current.sidebarBackgroundColor).toBe('red')
  })
})
