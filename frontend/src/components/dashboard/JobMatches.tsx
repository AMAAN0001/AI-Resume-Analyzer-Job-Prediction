
import React, { useState } from 'react';
import { JobMatch } from '../../types';
import Card from '../common/Card';

interface JobMatchesProps {
  matches: JobMatch[];
}

const BriefcaseIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);

const ChevronRightIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);

// Helper function to determine color based on match percentage
const getMatchColor = (similarity: number): { bg: string; text: string; bar: string } => {
  if (similarity >= 80) {
    return { bg: 'bg-green-50', text: 'text-green-700', bar: 'bg-green-500' };
  } else if (similarity >= 60) {
    return { bg: 'bg-amber-50', text: 'text-amber-700', bar: 'bg-amber-500' };
  } else {
    return { bg: 'bg-red-50', text: 'text-red-700', bar: 'bg-red-500' };
  }
};

const JobMatches: React.FC<JobMatchesProps> = ({ matches }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <Card title="Top Job Recommendations" icon={<BriefcaseIcon className="h-6 w-6 text-indigo-600"/>}>
      <div className="space-y-4">
        {matches.map((match, index) => {
          const { bg, text, bar } = getMatchColor(match.similarity);
          const isExpanded = expandedIndex === index;

          return (
            <div key={index} className={`p-5 rounded-lg border border-gray-200 transition-all ${bg} hover:shadow-md`}>
              {/* Header with Job Info */}
              <div className="flex justify-between items-start gap-4 mb-4">
                <div className="flex-grow">
                  <h4 className="font-bold text-lg text-gray-900">{match.role}</h4>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-gray-600 font-medium">{match.company}</p>
                    {match.industry && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">{match.industry}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-3xl font-bold ${text}`}>{match.similarity}%</p>
                  <p className="text-xs text-gray-500 mt-1">Match Score</p>
                </div>
              </div>

              {/* Color-coded Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${bar}`}
                    style={{ width: `${match.similarity}%` }}
                  ></div>
                </div>
              </div>

              {/* Explanation and View Details */}
              <div>
                <p className="text-sm text-gray-700 mb-3">{match.explanation}</p>
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className={`flex items-center gap-2 font-semibold transition-colors ${text} hover:opacity-80`}
                >
                  <span>{isExpanded ? 'Hide' : 'View'} Details</span>
                  <ChevronRightIcon className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-300 space-y-3">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Why This Match?</h5>
                    <p className="text-sm text-gray-700">{match.explanation}</p>
                  </div>
                  <div className="flex gap-4">
                    <button className="flex-1 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                      Apply Now
                    </button>
                    <button className="flex-1 bg-gray-200 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                      Save Job
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default JobMatches;
