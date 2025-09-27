import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import App from './App';
import { msalConfig } from './config/authConfig';
import 'bootstrap/dist/css/bootstrap.css';

const msalInstance = new PublicClientApplication(msalConfig);

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <MsalProvider instance={msalInstance}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MsalProvider>
  </GoogleOAuthProvider>
);