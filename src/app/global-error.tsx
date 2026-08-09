'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <html>
      <body style={{ margin: 0 }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#090514',
          color: '#fff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#ff4d4d'
          }}>
            Critical System Error
          </h2>
          <p style={{
            color: '#a0a0a0',
            maxWidth: '600px',
            marginBottom: '2rem'
          }}>
            The application experienced a fatal error. Please try reloading the page.
          </p>
          <button
            onClick={() => reset()}
            style={{
              background: '#d4ff36',
              color: '#000',
              border: 'none',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
