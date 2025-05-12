import { useState, useEffect } from 'react';
import EmailListItem from './EmailListItem';
import { Email } from '../types/email';

export default function EmailList() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch('/api/emails');
        if (!response.ok) throw new Error('Failed to fetch emails');
        const data = await response.json();
        setEmails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading emails...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {emails.map((email) => (
        <EmailListItem key={email.id} email={email} />
      ))}
    </div>
  );
}