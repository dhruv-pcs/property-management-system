import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from '@components/sidebar';
import Footer from '../components/footer';

export default function App({ Component, pageProps }) {
  return (
    <div className='container-fluid h-100'>
    <div className='row'>

    <div className='col-2'>

      <Sidebar/>
    </div>
      <div className='col-10'>
      <div className='min-h-100vh'>

     <Component {...pageProps} />
      </div>
        <Footer />
      </div>
    </div>
    </div>
  )  
}
