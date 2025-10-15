
import React from 'react';
import { JobPrediction } from '../../types';
import Card from '../common/Card';

const TargetIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a3 3 0 100-6 3 3 0 000 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6" />
    </svg>
);


const ConfidenceBar: React.FC<{ score: number }> = ({ score }) => {
    const percentage = Math.round(score * 100);
    const getBarColor = () => {
        if (percentage >= 85) return 'bg-green-500';
        if (percentage >= 70) return 'bg-yellow-500';
        return 'bg-blue-500';
    };

    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Confidence</span>
                <span className="text-sm font-medium text-gray-700">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className={`${getBarColor()} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};


const JobPredictionCard: React.FC<{ prediction: JobPrediction }> = ({ prediction }) => {
  const { category, predictedRole, confidenceScore, explanation } = prediction;
  
  const categoryBgColor = category === 'Tech' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';

  return (
    <Card title="Predicted Job Role" icon={<TargetIcon className="h-6 w-6 text-indigo-600"/>}>
        <div className="space-y-4">
            <div className="text-center">
                 <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${categoryBgColor}`}>
                    {category} Profile
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">{predictedRole}</h3>
            </div>
            
            <ConfidenceBar score={confidenceScore} />

            <div>
                <p className="font-semibold text-gray-700 mb-1">Reasoning:</p>
                <p className="text-sm text-gray-600 bg-gray-100 p-3 rounded-md">{explanation}</p>
            </div>
        </div>
    </Card>
  );
};

export default JobPredictionCard;