import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@styles-page/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // @ts-ignore
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [router])

  return <Component {...pageProps} />
}
