import React from 'react';
import '../styles/_globals.css';
import Layout from './index';

function MyApp({ Component, pageProps }) {
  if (typeof window !== 'undefined') {
    return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
    );
  }
  // Return null or a placeholder if you want to render nothing on the server-side
  return null;
}

export default MyApp;
