import React from 'react';
import Card from '../common/Card';

interface FitScoreProps {
  score: number;
  predictedRole: string;
}

const ChartBarIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
);


const FitScore: React.FC<FitScoreProps> = ({ score, predictedRole }) => {
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreDescription = () => {
    if (score >= 85) return "Excellent Match";
    if (score >= 70) return "Strong Candidate";
    if (score >= 50) return "Good Potential";
    return "Needs Development";
  };

  return (
    <Card title="Job Fit Score" icon={<ChartBarIcon className="h-6 w-6 text-indigo-600"/>}>
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <circle
              className="text-gray-200"
              strokeWidth="15"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="100"
              cy="100"
            />
            <circle
              className={`${getScoreColor()} transition-all duration-1000 ease-out`}
              strokeWidth="15"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="100"
              cy="100"
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-5xl font-bold ${getScoreColor()}`}>{score}</span>
            <span className={`text-2xl font-bold ${getScoreColor()}`}>%</span>
          </div>
        </div>
        <p className={`mt-4 text-xl font-semibold ${getScoreColor()}`}>
          {getScoreDescription()}
        </p>
        <p className="text-gray-600 text-center mt-2 px-4">
            This score reflects how well your profile aligns with the predicted role of a <strong>{predictedRole}</strong>.
        </p>
      </div>
    </Card>
  );
};

export default FitScore;