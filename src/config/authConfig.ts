export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID, // your Microsoft OAuth client ID
    authority: "https://login.microsoftonline.com/common",
    redirectUri: window.location.origin
  }
};
