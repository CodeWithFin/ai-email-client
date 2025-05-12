import { useState } from 'react';
import AuthButton from './components/AuthButton';
import EmailList from './components/EmailList';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  // Check if user is authenticated (in a real app, you'd have proper auth state)
  useEffect(() => {
    // This is just for demo - in a real app you'd check tokens, etc.
    const params = new URLSearchParams(window.location.search);
    if (params.get('code')) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Email Client
          </h1>
        </header>
        
        <main className="pb-10">
          {authenticated ? (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <EmailList />
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-8">
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                Connect your email account to get started
              </p>
              <div className="flex justify-center">
                <AuthButton onSuccess={() => setAuthenticated(true)} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;