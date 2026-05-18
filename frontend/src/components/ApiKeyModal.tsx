
import React, { useState } from 'react';

interface ApiKeyModalProps {
  onSave: (apiKey: string) => void;
  initialError?: string | null;
}

const KeyIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave, initialError }) => {
  const [localApiKey, setLocalApiKey] = useState('');
  const [error, setError] = useState<string | null>(initialError || null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localApiKey.trim()) {
      setError('Please enter a valid API key.');
      return;
    }
    setError(null);
    onSave(localApiKey);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-lg w-full transform transition-all animate-fade-in">
        <div className="flex items-center space-x-3 mb-4">
          <KeyIcon className="h-8 w-8 text-indigo-500" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Enter Your API Key</h2>
        </div>
        <p className="text-gray-600 mb-6">
          To analyze your resume, this application needs a Google Gemini API key. You can get your key from{' '}
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:underline">
            Google AI Studio
          </a>. Your key is stored securely in your browser's local storage and is not sent to any server other than Google's.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium text-gray-700">Gemini API Key</label>
            <input
              id="apiKey"
              type="password"
              value={localApiKey}
              onChange={(e) => {
                setLocalApiKey(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Enter your API key here"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              aria-describedby="api-key-error"
            />
          </div>
          
          {error && <p id="api-key-error" className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={!localApiKey.trim()}
            >
              Save and Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyModal;
