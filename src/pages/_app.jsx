import React, { useEffect, useState } from 'react'
import '@styles-page/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ColorModeContext, tokens, useMode } from '@theme/theme'
import Topbar from '@components/topbar/topbar'
import { ProSidebarProvider } from 'react-pro-sidebar'
import { MyProSidebarProvider } from '@components/sidebar/sidebar-context'
import Footer from '@components/footer/footer'
import { useRouter } from 'next/router'

const App = ({ Component, pageProps }) => {
  const [theme, colorMode] = useMode()
  const colors = tokens(theme.palette.mode)
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // Return null if not yet on the client
  }

  const pathname = router.pathname
  const isLoginPage = pathname === '/login'
  const is404 = pathname === '/404'

  if (isLoginPage || is404) {
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
            </MyProSidebarProvider>
          </ProSidebarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    )
  }
}

export default App
