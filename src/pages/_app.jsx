// ** React Imports **
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** Custom Components **
import Footer from '@components/footer/footer'
import Topbar from '@components/topBar/topBar'
import { MyProSidebarProvider } from '@components/sidebar/sidebar-context'
import { ColorModeContext, tokens, useMode } from '@theme/theme'

// ** Third Party Imports **
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ProSidebarProvider } from 'react-pro-sidebar'

// ** Redux Imports **
import { Provider } from 'react-redux'
import { store } from 'src/redux/store'

// ** Styles **
import '@styles-page/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = ({ Component, pageProps }) => {
  // ** Vars **
  const colors = tokens(theme.palette.mode)
  const router = useRouter()

  // ** State **
  const [theme, colorMode] = useMode()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  // Check if the current route is the login page
  const isBlankPage = router.pathname === '/login' || router.pathname === '/404';

  return (
    <ColorModeContext.Provider value={colorMode}>
        {isBlankPage && <Component {...pageProps} />}
        {!isBlankPage && (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProSidebarProvider theme={theme}>
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
          )}
    </ColorModeContext.Provider>
  )
}

export default App
