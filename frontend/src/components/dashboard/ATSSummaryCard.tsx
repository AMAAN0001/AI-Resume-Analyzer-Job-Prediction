import React from 'react';
import { ATSScore } from '../../types';

interface ATSSummaryCardProps {
  atsScore: ATSScore;
}

const getScoreColor = (score: number): string => {
  if (score >= 85) return 'from-green-500 to-green-600';
  if (score >= 70) return 'from-blue-500 to-blue-600';
  if (score >= 50) return 'from-yellow-500 to-yellow-600';
  return 'from-red-500 to-red-600';
};

const getScoreIcon = (parseability: string): string => {
  switch (parseability) {
    case 'excellent':
      return '🟢';
    case 'good':
      return '🔵';
    case 'fair':
      return '🟡';
    case 'poor':
      return '🔴';
    default:
      return '⚪';
  }
};

const ATSSummaryCard: React.FC<ATSSummaryCardProps> = ({ atsScore }) => {
  const circleRadius = 45;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (atsScore.overallScore / 100) * circumference;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">ATS Score</h3>
          <p className="text-gray-600 text-sm mt-1">Applicant Tracking System Compatibility</p>
        </div>
        <span className="text-4xl">{getScoreIcon(atsScore.parseability)}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Circular Score */}
        <div className="flex flex-col items-center justify-center">
          <svg width="160" height="160" className="mb-4">
            <circle
              cx="80"
              cy="80"
              r={circleRadius}
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r={circleRadius}
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <text
              x="80"
              y="90"
              textAnchor="middle"
              className="text-3xl font-bold fill-gray-900"
              dominantBaseline="middle"
            >
              {atsScore.overallScore}
            </text>
          </svg>
          <p className="text-lg font-semibold text-gray-700 capitalize">
            {atsScore.parseability} Parseability
          </p>
        </div>

        {/* Score Breakdown */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Formatting</span>
              <span className="text-sm font-bold text-gray-900">{atsScore.formatting}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${atsScore.formatting}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Structure</span>
              <span className="text-sm font-bold text-gray-900">{atsScore.structure}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${atsScore.structure}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Keywords</span>
              <span className="text-sm font-bold text-gray-900">{atsScore.keywordMatch}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-2 rounded-full transition-all"
                style={{ width: `${atsScore.keywordMatch}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Top Strengths */}
      {atsScore.strengths.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-green-600 mb-3">✓ Strengths</h4>
          <ul className="space-y-2">
            {atsScore.strengths.map((strength, idx) => (
              <li key={idx} className="text-sm text-gray-700">
                • {strength}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ATSSummaryCard;
