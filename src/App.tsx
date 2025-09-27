import React, { useEffect, useState } from 'react';
import GoogleButton from './components/GoogleButton';
import MicrosoftButton from './components/MicrosoftButton';
import { useMsal } from '@azure/msal-react';

function App() {
  const [userName, setUserName] = useState<string | null>(null);
  const [provider, setProvider] = useState<'google' | 'microsoft' | null>(null);
  const { instance } = useMsal();

  // Load saved name from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    const savedProvider = localStorage.getItem('provider') as 'google' | 'microsoft' | null;
    if (savedName) setUserName(savedName);
    if (savedProvider) setProvider(savedProvider);
  }, []);

  // Google login
  const handleGoogleSuccess = (response: any) => {
    const name = response?.credential ? parseJwt(response.credential).name : 'Google User';
    setUserName(name);
    setProvider('google');
    localStorage.setItem('userName', name);
    localStorage.setItem('provider', 'google');
  };
  const handleGoogleError = () => console.log('Google login failed');

  // Microsoft login
  const handleMicrosoftLogin = () => {
    instance.loginPopup({ scopes: ["openid", "profile"] })
      .then(resp => {
        const name = resp.account?.name || 'Microsoft User';
        setUserName(name);
        setProvider('microsoft');
        localStorage.setItem('userName', name);
        localStorage.setItem('provider', 'microsoft');
      })
      .catch(() => console.log('Microsoft login failed'));
  };

  // Sign out
  const handleSignOut = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('provider');
    setUserName(null);
    setProvider(null);

    if (provider === 'microsoft') {
      instance.logoutPopup().catch(() => console.log('Microsoft logout failed'));
    }
  };

  // Helper to decode JWT
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return {};
    }
  };

  if (userName) {
    return (
      <div>
        <h2>Hello, {userName}, reopen this website on another page and view the beauty of tokens saving</h2>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Login</h2>
      <GoogleButton onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
      <MicrosoftButton />
    </div>
  );
}

export default App;
