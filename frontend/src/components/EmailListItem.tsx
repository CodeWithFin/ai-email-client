import { Email } from '../types/email';
import { formatDate } from '../utils/date';
import ResponseSuggestions from './ResponseSuggestions';

export default function EmailListItem({ email }: { email: Email }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
        !email.read ? 'bg-blue-50 dark:bg-gray-800' : ''
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {email.from}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {email.subject}
          </p>
          {expanded && (
          {expanded && (
            <>
              <div className="mt-2 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {email.body}
              </div>
              <ResponseSuggestions 
                emailId={email.id} 
                emailContent={`From: ${email.from}\nSubject: ${email.subject}\n\n${email.body}`}
              />
            </>
          )}
        <div className="ml-4 text-xs text-gray-500 dark:text-gray-400">
          {formatDate(email.date)}
        </div>
      </div>
      {!expanded && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 truncate">
          {email.snippet}
        </p>
      )}
      {!expanded && email.summary && (
  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
    <span className="font-medium">AI Summary:</span> {email.summary}
  </p>
)}
    </div>
  );
}