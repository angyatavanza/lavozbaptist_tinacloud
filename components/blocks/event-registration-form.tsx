import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import with SSR disabled to avoid server-side crashes
const CustomGForm = dynamic(() => import('@customgform-lib/react-customgform'), {
  ssr: false,
  loading: () => <p>Loading form...</p>, // Optional fallback
});

export function eventregistrationform() {
  return <CustomGForm 
    formId="cmbuzv5i800j4wnh93h0r2zns" 
    mode='popup' 
    label="Show form"
    inlineStyles='border: none;appearance: none;cursor: pointer;padding: 8px 12px;display: inline-block;background: #3f6bff;font-size: 16px;color: #fff;border-radius: 6px;font-weight: 500;'
  />;
}