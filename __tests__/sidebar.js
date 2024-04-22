import React from 'react'
import { render, screen } from '@testing-library/react'
import MyProSidebar from 'src/components/sidebar/sidebar'
import { ProSidebarProvider } from 'react-pro-sidebar'

jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    push: jest.fn()
  })
}))


jest.mock('@components/sidebar/sidebarItem', () => ({
  __esModule: true,
  default: jest.fn(() => [
    { title: 'Admin', to: '/', icon: 'mdi:home-outline', subject: 'admin', path: '/' },
  ]),
  navigation: jest.fn(() => [
    { title: 'Admin', to: '/', icon: 'mdi:home-outline', subject: 'admin', path: '/' },
  ])
}));

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



global.localStorage = mockLocalStorage

describe('MyProSidebar component', () => {
  // test('calls localStorage.getItem with correct key and renders items based on localStorage data', () => {
  //   const mockUserData = [{ view: true, module: { alias_name: 'Admin' } }]
  //   const mockUserDataString = JSON.stringify(mockUserData)
  //   mockLocalStorage.setItem('user', mockUserDataString)

  //   render(
  //     <ProSidebarProvider>
  //       <MyProSidebar />
  //     </ProSidebarProvider>
  //   )

  //   expect(mockLocalStorage.getItem).toHaveBeenCalledWith('user')
  //   expect(screen.getAllByTestId('Admin')).toBeInTheDocument()
  // })

  test('does not render items when localStorage data does not match condition', () => {
    render(
      <ProSidebarProvider>
        <MyProSidebar />
      </ProSidebarProvider>
    )

    expect(screen.queryByTestId('Admin')).toBeNull()
  })
})
