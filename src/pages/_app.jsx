import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@styles-page/globals.css'
import { useEffect } from 'react'
import { ColorModeContext, useMode } from '@theme/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'



export default function App({ Component, pageProps }) {
  const [theme, colorMode] = useMode()

  useEffect(() => {
    // @ts-ignore
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Component {...pageProps} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
