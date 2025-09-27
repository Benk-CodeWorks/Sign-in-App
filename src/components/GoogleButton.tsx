import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

interface GoogleButtonProps {
  onSuccess: (response: any) => void;
  onError: () => void;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ onSuccess, onError }) => {
  return <GoogleLogin onSuccess={onSuccess} onError={onError} />;
};

export default GoogleButton;
