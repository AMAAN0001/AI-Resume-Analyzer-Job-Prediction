
import React from 'react';
import Card from '../common/Card';
import { SkillToLearn } from '../../types';

interface CareerRoadmapProps {
  roadmap: SkillToLearn[];
}

const TrendingUpIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
);


const CareerRoadmap: React.FC<CareerRoadmapProps> = ({ roadmap }) => {
  return (
    <Card title="Personalized Career Roadmap" icon={<TrendingUpIcon className="h-6 w-6 text-indigo-600"/>}>
      <p className="text-gray-600 mb-6">
        To further enhance your profile and increase your job match score, consider focusing on these areas.
      </p>
      <div className="space-y-4">
        {roadmap.map((item, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-bold text-lg text-indigo-700">{item.skill}</h4>
            <p className="text-sm text-gray-600 mt-1">{item.reason}</p>
            <p className="text-sm text-gray-800 mt-3 bg-gray-100 p-2 rounded-md">
              <strong>Suggested Resource:</strong> {item.resource}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CareerRoadmap;
