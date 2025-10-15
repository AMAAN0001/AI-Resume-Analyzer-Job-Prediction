import React from 'react';
import { AnalysisResult } from '../../types';

interface ReportTemplateProps {
  result: AnalysisResult;
}

const ReportTemplate = React.forwardRef<HTMLDivElement, ReportTemplateProps>(({ result }, ref) => {
  
  const fitScore = Math.round(result.jobPrediction.confidenceScore * 100);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 85) return "Excellent Match";
    if (score >= 70) return "Strong Candidate";
    if (score >= 50) return "Good Potential";
    return "Needs Development";
  };
  
  return (
    <div ref={ref} className="bg-white p-10 text-gray-800" style={{ width: '8.5in' }}>
        {/* Report Header */}
        <div className="text-center border-b-2 border-gray-200 pb-4 mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Resume Analysis Report</h1>
            <p className="text-lg text-gray-600 mt-2">Prepared for: {result.summaryCard.name}</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-3 gap-8 mb-8">
            {/* Left Column */}
            <div className="col-span-1 space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                    <h2 className="text-xl font-bold mb-2 text-indigo-700">Candidate Profile</h2>
                    <p><strong className="font-semibold">Level:</strong> {result.summaryCard.predictedLevel}</p>
                    <p><strong className="font-semibold">Experience:</strong> {result.summaryCard.totalExperience}</p>
                    <p><strong className="font-semibold">Email:</strong> {result.summaryCard.email}</p>
                    <p><strong className="font-semibold">Phone:</strong> {result.summaryCard.phone}</p>
                    <h3 className="font-semibold mt-3">Top Skills:</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {result.summaryCard.topSkills.map(s => <span key={s} className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full">{s}</span>)}
                    </div>
                </div>
                 <div className="border border-gray-200 rounded-lg p-4 text-center">
                    <h2 className="text-xl font-bold mb-2 text-indigo-700">Job Fit Score</h2>
                    <p className={`text-6xl font-bold ${getScoreColor(fitScore)}`}>{fitScore}%</p>
                    <p className={`text-lg font-semibold ${getScoreColor(fitScore)}`}>{getScoreDescription(fitScore)}</p>
                </div>
            </div>
             {/* Right Column */}
            <div className="col-span-2 space-y-6">
                 <div className="border border-gray-200 rounded-lg p-4">
                    <h2 className="text-xl font-bold mb-3 text-indigo-700">Top Job Recommendations</h2>
                    <div className="space-y-4">
                        {result.jobMatches.map((match, i) => (
                            <div key={i} className="border-t border-gray-100 pt-3 first:pt-0 first:border-t-0">
                                <h3 className="font-bold text-lg">{match.role} at {match.company}</h3>
                                <p className="text-sm text-gray-500">Match Score: {match.similarity}%</p>
                                <p className="mt-1 text-sm">{match.explanation}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                    <h2 className="text-xl font-bold mb-3 text-indigo-700">Predicted Job Role</h2>
                    <div className="space-y-2">
                        <p><strong className="font-semibold">Category:</strong> <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">{result.jobPrediction.category}</span></p>
                        <p><strong className="font-semibold">Predicted Role:</strong> <span className="text-lg font-bold">{result.jobPrediction.predictedRole}</span></p>
                        <p><strong className="font-semibold">Confidence:</strong> {Math.round(result.jobPrediction.confidenceScore * 100)}%</p>
                        <p className="mt-1"><strong className="font-semibold">Reasoning:</strong> {result.jobPrediction.explanation}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Full-width sections */}
        <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-4">
                <h2 className="text-xl font-bold mb-3 text-indigo-700">Analytics & Insights</h2>
                <p className="text-sm text-gray-600">
                    The interactive dashboard provides visualizations of this data, including a Profile Category Split pie chart,
                    an Average Fit Score by Role bar chart, and a detailed Candidate Role Predictions table. Please refer to the
                    web application for the interactive charts.
                </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
                <h2 className="text-xl font-bold mb-3 text-indigo-700">Strengths & Weaknesses</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-green-700">Strengths</h3>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                            {result.gapAnalysis.strengths.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-red-700">Areas for Improvement</h3>
                         <ul className="space-y-3 mt-2 text-sm">
                            {result.gapAnalysis.gaps.map((g, i) => (
                                <li key={i}>
                                    <p className="font-semibold">{g.gap}</p>
                                    <p className="pl-2 italic text-gray-600">Suggestion: {g.suggestion}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
                <h2 className="text-xl font-bold mb-3 text-indigo-700">Resume Bullet Point Suggestions</h2>
                <div className="space-y-4 text-sm">
                     {result.bulletRewrites.map((b, i) => (
                         <div key={i}>
                            <p className="italic text-gray-500">Original: "{b.original}"</p>
                            <ul className="list-disc list-inside ml-4 mt-1">
                                {b.rewritten.map((r, j) => <li key={j} className="text-green-800 font-medium">{r}</li>)}
                            </ul>
                         </div>
                     ))}
                </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
                <h2 className="text-xl font-bold mb-3 text-indigo-700">Interview Preparation</h2>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                    {result.interviewQuestions.map((q, i) => <li key={i}>{q}</li>)}
                </ol>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
                <h2 className="text-xl font-bold mb-3 text-indigo-700">Personalized Career Roadmap</h2>
                <div className="space-y-3 text-sm">
                    {result.careerRoadmap.map((r, i) => (
                        <div key={i}>
                            <h4 className="font-semibold">{r.skill}</h4>
                            <p className="pl-2">{r.reason}</p>
                            <p className="pl-2 text-gray-600"><strong>Resource:</strong> {r.resource}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
});

export default ReportTemplate;