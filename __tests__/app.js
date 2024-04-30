import React from 'react'
import { render, waitFor, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from 'src/pages/_app'
import Topbar from '@components/topbar/topbar'
import Footer from '@components/footer/footer'
import { ColorModeContext } from '@theme/theme'
import { ProSidebarProvider } from 'react-pro-sidebar'
import Login from 'src/pages/login'
import Notfound from 'src/pages/404'

jest.mock('src/middleware', () => ({
  middleware: jest.fn(req => {
    const pathname = req.url.split('?')[0]

    if (pathname === '/login') {
      return { token: null }
    } else {
      return { token: 'mock-token' }
    }
  })
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn()
  }))
}))

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

describe('App component layout', () => {
  test('renders the layout correctly', async () => {
    const pageProps = {}
    const theme = {}
    const colorMode = 'light'

    render(
      <ColorModeContext.Provider value={colorMode}>
        <ProSidebarProvider theme={theme}>
          <Topbar />
          <App Component={() => <div data-testid='mock-component'>Mock Component</div>} pageProps={pageProps} />
          <Footer />
        </ProSidebarProvider>
      </ColorModeContext.Provider>
    )

    await waitFor(() => {
      const topBars = screen.getAllByTestId('topbar')
      expect(topBars.length).toBeGreaterThan(0) // Ensure there are top bars

      topBars.forEach(topBar => {
        expect(topBar).toBeInTheDocument()
      })

      const footer = screen.getAllByTestId('footer')
      expect(footer.length).toBeGreaterThan(0) // Ensure there are footers

      footer.forEach(foot => {
        expect(foot).toBeInTheDocument()
      })

      expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    })
  })

  test('404 page renders correctly', async () => {
    jest.mock('next/router', () => ({
      useRouter: () => ({
        pathname: '/404',
        push: jest.fn()
      })
    }))

    const pageProps = {}

    act(() => {
      render(<App Component={() => <Notfound />} pageProps={pageProps} />)
    })
  })

  test('login page renders correctly', async () => {
    jest.mock('next/router', () => ({
      useRouter: () => ({
        pathname: '/login',
        push: jest.fn()
      })
    }))

    const pageProps = {}

    act(() => {
      render(<App Component={() => <Login />} pageProps={pageProps} />)
    })
  })
})
