import React from 'react';
import { AnalysisResult } from '../../types';
import Card from '../common/Card';
import CategorySplitPieChart from './CategorySplitPieChart';
import RoleFitBarChart from './RoleFitBarChart';
import PredictionsTable from './PredictionsTable';

interface AnalyticsDashboardProps {
  result: AnalysisResult;
}

const ChartPieIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
);


const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ result }) => {
    return (
        <div>
            <div className="mb-6 pb-2 border-b-2 border-indigo-200">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <ChartPieIcon className="h-8 w-8 text-indigo-600" />
                    Analytics & Insights
                </h2>
                <p className="text-gray-600 mt-1">Visualizing your resume's alignment with the job market based on this analysis.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card title="Profile Category Split">
                        <CategorySplitPieChart category={result.jobPrediction.category} />
                    </Card>
                    <Card title="Average Fit Score by Role">
                        <RoleFitBarChart matches={result.jobMatches} />
                    </Card>
                </div>
                <div className="lg:col-span-3">
                    <Card title="Candidate Role Predictions" className="h-full">
                        <PredictionsTable 
                            name={result.summaryCard.name}
                            matches={result.jobMatches}
                            prediction={result.jobPrediction}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;