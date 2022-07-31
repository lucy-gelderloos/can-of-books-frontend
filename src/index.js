import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
      domain="dev-3cws19i0.us.auth0.com"
      clientId="WI1DXwpiTADw5DMovsDIjZzLKxWj1WNM"
      redirectUri={window.location.origin}
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Auth0Provider>
 );
