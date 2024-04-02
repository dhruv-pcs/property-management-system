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

export default function App({ Component, pageProps }) {
  const [theme, colorMode] = useMode()

  const colors = tokens(theme.palette.mode)
  const router = useRouter()

  useEffect(() => {
    // @ts-ignore
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [router])

  const isLoginPage = router.pathname === '/login'

  if (isLoginPage) {
    return <Component {...pageProps} />
  } else {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <ProSidebarProvider theme={theme}>
            <CssBaseline />
            <MyProSidebarProvider>
              <div style={{ height: '100%', width: '100%' }}>
                <Topbar />
                <main
                  className='card m-2 p-2   shadow-sm'
                  style={{ backgroundColor: colors.primary[1000], color: colors.grey[100], minHeight: '83vh' }}
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