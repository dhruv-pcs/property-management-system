import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from '@components/sidebar';
import Footer from '../components/footer';
import dynamic from 'next/dynamic'

const NavbarWithNoSSR = dynamic(() => import('@components/navbar/navbar'), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  return (
    <div className='container-fluid h-100'>
    <div className='row'>

    <div className='col-2'>

      <Sidebar/>
    </div>
      <div className='col-10'>
      <div className='min-h-100vh'>
    <NavbarWithNoSSR />
     <Component {...pageProps} />
      </div>
        <Footer />
      </div>
    </div>
    </div>
  )  

}
