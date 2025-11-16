
import React, { useState, useEffect } from 'react';
import { AnalysisResult } from './types';
import { analyzeResume } from './services/geminiService';
import { extractTextFromFile } from './utils/fileProcessor';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import { PREFILLED_RESUME } from './constants';
import ApiKeyModal from './components/ApiKeyModal';

const API_KEY_STORAGE_KEY = 'gemini-api-key';

// Header component defined outside the main component
const Header: React.FC = () => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-3">
          <svg className="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800">AI Resume Analyzer</h1>
        </div>
      </div>
    </div>
  </header>
);

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);

  // Check for API key on initial load
  useEffect(() => {
    const storedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
    setApiKey(key);
    setApiKeyError(null); // Clear any previous key errors
  };

  const handleAnalyze = async (resumeText: string, file: File | null) => {
    if (!apiKey) {
      setError("API Key not found. Please set your API key.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      let textToAnalyze = resumeText;
      
      if (file) {
        textToAnalyze = await extractTextFromFile(file);
      }
      
      if (!textToAnalyze.trim()) {
        setError("Resume is empty. Please upload a file or paste text to analyze.");
        setIsLoading(false);
        return;
      }

      // Pass API key to the service
      const result = await analyzeResume(textToAnalyze, apiKey);
      setAnalysisResult(result);
    } catch (e: any) {
      console.error(e);
      const errorMessage = e.message || "Failed to analyze resume. The AI model might be busy or the file could not be read. Please try again in a moment.";
      
      // If the error is about the API key, invalidate it and show the modal again
      if (errorMessage.toLowerCase().includes('api key') || errorMessage.toLowerCase().includes('not valid')) {
          localStorage.removeItem(API_KEY_STORAGE_KEY);
          setApiKey(null);
          setApiKeyError(errorMessage);
      } else {
          setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
  };

  const handleClearApiKey = () => {
      localStorage.removeItem(API_KEY_STORAGE_KEY);
      setApiKey(null);
      setAnalysisResult(null); // Also clear results
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {!apiKey && <ApiKeyModal onSave={handleSaveApiKey} initialError={apiKeyError} />}
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {!analysisResult ? (
          <FileUpload onAnalyze={handleAnalyze} isLoading={isLoading} error={error} prefilledResume={PREFILLED_RESUME} />
        ) : (
          <Dashboard result={analysisResult} onReset={handleReset} />
        )}
      </main>
      <footer className="bg-white mt-auto">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
            {apiKey && (
                <button onClick={handleClearApiKey} className="text-xs text-gray-400 hover:text-gray-600 hover:underline mb-2">
                    Clear API Key
                </button>
            )}
            <p>&copy; {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
