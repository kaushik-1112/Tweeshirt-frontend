// _app.js or _app.tsx

import { SessionProvider } from 'next-auth/react';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
