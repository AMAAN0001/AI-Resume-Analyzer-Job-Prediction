
import React from 'react';
import Card from '../common/Card';
import { AnalysisResult } from '../../types';

interface GapAnalysisProps {
  analysis: AnalysisResult['gapAnalysis'];
}

const CheckCircleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const ExclamationCircleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const SearchCircleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

const GapAnalysis: React.FC<GapAnalysisProps> = ({ analysis }) => {
  return (
    <Card title="Strengths & Weaknesses" icon={<SearchCircleIcon className="h-6 w-6 text-indigo-600"/>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-lg text-green-700 mb-3 flex items-center">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            Your Strengths
          </h4>
          <ul className="space-y-2">
            {analysis.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">&#10003;</span>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg text-red-700 mb-3 flex items-center">
            <ExclamationCircleIcon className="h-5 w-5 mr-2" />
            Areas for Improvement
          </h4>
          <ul className="space-y-4">
            {analysis.gaps.map((item, index) => (
              <li key={index}>
                <p className="font-semibold text-gray-800">{item.gap}</p>
                <p className="text-sm text-gray-600 pl-4 border-l-2 border-indigo-200 ml-2 mt-1 italic">
                  <strong>Suggestion:</strong> {item.suggestion}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default GapAnalysis;
