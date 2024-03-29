import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Layout from '@layout/layout';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // @ts-ignore
    const bootstrap = require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
