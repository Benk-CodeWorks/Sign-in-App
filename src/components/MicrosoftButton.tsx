import React from 'react';
import { useMsal } from '@azure/msal-react';

interface MicrosoftButtonProps {
  onSuccess: (response: any) => void;
}

const MicrosoftButton: React.FC<MicrosoftButtonProps> = ({ onSuccess }) => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      const response = await instance.loginPopup({
        scopes: ['openid', 'profile', 'User.Read'],
        prompt: 'select_account',
      });
      console.log('Microsoft login success:', response);
      onSuccess(response);
    } catch (error) {
      console.error('Microsoft login failed:', error);
    }
  };

  return (
    <button
      className="btn btn-primary w-100 mb-2 d-flex align-items-center justify-content-center"
      onClick={handleLogin}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        className="me-2"
      >
        <path
          fill="#fff"
          d="M11.5 2H2v9.5h9.5V2zm1 0H22v9.5h-9.5V2zm-11 11H11v9.5H2V13zm11 0H22v9.5h-9.5V13z"
        />
      </svg>
      <span className="font-weight-bold">Sign in with Microsoft</span>
    </button>
  );
};

export default MicrosoftButton;