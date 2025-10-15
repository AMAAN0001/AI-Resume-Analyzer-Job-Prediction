
import React from 'react';
import { JobMatch } from '../../types';
import Card from '../common/Card';

interface JobMatchesProps {
  matches: JobMatch[];
}

const BriefcaseIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);


const JobMatches: React.FC<JobMatchesProps> = ({ matches }) => {
  return (
    <Card title="Top Job Recommendations" icon={<BriefcaseIcon className="h-6 w-6 text-indigo-600"/>}>
      <div className="space-y-5">
        {matches.map((match, index) => (
          <div key={index} className="p-4 rounded-lg border border-gray-200 bg-gray-50/50">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-lg text-gray-800">{match.role}</h4>
                <p className="text-gray-500">{match.company}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-600">{match.similarity}%</p>
                <p className="text-sm text-gray-500">Match</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600 bg-gray-100 p-3 rounded-md">{match.explanation}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default JobMatches;
