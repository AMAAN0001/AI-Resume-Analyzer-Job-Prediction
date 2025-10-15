import React, { useState, useRef } from 'react';
import Spinner from './common/Spinner';

interface FileUploadProps {
  onAnalyze: (resumeText: string, file: File | null) => void;
  isLoading: boolean;
  error: string | null;
  prefilledResume: string;
}

const UploadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
);
const FileIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
);
const XCircleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

const FileUpload: React.FC<FileUploadProps> = ({ onAnalyze, isLoading, error, prefilledResume }) => {
  const [resumeText, setResumeText] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResumeText(''); // Clear text when a file is selected
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(event.target.value);
    if (selectedFile) {
      handleClearFile();
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(resumeText, selectedFile);
  };

  const handlePrefill = () => {
    setResumeText(prefilledResume);
    if (selectedFile) {
      handleClearFile();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Get Instant Resume Feedback</h2>
        <p className="text-gray-600 mb-6">Upload your resume or paste it below to get a detailed analysis, job recommendations, and AI-powered suggestions.</p>
        
        <form onSubmit={handleSubmit}>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.docx,.txt"
            disabled={isLoading}
          />

          {!selectedFile ? (
            <button
              type="button"
              onClick={handleUploadClick}
              disabled={isLoading}
              className="w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              <UploadIcon className="h-10 w-10 text-gray-400 mb-2" />
              <span className="font-semibold text-indigo-600">Click to upload a file</span>
              <span className="text-sm text-gray-500 mt-1">PDF, DOCX, or TXT</span>
            </button>
          ) : (
            <div className="w-full flex items-center justify-between p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileIcon className="h-6 w-6 text-indigo-500" />
                <span className="font-medium text-gray-700">{selectedFile.name}</span>
              </div>
              <button
                type="button"
                onClick={handleClearFile}
                disabled={isLoading}
                className="text-gray-400 hover:text-gray-600"
                title="Remove file"
              >
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>
          )}


          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-500 font-semibold">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="relative">
            <textarea
              value={resumeText}
              onChange={handleTextChange}
              placeholder="Paste your resume text here..."
              className="w-full h-60 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-y text-sm text-gray-700 leading-6"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handlePrefill}
              className="absolute top-3 right-3 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-1 px-3 rounded-md transition-colors"
              disabled={isLoading}
            >
              Use Sample Resume
            </button>
          </div>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              disabled={isLoading || (!resumeText.trim() && !selectedFile)}
              className="flex items-center justify-center w-full sm:w-auto bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? (
                <>
                  <Spinner />
                  Analyzing...
                </>
              ) : (
                'Analyze My Resume'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;