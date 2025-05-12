import { useState } from 'react';

export default function AuthButton() {
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/google');
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Auth failed:', error);
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleGoogleAuth}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? 'Connecting...' : 'Connect Google Account'}
    </button>
  );
}