import React, { useState } from 'react';
import { ATSScore } from '../../types';

interface ATSAnalysisPageProps {
  atsScore: ATSScore;
}

const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'critical':
      return 'bg-red-50 border-red-200';
    case 'warning':
      return 'bg-yellow-50 border-yellow-200';
    case 'info':
      return 'bg-blue-50 border-blue-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

const getSeverityIcon = (severity: string): string => {
  switch (severity) {
    case 'critical':
      return '🔴';
    case 'warning':
      return '⚠️';
    case 'info':
      return 'ℹ️';
    default:
      return '✓';
  }
};

const getTypeIcon = (type: string): string => {
  switch (type) {
    case 'formatting':
      return '🎨';
    case 'structure':
      return '📋';
    case 'keyword':
      return '🔑';
    case 'content':
      return '📝';
    default:
      return '📄';
  }
};

const ATSAnalysisPage: React.FC<ATSAnalysisPageProps> = ({ atsScore }) => {
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredIssues = selectedCategory === 'all' 
    ? atsScore.issues 
    : atsScore.issues.filter(issue => issue.type === selectedCategory);

  const issuesByType = {
    critical: atsScore.issues.filter(i => i.severity === 'critical'),
    warning: atsScore.issues.filter(i => i.severity === 'warning'),
    info: atsScore.issues.filter(i => i.severity === 'info'),
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">ATS Compatibility Analysis</h2>
        <p className="text-gray-600">
          This analysis shows how well your resume will be parsed by Applicant Tracking Systems
        </p>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm font-medium">Overall Score</p>
          <p className="text-4xl font-bold text-purple-600 mt-2">{atsScore.overallScore}</p>
          <p className="text-xs text-gray-500 mt-1">/ 100</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-medium">Formatting</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">{atsScore.formatting}</p>
          <p className="text-xs text-gray-500 mt-1">/ 100</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-cyan-500">
          <p className="text-gray-600 text-sm font-medium">Structure</p>
          <p className="text-4xl font-bold text-cyan-600 mt-2">{atsScore.structure}</p>
          <p className="text-xs text-gray-500 mt-1">/ 100</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-medium">Keywords</p>
          <p className="text-4xl font-bold text-green-600 mt-2">{atsScore.keywordMatch}</p>
          <p className="text-xs text-gray-500 mt-1">/ 100</p>
        </div>
      </div>

      {/* Recommendations */}
      {atsScore.recommendations.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">💡 Recommendations</h3>
          <ul className="space-y-3">
            {atsScore.recommendations.map((rec, idx) => (
              <li key={idx} className="flex gap-3 text-blue-800">
                <span className="text-xl">→</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Issue Categories */}
      <div>
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Issues ({atsScore.issues.length})
          </button>
          {issuesByType.critical.length > 0 && (
            <button
              onClick={() => setSelectedCategory('critical')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedCategory === 'critical'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              🔴 Critical ({issuesByType.critical.length})
            </button>
          )}
          {issuesByType.warning.length > 0 && (
            <button
              onClick={() => setSelectedCategory('warning')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedCategory === 'warning'
                  ? 'bg-yellow-600 text-white shadow-md'
                  : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              }`}
            >
              ⚠️ Warnings ({issuesByType.warning.length})
            </button>
          )}
          {issuesByType.info.length > 0 && (
            <button
              onClick={() => setSelectedCategory('info')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedCategory === 'info'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              ℹ️ Info ({issuesByType.info.length})
            </button>
          )}
        </div>

        {/* Issues List */}
        <div className="space-y-4">
          {filteredIssues.length === 0 ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <p className="text-4xl mb-3">✨</p>
              <p className="text-green-800 font-semibold">Great job! No issues in this category</p>
              <p className="text-green-700 text-sm mt-1">Your resume is well-optimized for ATS parsing</p>
            </div>
          ) : (
            filteredIssues.map((issue, idx) => (
              <div
                key={idx}
                className={`border rounded-lg p-6 transition-all cursor-pointer ${getSeverityColor(issue.severity)}`}
              >
                <button
                  onClick={() => setExpandedIssue(expandedIssue === idx ? null : idx)}
                  className="w-full text-left"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0">{getSeverityIcon(issue.severity)}</span>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg">
                            {getTypeIcon(issue.type)} {issue.title}
                          </h4>
                          <p className="text-gray-700 mt-1">{issue.description}</p>
                        </div>
                        <svg
                          className={`w-5 h-5 text-gray-600 transition-transform ${
                            expandedIssue === idx ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>

                {expandedIssue === idx && (
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <div className="bg-white bg-opacity-50 rounded p-4">
                      <p className="text-sm text-gray-800 font-medium mb-2">How to fix:</p>
                      <p className="text-sm text-gray-700">{issue.suggestion}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-8 border border-indigo-200">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4">📌 ATS Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-indigo-800 mb-2">✓ Do:</h4>
            <ul className="space-y-2 text-sm text-indigo-700">
              <li>• Use standard fonts (Arial, Calibri, Times New Roman)</li>
              <li>• Include clear section headings</li>
              <li>• Use simple formatting (bold, italic only)</li>
              <li>• Add relevant keywords for the job</li>
              <li>• Use standard dates (MM/YYYY format)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-indigo-800 mb-2">✗ Don't:</h4>
            <ul className="space-y-2 text-sm text-indigo-700">
              <li>• Avoid images, logos, or graphics</li>
              <li>• Don't use tables or columns</li>
              <li>• Avoid headers and footers</li>
              <li>• Don't use unusual fonts or symbols</li>
              <li>• Avoid PDF with embedded fonts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSAnalysisPage;
