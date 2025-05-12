import { useState } from 'react';

export default function ResponseSuggestions({ 
  emailId,
  emailContent 
}: { 
  emailId: string;
  emailContent: string;
}) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ emailContent }),
      });
      
      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <button
        onClick={fetchSuggestions}
        disabled={loading}
        className="mb-4 px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Get AI Response Suggestions'}
      </button>
      
      {suggestions.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Suggested Responses:</h4>
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className="p-3 bg-gray-50 dark:bg-gray-700 rounded text-sm"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}