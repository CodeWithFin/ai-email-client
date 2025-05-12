import AuthButton from './components/AuthButton';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold text-center mb-6">AI Email Client</h1>
        <p className="text-gray-600 mb-8 text-center">
          Connect your email account to get started with AI-powered email management.
        </p>
        <div className="flex justify-center">
          <AuthButton />
        </div>
      </div>
    </div>
  );
}

export default App;