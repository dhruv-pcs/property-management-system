import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@styles-page/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ColorModeContext, tokens, useMode } from '@theme/theme'
import Topbar from '@components/topbar/topbar'
import { ProSidebarProvider } from 'react-pro-sidebar'
import { MyProSidebarProvider } from '@components/sidebar/sidebar-context'
import Footer from '@components/footer/footer'
import GoToTopButton from '@components/go-to-top-button/go-to-top-button'
import withAuth from '@components/auth/auth'
import UnauthorizedPage from './400'

const App = ({ Component, pageProps }) => {
  const [theme, colorMode] = useMode()
  const colors = tokens(theme.palette.mode)
  const router = useRouter()
  const LocalData = localStorage.getItem('user')
  const Local = JSON.parse(LocalData)

  useEffect(() => {
    const importBootstrap = async () => {
      try {
        await import('bootstrap/dist/js/bootstrap.bundle.min.js')
      } catch (error) {
        console.error('Error loading Bootstrap:', error)
      }
    }
    importBootstrap()
  }, [router])

  const isLoginPage = router.pathname === '/login'
  const is404 = router.pathname === '/404'

  if (isLoginPage || is404) {
    return <Component {...pageProps} />
  } else {
    const route = router.pathname

    const hasPermission = route => {
      if (!Local) {
        return false
      }

      if (route === '/404' || route === '/login' || route === '/profile') {
        return true
      }

      if (route === '/') {
        return true
      }

      return Local.some(item => `/${item.module.name}` === route)
    }

    const hasAccess = hasPermission(route)
    if (!hasAccess) {
      return (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <UnauthorizedPage />
          </ThemeProvider>
        </ColorModeContext.Provider>
      )
    }

    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <ProSidebarProvider theme={theme}>
            <CssBaseline />
            <MyProSidebarProvider>
              <div style={{ height: '100%', width: '100%' }}>
                <Topbar />
                <main
                  className='card m-2 p-2 shadow-sm'
                  style={{
                    backgroundColor: colors.primary[1000],
                    color: colors.grey[100],
                    minHeight: '83vh'
                  }}
                >
                  <Component {...pageProps} />
                </main>
                <Footer />
              </div>
              <GoToTopButton />
            </MyProSidebarProvider>
          </ProSidebarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    )
  }
}

export default withAuth(App)
