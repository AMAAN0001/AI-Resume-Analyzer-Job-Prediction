import React from 'react';
import { JobMatch, JobPrediction } from '../../types';

interface PredictionsTableProps {
  name: string;
  matches: JobMatch[];
  prediction: JobPrediction;
}

const PredictionsTable: React.FC<PredictionsTableProps> = ({ name, matches, prediction }) => {
  // Combine the main prediction with other matches for a comprehensive list
  const allPredictions = [
    {
      role: prediction.predictedRole,
      category: prediction.category,
      score: Math.round(prediction.confidenceScore * 100),
      reason: prediction.explanation,
      isPrimary: true
    },
    ...matches.map(match => ({
      role: match.role,
      category: prediction.category, // Assuming category is the same for all matches
      score: match.similarity,
      reason: match.explanation,
      isPrimary: false
    }))
  ].sort((a, b) => b.score - a.score);


  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Predicted Role
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fit Score
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reason
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {allPredictions.map((item, index) => (
            <tr key={index} className={item.isPrimary ? "bg-indigo-50" : ""}>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-gray-900">{item.role}</div>
                <div className="text-xs text-gray-500">{item.category}</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className={`text-sm font-bold ${item.score >= 85 ? 'text-green-600' : item.score >= 70 ? 'text-yellow-600' : 'text-indigo-600'}`}>
                    {item.score}%
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-normal text-sm text-gray-600 max-w-xs">
                {item.reason}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 bg-gray-50 border-t text-center text-sm text-gray-500">
        Showing predictions for <span className="font-semibold">{name}</span>.
      </div>
    </div>
  );
};

export default PredictionsTable;