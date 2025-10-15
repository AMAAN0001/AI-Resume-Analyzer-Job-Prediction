import React, { useRef } from 'react';
import { AnalysisResult } from '../types';
import SummaryCard from './dashboard/SummaryCard';
import FitScore from './dashboard/FitScore';
import JobMatches from './dashboard/JobMatches';
import GapAnalysis from './dashboard/GapAnalysis';
import BulletRewrites from './dashboard/BulletRewrites';
import InterviewPrep from './dashboard/InterviewPrep';
import CareerRoadmap from './dashboard/CareerRoadmap';
import ReportGenerator, { ReportGeneratorHandles } from './dashboard/ReportGenerator';
import JobPredictionCard from './dashboard/JobPredictionCard';
import AnalyticsDashboard from './analytics/AnalyticsDashboard';

interface DashboardProps {
  result: AnalysisResult;
  onReset: () => void;
}

const DownloadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const Dashboard: React.FC<DashboardProps> = ({ result, onReset }) => {
  const reportGeneratorRef = useRef<ReportGeneratorHandles>(null);

  const handleDownload = () => {
    reportGeneratorRef.current?.handleGeneratePdf();
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h2 className="text-3xl font-bold text-gray-900">Your Resume Analysis</h2>
            <p className="text-gray-600 mt-1">Here's your AI-powered feedback and career guidance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            <DownloadIcon className="h-5 w-5" />
            Download Report
          </button>
          <button
            onClick={onReset}
            className="bg-indigo-100 text-indigo-700 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-200 transition-colors"
          >
            Analyze Another Resume
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <SummaryCard summary={result.summaryCard} salary={result.salaryExpectation} />
          <FitScore 
            score={Math.round(result.jobPrediction.confidenceScore * 100)} 
            predictedRole={result.jobPrediction.predictedRole} 
          />
        </div>
        <div className="lg:col-span-2 space-y-8">
          <JobMatches matches={result.jobMatches} />
          <JobPredictionCard prediction={result.jobPrediction} />
          <GapAnalysis analysis={result.gapAnalysis} />
        </div>
      </div>
      
      {/* Analytics Section */}
      <AnalyticsDashboard result={result} />

      <div className="grid grid-cols-1 gap-8">
        <BulletRewrites rewrites={result.bulletRewrites} />
        <InterviewPrep questions={result.interviewQuestions} />
        <CareerRoadmap roadmap={result.careerRoadmap} />
      </div>

      <ReportGenerator ref={reportGeneratorRef} result={result} />
    </div>
  );
};

export default Dashboard;