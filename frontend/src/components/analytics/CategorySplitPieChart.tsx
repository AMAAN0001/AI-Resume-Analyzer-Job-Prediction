import React from 'react';
import { JobPrediction } from '../../types';

interface CategorySplitPieChartProps {
    category: JobPrediction['category'];
}

const CategorySplitPieChart: React.FC<CategorySplitPieChartProps> = ({ category }) => {
    const isTech = category === 'Tech';

    // Data for the pie chart. Since it's for one resume, it will be 100%.
    const data = [
        { name: 'Tech', value: isTech ? 100 : 0, color: 'fill-blue-500' },
        { name: 'Non-Tech', value: !isTech ? 100 : 0, color: 'fill-purple-500' },
    ];

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-4">
            <svg width="150" height="150" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="50" className={isTech ? data[0].color : data[1].color} />
            </svg>
            <div className="text-center sm:text-left">
                <h4 className="font-semibold text-lg text-gray-700">Category Breakdown</h4>
                <div className="mt-2 space-y-1">
                    {data.map(item => (
                        <div key={item.name} className="flex items-center">
                            <span className={`w-3 h-3 rounded-full mr-2 ${item.color}`}></span>
                            <span className="text-gray-600">{item.name}:</span>
                            <span className="font-semibold ml-1">{item.value}%</span>
                        </div>
                    ))}
                </div>
                 <p className="text-xs text-gray-500 mt-3 italic">
                    Based on the analysis of the current resume.
                </p>
            </div>
        </div>
    );
};

export default CategorySplitPieChart;