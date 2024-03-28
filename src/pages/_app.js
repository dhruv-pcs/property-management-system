import '@styles-page/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import dynamic from 'next/dynamic'


// eslint-disable-next-line no-unused-vars
const NavbarWithNoSSR = dynamic(() => import('@components/navbar/navbar'), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  
  return (
    
    <>
  <NavbarWithNoSSR />
        
      <Component {...pageProps} />
    </>
  )
}
