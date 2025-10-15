
import React from 'react';
import Card from '../common/Card';
import { AnalysisResult } from '../../types';

interface SummaryCardProps {
  summary: AnalysisResult['summaryCard'];
  salary: AnalysisResult['salaryExpectation'];
}

const UserIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
const MailIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const PhoneIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
);

const SummaryCard: React.FC<SummaryCardProps> = ({ summary, salary }) => {
  return (
    <Card title="Candidate Profile" icon={<UserIcon className="h-6 w-6 text-indigo-600"/>}>
      <div className="space-y-4">
        <div>
          <h4 className="text-2xl font-bold text-gray-900">{summary.name}</h4>
          <p className="text-indigo-600 font-semibold">{summary.predictedLevel}</p>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <MailIcon className="h-4 w-4 mr-2 text-gray-400" />
            <span>{summary.email}</span>
          </div>
          <div className="flex items-center">
            <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
            <span>{summary.phone}</span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <h5 className="font-semibold text-gray-700 mb-2">Total Experience</h5>
          <p className="text-gray-800">{summary.totalExperience}</p>
        </div>
        <div className="border-t border-gray-200 pt-4">
            <h5 className="font-semibold text-gray-700 mb-2">Salary Estimate</h5>
            <p className="text-lg font-bold text-green-600">{salary.range}</p>
            <p className="text-sm text-gray-500">{salary.level}</p>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <h5 className="font-semibold text-gray-700 mb-3">Top Skills</h5>
          <div className="flex flex-wrap gap-2">
            {summary.topSkills.map((skill, index) => (
              <span key={index} className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SummaryCard;
