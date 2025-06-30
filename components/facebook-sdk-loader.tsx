'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    FB: any;
  }
}

export default function FacebookSdkLoader() {
  const appId = process.env.FACEBOOK_APP_ID;

  useEffect(() => {
    if (!appId) {
      console.error('Missing Facebook App ID');
      return;
    }

    if (window.FB) return;

    // Avoid double-adding script tag (in case of hot reload)
    if (document.getElementById('facebook-jssdk')) return;

    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';

    script.onload = () => {
      if (window.FB) {
        window.FB.init({
          appId,
          xfbml: true,
          version: 'v23.0',
        });
        console.log('Facebook SDK initialized');
      }
    };

    document.body.appendChild(script);
  }, [appId]);

  return null;
}
