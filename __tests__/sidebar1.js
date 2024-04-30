import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import MyProSidebar from 'src/components/sidebar/sidebar'
import { ProSidebarProvider } from 'react-pro-sidebar'

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

const useMockProSidebar = () => ({
  collapseSidebar: jest.fn(),
  toggleSidebar: jest.fn(),
  broken: true
})

jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    push: jest.fn()
  })
}))

jest.mock('react-pro-sidebar', () => ({
  ...jest.requireActual('react-pro-sidebar'),
  useProSidebar: useMockProSidebar
}))

describe('MyProSidebar component', () => {
  test('collapses the sidebar when the collapse button is clicked and broken is true', async () => {
    const useMockProSidebarBrokenTrue = () => ({
      collapseSidebar: jest.fn(),
      toggleSidebar: jest.fn(),
      broken: true
    })

    jest.mock('react-pro-sidebar', () => ({
      ...jest.requireActual('react-pro-sidebar'),
      useProSidebar: useMockProSidebarBrokenTrue
    }))

    render(
      <ProSidebarProvider>
        <MyProSidebar />
      </ProSidebarProvider>
    )

    const collapseButton = screen.getByTestId('collapse-sidebar-close')

    act(() => {
      fireEvent.click(collapseButton)
    })
  })
})
