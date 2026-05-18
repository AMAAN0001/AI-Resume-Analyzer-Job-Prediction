import React, { useState, useEffect } from 'react';
import { AnalysisResult, CandidateSubmission } from './types';
import { analyzeResume } from './services/geminiService';
import { extractTextFromFile } from './utils/fileProcessor';
import { resumeAPI } from './services/apiClient';
import { resumeStorageService } from './services/resumeStorageService';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import ATSAnalysisPage from './components/dashboard/ATSAnalysisPage';
import ApplicantDashboard from './components/ApplicantDashboard';
import EnhancedRecruiterDashboard from './components/EnhancedRecruiterDashboard';
import LandingPage from './components/LandingPage';
import { PREFILLED_RESUME } from './constants';

import AuthModal from './components/AuthModal';
import { authService, User } from './services/authService';

// Header component defined outside the main component
interface HeaderProps {
  user: User | null;
  isGuest?: boolean;
  currentPage?: string;
  onLoginClick: () => void;
  onLogout: () => void;
  onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user, isGuest = false, currentPage, onLoginClick, onLogout, onNavigate }) => (
  <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-md text-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-lg" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
            <svg className="h-7 w-7 text-white" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none">
              {/* Brain outline */}
              <path d="M50 15 Q60 20 65 35 Q70 50 65 65 Q60 75 50 80 Q40 75 35 65 Q30 50 35 35 Q40 20 50 15" stroke="currentColor" strokeWidth="2" fill="none"/>
              {/* Neural connections */}
              <circle cx="50" cy="40" r="4" fill="currentColor"/>
              <circle cx="42" cy="50" r="3" fill="currentColor"/>
              <circle cx="58" cy="50" r="3" fill="currentColor"/>
              <circle cx="50" cy="60" r="4" fill="currentColor"/>
              {/* Connection lines */}
              <line x1="50" y1="40" x2="42" y2="50" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
              <line x1="50" y1="40" x2="58" y2="50" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
              <line x1="42" y1="50" x2="50" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
              <line x1="58" y1="50" x2="50" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
              {/* Resume lines */}
              <line x1="32" y1="75" x2="68" y2="75" stroke="currentColor" strokeWidth="1.5" opacity="0.8"/>
              <line x1="32" y1="82" x2="68" y2="82" stroke="currentColor" strokeWidth="1.5" opacity="0.8"/>
              <line x1="32" y1="89" x2="55" y2="89" stroke="currentColor" strokeWidth="1.5" opacity="0.8"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">ResAI</h1>
            <p className="text-xs text-white/90 mt-0.5">AI-powered resume insights & job-fit predictions</p>
          </div>
        </div>
        <nav className="flex items-center space-x-4">
          {user || isGuest ? (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onNavigate?.('recruiter')}
                className={`font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm ${
                  currentPage === 'recruiter'
                    ? 'bg-white/30 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                👔 Recruiter Mode
              </button>
              <button
                onClick={() => onNavigate?.('upload')}
                className={`font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm ${
                  currentPage === 'upload'
                    ? 'bg-white/30 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Home
              </button>
              <div className="hidden md:flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-lg">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm font-medium">{isGuest ? 'Guest' : user?.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-white text-indigo-600 hover:bg-white/90 font-bold py-2 px-6 rounded-lg transition-colors duration-200 text-sm"
            >
              Login / Sign Up
            </button>
          )}
        </nav>
      </div>
    </div>
  </header>
);

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'upload' | 'analysis' | 'recruiter' | 'ats-analysis'>('upload');
  const [isGuest, setIsGuest] = useState(false);

  // Check for user on initial load
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setCurrentPage('dashboard');
    }
  }, []);



  const handleAnalyze = async (resumeText: string, file: File | null) => {

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

      // Pass resume text to the service (API key is loaded from config)
      const result = await analyzeResume(textToAnalyze);
      setAnalysisResult(result);

      // Save resume with analysis to backend and localStorage for recruiter dashboard
      try {
        const currentUser = authService.getCurrentUser();
        const fileName = file?.name || 'resume.txt';
        const userId = currentUser?.id || 'guest-' + Date.now();
        const userName = currentUser?.name || 'Guest User';
        const userEmail = currentUser?.email || 'guest@example.com';

        // Prepare candidate submission
        const candidateSubmission: CandidateSubmission = {
          userId,
          userName,
          userEmail,
          fileName,
          fileContent: textToAnalyze,
          parsedData: result.summaryCard,
          analysisResult: result,
          jobPrediction: result.jobPrediction,
          atsScore: result.atsScore?.overallScore || 0,
          createdAt: new Date().toISOString(),
        };

        // Try to save to backend first
        try {
          await resumeAPI.uploadResume(
            userId,
            userName,
            userEmail,
            fileName,
            textToAnalyze,
            result.summaryCard as any,
            result as any,
            result.jobPrediction as any,
            result.atsScore?.overallScore || 0
          );
          console.log('Resume saved to backend');
        } catch (apiError) {
          console.warn('Backend save failed, using localStorage:', apiError);
        }

        // Always save to localStorage as fallback
        resumeStorageService.saveResume(candidateSubmission);
        console.log('Resume saved to localStorage');
      } catch (saveError) {
        console.warn('Failed to save resume:', saveError);
        // Don't fail the analysis if saving fails, just warn
      }
    } catch (e: any) {
      console.error(e);
      const errorMessage = e.message || "Failed to analyze resume. The AI model might be busy or the file could not be read. Please try again in a moment.";
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
    setCurrentPage('dashboard');
  };



  const handleLogin = async (email: string, password: string) => {
    const loggedInUser = await authService.login(email, password);
    setUser(loggedInUser);
    setCurrentPage('dashboard');
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    const newUser = await authService.signup(email, password, name);
    setUser(newUser);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIsGuest(false);
    setAnalysisResult(null);
    setCurrentPage('upload');
  };

  const handleGuestContinue = () => {
    setIsGuest(true);
    setCurrentPage('dashboard');
  };

  const handleGoogleLoginSuccess = (googleUser: any) => {
    setUser(googleUser);
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <AuthModal 
        isOpen={isAuthModalOpen && !user && !isGuest}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
        onGuestContinue={handleGuestContinue}
        onGoogleLoginSuccess={handleGoogleLoginSuccess}
      />
      
      {/* Landing Page - Full Screen */}
      {!user && !isGuest && !analysisResult ? (
        <LandingPage onGetStarted={() => setIsAuthModalOpen(true)} />
      ) : (
        <>
          {/* Header - Show for all other pages */}
          <Header 
            user={user}
            isGuest={isGuest}
            currentPage={currentPage}
            onLoginClick={() => setIsAuthModalOpen(true)}
            onLogout={handleLogout}
            onNavigate={(page) => setCurrentPage(page as 'dashboard' | 'upload' | 'analysis' | 'recruiter' | 'ats-analysis')}
          />
          
          {/* Main Content */}
          <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
            {analysisResult && currentPage === 'ats-analysis' ? (
              <>
                <button
                  onClick={() => setCurrentPage('analysis')}
                  className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Analysis
                </button>
                <ATSAnalysisPage atsScore={analysisResult.atsScore!} />
              </>
            ) : analysisResult && currentPage !== 'recruiter' ? (
              <Dashboard 
                result={analysisResult} 
                onReset={handleReset}
                onViewATS={() => setCurrentPage('ats-analysis')}
              />
            ) : currentPage === 'recruiter' ? (
              <EnhancedRecruiterDashboard />
            ) : (user || isGuest) && currentPage === 'dashboard' ? (
              <ApplicantDashboard 
                user={user}
                onUploadResume={() => setCurrentPage('upload')}
                onViewRecommendations={() => setCurrentPage('upload')}
                onViewSkillGaps={() => setCurrentPage('upload')}
              />
            ) : (
              <FileUpload onAnalyze={handleAnalyze} isLoading={isLoading} error={error} prefilledResume={PREFILLED_RESUME} />
            )}
          </main>
          
          {/* Footer */}
          <footer className="bg-white mt-auto">
            <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
              <p>&copy; {new Date().getFullYear()} ResAI. All rights reserved.</p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
