import React from 'react';
import { JobMatch } from '../../types';

interface RoleFitBarChartProps {
    matches: JobMatch[];
}

const RoleFitBarChart: React.FC<RoleFitBarChartProps> = ({ matches }) => {
    
    const getColor = (score: number) => {
        if (score >= 85) return "fill-green-500";
        if (score >= 70) return "fill-yellow-500";
        return "fill-indigo-500";
    }

    // Sort matches by similarity score descending
    const sortedMatches = [...matches].sort((a, b) => b.similarity - a.similarity);

    return (
        <div className="p-4">
            <div className="space-y-4">
                {sortedMatches.map((match, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className="w-2/5 text-sm font-medium text-gray-700 truncate text-right">{match.role}</div>
                        <div className="w-3/5 bg-gray-200 rounded-full h-5">
                            <div
                                className={`h-5 rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold transition-all duration-500 ${getColor(match.similarity)}`}
                                style={{ width: `${match.similarity}%` }}
                            >
                               {match.similarity}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoleFitBarChart;