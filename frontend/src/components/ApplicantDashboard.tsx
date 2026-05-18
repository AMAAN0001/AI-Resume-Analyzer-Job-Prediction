import React from 'react';
import { User } from '../services/authService';

interface ApplicantDashboardProps {
  user: User | null;
  onUploadResume: () => void;
  onViewRecommendations: () => void;
  onViewSkillGaps: () => void;
}

const UploadIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
);

const ChartIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
);

const TrendingIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
);

const ApplicantDashboard: React.FC<ApplicantDashboardProps> = ({ 
  user, 
  onUploadResume, 
  onViewRecommendations,
  onViewSkillGaps 
}) => {
  return (
    <div className="animate-fade-in">
      {/* Welcome Section */}
      <div className="mb-12">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'Candidate'}! 👋
          </h2>
          <p className="text-gray-600 text-lg">
            Continue your journey to better career insights with AI-powered analysis
          </p>
        </div>
      </div>

      {/* Primary Action - Upload Resume */}
      <div className="mb-12">
        <button
          onClick={onUploadResume}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 text-lg"
        >
          <UploadIcon className="h-6 w-6" />
          Upload & Analyze Resume
        </button>
      </div>

      {/* Recent Analyses Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Analyses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder cards for recent analyses */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-bold text-gray-900">Your First Analysis</h4>
                <p className="text-sm text-gray-500">No analyses yet</p>
              </div>
              <div className="bg-indigo-100 p-2 rounded-lg">
                <ChartIcon className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Upload your resume to start receiving AI-powered career insights
            </p>
            <button
              onClick={onUploadResume}
              className="text-indigo-600 font-semibold hover:text-indigo-700 text-sm"
            >
              Get Started →
            </button>
          </div>

          {/* Job Recommendations Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-bold text-gray-900">Job Recommendations</h4>
                <p className="text-sm text-gray-500">Personalized for you</p>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingIcon className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Discover job opportunities that match your skills and experience
            </p>
            <button
              onClick={onViewRecommendations}
              className="text-green-600 font-semibold hover:text-green-700 text-sm"
            >
              View Recommendations →
            </button>
          </div>

          {/* Skill Gap Analysis Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-bold text-gray-900">Skill Gap Analysis</h4>
                <p className="text-sm text-gray-500">Career development path</p>
              </div>
              <div className="bg-orange-100 p-2 rounded-lg">
                <ChartIcon className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Identify skills to learn and accelerate your career growth
            </p>
            <button
              onClick={onViewSkillGaps}
              className="text-orange-600 font-semibold hover:text-orange-700 text-sm"
            >
              View Analysis →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">How to Get Started</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-indigo-100">
                <span className="text-indigo-600 font-bold">1</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Upload Resume</h4>
              <p className="text-gray-600 text-sm">Upload a PDF or paste your resume text</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-indigo-100">
                <span className="text-indigo-600 font-bold">2</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">AI Analysis</h4>
              <p className="text-gray-600 text-sm">Get comprehensive career insights in seconds</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-indigo-100">
                <span className="text-indigo-600 font-bold">3</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Download Report</h4>
              <p className="text-gray-600 text-sm">Save your analysis as a PDF report</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboard;
