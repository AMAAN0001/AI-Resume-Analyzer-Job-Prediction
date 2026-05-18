import React, { useState } from 'react';
import { ATSScore } from '../../types';

interface ATSImprovementGuideProps {
  atsScore: ATSScore;
}

const ATSImprovementGuide: React.FC<ATSImprovementGuideProps> = ({ atsScore }) => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    issues: true,
    recommendations: true,
    breakdown: true,
    strengths: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '🔴';
      case 'warning':
        return '🟠';
      case 'info':
        return '🔵';
      default:
        return '⚪';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'formatting':
        return '🎨';
      case 'keyword':
        return '🔑';
      case 'structure':
        return '📋';
      case 'content':
        return '📝';
      default:
        return '⚙️';
    }
  };

  const criticalIssues = atsScore.issues.filter((i) => i.severity === 'critical');
  const warningIssues = atsScore.issues.filter((i) => i.severity === 'warning');
  const infoIssues = atsScore.issues.filter((i) => i.severity === 'info');

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-lg border-2 border-orange-200 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            📈 How to Improve Your ATS Score
          </h3>
          <p className="text-gray-700 text-sm mt-1">
            Current Score: <span className="font-bold">{atsScore.overallScore}%</span> - Follow these recommendations to boost your compatibility
          </p>
        </div>
      </div>

      {/* Score Breakdown Section */}
      <div className="bg-white rounded-lg border border-orange-200">
        <button
          onClick={() => toggleSection('breakdown')}
          className="w-full flex items-center justify-between p-4 hover:bg-orange-50 transition"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">📊</span>
            <h4 className="font-bold text-gray-900">Score Breakdown</h4>
          </div>
          <span className={`transform transition ${expandedSections.breakdown ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.breakdown && (
          <div className="px-4 pb-4 space-y-3 border-t border-gray-200">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">🔑 Keyword Match</span>
                <span className={`font-bold text-lg ${atsScore.keywordMatch >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                  {atsScore.keywordMatch}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    atsScore.keywordMatch >= 70
                      ? 'bg-gradient-to-r from-green-400 to-green-600'
                      : 'bg-gradient-to-r from-red-400 to-red-600'
                  }`}
                  style={{ width: `${atsScore.keywordMatch}%` }}
                />
              </div>
              {atsScore.keywordMatch < 70 && (
                <p className="text-xs text-red-700 mt-1">
                  💡 <strong>Tip:</strong> Add relevant industry keywords, skills, and technical terms that match the job description
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">🎨 Formatting</span>
                <span className={`font-bold text-lg ${atsScore.formatting >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                  {atsScore.formatting}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    atsScore.formatting >= 70
                      ? 'bg-gradient-to-r from-green-400 to-green-600'
                      : 'bg-gradient-to-r from-red-400 to-red-600'
                  }`}
                  style={{ width: `${atsScore.formatting}%` }}
                />
              </div>
              {atsScore.formatting < 70 && (
                <p className="text-xs text-red-700 mt-1">
                  💡 <strong>Tip:</strong> Use simple, clean formatting. Avoid graphics, tables, headers, and footers that ATS systems can't read
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">📋 Structure</span>
                <span className={`font-bold text-lg ${atsScore.structure >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                  {atsScore.structure}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    atsScore.structure >= 70
                      ? 'bg-gradient-to-r from-green-400 to-green-600'
                      : 'bg-gradient-to-r from-red-400 to-red-600'
                  }`}
                  style={{ width: `${atsScore.structure}%` }}
                />
              </div>
              {atsScore.structure < 70 && (
                <p className="text-xs text-red-700 mt-1">
                  💡 <strong>Tip:</strong> Organize your resume with clear sections (Objective, Experience, Skills, Education) in a logical order
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Critical Issues */}
      {criticalIssues.length > 0 && (
        <div className="bg-white rounded-lg border-2 border-red-300">
          <button
            onClick={() => toggleSection('issues')}
            className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🔴</span>
              <h4 className="font-bold text-red-700">Critical Issues ({criticalIssues.length})</h4>
            </div>
            <span className={`transform transition ${expandedSections.issues ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.issues && (
            <div className="px-4 pb-4 space-y-3 border-t border-red-300">
              {criticalIssues.map((issue, idx) => (
                <div key={idx} className={`rounded-lg p-4 border-2 ${getSeverityColor(issue.severity)}`}>
                  <div className="flex items-start gap-2">
                    <span className="text-lg mt-1">{getTypeIcon(issue.type)}</span>
                    <div className="flex-1">
                      <h5 className="font-bold text-base">{issue.title}</h5>
                      <p className="text-sm mt-1 opacity-90">{issue.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Warning Issues */}
      {warningIssues.length > 0 && (
        <div className="bg-white rounded-lg border-2 border-yellow-300">
          <button
            onClick={() => toggleSection('warnings')}
            className="w-full flex items-center justify-between p-4 hover:bg-yellow-50 transition"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🟠</span>
              <h4 className="font-bold text-yellow-700">Warnings ({warningIssues.length})</h4>
            </div>
            <span
              className={`transform transition ${expandedSections.warnings ? 'rotate-180' : ''}`}
            >
              ▼
            </span>
          </button>
          {expandedSections.warnings && (
            <div className="px-4 pb-4 space-y-3 border-t border-yellow-300">
              {warningIssues.map((issue, idx) => (
                <div key={idx} className={`rounded-lg p-4 border-2 ${getSeverityColor(issue.severity)}`}>
                  <div className="flex items-start gap-2">
                    <span className="text-lg mt-1">{getTypeIcon(issue.type)}</span>
                    <div className="flex-1">
                      <h5 className="font-bold text-base">{issue.title}</h5>
                      <p className="text-sm mt-1 opacity-90">{issue.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Info Issues */}
      {infoIssues.length > 0 && (
        <div className="bg-white rounded-lg border-2 border-blue-300">
          <button
            onClick={() => toggleSection('info')}
            className="w-full flex items-center justify-between p-4 hover:bg-blue-50 transition"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🔵</span>
              <h4 className="font-bold text-blue-700">Suggestions ({infoIssues.length})</h4>
            </div>
            <span className={`transform transition ${expandedSections.info ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.info && (
            <div className="px-4 pb-4 space-y-3 border-t border-blue-300">
              {infoIssues.map((issue, idx) => (
                <div key={idx} className={`rounded-lg p-4 border-2 ${getSeverityColor(issue.severity)}`}>
                  <div className="flex items-start gap-2">
                    <span className="text-lg mt-1">{getTypeIcon(issue.type)}</span>
                    <div className="flex-1">
                      <h5 className="font-bold text-base">{issue.title}</h5>
                      <p className="text-sm mt-1 opacity-90">{issue.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Recommendations */}
      {atsScore.recommendations.length > 0 && (
        <div className="bg-white rounded-lg border border-green-300">
          <button
            onClick={() => toggleSection('recommendations')}
            className="w-full flex items-center justify-between p-4 hover:bg-green-50 transition"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">✅</span>
              <h4 className="font-bold text-green-700">Recommended Actions</h4>
            </div>
            <span className={`transform transition ${expandedSections.recommendations ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.recommendations && (
            <div className="px-4 pb-4 space-y-2 border-t border-green-300">
              {atsScore.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                  <span className="text-green-600 font-bold text-lg flex-shrink-0">{idx + 1}</span>
                  <p className="text-gray-800 text-sm">{rec}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Strengths */}
      {atsScore.strengths.length > 0 && (
        <div className="bg-white rounded-lg border border-emerald-300">
          <button
            onClick={() => toggleSection('strengths')}
            className="w-full flex items-center justify-between p-4 hover:bg-emerald-50 transition"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">⭐</span>
              <h4 className="font-bold text-emerald-700">Your Strengths</h4>
            </div>
            <span className={`transform transition ${expandedSections.strengths ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.strengths && (
            <div className="px-4 pb-4 space-y-2 border-t border-emerald-300">
              {atsScore.strengths.map((strength, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-emerald-50 p-3 rounded-lg">
                  <span className="text-emerald-600 text-lg flex-shrink-0">✓</span>
                  <p className="text-gray-800 text-sm">{strength}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action Plan */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-300 p-4">
        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          🎯 Quick Action Plan
        </h4>
        <ol className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="font-bold text-indigo-600">1.</span>
            <span>Address all <strong>critical issues</strong> first - they have the biggest impact on your ATS score</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-indigo-600">2.</span>
            <span>Focus on the <strong>lowest scoring category</strong> (Keyword Match, Formatting, or Structure)</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-indigo-600">3.</span>
            <span>Follow the <strong>recommended actions</strong> step by step</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-indigo-600">4.</span>
            <span>Keep your <strong>strengths</strong> intact while making improvements</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-indigo-600">5.</span>
            <span>Re-upload your updated resume to check the new ATS score</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default ATSImprovementGuide;
