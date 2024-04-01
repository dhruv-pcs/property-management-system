import withAuth from '@components/auth/auth'
import Footer from '@components/footer/footer'
import GoToTopButton from '@components/go-to-top-button/go-to-top-button'
import { MyProSidebarProvider } from '@components/sidebar/sidebar-context'
import Topbar from '@components/topbar/topbar'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ColorModeContext, tokens, useMode } from '@theme/theme'
import React from 'react'
import { ProSidebarProvider } from 'react-pro-sidebar'

const SidebarLayout = ({ children }) => {
  const [theme, colorMode] = useMode()
  const colors = tokens(theme.palette.mode)

  return (
    <>
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
                  {children}
                </main>
                <Footer />
              </div>
              <GoToTopButton />
            </MyProSidebarProvider>
          </ProSidebarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}

export default withAuth(SidebarLayout)
